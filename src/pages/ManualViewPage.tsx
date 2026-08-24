import {
  ArrowLeft,
  BookOpen,
  FileText,
} from "reicon-react";
import { useQuery } from "convex/react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { EditableText } from "../components/EditableText";
import { LucideIcon } from "../components/LucideIcon";
import { useTheme } from "../contexts/ThemeContext";
import { chapters, PRIVACY_NOTE } from "../data/chapters";
import { canAccessChapter, getTierByName } from "../data/tiers";

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
  const section = chapter.subSections.find(s => s.id === sectionId);
  const { theme } = useTheme();
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
    fields?.some(f => f.value && f.value.trim() !== "");
  if (!hasData) return null;

  return (
    <div className="mb-8 break-inside-avoid">
      <div className="flex items-center gap-2 mb-3">
        <LucideIcon
          name={section.icon}
          className="w-4 h-4"
          style={{
            color:
              chapter.color === "#FFFFFF"
                ? theme === "light"
                  ? "#181410"
                  : "#f2ede2"
                : chapter.color,
          }}
        />
        <h3 className="font-heading text-base font-semibold text-[#f2ede2]">
          {section.title}
        </h3>
      </div>

      {/* Table rows */}
      {section.tableColumns.length > 0 && rows && rows.length > 0 && (
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                {section.tableColumns.map(col => (
                  <th
                    key={col.key}
                    className="text-left px-3 py-2 font-heading text-[10px] uppercase tracking-wider text-[#d4b661]/70 bg-[#141009] border-b border-[rgba(212, 182, 97,0.08)]"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                const data = (() => {
                  try {
                    return JSON.parse(row.data);
                  } catch {
                    return {};
                  }
                })();
                return (
                  <tr
                    key={row._id}
                    className="border-b border-[rgba(212, 182, 97,0.04)]"
                  >
                    {section.tableColumns.map(col => (
                      <td key={col.key} className="px-3 py-2 text-[#f2ede2]/70">
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
        section.fields.map(fieldDef => {
          const f = fields.find(x => x.fieldId === fieldDef.id);
          if (!f?.value?.trim()) return null;
          return (
            <div key={fieldDef.id} className="mb-3">
              <p className="text-xs font-heading text-[#d4b661]/70 mb-1">
                {fieldDef.label}
              </p>
              <p className="text-sm text-[#f2ede2]/70 whitespace-pre-wrap bg-[#141009] rounded-lg px-4 py-3">
                {f.value}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default function ManualViewPage({
  clientUserIdOverride,
}: {
  clientUserIdOverride?: string;
} = {}) {
  const params = useParams<{ clientUserId: string }>();
  const clientUserId = clientUserIdOverride ?? params.clientUserId;
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isAdmin = useQuery(api.admin.isAdmin);
  const clients = useQuery(api.admin.listClients);
  const manualData = useQuery(
    api.crm.getClientManualData,
    clientUserId ? { clientUserId: clientUserId as Id<"users"> } : "skip",
  );

  if (!isAdmin) {
    return (
      <div className="p-6 text-center text-[#f2ede2]/80">
        Admin access required.
      </div>
    );
  }

  const client = clients?.find(c => c.userId === clientUserId);
  const tier = client?.tier || "personal";

  function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const accessibleChapters = chapters.filter(ch =>
      canAccessChapter(tier, ch.chapterNumber),
    );
    let body = "";
    for (const ch of accessibleChapters) {
      let chapterHtml = "";
      for (const sec of ch.subSections) {
        const sectionKey = `${ch.id}:${sec.id}`;
        const realRows = manualData?.rowsBySection[sectionKey] || [];
        const realFields = manualData?.fieldsBySection[sectionKey] || {};
        const hasTableData = realRows.length > 0;
        const hasFieldData = Object.keys(realFields).length > 0;
        if (!hasTableData && !hasFieldData) continue;

        let sectionHtml = `<h3>${escapeHtml(sec.title)}</h3>`;
        if (hasTableData && sec.tableColumns.length > 0) {
          sectionHtml += `<table><thead><tr>`;
          for (const col of sec.tableColumns)
            sectionHtml += `<th>${escapeHtml(col.label)}</th>`;
          sectionHtml += `</tr></thead><tbody>`;
          for (const row of realRows) {
            sectionHtml += `<tr>`;
            for (const col of sec.tableColumns)
              sectionHtml += `<td>${escapeHtml(row[col.key] || "")}</td>`;
            sectionHtml += `</tr>`;
          }
          sectionHtml += `</tbody></table>`;
        }
        if (hasFieldData && sec.fields) {
          for (const fieldDef of sec.fields) {
            const value = realFields[fieldDef.id];
            if (!value) continue;
            sectionHtml += `<div class="field"><strong>${escapeHtml(fieldDef.label)}:</strong> <span>${escapeHtml(value)}</span></div>`;
          }
        }
        chapterHtml += `<div class="section">${sectionHtml}</div>`;
      }
      if (chapterHtml) {
        body += `<div class="chapter"><h2>Chapter ${ch.chapterNumber}: ${escapeHtml(ch.title)}</h2>${chapterHtml}</div>`;
      }
    }

    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>Life Manual - ${escapeHtml(client?.userName || "Client")}</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 11.5pt; line-height: 1.4; color: #1a1a1a; background: #fdfcfa; padding: 1in 0.9in; }
.logo { display: block; height: 0.55in; margin: 0 auto 0.15in; }
.title { font-family: 'Cinzel', serif; font-size: 18pt; text-align: center; letter-spacing: 0.05em; color: #8a6d1f; text-transform: uppercase; margin-bottom: 0.05in; }
.subtitle { text-align: center; font-size: 10pt; color: #555; margin-bottom: 0.4in; }
.chapter { margin-bottom: 0.3in; page-break-inside: avoid; }
.chapter h2 { font-family: 'Cinzel', serif; font-size: 14pt; text-transform: uppercase; letter-spacing: 0.03em; color: #8a6d1f; border-bottom: 1px solid #d4b661; padding-bottom: 0.08in; margin-bottom: 0.15in; }
.section { margin-bottom: 0.18in; }
.section h3 { font-family: 'Cinzel', serif; font-size: 12pt; color: #4a3a10; margin-bottom: 0.06in; }
table { width: 100%; border-collapse: collapse; margin-bottom: 0.1in; font-size: 10pt; }
th, td { border: 1px solid #e0d8c5; padding: 5px 8px; text-align: left; }
th { background: #F2EDE2; font-family: 'Cinzel', serif; font-size: 8.5pt; text-transform: uppercase; color: #8a6d1f; }
.field { font-size: 10.5pt; margin-bottom: 0.06in; }
.field strong { color: #4a3a10; font-family: 'Cinzel', serif; font-size: 9pt; text-transform: uppercase; }
.footer { margin-top: 0.4in; padding-top: 0.15in; border-top: 1px solid #d4b661; text-align: center; font-family: 'Cinzel', serif; font-size: 9pt; letter-spacing: 0.1em; color: #8a6d1f; text-transform: uppercase; }
@media print { body { padding: 0.55in 0.65in; } }
</style></head>
<body>
<img class="logo" src="${window.location.origin}/logo.png" alt="" />
<div class="title">Life Manual</div>
<div class="subtitle">Prepared for ${escapeHtml(client?.userName || "Client")} &middot; ${getTierByName(tier)?.name ?? tier} Edition</div>
${body || '<p style="text-align:center;color:#888;font-style:italic;">No information has been entered yet.</p>'}
<div class="footer">Order in Your Absence</div>
</body></html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 text-sm text-[#d4b661]/60 hover:text-[#d4b661]"
        >
          <ArrowLeft className="w-4 h-4" />
          Admin
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="btn-gold text-xs px-4 py-2 flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
          Print / Export
        </button>
      </div>

      {/* Manual Header */}
      <div className="text-center py-8 border-b border-[rgba(212, 182, 97,0.1)]">
        <BookOpen className="w-10 h-10 text-[#d4b661] mx-auto mb-4" />
        <h1 className="font-heading text-3xl font-bold text-gold-gradient mb-2">
          <EditableText cmsKey="manual_view_title" as="span" />
        </h1>
        <p className="text-sm text-[#f2ede2]/80">
          Prepared for {client?.userName || "Client"} •{" "}
          <span className="capitalize">{tier}</span> Edition
        </p>
        <p className="text-xs text-[#f2ede2]/80 mt-2">
          Generated{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Chapters */}
      {chapters
        .filter(ch => canAccessChapter(tier, ch.chapterNumber))
        .map(ch => (
          <div key={ch.id} className="space-y-4">
            <div className="pt-6 pb-2 border-b border-[rgba(212, 182, 97,0.08)]">
              <span
                className="font-heading text-xs uppercase tracking-widest whitespace-nowrap"
                style={{
                  color:
                    ch.color === "#FFFFFF"
                      ? theme === "light"
                        ? "#181410"
                        : "#f2ede2"
                      : ch.color,
                }}
              >
                Chapter {ch.chapterNumber}
              </span>
              <span className="font-heading text-lg font-semibold text-[#f2ede2] block mt-0.5">
                {ch.title}
              </span>
            </div>

            {ch.subSections.map(section => (
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
      <div className="pt-8 border-t border-[rgba(212, 182, 97,0.06)]">
        <p className="privacy-disclaimer">{PRIVACY_NOTE}</p>
      </div>
    </div>
  );
}
