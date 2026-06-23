import { marked } from "marked";
import JSZip from "jszip";

// ─────────────────────────────────────────────────────────────
// Common intermediate representation
// ─────────────────────────────────────────────────────────────

export type Block =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
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
      } else if (tag === "table") {
        const rowEls = Array.from(child.querySelectorAll("tr"));
        if (rowEls.length > 0) {
          const cellsOf = (row: Element) =>
            Array.from(row.querySelectorAll("th,td")).map((c) => c.textContent?.trim() || "");
          const firstRowIsHeader = rowEls[0].querySelector("th") !== null;
          const headers = firstRowIsHeader ? cellsOf(rowEls[0]) : cellsOf(rowEls[0]).map(() => "");
          const dataRows = (firstRowIsHeader ? rowEls.slice(1) : rowEls).map(cellsOf).filter((r) => r.some((c) => c));
          if (dataRows.length > 0 || headers.some((h) => h)) {
            blocks.push({ type: "table", headers, rows: dataRows });
          }
        }
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

  // AFFiNE's real export format identifies block kind via `flavour`
  // (e.g. "affine:paragraph", "affine:table") rather than a plain
  // `type` field. Older/simplified exports may use `type` directly.
  // Check both so this doesn't silently match nothing.
  const kindOf = (block: any): string => {
    const raw = block.flavour || block.type || "";
    return raw.replace(/^affine:/, "");
  };

  // AFFiNE represents headings as paragraph blocks with a "type" prop
  // set to h1/h2/etc, not a separate heading flavour.
  const headingLevel = (block: any): number | null => {
    const t = block.props?.type || block.props?.level;
    const m = typeof t === "string" && t.match(/^h([1-6])$/);
    return m ? Number(m[1]) : typeof t === "number" ? t : null;
  };

  // Pull plain text out of AFFiNE's "Delta" rich-text format
  // ([{ insert: "..." }, ...]) or a plain string, whichever appears.
  const textOf = (val: any): string => {
    if (typeof val === "string") return val;
    if (Array.isArray(val)) return val.map((d) => d?.insert ?? "").join("");
    return "";
  };

  // Extracts a table/database block's column headers and row cell
  // values. AFFiNE's database block stores columns separately from
  // rows (rows reference cells by column id), so this defensively
  // checks a few plausible shapes rather than assuming one exact
  // schema, since the format isn't publicly documented.
  const extractTable = (block: any): { headers: string[]; rows: string[][] } | null => {
    const columns = block.props?.columns || block.columns || [];
    const headers = columns.map((c: any) => textOf(c.name ?? c.title ?? c.label) || "");
    const rawRows = block.props?.rows || block.rows || block.children || [];
    const rows: string[][] = [];
    for (const row of rawRows) {
      const cells = row.cells || row.props?.cells || row;
      if (cells && typeof cells === "object") {
        if (Array.isArray(cells)) {
          rows.push(cells.map((c: any) => textOf(c?.value ?? c)));
        } else {
          // Cells keyed by column id — order by the columns list when
          // possible, otherwise just take whatever values exist.
          const byColumn = columns.length > 0
            ? columns.map((c: any) => textOf(cells[c.id]?.value ?? cells[c.id]))
            : Object.values(cells).map((v: any) => textOf(v?.value ?? v));
          rows.push(byColumn);
        }
      }
    }
    if (headers.length === 0 && rows.length === 0) return null;
    return { headers, rows };
  };

  for (const page of pages) {
    const walkBlocks = (list: any[]) => {
      for (const block of list || []) {
        const kind = kindOf(block);
        const rawText = block.text ?? block.props?.text;
        const level = headingLevel(block);

        if (kind === "table" || kind === "database") {
          const table = extractTable(block);
          if (table) blocks.push({ type: "table", ...table });
        } else if (level) {
          blocks.push({ type: "heading", level: Math.min(level, 6) as any, text: textOf(rawText) });
        } else if (kind === "paragraph" || kind === "text" || block.type === "paragraph" || block.type === "text") {
          const t = textOf(rawText);
          if (t) blocks.push({ type: "paragraph", text: t });
        } else if (kind === "list" || block.type === "list") {
          const items = (block.items || block.children || [])
            .map((i: any) => textOf(i.text ?? i.props?.text))
            .filter(Boolean);
          if (items.length) blocks.push({ type: "list", ordered: !!(block.ordered ?? block.props?.type === "numbered"), items });
        } else if (kind === "divider" || kind === "hr" || block.type === "divider" || block.type === "hr") {
          blocks.push({ type: "hr" });
        } else {
          // Unknown block kind (callout, bookmark, embed, todo, etc.) —
          // rather than silently dropping it, capture whatever readable
          // text it carries so nothing vanishes without a trace.
          const fallbackText = textOf(rawText) || textOf(block.title);
          if (fallbackText) blocks.push({ type: "paragraph", text: fallbackText });
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
      if (b.type === "table") {
        const headerRow = b.headers.some((h) => h)
          ? `<thead><tr>${b.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>`
          : "";
        const bodyRows = b.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
          .join("");
        return `<table>${headerRow}<tbody>${bodyRows}</tbody></table>`;
      }
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
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: ${BRAND_FONT_BODY}; background: #0a0a0a; color: #e8e6e1; line-height: 1.65; padding: 3rem 2rem; max-width: 760px; margin: 0 auto; }
    .logo { display: block; height: 64px; margin: 0 auto 1rem; }
    .cover-title { font-family: ${BRAND_FONT_HEAD}; font-weight: 600; font-size: 1.9rem; text-align: center; letter-spacing: 0.04em; text-transform: uppercase; background: linear-gradient(135deg, #e8c46a, #b8985a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.4rem; }
    .cover-meta { text-align: center; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,230,225,0.45); margin-bottom: 2.5rem; }
    .cover-rule { width: 90px; height: 1px; background: linear-gradient(90deg, transparent, #b8985a, transparent); margin: 0 auto 2.5rem; }
    h1, h2, h3, h4, h5, h6 { font-family: ${BRAND_FONT_HEAD}; font-weight: 600; letter-spacing: 0.02em; color: #d9cca0; margin: 2rem 0 0.85rem; }
    h1 { font-size: 1.5rem; text-transform: uppercase; letter-spacing: 0.03em; border-bottom: 1px solid rgba(217,204,160,0.25); padding-bottom: 0.6rem; }
    h2 { font-size: 1.25rem; }
    h3 { font-size: 1.05rem; color: #c4b896; }
    p { margin-bottom: 1.1rem; color: rgba(232,230,225,0.92); }
    ul, ol { margin-bottom: 1.1rem; padding-left: 1.5rem; }
    li { margin-bottom: 0.55rem; }
    hr { border: none; border-top: 1px solid rgba(217,204,160,0.18); margin: 2.25rem 0; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 1.75rem; font-size: 0.88rem; box-shadow: 0 2px 12px rgba(0,0,0,0.3); }
    th, td { border: 1px solid rgba(217,204,160,0.18); padding: 0.6rem 0.85rem; text-align: left; vertical-align: top; }
    th { font-family: ${BRAND_FONT_HEAD}; font-weight: 600; color: #0a0a0a; background: linear-gradient(135deg, #e8c46a, #b8985a); text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.04em; }
    tr:nth-child(even) td { background: rgba(217,204,160,0.03); }
    footer { margin-top: 3.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(217,204,160,0.15); text-align: center; font-family: ${BRAND_FONT_HEAD}; font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(217,204,160,0.55); }
  </style>
</head>
<body>
  <img class="logo" src="https://portal.legacyarchitectrva.com/logo.png" alt="" />
  <div class="cover-title">${escapeHtml(doc.title)}</div>
  <div class="cover-meta">Prepared by Legacy Architect RVA &middot; ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
  <div class="cover-rule"></div>
  ${blocksToInnerHtml(dedupeTitleBlock(doc))}
  <footer>Order in Your Absence</footer>
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
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: ${BRAND_FONT_BODY}; font-size: 12.5pt; line-height: 1.55; color: #2a2218; background: #fdfcfa; padding: 0.9in 0.85in; }
    .logo { display: block; height: 0.6in; margin: 0 auto 0.2in; }
    .cover-title { font-family: ${BRAND_FONT_HEAD}; font-size: 22pt; text-align: center; letter-spacing: 0.06em; color: #8a6d1f; text-transform: uppercase; margin-bottom: 0.06in; }
    .cover-meta { text-align: center; font-size: 9.5pt; letter-spacing: 0.08em; text-transform: uppercase; color: #9a8b66; margin-bottom: 0.45in; }
    .cover-rule { width: 1.4in; height: 1px; background: linear-gradient(90deg, transparent, #b8985a, transparent); margin: 0 auto 0.45in; }
    h1, h2, h3, h4, h5, h6 { font-family: ${BRAND_FONT_HEAD}; color: #8a6d1f; margin: 0.32in 0 0.14in; text-transform: uppercase; letter-spacing: 0.03em; }
    h1 { font-size: 16pt; border-bottom: 1px solid #d9cca0; padding-bottom: 0.08in; }
    h2 { font-size: 13.5pt; }
    h3 { font-size: 11.5pt; color: #5a4a22; letter-spacing: 0.02em; }
    p { margin-bottom: 0.12in; }
    ul, ol { margin: 0 0 0.16in 0.28in; }
    li { margin-bottom: 0.07in; }
    hr { border: none; border-top: 1px solid #d9cca0; margin: 0.3in 0; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 0.2in; font-size: 10pt; box-shadow: 0 1px 3px rgba(138,109,31,0.08); }
    th, td { border: 1px solid #e4dcc8; padding: 7px 10px; text-align: left; vertical-align: top; }
    td { background: #fffefb; }
    th { background: linear-gradient(180deg, #8a6d1f, #6e5618); font-family: ${BRAND_FONT_HEAD}; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.03em; color: #fdfcfa; border-color: #6e5618; }
    tr:nth-child(even) td { background: #f8f4e9; }
    .footer { margin-top: 0.6in; padding-top: 0.22in; border-top: 1px solid #d9cca0; text-align: center; font-family: ${BRAND_FONT_HEAD}; font-size: 9.5pt; letter-spacing: 0.14em; color: #8a6d1f; text-transform: uppercase; }
    @media print { body { padding: 0.6in 0.7in; } }
  </style>
</head>
<body>
  <img class="logo" src="https://portal.legacyarchitectrva.com/logo.png" alt="" />
  <div class="cover-title">${escapeHtml(doc.title)}</div>
  <div class="cover-meta">Prepared by Legacy Architect RVA &middot; ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
  <div class="cover-rule"></div>
  ${blocksToInnerHtml(dedupeTitleBlock(doc))}
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
  const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle } = await import("docx");

  const GOLD = "8A6D1F";
  const GOLD_LIGHT = "D9CCA0";
  const HEADING_LEVELS: Record<number, any> = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
    4: HeadingLevel.HEADING_4,
    5: HeadingLevel.HEADING_5,
    6: HeadingLevel.HEADING_6,
  };
  const cellBorder = { style: BorderStyle.SINGLE, size: 2, color: "E4DCC8" };
  const allBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

  const makeCell = (text: string, isHeader: boolean) =>
    new TableCell({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: allBorders,
      shading: isHeader ? { type: ShadingType.SOLID, color: GOLD, fill: GOLD } : undefined,
      children: [
        new Paragraph({
          children: [new TextRun({ text, bold: isHeader, color: isHeader ? "FFFFFF" : undefined, allCaps: isHeader, size: isHeader ? 18 : undefined })],
        }),
      ],
    });

  const children: any[] = [
    new Paragraph({
      children: [new TextRun({ text: doc.title, bold: true, color: GOLD, size: 44 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Prepared by Legacy Architect RVA  ·  ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
          color: "9A8B66",
          size: 18,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 360 },
    }),
  ];

  for (const b of dedupeTitleBlock(doc)) {
    if (b.type === "heading") {
      children.push(
        new Paragraph({
          heading: HEADING_LEVELS[b.level] || HeadingLevel.HEADING_3,
          children: [new TextRun({ text: b.text, color: GOLD, bold: true, allCaps: b.level <= 2 })],
          border: b.level === 1 ? { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD_LIGHT, space: 4 } } : undefined,
        })
      );
    } else if (b.type === "paragraph") {
      children.push(new Paragraph({ children: [new TextRun(b.text)] }));
    } else if (b.type === "table") {
      const rows: any[] = [];
      if (b.headers.some((h) => h)) {
        rows.push(new TableRow({ children: b.headers.map((h) => makeCell(h, true)) }));
      }
      for (const row of b.rows) {
        rows.push(new TableRow({ children: row.map((cell) => makeCell(cell, false)) }));
      }
      if (rows.length > 0) {
        children.push(new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows }));
        children.push(new Paragraph({ text: "" }));
      }
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
