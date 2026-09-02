import {
  RiArrowDownSLine as ChevronDown,
  RiLoader4Line as Loader2,
  RiSparklingLine as Sparkle,
  RiDeleteBinLine as Trash2,
} from "@remixicon/react";
import { useMutation, useQuery } from "convex/react";
import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowDown as Down,
  Download,
  ArrowUp as Up,
} from "reicon-react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { GapMapVisual, gapMapToPng } from "../components/GapMapVisual";
import {
  BLUEPRINT_PILLARS,
  type CheckStatus,
  STATUS_CYCLE,
  STATUS_META,
} from "../data/blueprintPillars";
import {
  buildDeliverable,
  generatePlan,
  overallReadiness,
  type SessionAction,
  scorePillars,
} from "../lib/blueprintDeliverable";
import { downloadBlob, renderToPdfLib } from "../lib/documentConverter";

// Literal Tailwind arbitrary-value classes, not built from STATUS_COLORS at
// runtime: Tailwind's build-time scanner can't see inside a template
// literal, so an interpolated class string here would just never get
// generated. These hex values must stay in sync with STATUS_COLORS in
// GapMapVisual.tsx by hand, that's the same palette the Gap Map itself
// uses, so a checkpoint marked exposed here is the same red as an exposed
// pillar on the map, not a separately-chosen color that happens to be close.
const STATUS_CHIP: Record<CheckStatus, string> = {
  exposed: "bg-[#b3413a]/15 text-[#e8938c] border-[#b3413a]/40",
  partial: "bg-[#d9a441]/15 text-[#e8c481] border-[#d9a441]/40",
  handled: "bg-[#3da977]/15 text-[#7ed1ac] border-[#3da977]/40",
  na: "bg-white/5 text-[#f2ede2]/50 border-white/10",
};

export default function BlueprintSessionPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams<{ sessionId: string }>();
  const isAdmin = useQuery(api.admin.isAdmin);
  const session = useQuery(
    api.blueprint.getSession,
    isAdmin && sessionId
      ? { sessionId: sessionId as Id<"blueprintSessions"> }
      : "skip",
  );
  const setAssessment = useMutation(api.blueprint.setAssessment);
  const setActions = useMutation(api.blueprint.setActions);
  const updateMeta = useMutation(api.blueprint.updateSessionMeta);
  const deleteSession = useMutation(api.blueprint.deleteSession);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [openPillar, setOpenPillar] = useState<string | null>(
    BLUEPRINT_PILLARS[0].id,
  );
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [exporting, setExporting] = useState(false);

  const assessMap = useMemo(
    () => new Map((session?.assessments ?? []).map(a => [a.checkpointId, a])),
    [session?.assessments],
  );
  const scores = useMemo(
    () => scorePillars(session?.assessments ?? []),
    [session?.assessments],
  );
  const readiness = useMemo(() => overallReadiness(scores), [scores]);
  const gapMapRef = useRef<HTMLCanvasElement>(null);
  const totalExposed = scores.reduce((s, p) => s + p.exposed, 0);
  const totalAssessed = scores.reduce((s, p) => s + p.assessed, 0);
  const totalCheckpoints = BLUEPRINT_PILLARS.reduce(
    (s, p) => s + p.checkpoints.length,
    0,
  );

  if (isAdmin === undefined) return null;
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-[#f2ede2]/75">Admin access required.</p>
      </div>
    );
  }
  if (session === undefined) return null;
  if (session === null) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-[#f2ede2]/75">Session not found.</p>
      </div>
    );
  }

  const cycleStatus = (checkpointId: string) => {
    const current = assessMap.get(checkpointId)?.status;
    const idx = current ? STATUS_CYCLE.indexOf(current) : -1;
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    setAssessment({
      sessionId: session._id,
      assessment: {
        checkpointId,
        status: next,
        note: assessMap.get(checkpointId)?.note,
      },
    });
  };

  const saveNote = (checkpointId: string) => {
    const draft = noteDrafts[checkpointId];
    if (draft === undefined) return;
    const existing = assessMap.get(checkpointId);
    setAssessment({
      sessionId: session._id,
      assessment: {
        checkpointId,
        status: existing?.status ?? "exposed",
        note: draft.trim() || undefined,
      },
    });
  };

  const handleGenerate = () => {
    const plan = generatePlan(session.assessments);
    setActions({ sessionId: session._id, actions: plan });
  };

  const moveAction = (id: string, dir: -1 | 1) => {
    const list = [...session.actions] as SessionAction[];
    const i = list.findIndex(a => a.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= list.length) return;
    [list[i], list[j]] = [list[j], list[i]];
    // Re-day: three per day in order
    const redayed = list.map((a, idx) => ({
      ...a,
      day: (Math.floor(idx / 3) + 1) as 1 | 2 | 3,
    }));
    setActions({ sessionId: session._id, actions: redayed });
  };

  const removeAction = (id: string) => {
    const list = (session.actions as SessionAction[]).filter(a => a.id !== id);
    const redayed = list.map((a, idx) => ({
      ...a,
      day: (Math.floor(idx / 3) + 1) as 1 | 2 | 3,
    }));
    setActions({ sessionId: session._id, actions: redayed });
  };

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      let mapImage: { src: string; width: number; height: number } | undefined;
      if (gapMapRef.current) {
        try {
          mapImage = await gapMapToPng(gapMapRef.current);
        } catch {
          // The PDF still carries the full table and narrative without the
          // visual, so a rasterization failure shouldn't block the export.
        }
      }
      const doc = buildDeliverable(
        session.prospectName,
        session.sessionDate,
        session.assessments,
        session.actions as SessionAction[],
        mapImage,
      );
      const blob = await renderToPdfLib(doc);
      const safeName = session.prospectName.replace(/\s+/g, "-").toLowerCase();
      downloadBlob(blob, `blueprint-session-${safeName}.pdf`);
      if (session.status === "draft") {
        updateMeta({ sessionId: session._id, status: "completed" });
      }
    } finally {
      setExporting(false);
    }
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await deleteSession({ sessionId: session._id });
      navigate("/admin/blueprint");
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fade-in pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/blueprint")}
          className="text-[#f2ede2]/75 hover:text-gold-primary transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-xl font-bold text-[#f2ede2] truncate">
            {session.prospectName}
          </h1>
          <p className="text-xs text-[#f2ede2]/75">
            {new Date(session.sessionDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" · "}
            {totalAssessed}/{totalCheckpoints} assessed
            {" · "}
            {/* Colors match the Gap Map / checkpoint chip palette exactly
                (STATUS_COLORS in GapMapVisual.tsx) rather than generic
                Tailwind rose/emerald. */}
            <span
              className={totalExposed > 0 ? "text-[#e8938c]" : "text-[#7ed1ac]"}
            >
              {totalExposed} exposed
            </span>
          </p>
        </div>
        <select
          value={session.status}
          onChange={e =>
            updateMeta({
              sessionId: session._id,
              status: e.target.value as any,
            })
          }
          className="bg-[#171208] border border-gold-border/40 rounded-lg px-2 py-1.5 text-xs text-[#f2ede2] focus:outline-none shrink-0"
        >
          <option value="draft">Draft</option>
          <option value="completed">Completed</option>
          <option value="delivered">Delivered</option>
        </select>
        <button
          onClick={() => setConfirmDelete(true)}
          title="Delete session"
          className="text-[#f2ede2]/60 hover:text-red-400 p-2 shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 animate-modal-backdrop"
          onClick={() => !deleting && setConfirmDelete(false)}
        >
          <div
            className="bg-[#0f0c08] border border-gold-border rounded-xl p-5 max-w-sm space-y-3 animate-modal-dialog"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-sm text-[#f2ede2]">
              Delete this session and its assessment? This can't be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmDelete(false)}
                disabled={deleting}
                className="text-xs text-[#f2ede2]/75 px-3 py-1.5 disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop: map pinned left, work column right. Mobile: stacked. */}
      <div className="lg:grid lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-6 lg:items-start space-y-6 lg:space-y-0">
        {/* Gap Map */}
        <div className="bg-[#0f0c08] border border-gold-border rounded-xl p-4 space-y-2 lg:sticky lg:top-6">
          <p className="font-heading text-xs text-gold-primary uppercase tracking-widest">
            Gap Map
          </p>
          <GapMapVisual ref={gapMapRef} scores={scores} readiness={readiness} />
          <p className="text-[10px] text-[#f2ede2]/50 text-center">
            Updates live as checkpoints are assessed. This map prints into the
            PDF deliverable.
          </p>
        </div>

        <div className="space-y-6">
          {/* Assessment pillars */}
          <div className="space-y-2">
            {BLUEPRINT_PILLARS.map(pillar => {
              const open = openPillar === pillar.id;
              const score = scores.find(s => s.pillarId === pillar.id)!;
              return (
                <div
                  key={pillar.id}
                  className="bg-[#0f0c08] border border-gold-border rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenPillar(open ? null : pillar.id)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left"
                  >
                    <span className="font-heading text-sm text-[#f2ede2]">
                      <span style={{ color: pillar.color }}>
                        {pillar.number}
                      </span>{" "}
                      {pillar.title}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-[#f2ede2]/60">
                        {score.assessed}/{pillar.checkpoints.length}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#f2ede2]/50 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                  {open && (
                    <div className="border-t border-gold-border/20 divide-y divide-gold-border/10">
                      {pillar.checkpoints.map(c => {
                        const a = assessMap.get(c.id);
                        const status = a?.status;
                        return (
                          <div key={c.id} className="p-4 space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm text-[#f2ede2] flex-1">
                                {c.label}
                              </p>
                              <button
                                onClick={() => cycleStatus(c.id)}
                                className={`shrink-0 text-[10px] font-heading uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors ${
                                  status
                                    ? STATUS_CHIP[status]
                                    : "bg-white/5 text-[#f2ede2]/40 border-white/10"
                                }`}
                              >
                                {status
                                  ? STATUS_META[status].label
                                  : "Tap to assess"}
                              </button>
                            </div>
                            {(status === "exposed" || status === "partial") && (
                              <input
                                type="text"
                                defaultValue={a?.note ?? ""}
                                onChange={e =>
                                  setNoteDrafts(p => ({
                                    ...p,
                                    [c.id]: e.target.value,
                                  }))
                                }
                                onBlur={() => saveNote(c.id)}
                                placeholder="Session note (optional)"
                                className="w-full bg-[#171208] border border-gold-border/30 rounded-lg px-3 py-2 text-xs text-[#f2ede2] placeholder:text-[#f2ede2]/40 focus:border-gold-primary/50 focus:outline-none"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 72-Hour Action Plan */}
          <div className="bg-[#0f0c08] border border-gold-border rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-heading text-xs text-gold-primary uppercase tracking-widest">
                72-Hour Action Plan
              </p>
              <button
                onClick={handleGenerate}
                disabled={totalAssessed === 0}
                className="flex items-center gap-1.5 bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 text-xs font-heading px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
              >
                <Sparkle className="w-3.5 h-3.5" />
                {session.actions.length > 0
                  ? "Regenerate"
                  : "Generate from Gap Map"}
              </button>
            </div>

            {session.actions.length === 0 ? (
              <p className="text-xs text-[#f2ede2]/60">
                Assess the pillars above, then generate. The plan pulls the
                highest-exposure items and sequences them across three days.
              </p>
            ) : (
              [1, 2, 3].map(day => {
                const dayActions = (session.actions as SessionAction[]).filter(
                  a => a.day === day,
                );
                if (dayActions.length === 0) return null;
                return (
                  <div key={day} className="space-y-2">
                    <p className="text-[10px] font-heading text-[#f2ede2]/60 uppercase tracking-widest">
                      Day {day}
                    </p>
                    {dayActions.map(a => (
                      <div
                        key={a.id}
                        className="flex items-start gap-2 bg-[#171208] rounded-lg p-3 group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[#f2ede2]">{a.title}</p>
                          {a.detail && (
                            <p className="text-[10px] text-[#f2ede2]/55 mt-0.5">
                              Closes: {a.detail}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => moveAction(a.id, -1)}
                            className="text-[#f2ede2]/60 hover:text-gold-primary p-0.5"
                          >
                            <Up className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveAction(a.id, 1)}
                            className="text-[#f2ede2]/60 hover:text-gold-primary p-0.5"
                          >
                            <Down className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeAction(a.id)}
                            className="text-[#f2ede2]/60 hover:text-red-400 p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })
            )}
          </div>

          {/* Export */}
          <div className="flex justify-end">
            <button
              onClick={handleExport}
              disabled={exporting || totalAssessed === 0}
              className="btn-gold flex items-center gap-2 text-sm px-5 py-2.5 disabled:opacity-40"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Export Deliverable PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
