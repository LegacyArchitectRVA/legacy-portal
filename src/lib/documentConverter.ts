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
          // A paragraph that is actually a known section title (some exports
          // style titles as bold <p> instead of <h1>) is promoted so the
          // cleaner can find and reorder sections.
          if (isKnownSectionTitle(t)) {
            blocks.push({ type: "heading", level: 1, text: t.replace(/[:.]+$/, "").trim() });
          } else {
            blocks.push({ type: "paragraph", text: t });
          }
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
      const pagesArr = meta.get("pages") as any;
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

  // Collect each page's blocks as its own group so the whole document can
  // be reordered into Legacy Architect's locked section sequence, rather
  // than left in the workspace's arbitrary creation order.
  const pageGroups: { title: string; blocks: Block[] }[] = [];
  for (const pageId of orderedIds) {
    const ydoc = pageDocs.get(pageId);
    if (!ydoc) continue;
    // Auto-clean: skip pages that are AFFiNE scaffolding, not client
    // content — the workspace's own tutorial page, blank "Untitled"
    // stubs, empty "Template - ..." starters, and any internal SOP that
    // accidentally got saved into a client workspace. These otherwise
    // dump straight into the converted document as noise.
    const rawTitle = (titleByPageId.get(pageId) || "").trim();
    if (isJunkPage(rawTitle, ydoc.getMap("blocks"))) continue;
    const groupBlocks: Block[] = [];
    walkAffinePage(ydoc.getMap("blocks"), groupBlocks, slugByPageId, slugByTitle, titleByPageId, Y);
    if (groupBlocks.length > 0) {
      pageGroups.push({ title: rawTitle || guessTitle(groupBlocks, "Section"), blocks: groupBlocks });
    }
  }

  const blocks: Block[] = orderByCanonicalSection(pageGroups);

  if (blocks.length === 0) {
    throw new Error("No recognizable content found in this AFFiNE file.");
  }
  linkKnownTitles(blocks, slugByTitle);
  stripDeadLinks(blocks, slugByTitle);

  return { title: workspaceName || fileName.replace(/\.[^.]+$/, ""), blocks };
}

/** Resolves a BlockSuite YText into plain text, converting any inline page-reference into a markdown link. */
function affineTextOf(
  ytext: any,
  slugByPageId: Map<string, string>,
  titleByPageId?: Map<string, string>
): string {
  if (!ytext) return "";
  const delta = typeof ytext.toDelta === "function" ? ytext.toDelta() : null;
  if (!delta) return typeof ytext === "string" ? ytext : ytext.toString?.() || "";
  return delta
    .map((d: any) => {
      const ref = d?.attributes?.reference;
      if (ref) {
        // Labels resolve from the workspace title registry first, then the
        // reference's own title. An unresolvable reference contributes
        // nothing rather than a placeholder literal; the dangling-"See"
        // cleanup downstream handles the sentence remnant.
        const label =
          (ref.pageId && titleByPageId?.get(ref.pageId)) ||
          ref.title ||
          (typeof d?.insert === "string" ? d.insert.trim() : "");
        if (!label) return "";
        const slug = (ref.pageId && slugByPageId.get(ref.pageId)) || slugify(label);
        return slug ? `[${label}](#${slug})` : label;
      }
      return d?.insert ?? "";
    })
    .join("");
}

/** Walks one page's flat block map starting from its root affine:page block. */
/**
 * Legacy Architect's Life Manual has a locked section order. AFFiNE lists
 * pages in creation order, which scrambles the document (Digital Life
 * before the Introduction, Final Wishes mid-way through Emergency, etc.).
 * This routes every page into its canonical section by title and emits
 * them in the fixed sequence below. Pages that don't match a known title
 * are appended after their best-guess section, or at the end, so nothing
 * is ever dropped by reordering.
 */
const CANONICAL_SECTIONS: { section: string; titles: string[] }[] = [
  {
    section: "Introduction",
    titles: ["welcome & purpose", "welcome and purpose", "privacy & data handling", "privacy and data handling", "purpose"],
  },
  {
    section: "Digital Life",
    titles: [
      "01: digital life - overview", "digital life", "cloud storage", "communication & messaging",
      "devices & operating systems", "digital financial accounts", "primary e-mail", "primary email",
      "password manager", "subscriptions & renewals", "2fa & recovery codes", "online presence",
    ],
  },
  {
    section: "Emergency & Successor Access",
    titles: [
      "02: emergency & successor access - overview", "emergency & successor access", "emergency contacts",
      "successor access guide", "first 48-hours plan", "first 48 hours plan", "handoff instructions",
    ],
  },
  {
    section: "Financial & Assets",
    titles: [
      "03: financial & assets - overview", "financial & assets", "accounts & institutions",
      "titles & ownership", "beneficiaries overview", "savings", "checking", "retirement",
      "brokerage & investments", "credit cards",
    ],
  },
  {
    section: "Household Operations",
    titles: [
      "04: household operations - overview", "household operations", "maintenance schedules",
      "security & access", "child care & dependents", "utilities & vendors", "water", "electricity",
      "internet", "trash/recycling", "pet care",
    ],
  },
  {
    section: "Vital Records",
    titles: [
      "05: vital records - overview", "vital records", "overview", "identification documents",
      "insurance policies", "medical information",
    ],
  },
  {
    section: "Legacy & Wishes",
    titles: [
      "06: optional sections - overview", "06: optional sections – overview", "optional sections",
      "final wishes", "personal notes and legacy messages", "digital & narrative control",
      "intellectual property", "personal legacy elements",
    ],
  },
  {
    section: "Business Continuity",
    titles: ["business continuity", "business-specific continuity", "business platform", "business platforms"],
  },
];

// Flat set of every known section title (plus the common sub-page titles that
// appear in a Life Manual) so parsers can recognize a heading by NAME rather
// than guessing from font size. This is what makes PDF/HTML conversion
// reliable: a section title is a heading even if the PDF flattened its font.
const KNOWN_SECTION_TITLES: Set<string> = (() => {
  const s = new Set<string>();
  for (const sec of CANONICAL_SECTIONS) for (const t of sec.titles) s.add(t);
  // Common Life Manual sub-page titles not already in the canonical routing.
  const extra = [
    "emergency contacts", "final wishes", "successor access guide",
    "first 48-hours plan", "first 48 hours plan", "handoff instructions",
    "accounts & institutions", "titles & ownership", "beneficiaries overview",
    "savings", "checking", "retirement", "brokerage & investments", "credit cards",
    "maintenance schedules", "security & access", "child care & dependents",
    "utilities & vendors", "pet care", "water", "electricity", "internet",
    "trash/recycling", "identification documents", "insurance policies",
    "medical information", "cloud storage", "communication & messaging",
    "devices & operating systems", "digital financial accounts", "primary e-mail",
    "primary email", "password manager", "subscriptions & renewals",
    "2fa & recovery codes", "online presence", "personal notes and legacy messages",
    "digital & narrative control", "intellectual property", "welcome & purpose",
    "privacy & data handling",
  ];
  for (const t of extra) s.add(t);
  return s;
})();

/**
 * True if a line of text is a known Life Manual section title. Tolerant of
 * caps, trailing colons, numeric prefixes like "01:" and surrounding
 * whitespace, so it matches whatever a flattened PDF/HTML throws at it.
 */
function isKnownSectionTitle(text: string): boolean {
  let t = text.toLowerCase().trim();
  t = t.replace(/^\d{1,2}\s*[:.)-]\s*/, ""); // strip "01: " / "3) " prefixes
  t = t.replace(/\s*[-–—]\s*overview$/, ""); // strip "- overview" suffix
  t = t.replace(/[:.]+$/, "").trim();
  if (KNOWN_SECTION_TITLES.has(t)) return true;
  // Also accept the "0X: NAME - OVERVIEW" forms mapped in CANONICAL_SECTIONS.
  for (const sec of CANONICAL_SECTIONS) {
    for (const known of sec.titles) {
      const k = known.replace(/^\d{1,2}:\s*/, "").replace(/\s*-\s*overview$/, "");
      if (t === k) return true;
    }
  }
  return false;
}

function orderByCanonicalSection(pageGroups: { title: string; blocks: Block[] }[]): Block[] {
  // Build a lookup from normalized title -> section index.
  const sectionOfTitle = new Map<string, number>();
  CANONICAL_SECTIONS.forEach((s, i) => {
    for (const t of s.titles) sectionOfTitle.set(t, i);
  });

  const norm = (s: string) => s.toLowerCase().trim().replace(/\s+/g, " ");
  const buckets: { title: string; blocks: Block[] }[][] = CANONICAL_SECTIONS.map(() => []);
  const unmatched: { title: string; blocks: Block[] }[] = [];

  for (const group of pageGroups) {
    const key = norm(group.title);
    let idx = sectionOfTitle.get(key);
    // Fallback: partial contains match (handles minor title drift).
    if (idx === undefined) {
      for (const [t, i] of sectionOfTitle) {
        if (key.includes(t) || t.includes(key)) {
          idx = i;
          break;
        }
      }
    }
    if (idx === undefined) unmatched.push(group);
    else buckets[idx].push(group);
  }

  const out: Block[] = [];
  buckets.forEach((groups) => {
    // Within 
