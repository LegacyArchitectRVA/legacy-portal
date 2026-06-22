import { useQuery } from "convex/react";
import { RiErrorWarningLine as AlertTriangle, RiArrowLeftLine as ArrowLeft, RiBookOpenLine as BookOpen, RiDownloadLine as Download, RiFileTextLine as FileText, RiLoader4Line as Loader2 } from "@remixicon/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { chapters, PRIVACY_NOTE } from "../data/chapters";
import { canAccessChapter, getTierByName } from "../data/tiers";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default function GeneratePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("client");
  const isAdmin = useQuery(api.admin.isAdmin);
  const clients = useQuery(api.admin.listClients);
  const [selectedClient, setSelectedClient] = useState(clientId || "");
  const [generating, setGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const client = clients?.find((c: any) => c._id === selectedClient);
  const manualData = useQuery(
    api.crm.getClientManualData,
    client?.userId ? { clientUserId: client.userId } : "skip"
  );

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-[#e8e6e1]/75">Admin access required.</p>
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!selectedClient) return;
    setGenerating(true);

    // Build HTML Life Manual from client data
    try {
      const tier = client?.tier || "vault";
      const tierInfo = getTierByName(tier);
      const accessibleChapters = chapters.filter((ch) =>
        canAccessChapter(tier, ch.chapterNumber)
      );

      let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Life Manual - ${client?.userName || "Client"}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Libre Baskerville', serif;
      background: #000000;
      color: #e8e6e1;
      line-height: 1.6;
    }
    .cover {
      page-break-after: always;
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: #000000;
      color: #d9cca0;
      padding: 2rem;
    }
    .cover h1 {
      font-family: 'Cinzel', serif;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
    .cover .subtitle {
      font-size: 0.9rem;
      opacity: 0.6;
      margin-top: 1rem;
      font-family: 'Libre Baskerville', serif;
    }
    .cover .client-name {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      margin-top: 3rem;
    }
    .cover .tier {
      font-size: 0.8rem;
      opacity: 0.5;
      margin-top: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-family: 'Libre Baskerville', serif;
    }
    .chapter {
      page-break-before: always;
      padding: 2rem;
      border-bottom: 1px solid rgba(217, 204, 160, 0.08);
    }
    .chapter h2 {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #d9cca0;
      letter-spacing: 0.02em;
    }
    .chapter .desc {
      font-size: 0.85rem;
      color: rgba(232, 230, 225, 0.7);
      margin-bottom: 1.5rem;
      font-family: 'Libre Baskerville', serif;
    }
    .section {
      margin-bottom: 1.5rem;
    }
    .section h3 {
      font-family: 'Cinzel', serif;
      font-size: 1.1rem;
      font-weight: 500;
      color: #e8e6e1;
      margin-bottom: 0.5rem;
      letter-spacing: 0.02em;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.5rem;
      font-size: 0.8rem;
    }
    th, td {
      border: 1px solid rgba(217, 204, 160, 0.08);
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: #0e0e0e;
      font-family: 'Cinzel', serif;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: rgba(217, 204, 160, 0.7);
    }
    td {
      color: rgba(232, 230, 225, 0.7);
    }
    .empty {
      color: rgba(232, 230, 225, 0.4);
      font-style: italic;
      text-align: center;
    }
    .empty-note {
      color: rgba(232, 230, 225, 0.4);
      font-style: italic;
      font-size: 0.85rem;
      margin-top: 0.25rem;
    }
    .field {
      font-size: 0.85rem;
      color: rgba(232, 230, 225, 0.85);
      margin-bottom: 0.4rem;
      line-height: 1.5;
    }
    .field strong {
      color: rgba(217, 204, 160, 0.85);
      font-family: 'Cinzel', serif;
      font-weight: 500;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-right: 0.4rem;
    }
    .footer {
      text-align: center;
      font-size: 0.7rem;
      color: rgba(232, 230, 225, 0.5);
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(217, 204, 160, 0.06);
      font-family: 'Libre Baskerville', serif;
    }
    .privacy-note {
      font-style: italic;
      color: rgba(232, 230, 225, 0.4);
      font-size: 0.8rem;
      border-left: 2px solid rgba(217, 204, 160, 0.2);
      padding-left: 1rem;
      margin-top: 2rem;
    }
    @media print {
      .cover { height: auto; min-height: 100vh; }
      body { background: white; color: black; }
      .cover { background: white; color: #0a0a0a; }
      .cover h1 { color: #0a0a0a; }
      .chapter h2 { color: #0a0a0a; }
      th { background: #f5f5f5; color: #0a0a0a; }
      td { color: #0a0a0a; }
      .footer { color: #666; }
      .privacy-note { color: #666; border-left-color: #ccc; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <h1>LIFE MANUAL</h1>
    <p class="subtitle">Legacy Architect RVA</p>
    <p class="client-name">${client?.userName || "Client"}</p>
    <p class="tier">${tierInfo?.name || tier} Edition</p>
  </div>
`;

      for (const ch of accessibleChapters) {
        html += `
  <div class="chapter">
    <h2>Chapter ${ch.chapterNumber}: ${ch.title}</h2>
    <p class="desc">${ch.description}</p>
`;
        for (const sec of ch.subSections) {
          const sectionKey = `${ch.id}:${sec.id}`;
          const realRows = manualData?.rowsBySection[sectionKey] || [];
          const realFields = manualData?.fieldsBySection[sectionKey] || {};
          const hasTableData = realRows.length > 0;
          const hasFieldData = Object.keys(realFields).length > 0;

          html += `    <div class="section"><h3>${sec.title}</h3>`;

          if (sec.tableColumns && sec.tableColumns.length > 0) {
            if (hasTableData) {
              html += `<table><thead><tr>`;
              for (const col of sec.tableColumns) {
                html += `<th>${col.label}</th>`;
              }
              html += `</tr></thead><tbody>`;
              for (const row of realRows) {
                html += `<tr>`;
                for (const col of sec.tableColumns) {
                  html += `<td>${escapeHtml(row[col.key] || "")}</td>`;
                }
                html += `</tr>`;
              }
              html += `</tbody></table>`;
            } else {
              html += `<p class="empty-note">Not yet provided.</p>`;
            }
          }

          if (sec.fields && sec.fields.length > 0) {
            if (hasFieldData) {
              for (const field of sec.fields) {
                const value = realFields[field.id];
                if (!value) continue;
                html += `<div class="field"><strong>${field.label}:</strong> <span>${escapeHtml(value)}</span></div>`;
              }
            } else if (!hasTableData) {
              html += `<p class="empty-note">Not yet provided.</p>`;
            }
          }

          html += `</div>`;
        }
        html += `  </div>`;
      }

      html += `
  <div class="footer">
    <p>Generated by Legacy Architect RVA &middot; ${new Date().toLocaleDateString()}</p>
    <p>This document contains sensitive information. Handle with care.</p>
  </div>
  <div class="privacy-note">
    <p>${PRIVACY_NOTE}</p>
  </div>
</body>
</html>`;

      setGeneratedHtml(html);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedHtml) return;
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `life-manual-${client?.userName?.replace(/\s+/g, "-").toLowerCase() || "client"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 text-sm text-[#e8e6e1]/80 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Admin
      </button>

      <div>
        <h1 className="font-heading text-3xl text-gold-gradient">Generate Life Manual</h1>
        <p className="text-[#e8e6e1]/75 mt-2">
          Generate a formatted Life Manual for a client. The manual includes all completed data
          from their portal organized by chapter.
        </p>
      </div>

      {/* Client Selection */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-4">
        <div>
          <label className="text-xs text-[#e8e6e1]/75 uppercase tracking-wider font-heading">Select Client</label>
          <select
            value={selectedClient}
            onChange={(e) => {
              setSelectedClient(e.target.value);
              setGeneratedHtml(null);
            }}
            className="w-full bg-black border border-gold-border/40 rounded-lg px-3 py-2.5 text-sm text-[#e8e6e1] focus:border-gold-primary/50 focus:outline-none mt-1 appearance-none cursor-pointer"
          >
            <option value="">Choose a client...</option>
            {clients?.map((c: any) => (
              <option key={c._id} value={c._id}>
                {c.userName || c.userEmail} - {getTierByName(c.tier)?.name ?? c.tier}
              </option>
            ))}
          </select>
        </div>

        {selectedClient && (
          <button
            onClick={handleGenerate}
            disabled={generating || manualData === undefined}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {generating || manualData === undefined ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <BookOpen className="w-4 h-4" />
            )}
            {generating ? "Generating..." : manualData === undefined ? "Loading client data..." : "Generate Manual"}
          </button>
        )}
      </div>

      {/* Generated Manual */}
      {generatedHtml && (
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-4">
          <div className="flex items-center gap-2 text-gold-primary">
            <FileText className="w-5 h-5" />
            <h3 className="font-heading text-lg">Manual Generated</h3>
          </div>
          <p className="text-sm text-[#e8e6e1]/75">
            Life Manual for {client?.userName} has been generated. Download the HTML file,
            then open it in a browser and print to PDF for a polished output.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" /> Download HTML
            </button>
          </div>

          <div className="bg-black rounded-lg border border-gold-border/20 p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-[#e8e6e1]/80">
              After delivery, all files and access are purged. Your information stays with you.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
