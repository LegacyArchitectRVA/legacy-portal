import { marked } from "marked";
import JSZip from "jszip";

// ─────────────────────────────────────────────────────────────
// Common intermediate representation
// ─────────────────────────────────────────────────────────────

export type Block =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "hr" };

export interface ParsedDocument {
  title: string;
  blocks: Block[];
}

const BRAND_FONT_HEAD = "Cinzel, serif";
const BRAND_FONT_BODY = "'Libre Baskerville', serif";
const GOOGLE_FONTS_LINK =
  "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap";

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

function guessTitle(blocks: Block[], fallback: string): string {
  const firstHeading = blocks.find((b) => b.type === "heading");
  if (firstHeading && firstHeading.type === "heading") return firstHeading.text;
  return fallback;
}

/** Drops the first heading block if it duplicates the document's own title, since renderers print the title separately. */
function dedupeTitleBlock(doc: ParsedDocument): Block[] {
  const idx = doc.blocks.findIndex((b) => b.type === "heading");
  if (idx === -1) return doc.blocks;
  const first = doc.blocks[idx];
  if (first.type === "heading" && first.text === doc.title && idx === 0) {
    return doc.blocks.slice(1);
  }
  return doc.blocks;
}

// ─────────────────────────────────────────────────────────────
// Input parsers — every one returns { title, blocks }
// ─────────────────────────────────────────────────────────────

export async function parseMarkdown(file: File): Promise<ParsedDocument> {
  const text = await file.text();
  const tokens = marked.lexer(text);
  const blocks: Block[] = [];

  for (const token of tokens) {
    if (token.type === "heading") {
      blocks.push({ type: "heading", level: token.depth as any, text: stripTags(token.text) });
    } else if (token.type === "paragraph") {
      blocks.push({ type: "paragraph", text: stripTags(token.text) });
    } else if (token.type === "list") {
      blocks.push({
        type: "list",
        ordered: !!token.ordered,
        items: token.items.map((i: any) => stripTags(i.text)),
      });
    } else if (token.type === "hr") {
      blocks.push({ type: "hr" });
    } else if (token.type === "space") {
      // skip
    } else if ("text" in token && token.text) {
      blocks.push({ type: "paragraph", text: stripTags(token.text) });
    }
  }

  return { title: guessTitle(blocks, file.name.replace(/\.[^.]+$/, "")), blocks };
}

export function parseHtmlString(html: string, fallbackTitle: string): ParsedDocument {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const root = doc.body || doc.documentElement;
  const blocks: Block[] = [];

  function walk(node: Element) {
    for (const child of Array.from(node.children)) {
      const tag = child.tagName.toLowerCase();
      if (/^h[1-6]$/.test(tag)) {
        blocks.push({ type: "heading", level: Number(tag[1]) as any, text: child.textContent?.trim() || "" });
      } else if (tag === "p") {
        const t = child.textContent?.trim() || "";
        if (t) blocks.push({ type: "paragraph", text: t });
      } else if (tag === "ul" || tag === "ol") {
        const items = Array.from(child.querySelectorAll("li")).map((li) => li.textContent?.trim() || "");
        if (items.length) blocks.push({ type: "list", ordered: tag === "ol", items });
      } else if (tag === "hr") {
        blocks.push({ type: "hr" });
      } else if (tag === "div" || tag === "section" || tag === "article" || tag === "body") {
        walk(child);
      } else {
        const t = child.textContent?.trim();
        if (t) blocks.push({ type: "paragraph", text: t });
      }
    }
  }
  walk(root);

  return { title: guessTitle(blocks, fallbackTitle), blocks };
}

export async function parseHtml(file: File): Promise<ParsedDocument> {
  const text = await file.text();
  return parseHtmlString(text, file.name.replace(/\.[^.]+$/, ""));
}

export async function parseWord(file: File): Promise<ParsedDocument> {
  const mammoth = await import("mammoth");
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer });
  return parseHtmlString(result.value, file.name.replace(/\.[^.]+$/, ""));
}

export async function parseAffine(file: File): Promise<ParsedDocument> {
  const text = await file.text();
  let affineData: any;
  try {
    affineData = JSON.parse(text);
  } catch {
    throw new Error("Invalid AFFiNE file: not valid JSON.");
  }
  const blocks: Block[] = [];
  const pages = affineData.pages || [affineData];

  for (const page of pages) {
    const walkBlocks = (list: any[]) => {
      for (const block of list || []) {
        if (block.type === "heading") {
          blocks.push({ type: "heading", level: (block.level || 1) as any, text: block.text || "" });
        } else if (block.type === "paragraph" || block.type === "text") {
          if (block.text) blocks.push({ type: "paragraph", text: block.text });
        } else if (block.type === "list") {
          const items = (block.items || []).map((i: any) => i.text || "");
          if (items.length) blocks.push({ type: "list", ordered: !!block.ordered, items });
        } else if (block.type === "divider" || block.type === "hr") {
          blocks.push({ type: "hr" });
        }
        if (block.children) walkBlocks(block.children);
      }
    };
    walkBlocks(page.blocks || page.children || []);
  }

  if (blocks.length === 0) throw new Error("No recognizable content found in this AFFiNE file.");
  return { title: affineData.title || guessTitle(blocks, file.name.replace(/\.[^.]+$/, "")), blocks };
}

/**
 * PDFs have no real document structure, just positioned glyphs, so this
 * infers headings vs. paragraphs vs. lists from font size and bullet
 * patterns. It's a heuristic, not a guarantee: well-formatted documents
 * (consistent heading sizes, real bullet characters) convert cleanly;
 * unusual layouts may come through as plain paragraphs.
 */
export async function parsePdf(file: File): Promise<ParsedDocument> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).href;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  type Line = { text: string; fontSize: number };
  const lines: Line[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();

    // Group text items into lines by their Y position (with tolerance for
    // sub-pixel jitter within the same visual line).
    const rows: { y: number; items: { str: string; fontSize: number; x: number }[] }[] = [];
    for (const raw of textContent.items as any[]) {
      if (!("str" in raw)) continue;
      const str = raw.str as string;
      const fontSize = Math.hypot(raw.transform[0], raw.transform[1]) || 1;
      const y = raw.transform[5];
      const x = raw.transform[4];
      let row = rows.find((r) => Math.abs(r.y - y) < fontSize * 0.4);
      if (!row) {
        row = { y, items: [] };
        rows.push(row);
      }
      if (str) row.items.push({ str, fontSize, x });
    }
    rows.sort((a, b) => b.y - a.y); // PDF y-axis is bottom-up
    for (const row of rows) {
      row.items.sort((a, b) => a.x - b.x);
      const text = row.items.map((i) => i.str).join("").replace(/\s+/g, " ").trim();
      if (!text) continue;
      const avgFontSize =
        row.items.reduce((s, i) => s + i.fontSize, 0) / row.items.length;
      lines.push({ text, fontSize: avgFontSize });
    }
    lines.push({ text: "", fontSize: 0 }); // page break -> paragraph break
  }

  if (lines.every((l) => !l.text)) {
    throw new Error(
      "No extractable text found in this PDF. It may be a scanned image without OCR text."
    );
  }

  // Body text size = the most common font size across all lines.
  const sizeCounts = new Map<number, number>();
  for (const l of lines) {
    if (!l.text) continue;
    const rounded = Math.round(l.fontSize);
    sizeCounts.set(rounded, (sizeCounts.get(rounded) || 0) + 1);
  }
  let bodySize = 12;
  let bestCount = 0;
  for (const [size, count] of sizeCounts) {
    if (count > bestCount) {
      bestCount = count;
      bodySize = size;
    }
  }

  const blocks: Block[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];
  let listOrdered = false;

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ") });
      paragraphBuffer = [];
    }
  };
  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: "list", ordered: listOrdered, items: listBuffer });
      listBuffer = [];
    }
  };

  const bulletRe = /^[•◦▪\-\*]\s+/;
  const numberedRe = /^\d+[.)]\s+/;

  for (const line of lines) {
    const text = line.text.trim();
    if (!text) {
      flushParagraph();
      flushList();
      continue;
    }
    const ratio = line.fontSize / bodySize;
    const isBullet = bulletRe.test(text);
    const isNumbered = numberedRe.test(text);

    if (ratio > 1.7) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 1, text: text.replace(bulletRe, "").replace(numberedRe, "") });
    } else if (ratio > 1.35) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 2, text });
    } else if (ratio > 1.12) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: 3, text });
    } else if (isBullet || isNumbered) {
      flushParagraph();
      listOrdered = isNumbered;
      listBuffer.push(text.replace(bulletRe, "").replace(numberedRe, ""));
    } else {
      flushList();
      paragraphBuffer.push(text);
    }
  }
  flushParagraph();
  flushList();

  return { title: guessTitle(blocks, file.name.replace(/\.[^.]+$/, "")), blocks };
}

export type InputType = "markdown" | "html" | "word" | "affine" | "pdf";

export async function parseInput(file: File, inputType: InputType): Promise<ParsedDocument> {
  switch (inputType) {
    case "markdown":
      return parseMarkdown(file);
    case "html":
      return parseHtml(file);
    case "word":
      return parseWord(file);
    case "affine":
      return parseAffine(file);
    case "pdf":
      return parsePdf(file);
  }
}

// ─────────────────────────────────────────────────────────────
// Output renderers
// ─────────────────────────────────────────────────────────────

function blocksToInnerHtml(blocks: Block[]): string {
  return blocks
    .map((b) => {
      if (b.type === "heading") return `<h${b.level}>${escapeHtml(b.text)}</h${b.level}>`;
      if (b.type === "paragraph") return `<p>${escapeHtml(b.text)}</p>`;
      if (b.type === "hr") return `<hr />`;
      if (b.type === "list") {
        const tag = b.ordered ? "ol" : "ul";
        return `<${tag}>${b.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</${tag}>`;
      }
      return "";
    })
    .join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Renders to the dark branded HTML used throughout the portal. Returns the full HTML string. */
export function renderToHtml(doc: ParsedDocument): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(doc.title)} - Legacy Architect RVA</title>
  <link href="${GOOGLE_FONTS_LINK}" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${BRAND_FONT_BODY}; background: #000; color: #e8e6e1; line-height: 1.6; padding: 2rem; max-width: 760px; margin: 0 auto; }
    h1, h2, h3, h4, h5, h6 { font-family: ${BRAND_FONT_HEAD}; font-weight: 600; letter-spacing: 0.02em; color: #d9cca0; margin: 1.5rem 0 0.75rem; }
    h1 { font-size: 2rem; border-bottom: 1px solid rgba(217,204,160,0.2); padding-bottom: 0.5rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.25rem; }
    p { margin-bottom: 1rem; }
    ul, ol { margin-bottom: 1rem; padding-left: 1.5rem; }
    li { margin-bottom: 0.5rem; }
    hr { border: none; border-top: 1px solid rgba(217,204,160,0.15); margin: 2rem 0; }
    footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid rgba(217,204,160,0.1); text-align: center; font-size: 0.75rem; color: rgba(232,230,225,0.5); }
  </style>
</head>
<body>
  <h1 style="margin-top:0">${escapeHtml(doc.title)}</h1>
  ${blocksToInnerHtml(dedupeTitleBlock(doc))}
  <footer>Converted by Legacy Architect RVA &middot; ${new Date().toLocaleDateString()}</footer>
</body>
</html>`;
}

/** Opens a print-ready light branded window and triggers the browser's print/Save-as-PDF dialog. */
export function renderToPdf(doc: ParsedDocument) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) throw new Error("Couldn't open the print window. Check your popup blocker.");

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(doc.title)} - Legacy Architect RVA</title>
  <link href="${GOOGLE_FONTS_LINK}" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${BRAND_FONT_BODY}; font-size: 13pt; line-height: 1.5; color: #1a1a1a; background: #fdfcfa; padding: 1in 0.9in; }
    h1, h2, h3, h4, h5, h6 { font-family: ${BRAND_FONT_HEAD}; color: #8a6d1f; margin: 0.3in 0 0.12in; text-transform: uppercase; letter-spacing: 0.02em; }
    h1 { font-size: 20pt; text-align: center; }
    h2 { font-size: 16pt; }
    h3 { font-size: 13pt; color: #4a3a10; }
    p { margin-bottom: 0.1in; }
    ul, ol { margin: 0 0 0.15in 0.25in; }
    li { margin-bottom: 0.06in; }
    hr { border: none; border-top: 1px solid #d9cca0; margin: 0.25in 0; }
    .footer { margin-top: 0.5in; padding-top: 0.2in; border-top: 1px solid #d9cca0; text-align: center; font-family: ${BRAND_FONT_HEAD}; font-size: 10pt; letter-spacing: 0.1em; color: #8a6d1f; text-transform: uppercase; }
    @media print { body { padding: 0.6in 0.7in; } }
  </style>
</head>
<body>
  ${blocksToInnerHtml(doc.blocks)}
  <div class="footer">Order in Your Absence</div>
</body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
}

/** Builds a real .docx file and returns it as a Blob. */
export async function renderToDocx(doc: ParsedDocument): Promise<Blob> {
  const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } = await import("docx");

  const HEADING_LEVELS: Record<number, any> = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
    4: HeadingLevel.HEADING_4,
    5: HeadingLevel.HEADING_5,
    6: HeadingLevel.HEADING_6,
  };

  const children: any[] = [
    new Paragraph({
      text: doc.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    }),
  ];

  for (const b of dedupeTitleBlock(doc)) {
    if (b.type === "heading") {
      children.push(new Paragraph({ text: b.text, heading: HEADING_LEVELS[b.level] || HeadingLevel.HEADING_3 }));
    } else if (b.type === "paragraph") {
      children.push(new Paragraph({ children: [new TextRun(b.text)] }));
    } else if (b.type === "list") {
      for (const item of b.items) {
        children.push(
          new Paragraph({
            text: item,
            bullet: b.ordered ? undefined : { level: 0 },
            numbering: b.ordered ? { reference: "numbered-list", level: 0 } : undefined,
          })
        );
      }
    } else if (b.type === "hr") {
      children.push(new Paragraph({ text: "" }));
    }
  }

  const docxDoc = new Document({
    numbering: {
      config: [{ reference: "numbered-list", levels: [{ level: 0, format: "decimal", text: "%1.", alignment: AlignmentType.START }] }],
    },
    sections: [{ children }],
  });

  return await Packer.toBlob(docxDoc);
}

/**
 * Splits content into "pages" at each top-level heading, renders each
 * page as a styled square/portrait card, rasterizes with html2canvas,
 * and bundles all images into a single zip — built for pulling each
 * page of a document into its own shareable image.
 */
export async function renderToPngZip(
  doc: ParsedDocument,
  onProgress?: (current: number, total: number) => void
): Promise<Blob> {
  const html2canvas = (await import("html2canvas")).default;

  // Split into pages at each heading level <= 2 (new page per major section)
  const pages: Block[][] = [];
  let current: Block[] = [];
  for (const b of doc.blocks) {
    if (b.type === "heading" && b.level <= 2 && current.length > 0) {
      pages.push(current);
      current = [];
    }
    current.push(b);
  }
  if (current.length > 0) pages.push(current);
  if (pages.length === 0) pages.push(doc.blocks);

  const zip = new JSZip();
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "1080px";
  document.body.appendChild(container);

  try {
    for (let i = 0; i < pages.length; i++) {
      onProgress?.(i + 1, pages.length);
      container.innerHTML = `
        <div style="width:1080px;min-height:1350px;background:#0a0a0a;color:#e8e6e1;font-family:${BRAND_FONT_BODY};padding:80px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;">
          <style>
            h1,h2,h3 { font-family:${BRAND_FONT_HEAD}; color:#d9cca0; letter-spacing:0.02em; margin-bottom:24px; }
            h1 { font-size:56px; } h2 { font-size:44px; } h3 { font-size:34px; }
            p { font-size:28px; line-height:1.5; margin-bottom:20px; color:#e8e6e1; }
            ul,ol { padding-left:40px; margin-bottom:20px; }
            li { font-size:28px; line-height:1.5; margin-bottom:14px; }
            hr { border:none; border-top:2px solid rgba(217,204,160,0.2); margin:30px 0; }
          </style>
          ${blocksToInnerHtml(pages[i])}
          <div style="margin-top:auto;padding-top:40px;text-align:center;font-family:${BRAND_FONT_HEAD};font-size:18px;letter-spacing:0.15em;color:#8a7340;text-transform:uppercase;">
            Legacy Architect RVA
          </div>
        </div>`;

      // Load fonts before rasterizing
      await document.fonts.ready;
      const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
        backgroundColor: "#0a0a0a",
        scale: 1,
      });
      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b as Blob), "image/png")
      );
      zip.file(`page-${String(i + 1).padStart(2, "0")}.png`, blob);
    }
  } finally {
    document.body.removeChild(container);
  }

  return await zip.generateAsync({ type: "blob" });
}

export type OutputType = "html" | "pdf" | "docx" | "png";

export const INPUT_TYPES: { id: InputType; label: string; accept: string }[] = [
  { id: "markdown", label: "Markdown", accept: ".md,.markdown,.txt" },
  { id: "html", label: "HTML", accept: ".html,.htm" },
  { id: "word", label: "Word Document", accept: ".docx" },
  { id: "pdf", label: "PDF", accept: ".pdf" },
  { id: "affine", label: "AFFiNE", accept: ".json,.affine" },
];

export const OUTPUT_TYPES: { id: OutputType; label: string; description: string }[] = [
  { id: "html", label: "HTML", description: "Branded, styled web page" },
  { id: "pdf", label: "PDF", description: "Print-ready via your browser" },
  { id: "docx", label: "Word (.docx)", description: "Editable Word document" },
  { id: "png", label: "Images (.zip)", description: "One image per page, for social/marketing" },
];

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadText(text: string, filename: string, mime = "text/html") {
  downloadBlob(new Blob([text], { type: mime }), filename);
}
