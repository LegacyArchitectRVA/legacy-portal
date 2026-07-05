import { marked } from "marked";
import JSZip from "jszip";
import { LOGO_DATA_URI } from "./brandAssets";
import { BRAND_FONT_HEAD, BRAND_FONT_BODY, GOOGLE_FONTS_LINK, BRAND_BLACK, BRAND_OFFWHITE, BRAND_GOLD, BRAND_GOLD_LIGHT, BRAND_CREAM, TAGLINE } from "./brandTokens";

// ─────────────────────────────────────────────────────────────
// Common intermediate representation
// ─────────────────────────────────────────────────────────────

export type Block =
  | { type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt?: string; width?: number; height?: number }
  | { type: "hr" };

export interface ParsedDocument {
  title: string;
  blocks: Block[];
  /** Non-fatal notes about the parse (e.g. OCR fallback was used) to surface to the user. */
  warnings?: string[];
}


function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

/** Turns a heading/page title into a stable, URL-safe anchor id. */
function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) || "section"
  );
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
        const imgEls = Array.from(child.querySelectorAll("img"));
        const t = child.textContent?.trim() || "";
        if (t) {
          blocks.push({ type: "paragraph", text: t });
        }
        for (const imgEl of imgEls) {
          const src = imgEl.getAttribute("src") || "";
          if (!src) continue;
          const w = Number(imgEl.getAttribute("width")) || undefined;
          const h = Number(imgEl.getAttribute("height")) || undefined;
          blocks.push({ type: "image", src, alt: imgEl.getAttribute("alt") || undefined, width: w, height: h });
        }
      } else if (tag === "ul" || tag === "ol") {
        const items = Array.from(child.querySelectorAll("li")).map((li) => li.textContent?.trim() || "");
        if (items.length) blocks.push({ type: "list", ordered: tag === "ol", items });
      } else if (tag === "hr") {
        blocks.push({ type: "hr" });
      } else if (tag === "img") {
        const src = child.getAttribute("src") || "";
        if (src) {
          const w = Number(child.getAttribute("width")) || undefined;
          const h = Number(child.getAttribute("height")) || undefined;
          blocks.push({ type: "image", src, alt: child.getAttribute("alt") || undefined, width: w, height: h });
        }
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

/**
 * A real AFFiNE export is a SQLite database (workspace + per-page Yjs
 * CRDT snapshots), not JSON. An earlier version of this parser assumed
 * JSON based on a guess at the format; testing against real exported
 * .affine files showed that guess was wrong, hence this rewrite. The
 * old JSON-shaped parsing is kept as parseAffineLegacyJson below, as a
 * defensive fallback for any export path that genuinely does produce
 * JSON, since it costs nothing to keep and a real file always matches
 * the SQLite check first.
 */
export async function parseAffine(file: File): Promise<ParsedDocument> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const isSqlite =
    bytes.length > 16 && new TextDecoder().decode(bytes.slice(0, 16)) === "SQLite format 3\0";
  if (isSqlite) return parseAffineSqlite(bytes, file.name);
  return parseAffineLegacyJson(file);
}

/**
 * Parses a real AFFiNE workspace export: a SQLite database whose
 * `snapshots` table holds one Yjs CRDT document per row, one of which
 * is the workspace root (a `meta` shared type listing every page by
 * id/title) and the rest are individual pages (a `blocks` shared type
 * holding that page's content, BlockSuite's actual schema).
 *
 * BlockSuite stores blocks flat in one Y.Map keyed by block id, not as
 * nested objects — the document tree is reconstructed by following
 * each block's sys:children array of child block ids. Properties are
 * namespaced: sys:* for structural fields (id, flavour, children),
 * prop:* for content (text, type, columns, etc). None of this is
 * publicly documented, so this was built by decoding real exported
 * .affine files directly rather than guessing.
 */
async function parseAffineSqlite(bytes: Uint8Array, fileName: string): Promise<ParsedDocument> {
  const initSqlJs = (await import("sql.js")).default;
  const Y = await import("yjs");
  const SQL = await initSqlJs({ locateFile: (f: string) => `/${f}` });
  const db = new SQL.Database(bytes);

  let snapshotRows: any[][] = [];
  try {
    const result = db.exec("SELECT doc_id, data FROM snapshots");
    snapshotRows = result[0]?.values || [];
  } finally {
    db.close();
  }
  if (snapshotRows.length === 0) {
    throw new Error("This AFFiNE file doesn't contain any readable documents.");
  }

  let workspaceName = "";
  let pageRegistry: { id: string; title: string; trash?: boolean }[] = [];
  const pageDocs = new Map<string, any>();

  for (const [docId, data] of snapshotRows) {
    const ydoc = new Y.Doc();
    try {
      Y.applyUpdate(ydoc, data instanceof Uint8Array ? data : new Uint8Array(data));
    } catch {
      continue; // Corrupt or unreadable snapshot — skip rather than fail the whole file.
    }
    if (ydoc.share.has("meta")) {
      const meta = ydoc.getMap("meta");
      const name = meta.get("name");
      if (typeof name === "string") workspaceName = name;
      const pagesArr = meta.get("pages");
      if (pagesArr) {
        pageRegistry = (pagesArr.toArray?.() || []).map((p: any) =>
          p && typeof p.toJSON === "function" ? p.toJSON() : p
        );
      }
    } else if (ydoc.share.has("blocks")) {
      pageDocs.set(docId, ydoc);
    }
  }

  // Build the cross-reference registry before walking any content, so
  // links can resolve regardless of which page they appear on.
  const slugByPageId = new Map<string, string>();
  const slugByTitle = new Map<string, string>();
  const titleByPageId = new Map<string, string>();
  for (const p of pageRegistry) {
    if (p.trash || !p.title) continue;
    const slug = slugify(p.title);
    slugByPageId.set(p.id, slug);
    slugByTitle.set(p.title.trim().toLowerCase(), slug);
    titleByPageId.set(p.id, p.title);
  }

  // Prefer the workspace's own page order; fall back to snapshot order
  // for any page that's somehow missing from the registry.
  const orderedIds =
    pageRegistry.length > 0
      ? [
          ...pageRegistry.filter((p) => !p.trash && pageDocs.has(p.id)).map((p) => p.id),
          ...[...pageDocs.keys()].filter((id) => !pageRegistry.some((p) => p.id === id)),
        ]
      : [...pageDocs.keys()];

  const blocks: Block[] = [];
  for (const pageId of orderedIds) {
    const ydoc = pageDocs.get(pageId);
    if (!ydoc) continue;
    walkAffinePage(ydoc.getMap("blocks"), blocks, slugByPageId, slugByTitle, titleByPageId, Y);
  }

  if (blocks.length === 0) {
    throw new Error("No recognizable content found in this AFFiNE file.");
  }
  linkKnownTitles(blocks, slugByTitle);

  return { title: workspaceName || fileName.replace(/\.[^.]+$/, ""), blocks };
}

/** Resolves a BlockSuite YText into plain text, converting any inline page-reference into a markdown link. */
function affineTextOf(ytext: any, slugByPageId: Map<string, string>): string {
  if (!ytext) return "";
  const delta = typeof ytext.toDelta === "function" ? ytext.toDelta() : null;
  if (!delta) return typeof ytext === "string" ? ytext : ytext.toString?.() || "";
  return delta
    .map((d: any) => {
      const ref = d?.attributes?.reference;
      if (ref) {
        const slug = (ref.pageId && slugByPageId.get(ref.pageId)) || (ref.title && slugify(ref.title));
        const label = ref.title || "linked section";
        if (slug) return `[${label}](#${slug})`;
        return label; // Reference target not found — keep the label as plain text rather than dropping it.
      }
      return d?.insert ?? "";
    })
    .join("");
}

/** Walks one page's flat block map starting from its root affine:page block. */
function walkAffinePage(
  blockMap: any,
  out: Block[],
  slugByPageId: Map<string, string>,
  slugByTitle: Map<string, string>,
  titleByPageId: Map<string, string>,
  Y: any
) {
  let pageBlock: any = null;
  for (const block of blockMap.values()) {
    if (block?.get?.("sys:flavour") === "affine:page") {
      pageBlock = block;
      break;
    }
  }
  if (!pageBlock) return;

  const pageTitle = affineTextOf(pageBlock.get("prop:title"), slugByPageId) || "Untitled";
  const slug = slugify(pageTitle);
  slugByTitle.set(pageTitle.trim().toLowerCase(), slug);
  out.push({ type: "heading", level: 1, text: pageTitle, id: slug });

  const childIds: string[] = (pageBlock.get("sys:children")?.toArray?.() || []) as string[];
  for (const childId of childIds) {
    const child = blockMap.get(childId);
    const flavour = child?.get?.("sys:flavour");
    // affine:note holds the actual document content; affine:surface is
    // the whiteboard canvas, not relevant to a linear document export.
    if (flavour === "affine:note") {
      walkAffineChildren(
        blockMap,
        child.get("sys:children")?.toArray?.() || [],
        out,
        slugByPageId,
        slugByTitle,
        titleByPageId,
        Y
      );
    }
  }
}

/** Walks a list of sibling block ids in document order, grouping consecutive list items together. */
function walkAffineChildren(
  blockMap: any,
  childIds: string[],
  out: Block[],
  slugByPageId: Map<string, string>,
  slugByTitle: Map<string, string>,
  titleByPageId: Map<string, string>,
  Y: any
) {
  let pendingList: { ordered: boolean; items: string[] } | null = null;
  const flushList = () => {
    if (pendingList && pendingList.items.length > 0) out.push({ type: "list", ...pendingList });
    pendingList = null;
  };

  for (const id of childIds) {
    const block = blockMap.get(id);
    if (!block?.get) continue;
    const flavour = block.get("sys:flavour");
    const grandchildren = block.get("sys:children")?.toArray?.() || [];

    if (flavour === "affine:list") {
      const text = affineTextOf(block.get("prop:text"), slugByPageId);
      const ordered = block.get("prop:type") === "numbered";
      if (!pendingList || pendingList.ordered !== ordered) {
        flushList();
        pendingList = { ordered, items: [] };
      }
      if (text) pendingList.items.push(text);
      // Nested sub-items (indented children of a list item) are
      // flattened into the same list rather than dropped, since a
      // slightly-flattened list beats losing the content entirely.
      if (grandchildren.length) {
        walkAffineChildren(blockMap, grandchildren, out, slugByPageId, slugByTitle, titleByPageId, Y);
      }
      continue;
    }
    flushList();

    if (flavour === "affine:paragraph" || flavour === "affine:edgeless-text") {
      const text = affineTextOf(block.get("prop:text"), slugByPageId);
      const headingType = block.get("prop:type");
      const headingMatch = typeof headingType === "string" && headingType.match(/^h([1-6])$/);
      if (headingMatch) {
        if (text) out.push({ type: "heading", level: Math.min(Number(headingMatch[1]) + 1, 6) as any, text });
      } else if (text) {
        out.push({ type: "paragraph", text });
      }
    } else if (flavour === "affine:divider") {
      out.push({ type: "hr" });
    } else if (flavour === "affine:callout") {
      const text = affineTextOf(block.get("prop:text"), slugByPageId);
      if (text) out.push({ type: "paragraph", text });
    } else if (flavour === "affine:table") {
      const table = extractAffineTableBlock(block);
      if (table) out.push({ type: "table", ...table });
    } else if (flavour === "affine:database") {
      const table = extractAffineDatabaseBlock(block, blockMap, slugByPageId, Y);
      if (table) out.push({ type: "table", ...table });
    } else if (flavour === "affine:embed-linked-doc" || flavour === "affine:embed-synced-doc") {
      const pageId = block.get("prop:pageId");
      const slug = pageId && slugByPageId.get(pageId);
      const label = (pageId && titleByPageId.get(pageId)) || "Linked page";
      if (slug) out.push({ type: "paragraph", text: `[${label}](#${slug})` });
    } else if (flavour === "affine:bookmark" || flavour?.startsWith("affine:embed-")) {
      const title = block.get("prop:title");
      const url = block.get("prop:url");
      if (url) out.push({ type: "paragraph", text: title ? `[${title}](${url})` : String(url) });
    } else if (flavour === "affine:image") {
      const caption = block.get("prop:caption");
      if (caption) out.push({ type: "paragraph", text: `[Image: ${caption}]` });
    } else if (flavour === "affine:latex") {
      const tex = block.get("prop:latex");
      if (tex) out.push({ type: "paragraph", text: String(tex) });
    } else if (flavour === "affine:frame" || flavour === "affine:surface") {
      // Whiteboard-only grouping constructs, not document content.
    } else {
      // Unknown flavour — try whatever text-like property exists
      // rather than silently dropping the block.
      const fallback =
        affineTextOf(block.get("prop:text"), slugByPageId) ||
        affineTextOf(block.get("prop:title"), slugByPageId);
      if (fallback) out.push({ type: "paragraph", text: fallback });
    }

    if (grandchildren.length && flavour !== "affine:list") {
      walkAffineChildren(blockMap, grandchildren, out, slugByPageId, slugByTitle, titleByPageId, Y);
    }
  }
  flushList();
}

/**
 * Extracts an affine:table block. Unlike affine:database, the header
 * row isn't structurally distinct — it's stored as an ordinary row,
 * identified only by being first in sort order, exactly like a plain
 * spreadsheet. Row/column order is a fractional-index string (plain
 * lexicographic comparison sorts correctly by design).
 *
 * Confirmed by decoding real exported .affine files directly: despite
 * looking like nested objects, prop:rows/prop:columns/prop:cells are
 * NOT real nested Y.Maps here — BlockSuite flattens them into dot-
 * separated string keys directly on the block itself (e.g. the literal
 * key "prop:cells.abc123:def456.text"). This is genuinely inconsistent
 * with how affine:database stores its columns/cells as real nested
 * structures, but it's what real exports actually contain.
 */
function extractAffineTableBlock(block: any): { headers: string[]; rows: string[][] } | null {
  const rowOrder = new Map<string, string>();
  const colOrder = new Map<string, string>();
  const cellText = new Map<string, any>();

  for (const key of block.keys()) {
    let m = key.match(/^prop:rows\.([^.]+)\.order$/);
    if (m) {
      rowOrder.set(m[1], block.get(key));
      continue;
    }
    m = key.match(/^prop:columns\.([^.]+)\.order$/);
    if (m) {
      colOrder.set(m[1], block.get(key));
      continue;
    }
    m = key.match(/^prop:cells\.([^.:]+):([^.]+)\.text$/);
    if (m) {
      cellText.set(`${m[1]}:${m[2]}`, block.get(key));
      continue;
    }
  }

  const rowIds = [...rowOrder.entries()].sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0)).map((r) => r[0]);
  const colIds = [...colOrder.entries()].sort((a, b) => (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0)).map((c) => c[0]);
  if (rowIds.length === 0 || colIds.length === 0) return null;

  const textAt = (rowId: string, colId: string): string => cellText.get(`${rowId}:${colId}`)?.toString?.() ?? "";
  const [headerRowId, ...dataRowIds] = rowIds;
  const headers = colIds.map((c) => textAt(headerRowId, c));
  const rows = dataRowIds.map((r) => colIds.map((c) => textAt(r, c)));
  return { headers, rows };
}

/**
 * Extracts an affine:database block (BlockSuite's other table type,
 * used for kanban/grid views). Each row is a real child block whose
 * own text is the first column; prop:columns/prop:cells supply any
 * additional structured columns, including resolving select-type
 * values from an option id to its display label.
 */
function extractAffineDatabaseBlock(
  block: any,
  blockMap: any,
  slugByPageId: Map<string, string>,
  Y: any
): { headers: string[]; rows: string[][] } | null {
  const columns = block.get("prop:columns")?.toArray?.() || [];
  const columnDefs = columns.map((c: any) => (c && typeof c.toJSON === "function" ? c.toJSON() : c));
  const rowIds: string[] = block.get("sys:children")?.toArray?.() || [];
  if (rowIds.length === 0) return null;

  const cellsMap = block.get("prop:cells");
  const resolveCell = (rowId: string, col: any): string => {
    const raw = cellsMap?.get?.(rowId)?.[col.id] ?? cellsMap?.get?.(rowId)?.get?.(col.id);
    const value = raw?.value ?? raw?.get?.("value");
    if (value == null) return "";
    if (col.type === "select" && typeof value === "string") {
      return col.data?.options?.find((o: any) => o.id === value)?.value ?? "";
    }
    if (col.type === "multi-select" && Array.isArray(value)) {
      return value.map((v) => col.data?.options?.find((o: any) => o.id === v)?.value ?? "").join(", ");
    }
    if (Array.isArray(value)) return ""; // e.g. member lists — not meaningful as flat text
    if (typeof value === "object") return ""; // e.g. a single member reference — same reasoning
    return String(value);
  };

  const headers = ["", ...columnDefs.map((c: any) => c.name || "")];
  const rows = rowIds.map((rowId) => {
    const titleBlock = blockMap.get(rowId);
    const title = titleBlock?.get ? affineTextOf(titleBlock.get("prop:text"), slugByPageId) : "";
    return [title, ...columnDefs.map((c: any) => resolveCell(rowId, c))];
  });
  return { headers, rows };
}

/**
 * Older, JSON-shaped parsing kept as a fallback for any AFFiNE export
 * path that isn't the SQLite format real exports use. Not verified
 * against any actual export — there's no confirmed case that produces
 * this shape — but it costs nothing to keep as a defensive second
 * attempt rather than failing outright on an unrecognized JSON file.
 */
async function parseAffineLegacyJson(file: File): Promise<ParsedDocument> {
  const text = await file.text();
  let affineData: any;
  try {
    affineData = JSON.parse(text);
  } catch {
    throw new Error(
      "This doesn't look like an AFFiNE export — it's neither a SQLite workspace file nor valid JSON."
    );
  }
  const blocks: Block[] = [];
  const pages = affineData.pages || [affineData];

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

  // Cross-page references (the "→ Successor Access Guide" style links
  // seen throughout this workspace) need a target to point to. Build a
  // title → slug map from every page up front, by id where available
  // and by title as a fallback, so links can be resolved however the
  // source actually represents them.
  const slugByPageId = new Map<string, string>();
  const slugByTitle = new Map<string, string>();
  const registerPage = (id: string | undefined, title: string | undefined) => {
    if (!title) return;
    const slug = slugify(title);
    if (id) slugByPageId.set(id, slug);
    slugByTitle.set(title.trim().toLowerCase(), slug);
  };
  for (const page of pages) {
    registerPage(page.id ?? page.pageId ?? page.meta?.id, page.title ?? page.meta?.title);
  }

  // Pull plain text out of AFFiNE's "Delta" rich-text format
  // ([{ insert: "...", attributes: {...} }, ...]) or a plain string.
  // Delta "reference" attributes (AFFiNE's actual inline-link
  // mechanism for linking between pages) are converted to markdown
  // link syntax here so the renderers can turn them into real <a>
  // tags later, without needing a separate rich-text Block shape.
  const textOf = (val: any): string => {
    if (typeof val === "string") return val;
    if (!Array.isArray(val)) return "";
    return val
      .map((d: any) => {
        const ref = d?.attributes?.reference;
        if (ref) {
          const slug = (ref.pageId && slugByPageId.get(ref.pageId)) || (ref.title && slugify(ref.title));
          const label = ref.title || d?.insert?.trim() || "linked section";
          if (slug) return `[${label}](#${slug})`;
        }
        return d?.insert ?? "";
      })
      .join("");
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

  let firstHeadingSeenInPage = false;
  for (const page of pages) {
    firstHeadingSeenInPage = false;
    const walkBlocks = (list: any[]) => {
      for (const block of list || []) {
        const kind = kindOf(block);
        const rawText = block.text ?? block.props?.text;
        const level = headingLevel(block);

        if (kind === "table" || kind === "database") {
          const table = extractTable(block);
          if (table) blocks.push({ type: "table", ...table });
        } else if (level) {
          const headingText = textOf(rawText);
          // The first heading on a page is that page's own title —
          // give it a stable anchor so other pages' references to it
          // actually land somewhere, and register it by its real
          // rendered text too (the source page title and the heading
          // text don't always match exactly).
          const id = !firstHeadingSeenInPage ? slugify(headingText) : undefined;
          if (id) {
            firstHeadingSeenInPage = true;
            slugByTitle.set(headingText.trim().toLowerCase(), id);
          }
          blocks.push({ type: "heading", level: Math.min(level, 6) as any, text: headingText, id });
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

  // Second pass: not every cross-reference necessarily arrives as a
  // proper Delta reference attribute — this workspace's own screenshots
  // show plain underlined text like "→ Successor Access Guide" that may
  // just be manually styled text with no formal link attached. Now that
  // every page's title is known, turn exact mentions of another page's
  // title into a real link too, so references work either way they
  // happen to be represented in the source.
  linkKnownTitles(blocks, slugByTitle);

  return { title: affineData.title || guessTitle(blocks, file.name.replace(/\.[^.]+$/, "")), blocks };
}

/**
 * Finds plain-text mentions of known page titles (optionally preceded
 * by an arrow like → or ↗, the pattern this workspace uses for cross-
 * references) inside paragraph and list-item text, and turns them into
 * markdown links to that page's anchor — a fallback for references
 * that aren't carried as a formal link attribute in the source.
 */
function linkKnownTitles(blocks: Block[], slugByTitle: Map<string, string>) {
  if (slugByTitle.size === 0) return;
  // Longer titles first, so "Successor Access Guide" doesn't get
  // pre-empted by a shorter title that happens to be a substring.
  const titles = [...slugByTitle.keys()].sort((a, b) => b.length - a.length);
  if (titles.length === 0) return;
  const pattern = new RegExp(
    `(^|[^\\]\\w])(?:[→↗]\\s*)?(${titles.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\w)])`,
    "gi"
  );
  const relink = (input: string): string =>
    input.replace(pattern, (match, pre, title) => {
      const slug = slugByTitle.get(title.toLowerCase());
      if (!slug) return match;
      const arrow = match.slice(pre.length, match.length - title.length);
      return `${pre}${arrow}[${title}](#${slug})`;
    });

  for (const b of blocks) {
    if (b.type === "paragraph") {
      // Don't relink text that's already a markdown link target.
      if (!/\]\(#/.test(b.text)) b.text = relink(b.text);
    } else if (b.type === "list") {
      b.items = b.items.map((i) => (/\]\(#/.test(i) ? i : relink(i)));
    }
  }
}

/**
 * Walks a PDF page's drawing operations looking for embedded raster images
 * (paintImageXObject), resolves each through pdf.js's object store, and
 * draws it to a canvas to get a portable PNG data URI. Skips anything it
 * can't decode rather than failing the whole conversion -- a missing image
 * is a smaller loss than a failed conversion.
 */
async function extractPageImages(page: any, OPS: any): Promise<string[]> {
  const opList = await page.getOperatorList();
  const srcs: string[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < opList.fnArray.length; i++) {
    if (opList.fnArray[i] !== OPS.paintImageXObject) continue;
    const objId = opList.argsArray[i][0];
    if (typeof objId !== "string" || seen.has(objId)) continue;
    seen.add(objId);

    try {
      const imgData: any = await new Promise((resolve) => {
        page.objs.get(objId, resolve);
      });
      if (!imgData || !imgData.width || !imgData.height) continue;
      // Skip tiny decorative artifacts (rule lines, spacer pixels) -- not
      // worth carrying through as a real "image" block.
      if (imgData.width < 24 || imgData.height < 24) continue;

      const canvas = document.createElement("canvas");
      canvas.width = imgData.width;
      canvas.height = imgData.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      if (imgData.bitmap) {
        // Modern pdf.js resolves images as an ImageBitmap.
        ctx.drawImage(imgData.bitmap, 0, 0, imgData.width, imgData.height);
      } else if (imgData.data) {
        // Older pdf.js fallback: raw pixel bytes, 1/3/4 channels per pixel.
        const channels = imgData.data.length / (imgData.width * imgData.height);
        const out = ctx.createImageData(imgData.width, imgData.height);
        if (channels === 4) {
          out.data.set(imgData.data);
        } else if (channels === 3) {
          for (let p = 0, q = 0; p < imgData.data.length; p += 3, q += 4) {
            out.data[q] = imgData.data[p];
            out.data[q + 1] = imgData.data[p + 1];
            out.data[q + 2] = imgData.data[p + 2];
            out.data[q + 3] = 255;
          }
        } else if (channels === 1) {
          for (let p = 0, q = 0; p < imgData.data.length; p++, q += 4) {
            out.data[q] = out.data[q + 1] = out.data[q + 2] = imgData.data[p];
            out.data[q + 3] = 255;
          }
        } else {
          continue;
        }
        ctx.putImageData(out, 0, 0);
      } else {
        continue;
      }

      srcs.push(canvas.toDataURL("image/png"));
    } catch {
      // Undecodable image (unsupported colorspace/filter) -- skip it.
    }
  }

  return srcs;
}

/**
 * PDFs have no real document structure, just positioned glyphs, so this
 * infers headings vs. paragraphs vs. lists from font size and bullet
 * patterns. It's a heuristic, not a guarantee: well-formatted documents
 * (consistent heading sizes, real bullet characters) convert cleanly;
 * unusual layouts may come through as plain paragraphs.
 */
export async function parsePdf(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<ParsedDocument> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).href;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  type Line = { text: string; fontSize: number; pageEnd?: boolean; cells?: string[] };
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
    lines.push({ text: "", fontSize: 0, pageEnd: true }); // page break -> paragraph break
  }

  let usedOcr = false;

  if (lines.every((l) => !l.text)) {
    // No real text layer (most likely an image-only / rasterized export, e.g.
    // a mobile "print to PDF" that flattened the page). Fall back to OCR
    // rather than failing outright.
    usedOcr = true;
    lines.length = 0;

    const { createWorker } = await import("tesseract.js");
    const worker = await createWorker("eng");

    /** True for OCR noise: dash runs, ornament fragments, stray glyph rows. */
    const isJunkLine = (t: string): boolean => {
      if (/^\d+[.)%]?$/.test(t)) return false; // bare numbers are real cells
      if (/^[\s\-–—_=~•·.*«»°'"`,|]+$/.test(t)) return true;
      const alnum = t.replace(/[^A-Za-z0-9]/g, "").length;
      if (t.length >= 6 && alnum / t.length < 0.3) return true;
      if (alnum <= 1 && t.length <= 3) return true;
      // Rows of shattered fragments (what table ruling lines OCR into):
      // mostly tokens of one or two characters with no real words present.
      const tokens = t.split(/\s+/);
      if (tokens.length >= 4) {
        const frag = tokens.filter((w) => w.replace(/[^A-Za-z0-9]/g, "").length <= 2).length;
        const hasRealWord = tokens.some((w) => /[A-Za-z]{4,}/.test(w));
        if (frag / tokens.length > 0.6 && !hasRealWord) return true;
      }
      return false;
    };

    /** Cleans a single OCR text run: artifact prefixes, dash runs, bullet glyphs. */
    const cleanRun = (t: string): string => {
      let s = t
        .replace(/-{4,}/g, " ")
        .replace(/~{2,}/g, " ")
        .replace(/={2,}/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      // Leading ornament/artifact tokens OCR invents from rules and marks
      s = s.replace(/^(?:[0oOe«»*~_·]{1,2}\s+)+(?=[A-Z])/, "");
      // Stray opening quote artifact glued onto a capitalized word
      s = s.replace(/^['\u2018\u2019`]\s?(?=[A-Z])/, "");
      // Bullet glyphs the source used (checks, plus marks, guillemets) -> bullet
      s = s.replace(/^[«»]+\s*/, "\u2022 ");
      s = s.replace(/^[+*]\s+/, "\u2022 ");
      return s.trim();
    };

    try {
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        onProgress?.(pageNum, pdf.numPages);
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;

        const { data } = await worker.recognize(canvas);

        // Work from word bounding boxes, not the flat text dump. Grouping
        // words back into lines and splitting on wide horizontal gaps lets
        // ruled tables come back out as tables instead of word salad.
        type OcrWord = { text: string; x0: number; x1: number; y0: number; y1: number };
        const words: OcrWord[] = [];
        for (const ln of (data as any).lines ?? []) {
          for (const w of ln.words ?? []) {
            const t = (w.text || "").trim();
            if (!t) continue;
            words.push({ text: t, x0: w.bbox.x0, x1: w.bbox.x1, y0: w.bbox.y0, y1: w.bbox.y1 });
          }
        }

        // Group into visual rows by vertical midpoint
        words.sort((a, b) => (a.y0 + a.y1) / 2 - (b.y0 + b.y1) / 2);
        const rows: OcrWord[][] = [];
        for (const w of words) {
          const mid = (w.y0 + w.y1) / 2;
          const last = rows[rows.length - 1];
          if (last) {
            const lm = last.reduce((s, x) => s + (x.y0 + x.y1) / 2, 0) / last.length;
            const lh = last.reduce((s, x) => s + (x.y1 - x.y0), 0) / last.length;
            if (Math.abs(mid - lm) < lh * 0.6) {
              last.push(w);
              continue;
            }
          }
          rows.push([w]);
        }

        let prevBottom = -1;
        for (const row of rows) {
          row.sort((a, b) => a.x0 - b.x0);
          const rowTop = Math.min(...row.map((w) => w.y0));
          const rowBottom = Math.max(...row.map((w) => w.y1));
          const rowH = rowBottom - rowTop;

          // Vertical whitespace between rows -> paragraph break
          if (prevBottom >= 0 && rowTop - prevBottom > rowH * 0.9) {
            lines.push({ text: "", fontSize: 0 });
          }
          prevBottom = rowBottom;

          // Split the row into cells on wide horizontal gaps. The threshold
          // scales with the row's own average character width so it holds
          // across font sizes and render scales.
          const totalChars = row.reduce((s, w) => s + w.text.length, 0) || 1;
          const totalInk = row.reduce((s, w) => s + (w.x1 - w.x0), 0);
          const charW = Math.max(totalInk / totalChars, 6);
          const cells: string[] = [];
          let current = row[0].text;
          for (let wi = 1; wi < row.length; wi++) {
            const gap = row[wi].x0 - row[wi - 1].x1;
            if (gap > charW * 3.2) {
              cells.push(current);
              current = row[wi].text;
            } else {
              current += " " + row[wi].text;
            }
          }
          cells.push(current);

          const cleaned = cells.map(cleanRun).filter((c) => c && !isJunkLine(c));
          if (cleaned.length === 0) continue;

          if (cleaned.length >= 2) {
            // Multi-cell row: candidate table row. Carried through with the
            // cells intact so the block builder can assemble a real table.
            lines.push({ text: cleaned.join(" | "), fontSize: 12, cells: cleaned });
            continue;
          }

          const text = cleaned[0];
          // Headings by the brand's own standard: short ALL CAPS lines.
          // Requires four letters and a tight length cap so table headers
          // and shouty fragments don't get promoted.
          const letters = text.replace(/[^A-Za-z]/g, "");
          const isAllCaps =
            letters.length >= 4 &&
            letters === letters.toUpperCase() &&
            text.length <= 60 &&
            !text.startsWith("\u2022");
          lines.push({ text, fontSize: isAllCaps ? 20 : 12 });
        }
        lines.push({ text: "", fontSize: 0, pageEnd: true }); // page break
      }
    } finally {
      await worker.terminate();
    }

    if (lines.every((l) => !l.text)) {
      throw new Error(
        "OCR could not find any readable text in this PDF either. The file may be corrupted or fully blank."
      );
    }
  }

  // Extract embedded images (logos, photos) per page -- only for PDFs with a
  // real text layer. Skipped on the OCR path on purpose: a rasterized page
  // is itself one giant "image" covering the whole page, and re-embedding
  // that would just duplicate the OCR'd text as a huge picture underneath it.
  const pageImages: string[][] = [];
  if (!usedOcr) {
    const OPS = pdfjsLib.OPS;
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      pageImages.push(await extractPageImages(page, OPS));
    }
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
  let listBuffer: { stripped: string; raw: string }[] = [];
  let listOrdered = false;
  let tableBuffer: string[][] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      blocks.push({ type: "paragraph", text: paragraphBuffer.join(" ") });
      paragraphBuffer = [];
    }
  };
  const flushList = () => {
    if (!listBuffer.length) return;
    if (listOrdered && listBuffer.length === 1) {
      // A lone numbered line is a numbered section title or reference, not a
      // list. Rendering it as a one-item ordered list would renumber it to
      // "1.", so it stays a paragraph with its original number intact.
      blocks.push({ type: "paragraph", text: listBuffer[0].raw });
    } else {
      blocks.push({ type: "list", ordered: listOrdered, items: listBuffer.map((i) => i.stripped) });
    }
    listBuffer = [];
  };
  const flushTable = () => {
    if (tableBuffer.length >= 2) {
      const cols = Math.max(...tableBuffer.map((r) => r.length));
      const norm = tableBuffer.map((r) => [...r, ...Array(cols - r.length).fill("")]);
      blocks.push({ type: "table", headers: norm[0], rows: norm.slice(1) });
    } else if (tableBuffer.length === 1) {
      // A single multi-cell row isn't a table; keep it as readable text.
      blocks.push({ type: "paragraph", text: tableBuffer[0].join("  \u00b7  ") });
    }
    tableBuffer = [];
  };

  const bulletRe = /^[•◦▪\-\*]\s+/;
  const numberedRe = /^\d+[.)]\s+/;
  let pageCursor = 0;

  for (const line of lines) {
    const text = line.text.trim();
    if (!text) {
      flushParagraph();
      flushList();
      // Row padding inside ruled tables reads as vertical gaps, so blank
      // lines must not close an open table. Only a page boundary or real
      // non-cell content does.
      if (line.pageEnd) {
        flushTable();
        for (const src of pageImages[pageCursor] || []) {
          blocks.push({ type: "image", src });
        }
        pageCursor++;
      }
      continue;
    }

    if (line.cells && line.cells.length >= 2) {
      flushParagraph();
      flushList();
      tableBuffer.push(line.cells);
      continue;
    }
    flushTable();

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
      if (listBuffer.length && listOrdered !== isNumbered) flushList();
      flushParagraph();
      listOrdered = isNumbered;
      listBuffer.push({ stripped: text.replace(bulletRe, "").replace(numberedRe, ""), raw: text });
    } else {
      flushList();
      paragraphBuffer.push(text);
    }
  }
  flushParagraph();
  flushList();
  flushTable();

  return {
    title: guessTitle(blocks, file.name.replace(/\.[^.]+$/, "")),
    blocks,
    warnings: usedOcr
      ? [
          "This PDF had no embedded text layer (likely an image-only export). Text was recovered using OCR -- review headings, line breaks, and formatting before sending to a client.",
        ]
      : undefined,
  };
}

export type InputType = "markdown" | "html" | "word" | "affine" | "pdf";

export async function parseInput(
  file: File,
  inputType: InputType,
  onProgress?: (current: number, total: number) => void
): Promise<ParsedDocument> {
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
      return parsePdf(file, onProgress);
  }
}

// ─────────────────────────────────────────────────────────────
// Output renderers
// ─────────────────────────────────────────────────────────────

/** Matches markdown-style [text](url) links produced during parsing for cross-references. */
const LINK_PATTERN = /\[([^\]]+)\]\((#[\w-]+|https?:\/\/[^\s)]+)\)/g;

/** Escapes text for safe HTML output while turning [text](url) into a real link. */
function textToHtml(s: string): string {
  let result = "";
  let lastIndex = 0;
  for (const match of s.matchAll(LINK_PATTERN)) {
    result += escapeHtml(s.slice(lastIndex, match.index));
    result += `<a href="${escapeHtml(match[2])}">${escapeHtml(match[1])}</a>`;
    lastIndex = (match.index ?? 0) + match[0].length;
  }
  result += escapeHtml(s.slice(lastIndex));
  return result;
}

function blocksToInnerHtml(blocks: Block[]): string {
  return blocks
    .map((b) => {
      if (b.type === "heading") return `<h${b.level}${b.id ? ` id="${escapeHtml(b.id)}"` : ""}>${textToHtml(b.text)}</h${b.level}>`;
      if (b.type === "paragraph") return `<p>${textToHtml(b.text)}</p>`;
      if (b.type === "hr") return `<hr />`;
      if (b.type === "image") {
        const dims = b.width && b.height ? ` width="${b.width}" height="${b.height}"` : "";
        return `<img src="${escapeHtml(b.src)}" alt="${escapeHtml(b.alt || "")}"${dims} />`;
      }
      if (b.type === "table") {
        const headerRow = b.headers.some((h) => h)
          ? `<thead><tr>${b.headers.map((h) => `<th>${textToHtml(h)}</th>`).join("")}</tr></thead>`
          : "";
        const bodyRows = b.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${textToHtml(cell)}</td>`).join("")}</tr>`)
          .join("");
        return `<table>${headerRow}<tbody>${bodyRows}</tbody></table>`;
      }
      if (b.type === "list") {
        const tag = b.ordered ? "ol" : "ul";
        return `<${tag}>${b.items.map((i) => `<li>${textToHtml(i)}</li>`).join("")}</${tag}>`;
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
    body { font-family: ${BRAND_FONT_BODY}; background: ${BRAND_BLACK}; color: ${BRAND_OFFWHITE}; line-height: 1.65; padding: 3rem 2rem; max-width: 760px; margin: 0 auto; }
    .logo { display: block; height: 160px; margin: 0 auto 1rem; }
    .cover-title { font-family: ${BRAND_FONT_HEAD}; font-weight: 600; font-size: 1.9rem; text-align: center; letter-spacing: 0.04em; text-transform: uppercase; background: linear-gradient(135deg, ${BRAND_GOLD_LIGHT}, ${BRAND_GOLD}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.4rem; }
    .cover-meta { text-align: center; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,230,225,0.45); margin-bottom: 2.5rem; }
    .cover-rule { width: 90px; height: 1px; background: linear-gradient(90deg, transparent, ${BRAND_GOLD}, transparent); margin: 0 auto 2.5rem; }
    img:not(.logo) { max-width: 100%; height: auto; display: block; margin: 1.75rem auto; border-radius: 4px; box-shadow: 0 4px 18px rgba(0,0,0,0.35); }
    h1, h2, h3, h4, h5, h6 { font-family: ${BRAND_FONT_HEAD}; font-weight: 600; letter-spacing: 0.02em; color: ${BRAND_CREAM}; margin: 2rem 0 0.85rem; }
    h1 { font-size: 1.5rem; text-transform: uppercase; letter-spacing: 0.03em; border-bottom: 1px solid rgba(217,204,160,0.25); padding-bottom: 0.6rem; }
    h2 { font-size: 1.25rem; }
    h3 { font-size: 1.05rem; color: #c4b896; }
    p { margin-bottom: 1.1rem; color: rgba(232,230,225,0.92); }
    ul, ol { margin-bottom: 1.1rem; padding-left: 1.5rem; }
    li { margin-bottom: 0.55rem; }
    hr { border: none; border-top: 1px solid rgba(217,204,160,0.18); margin: 2.25rem 0; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 1.75rem; font-size: 1.05rem; box-shadow: 0 2px 12px rgba(0,0,0,0.3); }
    th, td { border: 1px solid rgba(217,204,160,0.18); padding: 0.7rem 0.95rem; text-align: left; vertical-align: top; }
    th { font-family: ${BRAND_FONT_HEAD}; font-weight: 600; color: ${BRAND_BLACK}; background: linear-gradient(135deg, ${BRAND_GOLD_LIGHT}, ${BRAND_GOLD}); text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.04em; }
    tr:nth-child(even) td { background: rgba(217,204,160,0.03); }
    a { color: ${BRAND_GOLD_LIGHT}; text-decoration: none; border-bottom: 1px solid rgba(232,196,106,0.4); }
    a:hover { border-bottom-color: ${BRAND_GOLD_LIGHT}; }
    footer { margin-top: 3.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(217,204,160,0.15); text-align: center; font-family: ${BRAND_FONT_HEAD}; font-size: 0.85rem; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(217,204,160,0.55); }
  </style>
</head>
<body>
  <img class="logo" src="${LOGO_DATA_URI}" alt="" />
  <div class="cover-title">${escapeHtml(doc.title)}</div>
  <div class="cover-meta">Prepared by Legacy Architect RVA &middot; ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
  <div class="cover-rule"></div>
  ${blocksToInnerHtml(dedupeTitleBlock(doc))}
  <footer>${TAGLINE}</footer>
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
    .logo { display: block; height: 1.5in; margin: 0 auto 0.2in; }
    .cover-title { font-family: ${BRAND_FONT_HEAD}; font-size: 22pt; text-align: center; letter-spacing: 0.06em; color: #2d5a3d; text-transform: uppercase; margin-bottom: 0.06in; }
    .cover-meta { text-align: center; font-size: 9.5pt; letter-spacing: 0.08em; text-transform: uppercase; color: #5c7a63; margin-bottom: 0.45in; }
    .cover-rule { width: 1.4in; height: 1px; background: linear-gradient(90deg, transparent, #3a7350, transparent); margin: 0 auto 0.45in; }
    img:not(.logo) { max-width: 100%; height: auto; display: block; margin: 0.3in auto; }
    h1, h2, h3, h4, h5, h6 { font-family: ${BRAND_FONT_HEAD}; color: #2d5a3d; margin: 0.32in 0 0.14in; text-transform: uppercase; letter-spacing: 0.03em; }
    h1 { font-size: 16pt; border-bottom: 1px solid #cfe0d3; padding-bottom: 0.08in; }
    h2 { font-size: 13.5pt; }
    h3 { font-size: 11.5pt; color: #1f3d2a; letter-spacing: 0.02em; }
    p { margin-bottom: 0.12in; }
    ul, ol { margin: 0 0 0.16in 0.28in; }
    li { margin-bottom: 0.07in; }
    hr { border: none; border-top: 1px solid #cfe0d3; margin: 0.3in 0; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 0.2in; font-size: 10pt; box-shadow: 0 1px 3px rgba(45,90,61,0.08); }
    th, td { border: 1px solid #d3e0d6; padding: 7px 10px; text-align: left; vertical-align: top; }
    td { background: #fdfffd; }
    th { background: linear-gradient(180deg, #2d5a3d, #1f3d2a); font-family: ${BRAND_FONT_HEAD}; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.03em; color: #fdfcfa; border-color: #1f3d2a; }
    tr:nth-child(even) td { background: #f0f6f1; }
    a { color: #2d5a3d; text-decoration: none; border-bottom: 1px solid #7aa388; }
    .footer { margin-top: 0.6in; padding-top: 0.22in; border-top: 1px solid #cfe0d3; text-align: center; font-family: ${BRAND_FONT_HEAD}; font-size: 9.5pt; letter-spacing: 0.14em; color: #2d5a3d; text-transform: uppercase; }
    @media print { body { padding: 0.6in 0.7in; } }
  </style>
</head>
<body>
  <img class="logo" src="${LOGO_DATA_URI}" alt="" />
  <div class="cover-title">${escapeHtml(doc.title)}</div>
  <div class="cover-meta">Prepared by Legacy Architect RVA &middot; ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
  <div class="cover-rule"></div>
  ${blocksToInnerHtml(dedupeTitleBlock(doc))}
  <div class="footer">${TAGLINE}</div>
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
/** Decodes a `data:image/png;base64,...` URI into raw bytes and its declared mime type. */
function decodeDataUri(dataUri: string): { bytes: Uint8Array; mime: string } | null {
  const match = /^data:([^;]+);base64,(.*)$/s.exec(dataUri);
  if (!match) return null;
  const mime = match[1];
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return { bytes, mime };
}

/** Maps a data URI's mime type to the image type string docx's ImageRun expects. */
function docxImageType(mime: string): "png" | "jpg" | "gif" | "bmp" | null {
  if (mime.includes("png")) return "png";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg";
  if (mime.includes("gif")) return "gif";
  if (mime.includes("bmp")) return "bmp";
  return null;
}

/** Loads an image to read its intrinsic pixel dimensions when a Block didn't already carry them (e.g. images parsed from HTML/Word without explicit width/height attributes). */
function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || 400, height: img.naturalHeight || 300 });
    img.onerror = () => reject(new Error("Could not read image dimensions"));
    img.src = src;
  });
}

export async function renderToDocx(doc: ParsedDocument): Promise<Blob> {
  const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, Bookmark, InternalHyperlink, ExternalHyperlink, ImageRun } = await import("docx");

  // Named GOLD for historical reasons, but holds the light-mode forest
  // green values — DOCX is an inherently light/white-page document, so
  // it follows the same "light version uses green, not gold" rule as
  // the rest of the light-themed output.
  const GOLD = "2D5A3D";
  const GOLD_LIGHT = "A8C4AE";
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

  // Splits text on [label](url) markdown-link syntax (produced during
  // AFFiNE parsing for cross-references) into plain TextRuns and real
  // internal/external hyperlinks, for use as a Paragraph's children.
  const runsWithLinks = (text: string, baseProps: Record<string, any> = {}): any[] => {
    const runs: any[] = [];
    let lastIndex = 0;
    for (const match of text.matchAll(LINK_PATTERN)) {
      if ((match.index ?? 0) > lastIndex) {
        runs.push(new TextRun({ ...baseProps, text: text.slice(lastIndex, match.index) }));
      }
      const [, label, url] = match;
      const linkRun = new TextRun({ ...baseProps, text: label, color: GOLD, underline: {} });
      runs.push(
        url.startsWith("#")
          ? new InternalHyperlink({ anchor: url.slice(1), children: [linkRun] })
          : new ExternalHyperlink({ link: url, children: [linkRun] })
      );
      lastIndex = (match.index ?? 0) + match[0].length;
    }
    if (lastIndex < text.length) runs.push(new TextRun({ ...baseProps, text: text.slice(lastIndex) }));
    return runs.length > 0 ? runs : [new TextRun({ ...baseProps, text: "" })];
  };

  const makeCell = (text: string, isHeader: boolean) =>
    new TableCell({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: allBorders,
      shading: isHeader ? { type: ShadingType.SOLID, color: GOLD, fill: GOLD } : undefined,
      children: [
        new Paragraph({
          children: runsWithLinks(text, { bold: isHeader, color: isHeader ? "FFFFFF" : undefined, allCaps: isHeader, size: isHeader ? 18 : undefined }),
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
      const headingRuns = runsWithLinks(b.text, { color: GOLD, bold: true, allCaps: b.level <= 2 });
      children.push(
        new Paragraph({
          heading: HEADING_LEVELS[b.level] || HeadingLevel.HEADING_3,
          children: b.id ? [new Bookmark({ id: b.id, children: headingRuns })] : headingRuns,
          border: b.level === 1 ? { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD_LIGHT, space: 4 } } : undefined,
        })
      );
    } else if (b.type === "paragraph") {
      children.push(new Paragraph({ children: runsWithLinks(b.text) }));
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
            children: runsWithLinks(item),
            bullet: b.ordered ? undefined : { level: 0 },
            numbering: b.ordered ? { reference: "numbered-list", level: 0 } : undefined,
          })
        );
      }
    } else if (b.type === "image") {
      const decoded = decodeDataUri(b.src);
      const imgType = decoded ? docxImageType(decoded.mime) : null;
      if (decoded && imgType) {
        try {
          const dims = b.width && b.height ? { width: b.width, height: b.height } : await getImageDimensions(b.src);
          const maxWidth = 460;
          const scale = dims.width > maxWidth ? maxWidth / dims.width : 1;
          children.push(
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 200 },
              children: [
                new ImageRun({
                  type: imgType,
                  data: decoded.bytes,
                  transformation: {
                    width: Math.round(dims.width * scale),
                    height: Math.round(dims.height * scale),
                  },
                }),
              ],
            })
          );
        } catch {
          // Couldn't read this image's dimensions -- skip it rather than
          // failing the whole document export.
        }
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
/**
 * Builds a PDF directly with pdf-lib, drawing real selectable text glyph by
 * glyph rather than relying on a browser's print-to-PDF pipeline. This
 * exists specifically so a PDF coming out of this converter can never end
 * up text-less the way a rasterized "print to PDF" export can (see
 * parsePdf's OCR fallback above, which exists to recover from exactly that
 * failure mode). Styling is intentionally simple -- this trades visual
 * polish for a hard guarantee that the output always has a real text layer.
 */
export async function renderToPdfLib(doc: ParsedDocument): Promise<Blob> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

  // pdf-lib Standard Fonts use WinAnsiEncoding. Any character outside that
  // range causes widthOfTextAtSize / drawText to throw, crashing the whole
  // export. This sanitizer maps the most common out-of-range Unicode characters
  // to their WinAnsi-safe equivalents, then strips anything that's still
  // outside the 0x00–0xFF range (which WinAnsi covers).
  function sanitize(text: string): string {
    return text
      // Zero-width / invisible characters that contribute no visual width
      .replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, "")
      // Directional marks
      .replace(/[\u200E\u200F\u202A-\u202E]/g, "")
      // Fancy quotation marks → straight equivalents
      .replace(/[\u2018\u2019\u02BC]/g, "'")
      .replace(/[\u201A\u201B\u2032]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u201E\u201F\u2033]/g, '"')
      // Dashes
      .replace(/[\u2013]/g, "-")  // en-dash
      .replace(/[\u2014\u2015]/g, "--")  // em-dash
      // Ellipsis
      .replace(/\u2026/g, "...")
      // Bullets and similar markers
      .replace(/[\u2022\u2023\u2043\u204C\u204D\u2219\u25AA\u25AB\u25CF\u25E6]/g, "*")
      // Checkmarks / special marks
      .replace(/[\u2713\u2714]/g, "+")
      .replace(/[\u2715\u2716]/g, "x")
      // Non-breaking space → regular space
      .replace(/\u00A0/g, " ")
      // Arrows
      .replace(/[\u2190-\u21FF]/g, "->")
      // Mathematical operators
      .replace(/\u00D7/g, "x")  // multiplication sign (already in WinAnsi, keep)
      // Any remaining non-WinAnsi characters (code point > 255)
      .replace(/[^\x00-\xFF]/g, "");
  }

  const pdfDoc = await PDFDocument.create();
  const bodyFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const italicFont = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  const PAGE_W = 612; // US Letter, points
  const PAGE_H = 792;
  const MARGIN = 56;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const GOLD = rgb(0.45, 0.36, 0.16);
  const INK = rgb(0.12, 0.1, 0.08);
  const MUTED = rgb(0.45, 0.43, 0.4);
  const RULE = rgb(0.78, 0.74, 0.6);

  let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;
  const pages: typeof page[] = [page];

  const newPage = () => {
    page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    pages.push(page);
    y = PAGE_H - MARGIN;
  };

  const ensureSpace = (needed: number) => {
    if (y - needed < MARGIN) newPage();
  };

  // Greedy word-wrap using real glyph widths from the embedded font.
  // Sanitizes text first so widthOfTextAtSize never encounters an
  // out-of-encoding character.
  const wrapText = (text: string, font: typeof bodyFont, size: number, maxWidth: number): string[] => {
    const safe = sanitize(text);
    const words = safe.split(/\s+/).filter(Boolean);
    const out: string[] = [];
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      try {
        if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
          out.push(line);
          line = word;
        } else {
          line = candidate;
        }
      } catch {
        // Fallback: character-level sanitization missed something; skip word.
        if (line) out.push(line);
        line = "";
      }
    }
    if (line) out.push(line);
    return out.length ? out : [""];
  };

  const drawParagraph = (text: string, opts: { font?: typeof bodyFont; size?: number; color?: any; lineHeight?: number; indent?: number; maxWidth?: number } = {}) => {
    const font = opts.font || bodyFont;
    const size = opts.size ?? 11;
    const lineHeight = opts.lineHeight ?? size * 1.4;
    const indent = opts.indent ?? 0;
    const maxWidth = opts.maxWidth ?? CONTENT_W - indent;
    const lines = wrapText(text, font, size, maxWidth);
    for (const ln of lines) {
      if (!ln) continue;
      ensureSpace(lineHeight);
      try {
        page.drawText(ln, { x: MARGIN + indent, y: y - size, size, font, color: opts.color || INK });
      } catch {
        // Skip lines that still contain unencodable characters after sanitization.
      }
      y -= lineHeight;
    }
  };

  const HEADING_SIZES: Record<number, number> = { 1: 19, 2: 16, 3: 14, 4: 12.5, 5: 12, 6: 11.5 };

  // Embed a PNG/JPG data URI as a real PDF image object, scaled to fit the
  // content width while preserving aspect ratio.
  const drawImageBlock = async (b: Extract<Block, { type: "image" }>) => {
    const decoded = decodeDataUri(b.src);
    if (!decoded) return;
    let embedded;
    try {
      embedded = decoded.mime.includes("png")
        ? await pdfDoc.embedPng(decoded.bytes)
        : await pdfDoc.embedJpg(decoded.bytes);
    } catch {
      return; // unsupported image format -- skip rather than fail the export
    }
    const naturalW = b.width || embedded.width;
    const naturalH = b.height || embedded.height;
    // Cap both dimensions: width to the content column, height to 380pt so a
    // large square image (like the Gap Map) fits beneath the cover content
    // instead of forcing a page break that strands a blank half page.
    const MAX_H = 380;
    const scale = Math.min(CONTENT_W / naturalW, MAX_H / naturalH, 1);
    const w = naturalW * scale;
    const h = naturalH * scale;
    ensureSpace(h + 16);
    page.drawImage(embedded, { x: MARGIN + (CONTENT_W - w) / 2, y: y - h, width: w, height: h });
    y -= h + 16;
  };

  // ---- Cover ----
  ensureSpace(60);
  const titleSize = 22;
  const titleLines = wrapText(doc.title, boldFont, titleSize, CONTENT_W);
  for (const ln of titleLines) {
    if (!ln) continue;
    try {
      const tw = boldFont.widthOfTextAtSize(ln, titleSize);
      page.drawText(ln, { x: MARGIN + (CONTENT_W - tw) / 2, y: y - titleSize, size: titleSize, font: boldFont, color: GOLD });
    } catch { /* skip unencodable cover title line */ }
    y -= titleSize * 1.25;
  }
  y -= 6;
  const meta = `Prepared by Legacy Architect RVA  \u00b7  ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`;
  const metaSize = 9.5;
  const metaW = italicFont.widthOfTextAtSize(meta, metaSize);
  page.drawText(meta, { x: MARGIN + (CONTENT_W - metaW) / 2, y: y - metaSize, size: metaSize, font: italicFont, color: MUTED });
  y -= metaSize * 1.4 + 14;
  page.drawLine({ start: { x: MARGIN + CONTENT_W / 2 - 50, y }, end: { x: MARGIN + CONTENT_W / 2 + 50, y }, thickness: 1, color: RULE });
  y -= 28;

  // ---- Body ----
  for (const b of dedupeTitleBlock(doc)) {
    if (b.type === "heading") {
      const size = HEADING_SIZES[b.level] || 12;
      ensureSpace(size * 1.6 + 14);
      y -= 12;
      drawParagraph(b.text, { font: boldFont, size, color: GOLD, lineHeight: size * 1.25 });
      if (b.level <= 2) {
        ensureSpace(10);
        page.drawLine({ start: { x: MARGIN, y: y + 4 }, end: { x: MARGIN + CONTENT_W, y: y + 4 }, thickness: 0.75, color: RULE });
      }
      y -= 6;
    } else if (b.type === "paragraph") {
      drawParagraph(b.text);
      y -= 4;
    } else if (b.type === "list") {
      for (let i = 0; i < b.items.length; i++) {
        const prefix = b.ordered ? `${i + 1}.` : "\u2022";
        ensureSpace(16);
        page.drawText(prefix, { x: MARGIN, y: y - 11, size: 11, font: bodyFont, color: INK });
        drawParagraph(b.items[i], { indent: 16 });
      }
      y -= 4;
    } else if (b.type === "table") {
      const cols = Math.max(b.headers.length, ...b.rows.map((r) => r.length), 1);
      const colW = CONTENT_W / cols;
      const hasHeader = b.headers.some((h) => h);

      const measureRow = (cells: string[], isHeader: boolean) => {
        const cellLines = cells.map((c) => wrapText(c, isHeader ? boldFont : bodyFont, 9, colW - 10));
        return { cellLines, rowHeight: Math.max(...cellLines.map((l) => l.length), 1) * 12 + 8 };
      };

      const drawMeasuredRow = (m: ReturnType<typeof measureRow>, isHeader: boolean) => {
        if (isHeader) {
          page.drawRectangle({ x: MARGIN, y: y - m.rowHeight, width: CONTENT_W, height: m.rowHeight, color: rgb(0.93, 0.9, 0.82) });
        }
        m.cellLines.forEach((lines, ci) => {
          lines.forEach((ln, li) => {
            page.drawText(ln, { x: MARGIN + ci * colW + 5, y: y - 12 - li * 12, size: 9, font: isHeader ? boldFont : bodyFont, color: INK });
          });
        });
        page.drawRectangle({ x: MARGIN, y: y - m.rowHeight, width: CONTENT_W, height: m.rowHeight, borderColor: RULE, borderWidth: 0.5, color: undefined });
        y -= m.rowHeight;
      };

      const headerM = hasHeader ? measureRow(b.headers, true) : null;
      const rowMs = b.rows.map((r) => measureRow(r, false));

      // If the whole table would fit on a fresh page but not in the space
      // that's left, start it on the fresh page instead of stranding the
      // header and a row or two at the bottom of this one.
      const totalH = (headerM?.rowHeight ?? 0) + rowMs.reduce((s, m) => s + m.rowHeight, 0);
      const remaining = y - MARGIN;
      if (totalH > remaining && totalH <= PAGE_H - MARGIN * 2) newPage();

      if (headerM) {
        ensureSpace(headerM.rowHeight + (rowMs[0]?.rowHeight ?? 0));
        drawMeasuredRow(headerM, true);
      }
      for (const m of rowMs) {
        if (y - m.rowHeight < MARGIN) {
          newPage();
          // Repeat the header so continued rows never float without context.
          if (headerM) drawMeasuredRow(measureRow(b.headers, true), true);
        }
        drawMeasuredRow(m, false);
      }
      y -= 10;
    } else if (b.type === "image") {
      await drawImageBlock(b);
    } else if (b.type === "hr") {
      ensureSpace(20);
      y -= 8;
      page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + CONTENT_W, y }, thickness: 0.75, color: RULE });
      y -= 12;
    }
  }

  // ---- Footer page numbers on every page ----
  pages.forEach((p, i) => {
    const label = `${i + 1} / ${pages.length}`;
    const w = bodyFont.widthOfTextAtSize(label, 8.5);
    p.drawText(label, { x: PAGE_W / 2 - w / 2, y: MARGIN / 2 - 4, size: 8.5, font: bodyFont, color: MUTED });
  });

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}

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
        <div style="width:1080px;min-height:1350px;background:${BRAND_BLACK};color:${BRAND_OFFWHITE};font-family:${BRAND_FONT_BODY};padding:80px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;">
          <style>
            h1,h2,h3 { font-family:${BRAND_FONT_HEAD}; color:${BRAND_CREAM}; letter-spacing:0.02em; margin-bottom:24px; }
            h1 { font-size:56px; } h2 { font-size:44px; } h3 { font-size:34px; }
            p { font-size:28px; line-height:1.5; margin-bottom:20px; color:${BRAND_OFFWHITE}; }
            ul,ol { padding-left:40px; margin-bottom:20px; }
            li { font-size:28px; line-height:1.5; margin-bottom:14px; }
            hr { border:none; border-top:2px solid rgba(217,204,160,0.2); margin:30px 0; }
            img { max-width:100%; height:auto; display:block; margin:30px auto; border-radius:8px; }
          </style>
          ${blocksToInnerHtml(pages[i])}
          <div style="margin-top:auto;padding-top:40px;text-align:center;font-family:${BRAND_FONT_HEAD};font-size:18px;letter-spacing:0.15em;color:#8a7340;text-transform:uppercase;">
            Legacy Architect RVA
          </div>
        </div>`;

      // Load fonts before rasterizing
      await document.fonts.ready;
      const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
        backgroundColor: BRAND_BLACK,
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
  { id: "pdf", label: "PDF", description: "Branded document with real, selectable text" },
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
