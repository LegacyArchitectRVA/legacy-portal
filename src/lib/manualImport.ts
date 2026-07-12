import { chapters as CHAPTERS } from "../data/chapters";
import type { Block, ParsedDocument } from "./documentConverter";

/**
 * Maps a parsed (usually OCR'd) old Life Manual into portal chapter and
 * section assignments for admin review before import.
 *
 * Matching walks the document's headings against every section title in the
 * canonical chapter structure, with an alias table covering the old
 * edition's section names. Content between a matched heading and the next
 * heading belongs to that section. Anything that can't be placed lands in
 * the unmatched bucket, where the admin assigns or discards it by hand in
 * the preview. Nothing is imported silently.
 */

export interface SectionTarget {
  chapterId: string;
  sectionId: string;
  chapterTitle: string;
  sectionTitle: string;
  columnKeys: string[]; // empty when the section is field-based
  firstTextFieldId: string | null;
}

export interface MappedChunk {
  id: string;
  sourceHeading: string;
  target: SectionTarget | null; // null = unmatched, admin assigns
  text: string; // editable free text destined for the section's text field
  tables: { headers: string[]; rows: string[][] }[]; // each keeps its own header for column mapping
  include: boolean;
}

function normalize(s: string): string {
  return s.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

/** Old-edition heading names that don't literally match current titles. */
const ALIASES: Record<string, { chapterId: string; sectionId: string }> = {
  REQUIREDNOTIFICATIONS: { chapterId: "emergency", sectionId: "emergency_contacts" },
  FIRST48HOURSPLAN: { chapterId: "emergency", sectionId: "first_48_hours" },
  CRISISCHECKLIST: { chapterId: "emergency", sectionId: "first_48_hours" },
  SUCCESSORACCESSGUIDE: { chapterId: "emergency", sectionId: "first_48_hours" },
  TIMESENSITIVEDECISIONS: { chapterId: "emergency", sectionId: "first_48_hours" },
  EMERGENCYCONTACTS: { chapterId: "emergency", sectionId: "emergency_contacts" },
  CHILDCAREDEPENDENTS: { chapterId: "emergency", sectionId: "child_care_dependents" },
  PASSWORDMANAGER: { chapterId: "digital", sectionId: "password_manager" },
  PRIMARYEMAIL: { chapterId: "digital", sectionId: "primary_email" },
  PRIMARYEMAIL1: { chapterId: "digital", sectionId: "primary_email" },
  TWOFARECOVERYCODES: { chapterId: "digital", sectionId: "twofa_recovery" },
  "2FARECOVERYCODES": { chapterId: "digital", sectionId: "twofa_recovery" },
  // Old-edition narrative and orientation sections
  WELCOMEPURPOSE: { chapterId: "introduction", sectionId: "welcome_purpose" },
  WELCOMEANDPURPOSE: { chapterId: "introduction", sectionId: "welcome_purpose" },
  LIFELOVESTATEMENT: { chapterId: "introduction", sectionId: "life_love_statement" },
  LIFEANDLOVESTATEMENT: { chapterId: "introduction", sectionId: "life_love_statement" },
  MEDICALINFORMATION: { chapterId: "vitals", sectionId: "medical_information" },
  SECURITYACCESS: { chapterId: "household", sectionId: "security_access" },
  PETCARE: { chapterId: "household", sectionId: "petcare" },
  INSURANCEOVERVIEW: { chapterId: "financial", sectionId: "insurance_policies" },
  BENEFICIARIESREVIEW: { chapterId: "financial", sectionId: "beneficiaries" },
  // Account-type groupings under the old Accounts & Institutions section
  SAVINGS: { chapterId: "financial", sectionId: "accounts_institutions" },
  CHECKING: { chapterId: "financial", sectionId: "accounts_institutions" },
  RETIREMENT: { chapterId: "financial", sectionId: "accounts_institutions" },
  BROKERAGEINVESTMENTS: { chapterId: "financial", sectionId: "accounts_institutions" },
  CREDITCARDS: { chapterId: "financial", sectionId: "accounts_institutions" },
  UTILITIESVENDORS: { chapterId: "household", sectionId: "home_systems" },
  MEDICALAUTHORITYDOCUMENTS: { chapterId: "vitals", sectionId: "medical_information" },
  PERSONALNOTESANDLEGACYMESSAGES: { chapterId: "context", sectionId: "final_wishes" },
};

/**
 * The old edition repeats these ALL CAPS sub-blocks inside every account
 * or system entry. They belong to the section they appear in, never to a
 * new chunk, so they always continue the current one.
 */
const CONTINUATION_SUBHEADINGS = new Set([
  "HOWTOUSETHISSECTION",
  "HOWTOUSETHISPAGE",
  "AUTHORITYACCESSLOCATION",
  "2FARECOVERYHANDLING",
  "TWOFARECOVERYHANDLING",
  "WHATTODOIFACCESSFAILS",
  "ROLEOFTHISEMAIL",
  "ROLEOFTHISSYSTEM",
  "ROLEOFTHISACCOUNT",
  "WHATDEPENDSONTHISSYSTEM",
  "WHATDEPENDSONTHISEMAIL",
  "WHATDEPENDSONTHISACCOUNT",
  "HANDOFFINSTRUCTIONS",
  "SUCCESSORINSTRUCTIONS",
  "IMPORTANTNOTES",
  "CAREPREFERENCES",
  "PURPOSE",
  "AREASTHISPAGEREFERENCES",
  "WHATTHISGUIDEINCLUDES",
]);

/**
 * Old-edition chapter headings map the reader into a chapter without
 * matching a specific section. Later ambiguous headings prefer sections
 * inside the active chapter.
 */
const CHAPTER_ALIASES: Record<string, string> = {
  IMMEDIATERESPONSESUCCESSORGUIDANCE: "emergency",
  IMMEDIATERESPONSE: "emergency",
  EMERGENCYSUCCESSORACCESS: "emergency",
  DIGITALACCESSSYSTEMS: "digital",
  DIGITALLIFE: "digital",
  FINANCIALASSETORIENTATION: "financial",
  FINANCIALASSETS: "financial",
  HOUSEHOLDCONTINUITY: "household",
  HOUSEHOLDOPERATIONS: "household",
  VITALRECORDS: "vitals",
  OPTIONALSECTIONS: "context",
  BUSINESSCONTINUITY: "business",
};

/**
 * Destinations that exist in the generated manual but not as portal
 * chapter pages. Content imported here is stored in sectionFields under
 * the introduction chapterId and rendered by the manual generator.
 */
const EXTRA_TARGETS: SectionTarget[] = [
  {
    chapterId: "introduction",
    sectionId: "welcome_purpose",
    chapterTitle: "Introduction",
    sectionTitle: "Welcome & Purpose",
    columnKeys: [],
    firstTextFieldId: "content",
  },
  {
    chapterId: "introduction",
    sectionId: "life_love_statement",
    chapterTitle: "Introduction",
    sectionTitle: "Life & Love Statement",
    columnKeys: [],
    firstTextFieldId: "content",
  },
];

function buildTargets(): Map<string, SectionTarget> {
  const map = new Map<string, SectionTarget>();
  for (const t of EXTRA_TARGETS) map.set(normalize(t.sectionTitle), t);
  for (const ch of CHAPTERS) {
    for (const sec of ch.subSections as any[]) {
      const target: SectionTarget = {
        chapterId: ch.id,
        sectionId: sec.id,
        chapterTitle: ch.title,
        sectionTitle: sec.title,
        columnKeys: (sec.tableColumns || []).map((c: any) => c.key),
        firstTextFieldId:
          (sec.fields || []).find((f: any) => f.type === "textarea")?.id ??
          (sec.fields || [])[0]?.id ??
          null,
      };
      map.set(normalize(sec.title), target);
    }
  }
  return map;
}

export function listAllTargets(): SectionTarget[] {
  // Introduction leads, mirroring the locked manual order.
  const rest = [...buildTargets().values()].filter((t) => t.chapterId !== "introduction");
  return [...EXTRA_TARGETS, ...rest];
}

export function resolveTarget(chapterId: string, sectionId: string): SectionTarget | null {
  return listAllTargets().find((t) => t.chapterId === chapterId && t.sectionId === sectionId) ?? null;
}

function matchHeading(
  heading: string,
  targets: Map<string, SectionTarget>,
  activeChapter: { id: string | null }
): SectionTarget | null {
  const key = normalize(heading);
  if (!key) return null;
  const chapterHit = CHAPTER_ALIASES[key];
  if (chapterHit) {
    activeChapter.id = chapterHit;
    return null; // chapter headings set context; content belongs to sections
  }
  const alias = ALIASES[key];
  if (alias) {
    activeChapter.id = alias.chapterId;
    return resolveTarget(alias.chapterId, alias.sectionId);
  }
  const exact = targets.get(key);
  if (exact) {
    activeChapter.id = exact.chapterId;
    return exact;
  }
  if (key.length >= 6) {
    const candidates: SectionTarget[] = [];
    for (const [tKey, target] of targets) {
      if (Math.min(tKey.length, key.length) >= 10 && (tKey.includes(key) || key.includes(tKey))) candidates.push(target);
    }
    if (candidates.length) {
      // Ambiguity resolves toward the chapter the document is currently in.
      const preferred = candidates.find((c) => c.chapterId === activeChapter.id) ?? candidates[0];
      activeChapter.id = preferred.chapterId;
      return preferred;
    }
  }
  return null;
}

/** Strips markdown link syntax and stray anchors down to readable text. */
function cleanInline(s: string): string {
  return s
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\(#[\w-]+\)/g, "")
    // Legacy parser placeholder for unresolvable page references
    .replace(/\blinked section\b/gi, "")
    // Dangling cross-reference remnants: "See" with nothing after it
    .replace(/\bSee\s*(?=$|[.,;)\]\n])/g, "")
    // Run-together references from older conversions ("SeeEmergency")
    .replace(/\bSee(?=[A-Z][a-z])/g, "See ")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

/** Old-template instruction paragraphs that must never import as client data. */
const TEMPLATE_NOISE = /^(high-level description only|do not include passwords|this section provides high-level orientation|use this page first during an emergency|nothing here replaces formal legal|legacy architect is owned and operated)/i;
/** Same phrases arriving mid-line (after a sub-heading label prefix). */
const TEMPLATE_NOISE_ANY = /(high-level description only|do not include passwords|use this page first during an emergency|nothing here replaces formal legal|legacy architect is owned and operated)/i;

/** Sub-headings whose entire content is old-template instructions. */
const SKIP_CONTENT_SUBHEADINGS = /^(HOWTOUSETHIS|WHATTHISGUIDEINCLUDES|PRIVACYDATAHANDLING|PRIVACYANDDATAHANDLING)/;

export function mapManualToPortal(parsed: ParsedDocument): MappedChunk[] {
  const targets = buildTargets();
  const chunks: MappedChunk[] = [];
  const activeChapter = { id: null as string | null };
  let current: MappedChunk | null = null;
  let counter = 0;
  let skippingTemplate = false;
  let pendingUntitled = false;

  const pushCurrent = () => {
    if (current && (current.text.trim() || current.tables.length)) {
      // Untitled docs that identify themselves as the old intro content
      // auto-assign to Introduction instead of waiting on a human.
      if (!current.target && current.sourceHeading.startsWith("Untitled document")) {
        const t = current.text;
        if (/life\s*(&|and)\s*love/i.test(t) || /though loved ones know me/i.test(t)) {
          current.target = resolveTarget("introduction", "life_love_statement");
          current.include = !!current.target;
        } else if (/^purpose\b/i.test(t) || /this life manual exists/i.test(t) || /^welcome\b/i.test(t)) {
          current.target = resolveTarget("introduction", "welcome_purpose");
          current.include = !!current.target;
        }
      }
      // Chapter overview pages are the old edition's own template text;
      // the new manual writes its own overviews, so they default to off.
      if (/^\d{2}:\s*.+?[-\u2013\u2014]\s*OVERVIEW$/i.test(current.sourceHeading)) {
        current.include = false;
      }
      chunks.push(current);
    }
    current = null;
  };

  const startChunk = (heading: string) => {
    const trimmed = cleanInline(heading);
    const normalizedHeading = normalize(trimmed);

    // Untitled AFFiNE documents: surface as a review chunk, excluded by
    // default, labeled with a snippet of their first content so the admin
    // can recognize what they are (the old intro pages usually live here).
    if (normalizedHeading === "UNTITLED" || !normalizedHeading) {
      pushCurrent();
      skippingTemplate = false;
      pendingUntitled = true;
      current = {
        id: `chunk-${counter++}`,
        sourceHeading: "Untitled document",
        target: null,
        text: "",
        tables: [],
        include: false,
      };
      return;
    }

    // Cross-reference lines continue the current chunk as content.
    if (current && /^SEE\b/i.test(trimmed)) {
      current.text += (current.text ? "\n" : "") + trimmed;
      return;
    }

    // Template-instruction sub-headings: skip the heading AND everything
    // under it until the next heading. Their content is old boilerplate.
    if (SKIP_CONTENT_SUBHEADINGS.test(normalizedHeading)) {
      skippingTemplate = true;
      return;
    }
    skippingTemplate = false;

    // AFFiNE app template docs are tool scaffolding, never client data.
    // They surface excluded so nothing vanishes without a trace.
    if (/^(TEMPLATE|GETTINGSTARTED|HOWTOUSEFOLDER)/.test(normalizedHeading)) {
      pushCurrent();
      pendingUntitled = false;
      current = {
        id: `chunk-${counter++}`,
        sourceHeading: trimmed,
        target: null,
        text: "",
        tables: [],
        include: false,
      };
      return;
    }

    // Per-entry document titles: the old workspace keeps one doc per
    // account or system, named after the thing itself. Order matters:
    // "Auto Insurance" is insurance, bare "Auto" is the vehicle.
    const ENTRY_PATTERNS: { re: RegExp; chapterId: string; sectionId: string }[] = [
      { re: /INSURANCE$/, chapterId: "financial", sectionId: "insurance_policies" },
      { re: /(CHECKING|SAVINGS|RETIREMENT|BROKERAGE)/, chapterId: "financial", sectionId: "accounts_institutions" },
      { re: /^(ELECTRICITY|WATER|GAS|INTERNET|TRASH|SEWER|POWER)/, chapterId: "household", sectionId: "home_systems" },
      { re: /^EMAIL/, chapterId: "digital", sectionId: "primary_email" },
      { re: /^AUTO$|^VEHICLE/, chapterId: "household", sectionId: "vehicle_info" },
    ];
    for (const p of ENTRY_PATTERNS) {
      if (!p.re.test(normalizedHeading)) continue;
      const entryTarget = resolveTarget(p.chapterId, p.sectionId);
      if (!entryTarget) break;
      if (
        current &&
        current.target &&
        current.target.chapterId === entryTarget.chapterId &&
        current.target.sectionId === entryTarget.sectionId
      ) {
        // Same destination as the running chunk: label the entry inline.
        current.text += (current.text ? "\n\n" : "") + trimmed + ":";
        return;
      }
      pushCurrent();
      pendingUntitled = false;
      current = {
        id: `chunk-${counter++}`,
        sourceHeading: trimmed,
        target: entryTarget,
        text: "",
        tables: [],
        include: true,
      };
      return;
    }

    // Chapter overview pages set chapter context, then exclude themselves:
    // the new manual writes its own chapter overviews, so the old ones are
    // never client data.
    const overview = /^\d{2}:\s*(.+?)\s*[-\u2013\u2014]\s*OVERVIEW$/i.exec(trimmed);
    if (overview) {
      const chKey = normalize(overview[1]);
      if (CHAPTER_ALIASES[chKey]) activeChapter.id = CHAPTER_ALIASES[chKey];
      pushCurrent();
      pendingUntitled = false;
      current = {
        id: `chunk-${counter++}`,
        sourceHeading: trimmed,
        target: null,
        text: "",
        tables: [],
        include: false,
      };
      return;
    }

    // Known per-entry sub-blocks continue the section they live in.
    const isContinuationSubheading =
      CONTINUATION_SUBHEADINGS.has(normalizedHeading) ||
      /^(WHATDEPENDSON|ROLEOF|WHATTODOIF|BUSINESSPLATFORM)/.test(normalizedHeading);
    if (current && isContinuationSubheading) {
      current.text += (current.text ? "\n\n" : "") + trimmed + ":";
      return;
    }

    const target = matchHeading(trimmed, targets, activeChapter);

    // Intra-section Title Case sub-headings continue their section.
    const letters = trimmed.replace(/[^A-Za-z]/g, "");
    const isAllCapsHeading = letters.length >= 4 && letters === letters.toUpperCase();
    if (!target && !isAllCapsHeading && current && !pendingUntitled) {
      current.text += (current.text ? "\n\n" : "") + trimmed + ":";
      return;
    }

    // Same-destination repeats continue the current chunk.
    if (
      current &&
      target &&
      current.target &&
      target.chapterId === current.target.chapterId &&
      target.sectionId === current.target.sectionId
    ) {
      return;
    }

    pushCurrent();
    pendingUntitled = false;
    current = {
      id: `chunk-${counter++}`,
      sourceHeading: trimmed,
      target,
      text: "",
      tables: [],
      include: true,
    };
  };

  startChunk(parsed.title || "Document start");

  for (const b of parsed.blocks as Block[]) {
    if (b.type === "heading") {
      startChunk(b.text);
    } else if (b.type === "table" && current) {
      // Tables are client data wherever they appear, including under
      // template-instruction headings, so they survive skip mode.
      current.tables.push({
        headers: b.headers.map(cleanInline),
        rows: b.rows.map((r) => r.map(cleanInline)),
      });
    } else if (skippingTemplate) {
      continue;
    } else if (b.type === "paragraph" && current) {
      const text = cleanInline(b.text);
      if (!text || TEMPLATE_NOISE.test(text)) continue;
      if (text.length < 220 && TEMPLATE_NOISE_ANY.test(text)) continue;
      current.text += (current.text ? "\n\n" : "") + text;
      if (pendingUntitled && current.sourceHeading === "Untitled document") {
        current.sourceHeading = `Untitled document ("${text.slice(0, 48)}${text.length > 48 ? "..." : ""}")`;
        // Untitled docs that identify themselves as intro pieces assign
        // and include themselves so the manual opens the way it should.
        if (/life\s*(&|and)?\s*love/i.test(text)) {
          current.target = resolveTarget("introduction", "life_love_statement");
          current.include = true;
        } else if (/\b(purpose|welcome)\b/i.test(text)) {
          current.target = resolveTarget("introduction", "welcome_purpose");
          current.include = true;
        }
      }
    } else if (b.type === "list" && current) {
      const items = b.items.map(cleanInline).filter((i) => i && !TEMPLATE_NOISE.test(i));
      if (items.length) current.text += (current.text ? "\n" : "") + items.map((i) => `- ${i}`).join("\n");
    } else if (b.type === "table" && current) {
      current.tables.push({
        headers: b.headers.map(cleanInline),
        rows: b.rows.map((r) => r.map(cleanInline)),
      });
    }
  }
  pushCurrent();

  // Adjacent chunks sharing a destination merge into one.
  const merged: MappedChunk[] = [];
  for (const c of chunks) {
    const prev = merged[merged.length - 1];
    if (
      prev &&
      prev.target &&
      c.target &&
      prev.target.chapterId === c.target.chapterId &&
      prev.target.sectionId === c.target.sectionId
    ) {
      prev.text += c.text ? (prev.text ? "\n\n" : "") + c.text : "";
      prev.tables.push(...c.tables);
    } else {
      merged.push(c);
    }
  }

  return merged;
}

/** Synonym vocabulary: new column key concepts -> old header words. */
const COLUMN_SYNONYMS: Record<string, string[]> = {
  name: ["who", "name", "contact", "person"],
  phone: ["phone", "number", "mobile", "call"],
  scope: ["role", "scope", "authority", "relationship"],
  trigger: ["when", "trigger", "timing"],
  documents: ["location", "where", "records", "documents", "file"],
  decision: ["decision"],
  context: ["context", "why", "deadline", "stakeholders"],
  action: ["action"],
  system: ["system", "platform", "account", "service", "identified"],
  impact: ["impact", "purpose", "operational"],
  authority: ["authority", "owner", "access", "managed"],
  records: ["records", "where", "location", "live"],
  transition: ["transition", "instruction", "guidance", "communication", "notes"],
  account: ["account", "email", "policy"],
  institution: ["institution", "bank", "company"],
  device: ["device", "category"],
  asset: ["asset", "property", "type"],
  dependent: ["dependent", "child", "name"],
  guardian: ["guardian", "legal"],
};

function normalizeLabel(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Detects whether a raw imported row is the old table's header: at least
 * two cells matching known header vocabulary, and no cell that looks like
 * data (long digit runs, sentences).
 */
function looksLikeHeaderRow(row: string[]): boolean {
  const vocab = new Set(Object.values(COLUMN_SYNONYMS).flat());
  let hits = 0;
  for (const cell of row) {
    const words = normalizeLabel(cell).split(" ");
    if (words.some((w) => vocab.has(w))) hits++;
    if (/\d{5,}/.test(cell)) return false;
  }
  return hits >= 2;
}

/**
 * Maps old header labels to the target section's column keys by meaning,
 * so "Who" lands in the name column and "When" lands in the trigger column
 * regardless of where the old table put them. Falls back to positional
 * order when fewer than half the old headers are recognizable.
 */
function buildColumnMapping(oldHeaders: string[], columnKeys: string[]): number[] {
  // result[i] = index in oldHeaders feeding columnKeys[i], or -1
  const result = columnKeys.map(() => -1);
  const used = new Set<number>();

  columnKeys.forEach((key, ki) => {
    const syns = COLUMN_SYNONYMS[key] || [key];
    // Synonyms scan in priority order so the strongest meaning claims the
    // column: "When" beats a leftover numeric "Priority" for trigger.
    outer: for (const syn of syns) {
      for (let oi = 0; oi < oldHeaders.length; oi++) {
        if (used.has(oi)) continue;
        const words = normalizeLabel(oldHeaders[oi]).split(" ");
        if (words.includes(syn)) {
          result[ki] = oi;
          used.add(oi);
          break outer;
        }
      }
    }
  });

  const mapped = result.filter((r) => r >= 0).length;
  if (mapped < Math.ceil(columnKeys.length / 2)) {
    return columnKeys.map((_, i) => (i < oldHeaders.length ? i : -1));
  }

  // Old columns nothing claimed still carry words; the last mapped target
  // column absorbs them so no cell content is silently dropped.
  const spill: number[] = [];
  for (let oi = 0; oi < oldHeaders.length; oi++) if (!used.has(oi)) spill.push(oi);
  if (spill.length) {
    let lastMapped = result.length - 1;
    while (lastMapped >= 0 && result[lastMapped] < 0) lastMapped--;
    if (lastMapped >= 0) (result as any).spill = { into: lastMapped, from: spill };
  }
  return result;
}

/** Converts reviewed chunks into the mutation payload. */
export function chunksToImportPayload(chunks: MappedChunk[]) {
  const fields: { chapterId: string; sectionId: string; fieldId: string; value: string }[] = [];
  const rows: { chapterId: string; sectionId: string; data: string }[] = [];

  // The old edition ships blank template pages whose cells hold hint text
  // ("Bank, investment firm", "Health, life, property", "Cash, retirement,
  // brokerage") instead of real values. A row whose cells are all hints,
  // or all empty, is scaffolding and must not import as client data.
  const PLACEHOLDER_CELL = /^(bank, investment firm|health, life, property|cash, retirement, brokerage|holding, income, growth|advisor, firm|protection area|portal or vault|contact type|coverage purpose|where documents live|name of service|e\.g\.,?|ex\.|required\.?|optional\.?|high-level|protection|\d\u2013\d sentences|1\u20132 sentences)/i;

  // Only the ownership/marketing block is boilerplate ("Legacy Architect is
  // owned and operated by Craig..."). Client-authored privacy notes
  // ("Privacy & Boundaries", "this manual does not contain...") are real
  // content and must survive, so the marker is the ownership sentence, and
  // the strip reaches to the next blank line past that paragraph only.
  const stripPrivacyBlock = (text: string): string => {
    // The ownership/data-handling appendix ("Legacy Architect is owned and
    // operated...", "Information You Choose to Share", "What This Manual Does
    // NOT Contain") is template that trails real content. Cut from the
    // ownership sentence (and its optional "Privacy & Data Handling:" label)
    // to the end of the chunk.
    const m = /(\n\s*)?(Privacy\s*&?\s*Data Handling:?\s*\n+)?Legacy Architect is owned and operated[\s\S]*$/i.exec(text);
    if (!m) return text;
    return text.slice(0, m.index).replace(/\n{3,}/g, "\n\n").trim();
  };

  for (const c of chunks) {
    if (!c.include || !c.target) continue;
    const t = c.target;

    if (c.tables.length && t.columnKeys.length) {
      for (const table of c.tables) {
        // Each table maps through its own header: AFFiNE tables carry real
        // headers directly, OCR tables carry them as the first row.
        let dataRows = table.rows;
        let headerSource = table.headers.some((h) => h && h.trim()) ? table.headers : null;
        if (!headerSource && dataRows.length && looksLikeHeaderRow(dataRows[0])) {
          headerSource = dataRows[0];
          dataRows = dataRows.slice(1);
        }
        const mapping = headerSource ? buildColumnMapping(headerSource, t.columnKeys) : null;
        const spill: { into: number; from: number[] } | null = mapping ? ((mapping as any).spill ?? null) : null;

        for (const raw of dataRows) {
          const data: Record<string, string> = {};
          t.columnKeys.forEach((k, ki) => {
            const oi = mapping ? mapping[ki] : ki;
            data[k] = oi >= 0 ? (raw[oi] ?? "").trim() : "";
          });
          if (spill) {
            const extra = spill.from.map((oi) => (raw[oi] ?? "").trim()).filter(Boolean).join(" \u00b7 ");
            if (extra) {
              const k = t.columnKeys[spill.into];
              data[k] = data[k] ? `${data[k]} \u00b7 ${extra}` : extra;
            }
          }
          const values = Object.values(data).join("").trim();
          if (!values) continue;
          // A row can carry the ownership appendix as one giant cell when
          // the privacy prose was parsed as a table row. Drop those.
          if (/Legacy Architect is owned and operated|Information You Choose to Share/i.test(values)) continue;
          // Scrub any individual cell still holding template hint text, then
          // drop the row only if nothing real remains.
          for (const k of Object.keys(data)) {
            if (PLACEHOLDER_CELL.test(data[k].trim())) data[k] = "";
          }
          if (Object.values(data).join("").trim().length < 2) continue;
          rows.push({ chapterId: t.chapterId, sectionId: t.sectionId, data: JSON.stringify(data) });
        }
      }
    } else if (c.tables.length) {
      // Table content headed for a field-based section: flatten readably.
      const flat = c.tables
        .map((table) => [table.headers, ...table.rows].map((r) => r.filter(Boolean).join("  \u00b7  ")).join("\n"))
        .join("\n\n");
      c.text += (c.text ? "\n\n" : "") + flat;
    }

    c.text = stripPrivacyBlock(c.text);

    if (c.text.trim() && !/Legacy Architect is owned and operated|Information You Choose to Share/i.test(c.text)) {
      if (t.firstTextFieldId) {
        fields.push({ chapterId: t.chapterId, sectionId: t.sectionId, fieldId: t.firstTextFieldId, value: c.text.trim() });
      } else if (t.columnKeys.length) {
        // Text bound for a table-only section becomes a single row in the
        // first column, so the words survive somewhere visible.
        const data: Record<string, string> = {};
        t.columnKeys.forEach((k, i) => (data[k] = i === 0 ? c.text.trim() : ""));
        rows.push({ chapterId: t.chapterId, sectionId: t.sectionId, data: JSON.stringify(data) });
      }
    }
  }

  // Several chunks can legitimately target the same field (the intro doc
  // plus an untitled purpose page, for instance). They merge into one
  // value in document order rather than the last one clobbering the rest.
  const mergedFields = new Map<string, { chapterId: string; sectionId: string; fieldId: string; value: string }>();
  for (const f of fields) {
    const key = `${f.chapterId}/${f.sectionId}/${f.fieldId}`;
    const existing = mergedFields.get(key);
    if (existing) {
      existing.value += `\n\n${f.value}`;
    } else {
      mergedFields.set(key, { ...f });
    }
  }

  return { fields: [...mergedFields.values()], rows };
}
