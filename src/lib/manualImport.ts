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

function matchHeading(heading: string, targets: Map<string, SectionTarget>): SectionTarget | null {
  const key = normalize(heading);
  if (!key) return null;
  const alias = ALIASES[key];
  if (alias) return resolveTarget(alias.chapterId, alias.sectionId);
  const exact = targets.get(key);
  if (exact) return exact;
  if (key.length >= 6) {
    for (const [tKey, target] of targets) {
      if (tKey.length >= 6 && (tKey.includes(key) || key.includes(tKey))) return target;
    }
  }
  return null;
}

export function mapManualToPortal(parsed: ParsedDocument): MappedChunk[] {
  const targets = buildTargets();
  const chunks: MappedChunk[] = [];
  let current: MappedChunk | null = null;
  let counter = 0;

  const startChunk = (heading: string) => {
    if (current && (current.text.trim() || current.tableRows.length)) chunks.push(current);
    current = {
      id: `chunk-${counter++}`,
      sourceHeading: heading,
      target: matchHeading(heading, targets),
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

/** Converts reviewed chunks into the mutation payload. */
export function chunksToImportPayload(chunks: MappedChunk[]) {
  const fields: { chapterId: string; sectionId: string; fieldId: string; value: string }[] = [];
  const rows: { chapterId: string; sectionId: string; data: string }[] = [];

  for (const c of chunks) {
    if (!c.include || !c.target) continue;
    const t = c.target;

    if (c.tableRows.length && t.columnKeys.length) {
      // First imported row that matches the column labels is a header echo;
      // rows map to column keys by position.
      for (const raw of c.tableRows) {
        const data: Record<string, string> = {};
        t.columnKeys.forEach((k, i) => (data[k] = (raw[i] ?? "").trim()));
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
