import { useQuery } from "convex/react";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { chapters, PRIVACY_NOTE } from "../data/chapters";
import { canAccessChapter } from "../data/tiers";
import { LucideIcon } from "../components/LucideIcon";

function SectionView({
  clientUserId,
  chapterId,
  sectionId,
  chapter,
}: {
  clientUserId: Id<"users">;
  chapterId: string;
  sectionId: string;
  chapter: (typeof chapters)[0];
}) {
  const section = chapter.subSections.find((s) => s.id === sectionId);
  const rows = useQuery(api.admin.getClientSectionRows, {
    clientUserId,
    chapterId,
    sectionId,
  });
  const fields = useQuery(api.admin.getClientSectionFields, {
    clientUserId,
    chapterId,
    sectionId,
  });

  if (!section) return null;

  const hasData =
    (rows && rows.length > 0) ||
    (fields && fields.some((f) => f.value && f.value.trim() !== ""));
  if (!hasData) return null;

  return (
    <div className="mb-8 break-inside-avoid">
      <div className="flex items-center gap-2 mb-3">
        <LucideIcon
          name={section.icon}
          className="w-4 h-4"
          style={{ color: chapter.color === "#FFFFFF" ? "#e8e6e1" : chapter.color }}
        />
        <h3 className="font-heading text-base font-semibold text-[#e8e6e1]">
          {section.title}
        </h3>
      </div>

      {/* Table rows */}
      {section.tableColumns.length > 0 && rows && rows.length > 0 && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                {section.tableColumns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left px-3 py-2 font-heading text-[10px] uppercase tracking-wider text-[#d9cca0]/70 bg-[#0e0e0e] border-b border-[rgba(217,204,160,0.08)]"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const data = (() => {
                  try { return JSON.parse(row.data); } catch { return {}; }
                })();
                return (
                  <tr key={row._id} className="border-b border-[rgba(217,204,160,0.04)]">
                    {section.tableColumns.map((col) => (
                      <td key={col.key} className="px-3 py-2 text-[#e8e6e1]/70">
                        {data[col.key] || "-"}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Fields */}
      {section.fields &&
        fields &&
        section.fields.map((fieldDef) => {
          const f = fields.find((x) => x.fieldId === fieldDef.id);
          if (!f || !f.value || !f.value.trim()) return null;
          return (
            <div key={fieldDef.id} className="mb-3">
              <p className="text-xs font-heading text-[#d9cca0]/70 mb-1">
                {fieldDef.label}
              </p>
              <p className="text-sm text-[#e8e6e1]/70 whitespace-pre-wrap bg-[#0e0e0e] rounded-lg px-4 py-3">
                {f.value}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default function ManualViewPage() {
  const { clientUserId } = useParams<{ clientUserId: string }>();
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const clients = useQuery(api.admin.listClients);

  if (!isAdmin) {
    return (
      <div className="p-6 text-center text-[#e8e6e1]/60">
        Admin access required.
      </div>
    );
  }

  const client = clients?.find(
    (c) => c.userId === clientUserId,
  );
  const tier = client?.tier || "vault";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm text-[#d9cca0]/60 hover:text-[#d9cca0]"
        >
          <ArrowLeft className="w-4 h-4" />
          Admin
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn-gold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
          Print / Export
        </button>
      </div>

      {/* Manual Header */}
      <div className="text-center py-8 border-b border-[rgba(217,204,160,0.1)]">
        <BookOpen className="w-10 h-10 text-[#d9cca0] mx-auto mb-4" />
        <h1 className="font-heading text-3xl font-bold text-gold-gradient mb-2">
          Life Manual
        </h1>
        <p className="text-sm text-[#e8e6e1]/60">
          Prepared for {client?.userName || "Client"} •{" "}
          <span className="capitalize">{tier}</span> Edition
        </p>
        <p className="text-xs text-[#e8e6e1]/60 mt-2">
          Generated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Chapters */}
      {chapters
        .filter((ch) => canAccessChapter(tier, ch.chapterNumber))
        .map((ch) => (
          <div key={ch.id} className="space-y-4">
            <div className="flex items-center gap-3 pt-6 pb-2 border-b border-[rgba(217,204,160,0.08)]">
              <span
                className="font-heading text-lg font-bold"
                style={{ color: ch.color === "#FFFFFF" ? "#e8e6e1" : ch.color }}
              >
                Chapter {ch.chapterNumber}
              </span>
              <span className="font-heading text-lg font-semibold text-[#e8e6e1]">
                {ch.title}
              </span>
            </div>

            {ch.subSections.map((section) => (
              <SectionView
                key={section.id}
                clientUserId={clientUserId as Id<"users">}
                chapterId={ch.id}
                sectionId={section.id}
                chapter={ch}
              />
            ))}
          </div>
        ))}

      {/* Privacy note */}
      <div className="pt-8 border-t border-[rgba(217,204,160,0.06)]">
        <p className="privacy-disclaimer">{PRIVACY_NOTE}</p>
      </div>
    </div>
  );
}
