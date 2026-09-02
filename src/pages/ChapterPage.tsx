import {
  RiArrowDownSLine as ChevronDown,
  RiLoader4Line as Loader2,
  RiDeleteBinLine as Trash2,
  RiCloseLine as X,
} from "@remixicon/react";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Add as Plus, Save } from "reicon-react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { ChapterIcon } from "../components/ChapterIcons";
import { EditableText } from "../components/EditableText";
import { LucideIcon } from "../components/LucideIcon";
import {
  chapters,
  PRIVACY_NOTE,
  resolveCrossRef,
  type SubSection,
} from "../data/chapters";
import { canAccessChapter, getTierByName } from "../data/tiers";

export default function ChapterPage({
  chapterIdOverride,
}: {
  chapterIdOverride?: string;
} = {}) {
  const params = useParams<{ chapterId: string }>();
  const chapterId = chapterIdOverride ?? params.chapterId;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const onBehalfOf = searchParams.get("for") as Id<"users"> | null;
  const profile = useQuery(api.profile.getMyProfile);
  const tier = profile?.tier || "personal";

  const isAdmin = useQuery(api.admin.isAdmin);
  const editingClient = useQuery(
    api.crm.getClientDetail,
    onBehalfOf && isAdmin ? { clientUserId: onBehalfOf } : "skip",
  );
  const chapter = chapters.find(ch => ch.id === chapterId);

  if (!chapter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#f2ede2]/75">
        <p>Chapter not found.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 text-gold-primary hover:text-gold-bright"
        >
          &larr; Dashboard
        </button>
      </div>
    );
  }

  if (!isAdmin && !canAccessChapter(tier, chapter.chapterNumber)) {
    const requiredTier = getTierByName(chapter.tier);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <p className="text-[#f2ede2]/75 mb-2">
          This chapter requires the {requiredTier?.name} Edition.
        </p>
        <button
          onClick={() => navigate("/upgrade")}
          className="text-gold-primary hover:text-gold-bright"
        >
          View upgrade options &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Back */}
      <button
        onClick={() =>
          navigate(onBehalfOf ? `/admin/client/${onBehalfOf}` : "/dashboard")
        }
        className="flex items-center gap-2 text-sm text-[#f2ede2]/80 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {onBehalfOf ? "Back to Client Profile" : "Back to Dashboard"}
      </button>

      {onBehalfOf && editingClient && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-amber-300 flex items-center gap-2">
          <Save className="w-3.5 h-3.5 shrink-0" />
          Editing {editingClient.name || editingClient.email}'s Life Manual on
          their behalf.
        </div>
      )}

      {/* Legal Documents Notice */}

      {/* Chapter Header */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212, 182, 97,0.04),_transparent_60%)]" />
        <div className="relative flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${chapter.color}18`,
              border: `1px solid ${chapter.color}40`,
            }}
          >
            <ChapterIcon
              chapterId={chapter.id}
              color={chapter.color}
              size={26}
            />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-gold-muted font-heading">
              Chapter {chapter.chapterNumber}
            </p>
            <h1
              className="font-heading text-2xl md:text-3xl mt-1"
              style={{ color: chapter.color }}
            >
              {chapter.title}
            </h1>
            <p className="text-sm text-[#f2ede2]/75 mt-2 leading-relaxed">
              {chapter.description}
            </p>
            <p className="text-xs text-gold-muted mt-2 leading-relaxed">
              <EditableText cmsKey="chapter_intro" as="span" />
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-2">
        {chapter.subSections.map(section => (
          <SectionAccordion
            key={section.id}
            section={section}
            chapterId={chapter.id}
            chapterColor={chapter.color}
            canEdit={isAdmin === true}
            onBehalfOf={onBehalfOf || undefined}
          />
        ))}
      </div>

      {/* Privacy Note */}
      <div className="border-l-2 border-gold-border/30 pl-4 py-2">
        <p className="text-xs text-[#f2ede2]/75 italic leading-relaxed">
          {PRIVACY_NOTE}
        </p>
      </div>
    </div>
  );
}

function SectionAccordion({
  section,
  chapterId,
  chapterColor,
  canEdit,
  onBehalfOf,
}: {
  section: SubSection;
  chapterId: string;
  chapterColor: string;
  canEdit: boolean;
  onBehalfOf?: Id<"users">;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const rows = useQuery(api.sections.getRows, {
    chapterId,
    sectionId: section.id,
    onBehalfOf,
  });
  const fields = useQuery(api.sections.getFields, {
    chapterId,
    sectionId: section.id,
    onBehalfOf,
  });
  const addRow = useMutation(api.sections.addRow);
  const updateRow = useMutation(api.sections.updateRow);
  const deleteRow = useMutation(api.sections.deleteRow);
  const saveField = useMutation(api.sections.saveField);

  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editData, setEditData] = useState<Record<string, string>>({});
  const [addingRow, setAddingRow] = useState(false);
  const [newRowData, setNewRowData] = useState<Record<string, string>>({});
  const [fieldDrafts, setFieldDrafts] = useState<Record<string, string>>({});
  const [savingField, setSavingField] = useState<string | null>(null);
  const [savedConfirmation, setSavedConfirmation] = useState(false);

  const colCount = section.tableColumns?.length || 0;
  const fieldDefCount = section.fields?.length || 0;
  const totalFieldCount = colCount + fieldDefCount;
  const rowCount = rows?.length || 0;
  const fieldsObj = fields || {};
  const fieldsFilled = Object.keys(fieldsObj).filter(
    k => (fieldsObj as Record<string, string>)[k],
  ).length;
  const completed = rowCount + fieldsFilled;
  const pct =
    totalFieldCount > 0 ? Math.round((completed / totalFieldCount) * 100) : 0;

  // If a Related Sections link (or a deep link) targets this exact section,
  // open it and scroll it into view. Runs on mount and on same-page hash changes.
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === `#${section.id}`) {
        setOpen(true);
        setTimeout(
          () =>
            rootRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            }),
          100,
        );
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [section.id]);

  // Init field drafts from server data
  useEffect(() => {
    if (fields && typeof fields === "object") {
      setFieldDrafts(prev => {
        const next = { ...prev };
        for (const [key, val] of Object.entries(
          fields as Record<string, string>,
        )) {
          if (!(key in next)) next[key] = val as string;
        }
        return next;
      });
    }
  }, [fields]);

  const handleSaveField = useCallback(
    async (fieldId: string, value: string) => {
      if (!canEdit) return;
      setSavingField(fieldId);
      try {
        await saveField({
          chapterId,
          sectionId: section.id,
          fieldId,
          value,
          onBehalfOf,
        });
      } finally {
        setSavingField(null);
      }
    },
    [saveField, chapterId, section.id, canEdit, onBehalfOf],
  );

  const handleSaveProgress = useCallback(async () => {
    if (!canEdit) return;
    const serverFields = (fields as Record<string, string>) || {};
    const pending = Object.entries(fieldDrafts).filter(
      ([id, val]) => val !== (serverFields[id] || ""),
    );
    for (const [fieldId, value] of pending) {
      await saveField({
        chapterId,
        sectionId: section.id,
        fieldId,
        value,
        onBehalfOf,
      });
    }
    setSavedConfirmation(true);
    setTimeout(() => setSavedConfirmation(false), 2500);
  }, [
    canEdit,
    fieldDrafts,
    fields,
    saveField,
    chapterId,
    section.id,
    onBehalfOf,
  ]);

  const handleAddRow = async () => {
    if (!canEdit) return;
    await addRow({
      chapterId,
      sectionId: section.id,
      data: JSON.stringify(newRowData),
      onBehalfOf,
    });
    setNewRowData({});
    setAddingRow(false);
  };

  const handleUpdateRow = async (rowId: string) => {
    if (!canEdit) return;
    await updateRow({
      chapterId,
      sectionId: section.id,
      rowId,
      data: JSON.stringify(editData),
      onBehalfOf,
    });
    setEditingRow(null);
    setEditData({});
  };

  const handleDeleteRow = async (rowId: string) => {
    if (!canEdit) return;
    await deleteRow({ chapterId, sectionId: section.id, rowId, onBehalfOf });
  };

  return (
    <div
      ref={rootRef}
      id={section.id}
      className="bg-[#0f0c08] rounded-xl border border-gold-border/50 overflow-hidden"
    >
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#161514] transition-colors text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {section.icon && (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${chapterColor}15` }}
            >
              <LucideIcon
                name={section.icon}
                className="w-4 h-4"
                style={{ color: chapterColor }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-sm text-[#f2ede2]">
              <EditableText
                cmsKey={`chapter_${chapterId}_section_${section.id}_title`}
                fallback={section.title}
                as="span"
              />
            </h3>
            {/* Mini progress bar */}
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1 flex-1 max-w-[120px] bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(pct, 2)}%`,
                    background: `linear-gradient(90deg, ${chapterColor}88, ${chapterColor})`,
                    boxShadow:
                      pct > 0 ? `0 0 6px ${chapterColor}40` : undefined,
                  }}
                />
              </div>
              <span className="text-[10px] text-[#f2ede2]/75">
                {completed} of {totalFieldCount}
              </span>
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#f2ede2]/75 transition-transform duration-200 shrink-0 ml-2 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Accordion Content */}
      {open && (
        <div
          className="border-t border-gold-border/30 p-4 space-y-4 animate-fade-in"
          style={{ animationDuration: "0.3s" }}
        >
          {!canEdit && (
            <div className="rounded-lg border border-gold-border/30 bg-black/40 px-3 py-2 text-xs text-[#f2ede2]/75">
              Chapter sections are view-only in the client portal.
            </div>
          )}
          {section.description && (
            <p className="text-xs text-[#f2ede2]/80 leading-relaxed">
              <EditableText
                cmsKey={`chapter_${chapterId}_section_${section.id}_desc`}
                fallback={section.description}
                as="span"
              />
            </p>
          )}

          {/* Standalone fields (textarea, text, checkbox) */}
          {section.fields && section.fields.length > 0 && (
            <div className="space-y-3">
              {section.fields.map(field => (
                <div key={field.id} className="space-y-1">
                  <label className="text-xs text-[#f2ede2]/75 font-medium">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <div className="relative">
                      <textarea
                        className="w-full bg-black border border-gold-border/40 rounded-lg p-3 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none resize-y min-h-[80px]"
                        placeholder={
                          field.placeholder ||
                          `Enter ${field.label.toLowerCase()}...`
                        }
                        value={fieldDrafts[field.id] || ""}
                        disabled={!canEdit}
                        readOnly={!canEdit}
                        onChange={e =>
                          canEdit &&
                          setFieldDrafts(p => ({
                            ...p,
                            [field.id]: e.target.value,
                          }))
                        }
                        onBlur={() => {
                          const val = fieldDrafts[field.id];
                          if (
                            val !== undefined &&
                            val !==
                              ((fields as Record<string, string>)?.[field.id] ||
                                "")
                          ) {
                            handleSaveField(field.id, val);
                          }
                        }}
                      />
                      {savingField === field.id && (
                        <Loader2 className="absolute top-3 right-3 w-3 h-3 animate-spin text-gold-muted" />
                      )}
                    </div>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fieldDrafts[field.id] === "true"}
                        onChange={e => {
                          const val = e.target.checked ? "true" : "false";
                          setFieldDrafts(p => ({ ...p, [field.id]: val }));
                          handleSaveField(field.id, val);
                        }}
                        className="accent-[#d4b661]"
                      />
                      <span className="text-xs text-[#f2ede2]/80">
                        {field.placeholder || field.label}
                      </span>
                    </label>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full bg-black border border-gold-border/40 rounded-lg px-3 py-2 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/80 focus:border-gold-primary/50 focus:outline-none"
                        placeholder={
                          field.placeholder ||
                          `Enter ${field.label.toLowerCase()}...`
                        }
                        value={fieldDrafts[field.id] || ""}
                        disabled={!canEdit}
                        readOnly={!canEdit}
                        onChange={e =>
                          canEdit &&
                          setFieldDrafts(p => ({
                            ...p,
                            [field.id]: e.target.value,
                          }))
                        }
                        onBlur={() => {
                          const val = fieldDrafts[field.id];
                          if (
                            val !== undefined &&
                            val !==
                              ((fields as Record<string, string>)?.[field.id] ||
                                "")
                          ) {
                            handleSaveField(field.id, val);
                          }
                        }}
                      />
                      {savingField === field.id && (
                        <Loader2 className="absolute top-2 right-3 w-3 h-3 animate-spin text-gold-muted" />
                      )}
                    </div>
                  )}
                </div>
              ))}
              {canEdit && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveProgress}
                    className="flex items-center gap-1.5 text-xs bg-gold-dark/15 text-gold-primary hover:bg-gold-dark/25 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Progress
                  </button>
                  {savedConfirmation && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Table rows (CRUD) */}
          {section.tableColumns && section.tableColumns.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] uppercase tracking-widest text-gold-muted font-heading">
                  Records
                </h4>
                {canEdit && (
                  <button
                    onClick={() => {
                      setAddingRow(true);
                      setNewRowData({});
                    }}
                    className="flex items-center gap-1 text-xs text-gold-primary hover:text-gold-bright transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add Entry
                  </button>
                )}
              </div>

              {/* Add Row Form */}
              {canEdit && addingRow && (
                <div className="bg-black rounded-lg border border-gold-primary/30 p-3 space-y-2">
                  {section.tableColumns.map(col => (
                    <div key={col.key}>
                      <label className="text-[10px] text-[#f2ede2]/80 uppercase tracking-wider">
                        <EditableText
                          cmsKey={`chapter_${chapterId}_section_${section.id}_col_${col.key}`}
                          fallback={col.label}
                          as="span"
                        />
                      </label>
                      <input
                        type="text"
                        className="w-full bg-[#0f0c08] border border-gold-border/30 rounded px-2 py-1.5 text-sm text-[#f2ede2] placeholder:text-[#f2ede2]/35 focus:border-gold-primary/50 focus:outline-none mt-0.5"
                        placeholder={col.label}
                        value={newRowData[col.key] || ""}
                        onChange={e =>
                          setNewRowData(p => ({
                            ...p,
                            [col.key]: e.target.value,
                          }))
                        }
                      />
                    </div>
                  ))}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleAddRow}
                      className="flex items-center gap-1 text-xs bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] px-3 py-1.5 rounded-lg font-heading font-medium hover:opacity-90 transition"
                    >
                      <Save className="w-3 h-3" /> Save
                    </button>
                    <button
                      onClick={() => setAddingRow(false)}
                      className="flex items-center gap-1 text-xs text-[#f2ede2]/80 hover:text-[#f2ede2]/80 px-3 py-1.5"
                    >
                      <X className="w-3 h-3" /> Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Existing Rows */}
              {rows && rows.length > 0 ? (
                <div className="space-y-2">
                  {rows.map((row: any) => {
                    // Guarded rather than a bare JSON.parse: this runs during
                    // render, so one malformed row would throw and blank the
                    // whole chapter page instead of just skipping that row.
                    let data: any = {};
                    try {
                      data = JSON.parse(row.data || "{}");
                    } catch {
                      data = {};
                    }
                    const isEditing = editingRow === row.rowId;

                    if (isEditing) {
                      return (
                        <div
                          key={row.rowId}
                          className="bg-black rounded-lg border border-gold-primary/30 p-3 space-y-2"
                        >
                          {section.tableColumns.map(col => (
                            <div key={col.key}>
                              <label className="text-[10px] text-[#f2ede2]/80 uppercase tracking-wider">
                                <EditableText
                                  cmsKey={`chapter_${chapterId}_section_${section.id}_col_${col.key}`}
                                  fallback={col.label}
                                  as="span"
                                />
                              </label>
                              <input
                                type="text"
                                className="w-full bg-[#0f0c08] border border-gold-border/30 rounded px-2 py-1.5 text-sm text-[#f2ede2] focus:border-gold-primary/50 focus:outline-none mt-0.5"
                                value={editData[col.key] || ""}
                                onChange={e =>
                                  setEditData(p => ({
                                    ...p,
                                    [col.key]: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          ))}
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => handleUpdateRow(row.rowId)}
                              className="flex items-center gap-1 text-xs bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] px-3 py-1.5 rounded-lg font-heading font-medium"
                            >
                              <Check className="w-3 h-3" /> Update
                            </button>
                            <button
                              onClick={() => setEditingRow(null)}
                              className="text-xs text-[#f2ede2]/80 hover:text-[#f2ede2]/80 px-3 py-1.5"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={row.rowId}
                        className="bg-black/50 rounded-lg border border-gold-border/20 p-3 hover:border-gold-border/40 transition-colors group"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {section.tableColumns.map(col => (
                            <div key={col.key}>
                              <span className="text-[10px] text-[#f2ede2]/75 uppercase tracking-wider">
                                <EditableText
                                  cmsKey={`chapter_${chapterId}_section_${section.id}_col_${col.key}`}
                                  fallback={col.label}
                                  as="span"
                                />
                              </span>
                              <p className="text-sm text-[#f2ede2]/80 mt-0.5">
                                {data[col.key] || (
                                  <span className="text-[#f2ede2]/35 italic">
                                    Empty
                                  </span>
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                        {canEdit && (
                          <div className="flex gap-2 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingRow(row.rowId);
                                setEditData(data);
                              }}
                              className="text-[10px] text-gold-primary hover:text-gold-bright"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteRow(row.rowId)}
                              className="text-[10px] text-red-400/60 hover:text-red-400 flex items-center gap-0.5"
                            >
                              <Trash2 className="w-3 h-3" /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                !addingRow && (
                  <p className="text-xs text-[#f2ede2]/80 text-center py-4">
                    No entries yet. This section is view-only for clients.
                  </p>
                )
              )}
            </div>
          )}

          {/* Related Sections (crossRefs) */}
          {section.crossRefs && section.crossRefs.length > 0 && (
            <div className="pt-2 border-t border-gold-border/20">
              <h4 className="text-[10px] uppercase tracking-widest text-gold-muted font-heading mb-2">
                Related Sections
              </h4>
              <div className="flex flex-wrap gap-2">
                {section.crossRefs.map(refName => (
                  <CrossRefLink
                    key={refName}
                    name={refName}
                    currentChapterId={chapterId}
                    onBehalfOf={onBehalfOf}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CrossRefLink({
  name,
  currentChapterId,
  onBehalfOf,
}: {
  name: string;
  currentChapterId: string;
  onBehalfOf?: Id<"users">;
}) {
  const navigate = useNavigate();
  const target = resolveCrossRef(name);

  if (!target) {
    // No resolvable match — render as plain text rather than a dead link.
    return (
      <span className="text-xs text-[#f2ede2]/75 px-2.5 py-1">{name}</span>
    );
  }

  const suffix = onBehalfOf ? `?for=${onBehalfOf}` : "";
  const hash = target.sectionId ? `#${target.sectionId}` : "";

  return (
    <button
      type="button"
      onClick={() => {
        if (target.chapterId === currentChapterId && target.sectionId) {
          // Same chapter — just update the hash; the matching accordion listens for it.
          window.location.hash = target.sectionId;
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        } else {
          navigate(`/chapter/${target.chapterId}${suffix}${hash}`);
        }
      }}
      className="text-xs text-gold-primary hover:text-gold-bright bg-gold-dark/10 hover:bg-gold-dark/20 px-2.5 py-1 rounded-full transition-colors"
    >
      {name} &rarr;
    </button>
  );
}
