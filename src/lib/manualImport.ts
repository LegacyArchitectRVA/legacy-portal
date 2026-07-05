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
  tableRows: string[][]; // raw cell rows destined for the section's table
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
  LIFELOVESTATEMENT: { chapterId: "context", sectionId: "personal_values" },
  LIFEANDLOVESTATEMENT: { chapterId: "context", sectionId: "personal_values" },
  MEDICALINFORMATION: { chapterId: "vitals", sectionId: "medical_information" },
  SECURITYACCESS: { chapterId: "household", sectionId: "security_access" },
  PETCARE: { chapterId: "household", sectionId: "petcare" },
  INSURANCEOVERVIEW: { chapterId: "financial", sectionId: "insurance_policies" },
  BENEFICIARIESREVIEW: { chapterId: "financial", sectionId: "beneficiaries" },
};

/**
 * Old-edition chapter headings map the reader into a chapter without
 * matching a specific section. Later ambiguous headings prefer sections
 * inside the active chapter.
 */
const CHAPTER_ALIASES: Record<string, string> = {
  IMMEDIATERESPONSESUCCESSORGUIDANCE: "emergency",
  IMMEDIATERESPONSE: "emergency",
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

function buildTargets(): Map<string, SectionTarget> {
  const map = new Map<string, SectionTarget>();
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
  return [...buildTargets().values()];
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
      if (tKey.length >= 6 && (tKey.includes(key) || key.includes(tKey))) candidates.push(target);
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

export function mapManualToPortal(parsed: ParsedDocument): MappedChunk[] {
  const targets = buildTargets();
  const chunks: MappedChunk[] = [];
  const activeChapter = { id: null as string | null };
  let current: MappedChunk | null = null;
  let counter = 0;

  const startChunk = (heading: string) => {
    if (current && (current.text.trim() || current.tableRows.length)) chunks.push(current);
    current = {
      id: `chunk-${counter++}`,
      sourceHeading: heading,
      target: matchHeading(heading, targets, activeChapter),
      text: "",
      tableRows: [],
      include: true,
    };
  };

  startChunk(parsed.title || "Document start");

  for (const b of parsed.blocks as Block[]) {
    if (b.type === "heading") {
      startChunk(b.text);
    } else if (b.type === "paragraph" && current) {
      current.text += (current.text ? "\n\n" : "") + b.text;
    } else if (b.type === "list" && current) {
      current.text += (current.text ? "\n" : "") + b.items.map((i) => `- ${i}`).join("\n");
    } else if (b.type === "table" && current) {
      const rows = [b.headers, ...b.rows].filter((r) => r.some((c) => c && c.trim()));
      current.tableRows.push(...rows);
    }
  }
  if (current && ((current as MappedChunk).text.trim() || (current as MappedChunk).tableRows.length)) {
    chunks.push(current);
  }

  return chunks;
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

  for (const c of chunks) {
    if (!c.include || !c.target) continue;
    const t = c.target;

    if (c.tableRows.length && t.columnKeys.length) {
      let dataRows = c.tableRows;
      let mapping: number[] | null = null;
      let spill: { into: number; from: number[] } | null = null;

      if (looksLikeHeaderRow(dataRows[0])) {
        mapping = buildColumnMapping(dataRows[0], t.columnKeys);
        spill = (mapping as any).spill ?? null;
        dataRows = dataRows.slice(1);
      }

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
        rows.push({ chapterId: t.chapterId, sectionId: t.sectionId, data: JSON.stringify(data) });
      }
    } else if (c.tableRows.length) {
      // Table content headed for a field-based section: flatten readably.
      const flat = c.tableRows.map((r) => r.filter(Boolean).join("  \u00b7  ")).join("\n");
      c.text += (c.text ? "\n\n" : "") + flat;
    }

    if (c.text.trim()) {
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

  return { fields, rows };
}
