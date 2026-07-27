import { RiArrowLeftLine as ArrowLeft, RiUploadLine as Upload, RiLoader4Line as Loader2, RiCheckboxCircleLine as CheckCircle2, RiAlertLine as AlertCircle } from "@remixicon/react";
import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { parseInput, parsePdf } from "../lib/documentConverter";
import {
  chunksToImportPayload,
  listAllTargets,
  mapManualToPortal,
  resolveTarget,
  type MappedChunk,
} from "../lib/manualImport";

/**
 * Import an old Life Manual PDF into a client's portal chapters.
 *
 * The flow is deliberately review-first: parse (OCR when the PDF is
 * image-only), map recovered content to sections, then show every chunk
 * for the admin to confirm, reassign, edit, or exclude before anything
 * is written. Table content lands as structured rows; free text lands in
 * the section's text field.
 */
export default function ManualImportPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const clients = useQuery(api.admin.listClients, isAdmin ? {} : "skip");
  const doImport = useMutation(api.importer.importManualContent);

  const fileRef = useRef<HTMLInputElement>(null);
  const [clientUserId, setClientUserId] = useState("");
  const [parsing, setParsing] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [chunks, setChunks] = useState<MappedChunk[] | null>(null);
  const [committing, setCommitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const targets = listAllTargets();

  if (isAdmin === undefined) return null;
  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center text-sm text-[#f2ede2]/75">
        Admin access required.
      </div>
    );
  }

  const handleFile = async (file: File) => {
    setParsing(true);
    setError(null);
    setDone(null);
    setChunks(null);
    try {
      const isAffine = /\.(affine|db|sqlite|json)$/i.test(file.name);
      const parsed = isAffine
        ? await parseInput(file, "affine")
        : await parsePdf(file, (c, t) => setProgress(`Reading page ${c} of ${t} (OCR)...`));
      const mapped = mapManualToPortal(parsed);
      if (!mapped.length) {
        setError("Nothing readable came out of this file.");
      } else {
        setChunks(mapped);
      }
    } catch (e: any) {
      setError(e?.message || "Could not read this file.");
    } finally {
      setParsing(false);
      setProgress(null);
    }
  };

  const updateChunk = (id: string, patch: Partial<MappedChunk>) => {
    setChunks((cs) => (cs ? cs.map((c) => (c.id === id ? { ...c, ...patch } : c)) : cs));
  };

  const includedReady = (chunks || []).filter((c) => c.include && c.target);
  const unassigned = (chunks || []).filter((c) => c.include && !c.target);

  const handleCommit = async () => {
    if (!clientUserId || !chunks) return;
    setCommitting(true);
    setError(null);
    try {
      const payload = chunksToImportPayload(chunks);
      const result = await doImport({
        clientUserId: clientUserId as Id<"users">,

        fields: payload.fields,
        rows: payload.rows,
      });
      setDone(`Imported ${result.fieldsWritten} fields and ${result.rowsWritten} table rows. The client's previous manual data was cleared first, so this upload is now the manual.`);
      setChunks(null);
    } catch (e: any) {
      setError(e?.message || "Import failed.");
    } finally {
      setCommitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-sm text-[#f2ede2]/80 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Admin
      </button>

      <div>
        <h1 className="font-heading text-3xl text-gold-gradient">Import to Life Manual</h1>
        <p className="text-[#f2ede2]/75 mt-2">
          Upload the old manual and everything lands in its place. Importing replaces whatever the
          client's manual held before, so the upload becomes the manual: no old data, no leftovers.
        </p>
      </div>

      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-4">
        <div>
          <label className="text-xs text-[#f2ede2]/75 uppercase tracking-wider font-heading">Client</label>
          <select
            value={clientUserId}
            onChange={(e) => setClientUserId(e.target.value)}
            className="w-full bg-black border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#f2ede2] focus:border-gold-primary/50 focus:outline-none mt-1 appearance-none cursor-pointer"
          >
            <option value="">Choose a client...</option>
            {clients?.map((c: any) => (
              <option key={c.userId} value={c.userId}>
                {c.userName || c.userEmail}
              </option>
            ))}
          </select>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.affine,.db,.sqlite,.json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={!clientUserId || parsing}
          className="w-full sm:w-auto justify-center flex items-center gap-2 bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] font-heading text-sm font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {parsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {parsing ? progress || "Reading PDF..." : "Choose Old Manual (PDF or AFFiNE)"}
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {done && (
        <div className="flex items-start gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-sm text-emerald-300">{done}</p>
        </div>
      )}

      {chunks && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#f2ede2]/75">
              {includedReady.length} assigned{unassigned.length ? `, ${unassigned.length} need a destination` : ""}
            </p>
            <button
              onClick={handleCommit}
              disabled={committing || includedReady.length === 0}
              className="flex items-center gap-2 bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] font-heading text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {committing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Import {includedReady.length} Section{includedReady.length === 1 ? "" : "s"}
            </button>
          </div>

          {chunks.map((c) => (
            <div
              key={c.id}
              className={`bg-[#0f0c08] rounded-xl border p-4 space-y-3 ${c.include ? "border-gold-border" : "border-gold-border/20 opacity-50"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-heading text-sm text-gold-primary truncate">{c.sourceHeading}</p>
                  <p className="text-[10px] text-[#f2ede2]/50 mt-0.5">
                    {c.tables.length ? `${c.tables.reduce((s, tb) => s + tb.rows.length, 0)} table rows \u00b7 ` : ""}
                    {c.text ? `${c.text.length} chars text` : ""}
                  </p>
                </div>
                <label className="flex items-center gap-1.5 text-[10px] text-[#f2ede2]/70 shrink-0">
                  <input
                    type="checkbox"
                    checked={c.include}
                    onChange={(e) => updateChunk(c.id, { include: e.target.checked })}
                    className="accent-[#d4b661]"
                  />
                  Include
                </label>
              </div>

              <select
                value={c.target ? `${c.target.chapterId}/${c.target.sectionId}` : ""}
                onChange={(e) => {
                  const [ch, sec] = e.target.value.split("/");
                  updateChunk(c.id, { target: e.target.value ? resolveTarget(ch, sec) : null });
                }}
                className={`w-full bg-black border rounded-lg px-3 py-2 text-xs text-[#f2ede2] focus:outline-none appearance-none cursor-pointer ${c.target ? "border-gold-border/40" : "border-amber-500/50"}`}
              >
                <option value="">Assign a destination...</option>
                {targets.map((t) => (
                  <option key={`${t.chapterId}/${t.sectionId}`} value={`${t.chapterId}/${t.sectionId}`}>
                    {t.chapterTitle} &#8594; {t.sectionTitle}
                  </option>
                ))}
              </select>

              {c.text ? (
                <textarea
                  value={c.text}
                  onChange={(e) => updateChunk(c.id, { text: e.target.value })}
                  rows={Math.min(6, Math.max(2, c.text.split("\n").length))}
                  className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-xs text-[#f2ede2]/90 focus:border-gold-primary/50 focus:outline-none font-mono"
                />
              ) : null}

              {c.tables.length > 0 && (
                <div className="overflow-x-auto space-y-2">
                  {c.tables.slice(0, 2).map((tb, ti) => (
                    <table key={ti} className="text-[10px] text-[#f2ede2]/80 w-full">
                      <thead>
                        <tr className="border-b border-gold-border/25">
                          {tb.headers.map((h, hi) => (
                            <th key={hi} className="py-1 pr-3 text-left text-gold-muted font-heading whitespace-nowrap max-w-[160px] truncate">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tb.rows.slice(0, 3).map((r, ri) => (
                          <tr key={ri} className="border-b border-gold-border/10">
                            {r.map((cell, ci) => (
                              <td key={ci} className="py-1 pr-3 whitespace-nowrap max-w-[160px] truncate">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ))}
                  {(c.tables.length > 2 || c.tables.some((tb) => tb.rows.length > 3)) && (
                    <p className="text-[10px] text-[#f2ede2]/50 mt-1">
                      {c.tables.reduce((s, tb) => s + tb.rows.length, 0)} rows across {c.tables.length} table{c.tables.length === 1 ? "" : "s"} total
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
