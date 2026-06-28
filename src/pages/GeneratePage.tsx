import { useQuery } from "convex/react";
import { RiErrorWarningLine as AlertTriangle, RiArrowLeftLine as ArrowLeft, RiBookOpenLine as BookOpen, RiDownloadLine as Download, RiFileTextLine as FileText, RiLoader4Line as Loader2 } from "@remixicon/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { chapters } from "../data/chapters";
import { canAccessChapter, getTierByName } from "../data/tiers";
import { LOGO_DATA_URI, QR_CODE_DATA_URI } from "../lib/brandAssets";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Builds a single regex that matches any known chapter/subsection title
// (longest first, so "Vital Records" wins over any shorter overlapping
// phrase) plus a lookup from matched title -> its anchor href.
function buildRefIndex(allChapters: typeof chapters) {
  const entries: { title: string; href: string }[] = [
    { title: "Introduction", href: "#introduction" },
    { title: "Legal Documents in Force", href: "#legal-documents" },
    { title: "Successor Roadmap", href: "#successor-roadmap" },
  ];
  for (const ch of allChapters) {
    for (const sec of ch.subSections) {
      entries.push({ title: sec.title, href: `#${ch.id}-${sec.id}` });
    }
  }
  for (const ch of allChapters) {
    entries.push({ title: ch.title, href: `#${ch.id}` });
  }
  entries.sort((a, b) => b.title.length - a.title.length);
  const map = new Map(entries.map((e) => [e.title, e.href]));
  const pattern = entries.map((e) => escapeRegExp(e.title)).join("|");
  const regex = pattern ? new RegExp(`(${pattern})`, "g") : null;
  return { regex, map };
}

// Escapes text and turns any in-text mention of a known section/chapter
// title into a real link to that section, so "see Vital Records" inside a
// sentence is actually clickable rather than just a separate reference list.
function linkify(
  text: string,
  refIndex: { regex: RegExp | null; map: Map<string, string> },
  currentHref?: string,
): string {
  if (!text) return "";
  if (!refIndex.regex) return escapeHtml(text);
  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  refIndex.regex.lastIndex = 0;
  while ((match = refIndex.regex.exec(text)) !== null) {
    const title = match[0];
    const href = refIndex.map.get(title);
    result += escapeHtml(text.slice(lastIndex, match.index));
    if (href && href !== currentHref) {
      result += `<a class="inline-ref" href="${href}">${escapeHtml(title)}</a>`;
    } else {
      result += escapeHtml(title);
    }
    lastIndex = match.index + title.length;
  }
  result += escapeHtml(text.slice(lastIndex));
  return result;
}

// Same content as the "Successor Roadmap" guide on the Introduction page —
// kept in sync by hand since this one is short and rarely changes.
const SUCCESSOR_ROADMAP_MD = `
## Purpose
This roadmap provides your designated successor with a clear, sequential path to follow. It removes ambiguity and ensures nothing is overlooked during a critical transition.

## Phase 1: Immediate Actions (First 24 Hours)
- Locate the Life Manual
- Review Chapter 2: Emergency & Successor Orientation, and check Legal Documents in Force for what's active and where it's held
- Contact the individuals listed in the Critical Contact Directory
- Secure all physical documents referenced in Chapter 1

## Phase 2: Short-Term Actions (Days 2-7)
- Notify financial institutions listed in Chapter 3
- Review all digital accounts in Chapter 1: Digital & Access Systems
- Locate the Will, Trust, Power of Attorney, and any healthcare directives marked active, and contact the estate attorney where one is listed
- Begin household continuity actions from Chapter 4

## Phase 3: Ongoing Administration (Weeks 2-8)
- Transfer or close accounts as directed, confirming beneficiary designations first
- File necessary documents with appropriate agencies
- Follow the asset distribution plan
- Complete all items in the Vital Records chapter, and begin Chapter 7: Business Continuity if the Life Manual includes it

## Phase 4: Legacy Preservation
- Review Chapter 6: Legacy & Wishes, including any Letter of Intent on file
- Execute any legacy instructions
- Archive the Life Manual per the zero-knowledge protocol

---
*This roadmap is a companion to your Life Manual. All referenced chapters contain the detailed information your successor will need.*
`.trim();

// Minimal markdown -> HTML for the static export (mirrors the Introduction
// page's in-app renderer, simplified for ##/-/---/*caption* only since
// that's all the roadmap content actually uses).
function renderRoadmapMarkdown(md: string, refIndex: { regex: RegExp | null; map: Map<string, string> }): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let inList = false;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (inList) { out.push("</ul>"); inList = false; }
      out.push(`<h3>${escapeHtml(line.slice(3))}</h3>`);
    } else if (line.startsWith("- ")) {
      if (!inList) { out.push('<ul class="roadmap-list">'); inList = true; }
      out.push(`<li>${linkify(line.slice(2), refIndex)}</li>`);
    } else if (line.startsWith("---")) {
      if (inList) { out.push("</ul>"); inList = false; }
      out.push("<hr/>");
    } else if (line.startsWith("*") && line.endsWith("*")) {
      out.push(`<p class="roadmap-caption">${escapeHtml(line.slice(1, -1))}</p>`);
    } else if (line.trim() === "") {
      if (inList) { out.push("</ul>"); inList = false; }
    } else {
      out.push(`<p>${linkify(line, refIndex)}</p>`);
    }
  }
  if (inList) out.push("</ul>");
  return out.join("\n");
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
      const refIndex = buildRefIndex(accessibleChapters);

      let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Life Manual - ${client?.userName || "Client"}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @page {
      margin: 0.6in 0.55in;
      @bottom-center {
        content: "${(client?.userName || "Client").replace(/"/g, '\\"')}'s Life Manual   |   Page " counter(page) " of " counter(pages);
        font-family: 'Libre Baskerville', serif;
        font-size: 8px;
        color: #8a8a8a;
        letter-spacing: 0.02em;
      }
    }
    @page :first {
      @bottom-center { content: none; }
    }
    html { overflow-x: hidden; }
    img { max-width: 100%; }
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
      box-shadow: inset 0 0 0 1px rgba(217,204,160,0.32);
    }
    .cover .confidential {
      font-size: 0.7rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(217, 204, 160, 0.55);
      margin-bottom: 1.1rem;
    }
    .cover-disclosure {
      max-width: 480px;
      margin: 1.1rem auto 0;
      font-size: 0.58rem;
      line-height: 1.38;
      color: rgba(217, 204, 160, 0.45);
      text-align: left;
    }
    .cover-disclosure p {
      margin-bottom: 0.4rem;
    }
    .cover-disclosure p:last-child {
      margin-bottom: 0;
    }
    .cover .logo {
      height: 175px;
      margin-bottom: 1.25rem;
    }
    .cover h1 {
      font-family: 'Cinzel', serif;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      background: linear-gradient(135deg, #e8c46a, #b8985a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .cover .subtitle {
      font-size: 1.15rem;
      opacity: 0.6;
      margin-top: 1rem;
      font-family: 'Libre Baskerville', serif;
    }
    .flourish {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.85rem;
      margin: 1.75rem 0;
      color: #b8985a;
      font-size: 0.65rem;
      page-break-before: avoid;
      break-before: avoid;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .flourish::before,
    .flourish::after {
      content: "";
      flex: 0 1 70px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #b8985a, transparent);
    }
    .cover .client-name {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      margin-top: 0.5rem;
    }
    .cover .tier {
      font-size: 1.09rem;
      opacity: 0.5;
      margin-top: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-family: 'Libre Baskerville', serif;
    }
    .cover .meta {
      font-size: 0.98rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(217,204,160,0.6);
      margin-top: 2rem;
    }
    .chapter {
      padding: 2.5rem 2rem 2rem;
      border-bottom: 2px solid rgba(217, 204, 160, 0.22);
    }
    .chapter + .chapter {
      margin-top: 0.5rem;
    }
    .chapter h2 {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #d9cca0;
      letter-spacing: 0.02em;
      text-decoration: underline;
      page-break-after: avoid;
      break-after: avoid;
    }
    .chapter .desc {
      font-size: 1.21rem;
      color: rgba(232, 230, 225, 0.8);
      margin-bottom: 1.5rem;
      font-family: 'Libre Baskerville', serif;
    }
    .section {
      margin-bottom: 1.5rem;
    }
    .section h3 {
      font-family: 'Cinzel', serif;
      font-size: 1.6rem;
      font-weight: 500;
      color: #e8e6e1;
      margin-bottom: 0.5rem;
      letter-spacing: 0.02em;
      page-break-after: avoid;
      break-after: avoid;
    }
    .data-cards {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      margin-top: 0.75rem;
    }
    .data-card {
      background: rgba(217, 204, 160, 0.04);
      border: 1px solid rgba(217, 204, 160, 0.18);
      border-left: 3px solid #b8985a;
      border-radius: 6px;
      padding: 1.1rem 1.35rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.25);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .data-card-title {
      font-family: 'Cinzel', serif;
      font-size: 1.3rem;
      font-weight: 600;
      color: #e8c46a;
      margin-bottom: 0.65rem;
      letter-spacing: 0.01em;
    }
    .data-card-row {
      margin-bottom: 0.55rem;
    }
    .data-card-row:last-child {
      margin-bottom: 0;
    }
    .data-card-label {
      display: block;
      font-family: 'Cinzel', serif;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: rgba(217, 204, 160, 0.6);
      margin-bottom: 0.15rem;
    }
    .data-card-value {
      display: block;
      font-size: 1.08rem;
      color: rgba(232, 230, 225, 0.9);
      font-weight: 500;
      line-height: 1.5;
    }
    .empty {
      color: rgba(232, 230, 225, 0.55);
      font-style: italic;
      text-align: center;
    }
    .empty-note {
      color: rgba(232, 230, 225, 0.55);
      font-style: italic;
      font-size: 1.15rem;
      margin-top: 0.25rem;
    }
    .field {
      font-size: 1.21rem;
      color: rgba(232, 230, 225, 0.85);
      margin-bottom: 0.4rem;
      line-height: 1.5;
    }
    .field strong {
      color: rgba(217, 204, 160, 0.85);
      font-family: 'Cinzel', serif;
      font-weight: 500;
      font-size: 1.04rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      margin-right: 0.4rem;
    }
    .footer {
      text-align: center;
      margin-top: 3rem;
      padding-top: 2.5rem;
      border-top: 1px solid rgba(217, 204, 160, 0.1);
      page-break-before: always;
      break-before: page;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .footer-logo {
      height: 210px;
      opacity: 0.9;
      margin-bottom: 0.5rem;
    }
    .footer-qr-wrap {
      display: inline-block;
      background: #fff;
      padding: 10px;
      border-radius: 8px;
      margin-top: 1.5rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }
    .footer-qr {
      width: 100px;
      height: 100px;
      display: block;
    }
    .footer-tagline {
      font-family: 'Cinzel', serif;
      font-size: 1.05rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(217,204,160,0.7);
      margin-top: 0.5rem;
    }
    .footer-meta {
      font-size: 0.7rem;
      letter-spacing: 0.08em;
      color: rgba(217,204,160,0.4);
      margin-top: 0.5rem;
    }
    .privacy-note {
      font-style: italic;
      color: rgba(232, 230, 225, 0.55);
      font-size: 1.09rem;
      border-left: 2px solid rgba(217, 204, 160, 0.2);
      padding-left: 1rem;
      margin-top: 2rem;
    }
    @media print {
      .cover { height: auto; min-height: 100vh; box-shadow: inset 0 0 0 1px rgba(45,90,61,0.35); }
      .cover .confidential { color: #1f3d2a; font-size: 0.81rem; }
      .cover-disclosure { color: #4a4a4a; }
      .intro-subhead { color: #0a0a0a; font-weight: 700; }
      .cover .logo { height: 240px; }
      body { background: white; color: black; }
      .cover { background: white; color: #0a0a0a; }
      .chapter { page-break-before: always; border-bottom: none; }
      .cover h1 { background: none; -webkit-text-fill-color: #0a0a0a; color: #0a0a0a; font-size: 2.88rem; }
      .flourish { color: #2d5a3d; font-size: 0.75rem; }
      .flourish::before, .flourish::after { background: linear-gradient(90deg, transparent, #3a7350, transparent); }
      .cover .meta, .cover .subtitle { color: #0a0a0a; font-weight: 700; opacity: 1; }
      .cover .subtitle { font-size: 1.15rem; }
      .cover .client-name { font-size: 1.73rem; }
      .cover .tier { font-size: 1.09rem; opacity: 0.7; }
      .cover .meta { font-size: 0.98rem; }
      .chapter h2 { color: #0a0a0a; font-size: 1.73rem; }
      .chapter .desc { color: #4a4a4a; font-size: 1.21rem; }
      .section h3 { color: #0a0a0a; font-weight: 700; font-size: 1.84rem; }
      .data-card { background: #f7f5ee; border-color: #ddd3ad; border-left-color: #2d5a3d; box-shadow: none; }
      .data-card-title { color: #0a0a0a; font-weight: 700; font-size: 1.5rem; }
      .data-card-label { color: #1f3d2a; font-size: 0.81rem; font-weight: 700; }
      .data-card-value { color: #0a0a0a; font-weight: 600; font-size: 1.24rem; }
      .field { color: rgba(10,10,10,0.85); font-size: 1.21rem; }
      .field strong { color: #0a0a0a; font-weight: 700; font-size: 1.04rem; }
      .empty, .empty-note { color: #6b6b6b; }
      .empty-note { font-size: 1.15rem; }
      .footer-tagline { color: #0a0a0a; font-weight: 700; font-size: 1.21rem; }
      .footer-meta { color: #5c5c5c; font-size: 0.81rem; }
      .privacy-note { color: #595959; border-left-color: #ccc; font-size: 1.09rem; }
    }
    html { scroll-behavior: smooth; }
    .toc {
      padding: 2.5rem 2rem;
    }
    .toc-chapter { page-break-inside: avoid; break-inside: avoid; }
    .toc h2 {
      font-family: 'Cinzel', serif;
      font-size: 1.5rem;
      color: #d9cca0;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .toc-chapter { margin-bottom: 1.1rem; }
    .toc-chapter > a {
      font-family: 'Cinzel', serif;
      font-size: 1.15rem;
      color: #e8c46a;
      text-decoration: none;
      letter-spacing: 0.02em;
    }
    .toc-chapter > a:hover { text-decoration: underline; }
    .toc-sections {
      list-style: none;
      margin: 0.4rem 0 0;
      padding-left: 1.25rem;
      columns: 2;
      column-gap: 1.5rem;
    }
    .toc-sections li { margin-bottom: 0.3rem; break-inside: avoid; }
    .toc-sections a {
      font-size: 1.04rem;
      color: rgba(232,230,225,0.85);
      text-decoration: none;
    }
    .toc-sections a:hover { color: #d9cca0; text-decoration: underline; }
    .back-to-toc {
      display: block;
      text-align: right;
      font-size: 0.81rem;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: rgba(217,204,160,0.65);
      text-decoration: none;
      margin-bottom: 0.75rem;
    }
    .inline-ref {
      color: #e8c46a;
      text-decoration: underline;
      text-decoration-color: rgba(232, 196, 106, 0.4);
      text-underline-offset: 2px;
    }
    .inline-ref:hover {
      text-decoration-color: #e8c46a;
    }
    .back-to-toc:hover { color: #d9cca0; }
    .intro-text {
      font-size: 1.21rem;
      color: rgba(232, 230, 225, 0.85);
      line-height: 1.7;
      margin-bottom: 1rem;
    }
    .intro-lead::first-letter {
      font-family: 'Cinzel', serif;
      font-size: 3.4rem;
      font-weight: 700;
      color: #e8c46a;
      float: left;
      line-height: 0.78;
      padding-top: 0.1rem;
      margin: 0 0.12em 0 0;
    }
    .intro-subhead {
      font-family: 'Cinzel', serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: #e8c46a;
      margin: 1.5rem 0 0.6rem;
      letter-spacing: 0.02em;
    }
    .roadmap h3 {
      font-family: 'Cinzel', serif;
      font-size: 1.32rem;
      font-weight: 500;
      color: #e8e6e1;
      margin: 1.25rem 0 0.5rem;
      letter-spacing: 0.02em;
    }
    .roadmap-list { margin: 0 0 0.5rem 1.25rem; }
    .roadmap-list li {
      font-size: 1.21rem;
      color: rgba(232, 230, 225, 0.85);
      margin-bottom: 0.4rem;
      line-height: 1.5;
    }
    .roadmap hr { border: none; border-top: 1px solid rgba(217,204,160,0.15); margin: 1.5rem 0; }
    .roadmap-caption {
      font-style: italic;
      font-size: 1.04rem;
      color: rgba(232, 230, 225, 0.65);
    }
    @media print {
      .toc-chapter > a { color: #0a0a0a; font-weight: 700; }
      .toc-sections a { color: #4a4a4a; }
      .back-to-toc { display: none; }
      .inline-ref { color: inherit; text-decoration: underline; text-decoration-color: #2d5a3d; }
      .intro-text { color: rgba(10,10,10,0.85); }
      .intro-lead::first-letter { color: #0a0a0a; }
      .roadmap h3 { color: #0a0a0a; font-weight: 700; }
      .roadmap-list li { color: rgba(10,10,10,0.85); }
      .roadmap hr { border-top-color: #cfe0d3; }
      .roadmap-caption { color: #595959; }
    }
    @media screen and (min-width: 641px) and (max-width: 1024px) {
      .chapter { padding: 2rem 1.5rem 1.5rem; }
      .footer-logo { height: 160px; }
    }
    @media screen and (max-width: 640px) {
      .cover { padding: 1.25rem; }
      .cover .logo { height: 110px; }
      .cover h1 { font-size: 1.9rem; }
      .toc { padding: 1.5rem 1rem; }
      .toc-sections { columns: 1; }
      .chapter { padding: 1.25rem 1rem 0.5rem; }
      .data-card { padding: 0.85rem 1rem; }
      .data-card-title { font-size: 1.1rem; }
      .footer-logo { height: 110px; }
      .footer-qr-wrap { padding: 8px; }
      .footer-qr { width: 80px; height: 80px; }
      .footer-meta { font-size: 0.78rem; }
    }
    @media screen and (max-width: 380px) {
      .footer-logo { height: 90px; }
    }
  </style>
</head>
<body>
  <div class="cover">
    <p class="confidential">Private &amp; Confidential</p>
    <img class="logo" src="${LOGO_DATA_URI}" alt="" />
    <h1>LIFE MANUAL</h1>
    <p class="subtitle">Legacy Architect RVA</p>
    <div class="flourish">&#10070;</div>
    <p class="client-name">${client?.userName || "Client"}</p>
    <p class="tier">${tierInfo?.name || tier} Edition</p>
    <p class="meta">Prepared ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
    <div class="cover-disclosure">
      <p>This Life Manual is intended solely for the use and retention of the Client and their designated survivor. The information contained within has been provided by the Client and organized by Legacy Architect RVA into a comprehensive reference designed to assist the designated survivor when needed.</p>
      <p>The contents of this Life Manual are confidential and are intended only for the Client and their designated survivor. Legacy Architect RVA does not authorize the disclosure, distribution, or release of this document or its contents to any other individual or entity without the Client's express permission.</p>
      <p>To protect the Client's privacy, Legacy Architect RVA does not retain copies of the information contained in this Life Manual following its completion and delivery.</p>
    </div>
  </div>
`;

      // ── Introduction ──
      html += `
  <div class="chapter" id="introduction">
    <a class="back-to-toc" href="#toc">&uarr; Table of Contents</a>
    <h2>Introduction</h2>
    <p class="intro-text intro-lead">${linkify(`This Life Manual brings together the accounts, systems, contacts, and instructions identified by the Client into a single, organized reference to help a designated survivor manage important affairs with confidence and clarity.`, refIndex, "#introduction")}</p>
    <p class="intro-text">${linkify(`This manual is intended to be read in the following order: this Introduction, Legal Documents in Force, the Successor Roadmap, and then each chapter in sequence.`, refIndex, "#introduction")}</p>
    <p class="intro-text">Nothing in this document replaces formal legal, financial, tax, or professional advice. Where a chapter references a legal document, attorney, financial advisor, or other professional, that source should be considered the authoritative reference.</p>
    <h3 class="intro-subhead">Confidentiality &amp; Privacy Notice</h3>
    <p class="privacy-note">This Life Manual contains confidential information provided by the Client and is intended solely for the Client and their designated survivor. Legacy Architect RVA has organized this information into a comprehensive reference for the Client's benefit but does not claim ownership of the information contained herein. To protect the Client's privacy, Legacy Architect RVA does not retain copies of the completed Life Manual or the personal information used to create it following its delivery. The contents of this manual should not be disclosed or distributed without the Client's permission.</p>
    <p class="privacy-note">This Life Manual provides high-level orientation and location guidance throughout. It does not contain passwords, security codes, recovery keys, full account numbers, or other sensitive credentials. Nothing in this manual replaces formal legal or professional advice. Refer to original records and trusted advisors as appropriate.</p>
    <div class="flourish">&#10070;</div>
  </div>
`;

  html += `
  <div class="toc" id="toc">
    <h2>Table of Contents</h2>
    <div class="toc-chapter"><a href="#introduction">Introduction</a></div>
    <div class="toc-chapter"><a href="#legal-documents">Legal Documents in Force</a></div>
    <div class="toc-chapter"><a href="#successor-roadmap">Successor Roadmap</a></div>
`;

      for (const ch of accessibleChapters) {
        html += `    <div class="toc-chapter">
      <a href="#${ch.id}">Chapter ${ch.chapterNumber}: ${ch.title}</a>
      <ul class="toc-sections">
`;
        for (const sec of ch.subSections) {
          html += `        <li><a href="#${ch.id}-${sec.id}">${sec.title}</a></li>\n`;
        }
        html += `      </ul>\n    </div>\n`;
      }

      html += `  </div>
`;

      // ── Legal Documents in Force ──
      const legalDocs = manualData?.legalDocuments || [];
      html += `
  <div class="chapter" id="legal-documents">
    <a class="back-to-toc" href="#toc">&uarr; Table of Contents</a>
    <h2>Legal Documents in Force</h2>
    <p class="desc">The following legal documents are currently marked active. Confirm the original or attorney-held copy before relying on any document referenced here.</p>
`;
      if (legalDocs.length > 0) {
        html += `<div class="data-cards">`;
        for (const doc of legalDocs) {
          html += `<div class="data-card">`;
          html += `<div class="data-card-title">${escapeHtml(doc.documentType)}</div>`;
          if (doc.notes) {
            html += `<div class="data-card-row"><span class="data-card-label">Notes</span><span class="data-card-value">${linkify(doc.notes, refIndex, "#legal-documents")}</span></div>`;
          }
          html += `</div>`;
        }
        html += `</div>`;
      } else {
        html += `<p class="empty-note">No legal documents are currently marked in force.</p>`;
      }
      html += `    <div class="flourish">&#10070;</div>
  </div>
`;

      // ── Successor Roadmap ──
      html += `
  <div class="chapter roadmap" id="successor-roadmap">
    <a class="back-to-toc" href="#toc">&uarr; Table of Contents</a>
    <h2>Successor Roadmap</h2>
    ${renderRoadmapMarkdown(SUCCESSOR_ROADMAP_MD, refIndex)}
    <div class="flourish">&#10070;</div>
  </div>
`;

      for (const ch of accessibleChapters) {
        html += `
  <div class="chapter" id="${ch.id}">
    <a class="back-to-toc" href="#toc">&uarr; Table of Contents</a>
    <h2>Chapter ${ch.chapterNumber}: ${ch.title}</h2>
    <p class="desc">${ch.description}</p>
`;
        for (const sec of ch.subSections) {
          const sectionKey = `${ch.id}:${sec.id}`;
          const realRows = manualData?.rowsBySection[sectionKey] || [];
          const realFields = manualData?.fieldsBySection[sectionKey] || {};
          const hasTableData = realRows.length > 0;
          const hasFieldData = Object.keys(realFields).length > 0;

          html += `    <div class="section" id="${ch.id}-${sec.id}"><h3>${sec.title}</h3>`;

          const tableAlreadyShowedEmpty = !!(sec.tableColumns && sec.tableColumns.length > 0 && !hasTableData);

          if (sec.tableColumns && sec.tableColumns.length > 0) {
            if (hasTableData) {
              html += `<div class="data-cards">`;
              for (const row of realRows) {
                html += `<div class="data-card">`;
                const [titleCol, ...restCols] = sec.tableColumns;
                const titleValue = row[titleCol.key] || "";
                if (titleValue) {
                  html += `<div class="data-card-title">${escapeHtml(titleValue)}</div>`;
                }
                for (const col of restCols) {
                  const value = row[col.key] || "";
                  if (!value) continue;
                  html += `<div class="data-card-row"><span class="data-card-label">${col.label}</span><span class="data-card-value">${linkify(value, refIndex, `#${ch.id}-${sec.id}`)}</span></div>`;
                }
                html += `</div>`;
              }
              html += `</div>`;
            } else {
              html += `<p class="empty-note">Not yet provided.</p>`;
            }
          }

          if (sec.fields && sec.fields.length > 0) {
            if (hasFieldData) {
              for (const field of sec.fields) {
                const value = realFields[field.id];
                if (!value) continue;
                html += `<div class="field"><strong>${field.label}:</strong> <span>${linkify(value, refIndex, `#${ch.id}-${sec.id}`)}</span></div>`;
              }
            } else if (!tableAlreadyShowedEmpty) {
              html += `<p class="empty-note">Not yet provided.</p>`;
            }
          }

          html += `</div>`;
        }
        html += `    <div class="flourish">&#10070;</div>\n  </div>`;
      }

      html += `
  <div class="footer">
    <img class="footer-logo" src="${LOGO_DATA_URI}" alt="" />
    <div class="flourish">&#10070;</div>
    <p class="footer-tagline">Order in Your Absence</p>
    <p class="footer-meta">legacyarchitectrva.com<br>help@legacyarchitectrva.com &middot; (804) 866-1320</p>
    <div class="footer-qr-wrap"><img class="footer-qr" src="${QR_CODE_DATA_URI}" alt="" /></div>
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
