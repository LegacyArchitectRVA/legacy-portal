import { useQuery } from "convex/react";
import { RiErrorWarningLine as AlertTriangle, RiArrowLeftLine as ArrowLeft, RiBookOpenLine as BookOpen, RiDownloadLine as Download, RiFileTextLine as FileText, RiLoader4Line as Loader2 } from "@remixicon/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { chapters } from "../data/chapters";
import { canAccessChapter, getTierByName } from "../data/tiers";
import { LOGO_DATA_URI, QR_CODE_DATA_URI } from "../lib/brandAssets";
// @ts-ignore - Vite raw-text import, used to embed the Paged.js polyfill so
// the print-accurate preview works fully offline rather than depending on a
// CDN at preview time.
import PAGEDJS_POLYFILL from "../lib/pagedPolyfill.txt?raw";
import { BRAND_FONT_HEAD, BRAND_FONT_BODY, GOOGLE_FONTS_LINK, BRAND_BLACK, BRAND_OFFWHITE, BRAND_GOLD, BRAND_GOLD_LIGHT, BRAND_CREAM, BRAND_GREEN_PRINT } from "../lib/brandTokens";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// A curated topic index, not just an alphabetized restating of the table of
// contents. The point is covering the words someone would actually search
// for ("attorney", "bank", "pets") even when they don't match a section
// title exactly, since Ctrl+F only finds what's literally on the page, and
// doesn't exist at all on a printed copy. Each ref names its own anchor and
// label directly rather than being resolved from chapter data, since a few
// terms point at special top-level sections (Legal Documents in Force) that
// aren't part of the regular chapter/section structure.
const INDEX_TERMS: { term: string; refs: { anchor: string; label: string; chapterId?: string }[] }[] = [
  { term: "Accounts, financial", refs: [{ anchor: "financial-accounts_institutions", label: "Accounts & Institutions", chapterId: "financial" }, { anchor: "digital-digital_financial", label: "Digital Financial Accounts", chapterId: "digital" }] },
  { term: "Attorney", refs: [{ anchor: "emergency-emergency_contacts", label: "Emergency Contacts", chapterId: "emergency" }, { anchor: "legal-documents", label: "Legal Documents in Force" }] },
  { term: "Bank, banking", refs: [{ anchor: "financial-accounts_institutions", label: "Accounts & Institutions", chapterId: "financial" }, { anchor: "digital-digital_financial", label: "Digital Financial Accounts", chapterId: "digital" }] },
  { term: "Beneficiaries", refs: [{ anchor: "financial-beneficiaries", label: "Beneficiaries Overview", chapterId: "financial" }] },
  { term: "Business assets", refs: [{ anchor: "business-business_assets", label: "Business Assets & Property", chapterId: "business" }] },
  { term: "Car, vehicle", refs: [{ anchor: "household-vehicle_info", label: "Vehicle Information", chapterId: "household" }] },
  { term: "Children, dependents", refs: [{ anchor: "emergency-child_care_dependents", label: "Child Care & Dependents", chapterId: "emergency" }] },
  { term: "Cloud storage", refs: [{ anchor: "digital-cloud_storage", label: "Cloud Storage", chapterId: "digital" }] },
  { term: "Contracts", refs: [{ anchor: "business-contracts_obligations", label: "Contracts & Obligations", chapterId: "business" }] },
  { term: "Credit, loans", refs: [{ anchor: "business-loan_credit", label: "Loan & Credit Agreements", chapterId: "business" }] },
  { term: "Devices, computers, phones", refs: [{ anchor: "digital-devices_os", label: "Devices & Operating Systems", chapterId: "digital" }] },
  { term: "Doctor, physician", refs: [{ anchor: "vitals-medical_providers", label: "Active Medical Providers", chapterId: "vitals" }] },
  { term: "Email", refs: [{ anchor: "digital-primary_email", label: "Primary E-Mail", chapterId: "digital" }] },
  { term: "Emergency contacts", refs: [{ anchor: "emergency-emergency_contacts", label: "Emergency Contacts", chapterId: "emergency" }] },
  { term: "Employees, staff", refs: [{ anchor: "business-internal_leadership", label: "Internal Leadership", chapterId: "business" }] },
  { term: "Final wishes, funeral", refs: [{ anchor: "context-final_wishes", label: "Final Wishes", chapterId: "context" }] },
  { term: "Guardian", refs: [{ anchor: "emergency-child_care_dependents", label: "Child Care & Dependents", chapterId: "emergency" }] },
  { term: "Home, house", refs: [{ anchor: "household-home_systems", label: "Home Systems & Shut-offs", chapterId: "household" }] },
  { term: "Identification documents", refs: [{ anchor: "vitals-identification_documents", label: "Identification Documents", chapterId: "vitals" }] },
  { term: "Insurance", refs: [{ anchor: "financial-insurance_policies", label: "Insurance Policies", chapterId: "financial" }, { anchor: "business-business_insurance", label: "Business Insurance & Risk Coverage", chapterId: "business" }] },
  { term: "Key relationships", refs: [{ anchor: "business-key_relationships", label: "Key Relationships", chapterId: "business" }] },
  { term: "Locks, alarms, security", refs: [{ anchor: "household-security_access", label: "Security & Access", chapterId: "household" }] },
  { term: "Medical information, medications", refs: [{ anchor: "vitals-medical_information", label: "Medical Information", chapterId: "vitals" }] },
  { term: "Passwords", refs: [{ anchor: "digital-password_manager", label: "Password Manager", chapterId: "digital" }, { anchor: "digital-twofa_recovery", label: "2FA & Recovery Codes", chapterId: "digital" }] },
  { term: "Personal values, legacy", refs: [{ anchor: "context-personal_values", label: "Personal Values & Context", chapterId: "context" }] },
  { term: "Pets", refs: [{ anchor: "household-petcare", label: "Petcare", chapterId: "household" }] },
  { term: "Photos, memories, social media", refs: [{ anchor: "digital-online_presence", label: "Online Presence", chapterId: "digital" }, { anchor: "context-digital_narrative_control", label: "Digital & Narrative Control", chapterId: "context" }] },
  { term: "Property, real estate", refs: [{ anchor: "financial-titles_ownership", label: "Titles & Ownership", chapterId: "financial" }, { anchor: "business-business_assets", label: "Business Assets & Property", chapterId: "business" }] },
  { term: "Subscriptions, renewals", refs: [{ anchor: "digital-subscriptions_renewals", label: "Subscriptions & Renewals", chapterId: "digital" }] },
  { term: "Successor, who's in charge", refs: [{ anchor: "emergency-emergency_contacts", label: "Emergency Contacts", chapterId: "emergency" }, { anchor: "business-internal_leadership", label: "Internal Leadership", chapterId: "business" }, { anchor: "successor-roadmap", label: "Successor Roadmap" }] },
  { term: "Two-factor authentication, recovery codes", refs: [{ anchor: "digital-twofa_recovery", label: "2FA & Recovery Codes", chapterId: "digital" }] },
  { term: "Utilities", refs: [{ anchor: "household-home_systems", label: "Home Systems & Shut-offs", chapterId: "household" }] },
  { term: "Vendors, service providers", refs: [{ anchor: "business-vendor_agreements", label: "Vendor & Service Agreements", chapterId: "business" }] },
  { term: "Will, power of attorney", refs: [{ anchor: "legal-documents", label: "Legal Documents in Force" }, { anchor: "context-final_wishes", label: "Final Wishes", chapterId: "context" }] },
];

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
- Review all digital accounts in Chapter 1: Digital Life
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
  const clients = useQuery(api.admin.listClients, isAdmin ? {} : "skip");
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

      // Quick Reference data — pulled from existing entries (Emergency
      // Contacts, Legal Documents, First 48-Hours Plan) rather than a new
      // form; needed both for the TOC entry and the section itself.
      const qrPrimaryContact = (manualData?.rowsBySection["emergency:emergency_contacts"] || [])[0];
      const qrWill = (manualData?.legalDocuments || []).find((d: any) => d.documentType === "Will" && d.inForce);
      const qrFirstStep = manualData?.fieldsBySection["emergency:first_48_hours"]?.["crisis_step1"];
      const showQuickReference = !!(qrPrimaryContact || qrWill || qrFirstStep);

      const accessibleChapterIds = new Set(accessibleChapters.map((c) => c.id));
      const visibleIndexTerms = INDEX_TERMS
        .map((entry) => ({
          term: entry.term,
          refs: entry.refs.filter((r) => !r.chapterId || accessibleChapterIds.has(r.chapterId)),
        }))
        .filter((entry) => entry.refs.length > 0)
        .sort((a, b) => a.term.localeCompare(b.term));

      let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Life Manual - ${client?.userName || "Client"}</title>
  <link href="${GOOGLE_FONTS_LINK}" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; overflow-wrap: break-word; word-break: break-word; }
    @page {
      margin: 0.6in 0.55in;
      @bottom-center {
        content: "Legacy Architect RVA  |  ${(client?.userName || "Client").replace(/"/g, '\\"')}'s Life Manual   |   Page " counter(page) " of " counter(pages);
        font-family: ${BRAND_FONT_BODY};
        font-size: 13px;
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
      font-family: ${BRAND_FONT_BODY};
      background: #000000;
      color: ${BRAND_OFFWHITE};
      line-height: 1.6;
      padding-bottom: 2.5rem;
    }
    @media print {
      body { padding-bottom: 0; }
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
      color: ${BRAND_CREAM};
      padding: 2rem;
      box-shadow: inset 0 0 0 1px rgba(217,204,160,0.32);
    }
    .cover .confidential {
      font-size: 0.7rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(217, 204, 160, 0.55);
      margin-bottom: 2.5rem;
    }
    .cover .logo {
      height: 175px;
      margin-bottom: 1.25rem;
    }
    .cover h1 {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      background: linear-gradient(135deg, ${BRAND_GOLD_LIGHT}, ${BRAND_GOLD});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .cover .subtitle {
      font-size: 1.15rem;
      opacity: 0.6;
      margin-top: 1rem;
      font-family: ${BRAND_FONT_BODY};
    }
    .flourish {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 0.85rem;
      margin: 1.25rem 0;
      color: ${BRAND_GOLD};
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
      background: linear-gradient(90deg, transparent, ${BRAND_GOLD}, transparent);
    }
    .cover .client-name {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1.5rem;
      margin-top: 2.5rem;
    }
    .cover .tier {
      font-size: 1.09rem;
      opacity: 0.5;
      margin-top: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-family: ${BRAND_FONT_BODY};
    }
    .cover .meta {
      font-size: 0.98rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(217,204,160,0.6);
      margin-top: 2rem;
    }
    .chapter {
      padding: 2.5rem 2rem 1rem;
      border-bottom: 2px solid rgba(217, 204, 160, 0.22);
    }
    .chapter + .chapter {
      margin-top: 0.5rem;
    }
    .chapter h2 {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1.7rem;
      font-weight: 600;
      margin-bottom: 0.6rem;
      padding-bottom: 0.45rem;
      color: ${BRAND_CREAM};
      letter-spacing: 0.015em;
      border-bottom: 1.5px solid rgba(217, 204, 160, 0.35);
      page-break-after: avoid;
      break-after: avoid;
    }
    .chapter .desc {
      font-size: 1.21rem;
      color: rgba(232, 230, 225, 0.8);
      margin-bottom: 1.1rem;
      font-family: ${BRAND_FONT_BODY};
    }
    .as-of-date {
      font-size: 0.85rem;
      color: rgba(217, 204, 160, 0.55);
      margin-top: -0.5rem;
      margin-bottom: 1rem;
      font-style: italic;
    }
    .section {
      margin-bottom: 1.2rem;
    }
    .section h3 {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1.4rem;
      font-weight: 500;
      color: ${BRAND_OFFWHITE};
      margin-bottom: 0.5rem;
      letter-spacing: 0.02em;
      page-break-after: avoid;
      break-after: avoid;
    }
    .data-cards {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      margin-top: 0.6rem;
    }
    .data-card {
      background: rgba(217, 204, 160, 0.04);
      border: 1px solid rgba(217, 204, 160, 0.18);
      border-left: 3px solid ${BRAND_GOLD};
      border-radius: 6px;
      padding: 0.95rem 1.35rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.25);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .data-card-title {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1.3rem;
      font-weight: 600;
      color: ${BRAND_GOLD_LIGHT};
      margin-bottom: 0.65rem;
      letter-spacing: 0.01em;
    }
    .data-card-row {
      margin-bottom: 0.45rem;
    }
    .data-card-row:last-child {
      margin-bottom: 0;
    }
    .data-card-label {
      display: block;
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: rgba(217, 204, 160, 0.85);
      margin-bottom: 0.2rem;
    }
    .data-card-value {
      display: block;
      font-size: 0.95rem;
      color: rgba(232, 230, 225, 0.85);
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
      font-size: 0.95rem;
      color: rgba(232, 230, 225, 0.85);
      margin-bottom: 0.4rem;
      line-height: 1.5;
    }
    .field strong {
      color: rgba(217, 204, 160, 0.85);
      font-family: ${BRAND_FONT_HEAD};
      font-weight: 700;
      font-size: 1.1rem;
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
      font-family: ${BRAND_FONT_HEAD};
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
      margin-top: 1.2rem;
    }
    @media print {
      .cover { height: auto; min-height: 100vh; box-shadow: inset 0 0 0 1px rgba(45,90,61,0.35); }
      .cover .confidential { color: #1f3d2a; font-size: 0.81rem; }
      .intro-subhead { color: ${BRAND_BLACK}; font-weight: 700; }
      .cover .logo { height: 350px; }
      body { background: white; color: black; }
      .cover { background: white; color: ${BRAND_BLACK}; }
      .chapter { page-break-before: always; border-bottom: none; }
      .cover h1 { background: none; -webkit-text-fill-color: ${BRAND_BLACK}; color: ${BRAND_BLACK}; font-size: 2.88rem; }
      .flourish { color: ${BRAND_BLACK}; font-size: 0.75rem; }
      .flourish::before, .flourish::after { background: linear-gradient(90deg, transparent, ${BRAND_GOLD}, transparent); }
      .cover .meta, .cover .subtitle { color: ${BRAND_BLACK}; font-weight: 700; opacity: 1; }
      .cover .subtitle { font-size: 1.15rem; }
      .cover .client-name { font-size: 1.73rem; }
      .cover .tier { font-size: 1.09rem; opacity: 0.7; }
      .cover .meta { font-size: 0.98rem; }
      .chapter h2 { color: ${BRAND_BLACK}; font-size: 1.95rem; border-bottom-color: ${BRAND_BLACK}; }
      .chapter .desc { color: #4a4a4a; font-size: 1.21rem; }
      .as-of-date { color: #6b6b6b; font-size: 0.78rem; }
      .section h3 { color: ${BRAND_BLACK}; font-weight: 700; font-size: 1.6rem; }
      .data-card { background: #f7f5ee; border-color: #ddd3ad; border-left-color: ${BRAND_GREEN_PRINT}; box-shadow: none; }
      .data-card-title { color: ${BRAND_BLACK}; font-weight: 700; font-size: 1.5rem; }
      .data-card-label { color: ${BRAND_BLACK}; font-size: 1.15rem; font-weight: 700; }
      .data-card-value { color: #1a1a1a; font-weight: 500; font-size: 1.09rem; }
      .field { color: rgba(26,26,26,0.9); font-size: 1.09rem; font-weight: 500; }
      .field strong { color: ${BRAND_BLACK}; font-weight: 700; font-size: 1.15rem; }
      .empty, .empty-note { color: #6b6b6b; }
      .empty-note { font-size: 1.15rem; }
      .footer-tagline { color: ${BRAND_BLACK}; font-weight: 700; font-size: 1.21rem; }
      .footer-meta { color: #5c5c5c; font-size: 0.81rem; }
      .privacy-note { color: #595959; border-left-color: #ccc; font-size: 1.09rem; }
    }
    html { scroll-behavior: smooth; }
    .print-measure-mode {
      position: fixed;
      top: 0;
      left: -99999px;
      width: 710px;
      visibility: hidden;
      pointer-events: none;
    }
    .print-measure-mode .chapter h2 { font-size: 1.95rem; }
    .print-measure-mode .chapter .desc { font-size: 1.21rem; }
    .print-measure-mode .as-of-date { font-size: 0.78rem; }
    .print-measure-mode .section h3 { font-size: 1.6rem; }
    .print-measure-mode .data-card-title { font-size: 1.5rem; }
    .print-measure-mode .data-card-label { font-size: 1.15rem; }
    .print-measure-mode .data-card-value { font-size: 1.09rem; }
    .print-measure-mode .field { font-size: 1.09rem; }
    .print-measure-mode .field strong { font-size: 1.15rem; }
    .print-measure-mode .empty-note { font-size: 1.15rem; }
    .print-measure-mode .toc h2 { font-size: 1.95rem; }
    .print-measure-mode .toc-chapter > a { font-size: 1.04rem; }
    .print-measure-mode .toc-sections a { font-size: 0.95rem; }
    .screen-page-indicator {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(10, 8, 6, 0.92);
      border-top: 1px solid rgba(217, 204, 160, 0.25);
      color: rgba(232, 230, 225, 0.85);
      font-family: ${BRAND_FONT_BODY};
      font-size: 0.78rem;
      letter-spacing: 0.02em;
      padding: 0.55rem 1.25rem;
      text-align: center;
      z-index: 9998;
      backdrop-filter: blur(4px);
    }
    .screen-page-indicator strong {
      color: ${BRAND_GOLD_LIGHT};
      font-weight: 600;
    }
    @media print {
      .screen-page-indicator, .print-measure-mode { display: none; }
    }
    .toc {
      padding: 2.5rem 2rem;
      page-break-before: always;
      break-before: page;
    }
    .toc-chapter { page-break-inside: avoid; break-inside: avoid; }
    .toc h2 {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1.5rem;
      color: ${BRAND_CREAM};
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .toc-chapter { margin-bottom: 1.1rem; }
    .toc-chapter > a {
      display: flex;
      width: 100%;
      align-items: baseline;
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1.15rem;
      color: ${BRAND_GOLD_LIGHT};
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
      display: flex;
      width: 100%;
      align-items: baseline;
      font-size: 1.04rem;
      color: rgba(232,230,225,0.85);
      text-decoration: none;
    }
    .toc-pagenum {
      margin-left: auto;
      padding-left: 1em;
      font-family: ${BRAND_FONT_BODY};
      font-size: 0.85em;
      opacity: 0.65;
      flex: 0 0 auto;
    }
    .toc-sections a:hover { color: ${BRAND_CREAM}; text-decoration: underline; }
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
    .copy-ref-btn {
      display: inline-block;
      margin-left: 0.7em;
      font-size: 0.55em;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: rgba(217,204,160,0.5);
      background: transparent;
      border: 1px solid rgba(217,204,160,0.3);
      border-radius: 4px;
      padding: 0.2em 0.55em;
      cursor: pointer;
      font-family: 'Libre Baskerville', serif;
      vertical-align: middle;
      transition: color 0.15s, border-color 0.15s;
    }
    .copy-ref-btn:hover { color: rgba(217,204,160,0.9); border-color: rgba(217,204,160,0.6); }
    .copy-ref-btn.copied { color: #e8c46a; border-color: #e8c46a; }
    @media print {
      .copy-ref-btn { display: none; }
    }
    .inline-ref {
      color: ${BRAND_GOLD_LIGHT};
      text-decoration: underline;
      text-decoration-color: rgba(232, 196, 106, 0.4);
      text-underline-offset: 2px;
    }
    .inline-ref:hover {
      text-decoration-color: ${BRAND_GOLD_LIGHT};
    }
    .back-to-toc:hover { color: ${BRAND_CREAM}; }
    .intro-text {
      font-size: 1.21rem;
      color: rgba(232, 230, 225, 0.85);
      line-height: 1.7;
      margin-bottom: 1rem;
    }
    .intro-lead::first-letter {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 3.4rem;
      font-weight: 700;
      color: ${BRAND_GOLD_LIGHT};
      float: left;
      line-height: 0.78;
      padding-top: 0.1rem;
      margin: 0 0.12em 0 0;
    }
    .intro-subhead {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1.15rem;
      font-weight: 600;
      color: ${BRAND_GOLD_LIGHT};
      margin: 1rem 0 0.5rem;
      letter-spacing: 0.02em;
    }
    .roadmap h3 {
      font-family: ${BRAND_FONT_HEAD};
      font-size: 1.32rem;
      font-weight: 500;
      color: ${BRAND_OFFWHITE};
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
      .toc-chapter > a { color: ${BRAND_BLACK}; font-weight: 700; }
      .toc-pagenum { opacity: 1; color: #4a4a4a; }
      .toc-sections a { color: #4a4a4a; }
      .back-to-toc { display: none; }
      .inline-ref { color: inherit; text-decoration: underline; text-decoration-color: ${BRAND_GREEN_PRINT}; }
      .intro-text { color: rgba(10,10,10,0.85); }
      .intro-lead::first-letter { color: ${BRAND_BLACK}; }
      .roadmap h3 { color: ${BRAND_BLACK}; font-weight: 700; }
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
    <p class="client-name">${client?.userName || "Client"}</p>
    <p class="tier">${tierInfo?.name || tier} Edition</p>
    <p class="meta">Prepared ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
  </div>
`;

      // ── Quick Reference ──
      if (showQuickReference) {
        html += `
  <div class="chapter" id="quick-reference">
    <h2>Quick Reference</h2>
    <p class="desc">The essentials, for when there isn't time to read further. For complete information, see Emergency Contacts, Legal Documents in Force, and the Successor Roadmap.</p>
    <div class="data-cards">
`;
        if (qrPrimaryContact) {
          html += `<div class="data-card">
      <div class="data-card-title">Primary Contact</div>
      ${qrPrimaryContact.name ? `<div class="data-card-row"><span class="data-card-label">Name / Role</span><span class="data-card-value">${escapeHtml(qrPrimaryContact.name)}</span></div>` : ""}
      ${qrPrimaryContact.phone ? `<div class="data-card-row"><span class="data-card-label">Phone Number</span><span class="data-card-value">${escapeHtml(qrPrimaryContact.phone)}</span></div>` : ""}
      ${qrPrimaryContact.trigger ? `<div class="data-card-row"><span class="data-card-label">When to Involve</span><span class="data-card-value">${escapeHtml(qrPrimaryContact.trigger)}</span></div>` : ""}
    </div>`;
        }
        if (qrWill) {
          html += `<div class="data-card">
      <div class="data-card-title">Will &amp; Key Documents</div>
      ${qrWill.notes ? `<div class="data-card-row"><span class="data-card-label">Notes</span><span class="data-card-value">${escapeHtml(qrWill.notes)}</span></div>` : ""}
    </div>`;
        }
        if (qrFirstStep) {
          html += `<div class="data-card">
      <div class="data-card-title">First Step</div>
      <div class="data-card-row"><span class="data-card-label">Secure the Home</span><span class="data-card-value">${escapeHtml(qrFirstStep)}</span></div>
    </div>`;
        }
        html += `
    </div>
    <div class="flourish">&#10070;</div>
  </div>
`;
      }

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
    ${showQuickReference ? `<div class="toc-chapter"><a href="#quick-reference">Quick Reference</a></div>` : ""}
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

      if (visibleIndexTerms.length > 0) {
        html += `    <div class="toc-chapter"><a href="#index">Index</a></div>\n`;
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
        const chapterLastUpdated = manualData?.lastUpdatedByChapter?.[ch.id];
        html += `
  <div class="chapter" id="${ch.id}">
    <a class="back-to-toc" href="#toc">&uarr; Table of Contents</a>
    <h2>Chapter ${ch.chapterNumber}: ${ch.title}<button class="copy-ref-btn" data-copy-ref="${escapeHtml(`Chapter ${ch.chapterNumber}: ${ch.title}`)}">Copy Reference</button></h2>
    ${chapterLastUpdated ? `<p class="as-of-date">As of ${new Date(chapterLastUpdated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>` : ""}
    <p class="desc">${ch.description}</p>
`;
        for (const sec of ch.subSections) {
          const sectionKey = `${ch.id}:${sec.id}`;
          const realRows = manualData?.rowsBySection[sectionKey] || [];
          const realFields = manualData?.fieldsBySection[sectionKey] || {};
          const hasTableData = realRows.length > 0;
          const hasFieldData = Object.keys(realFields).length > 0;

          html += `    <div class="section" id="${ch.id}-${sec.id}"><h3>${sec.title}<button class="copy-ref-btn" data-copy-ref="${escapeHtml(`Chapter ${ch.chapterNumber}: ${ch.title} \u2192 ${sec.title}`)}">Copy Reference</button></h3>`;

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

      // ── Index ──
      if (visibleIndexTerms.length > 0) {
        html += `
  <div class="chapter" id="index">
    <a class="back-to-toc" href="#toc">&uarr; Table of Contents</a>
    <h2>Index</h2>
    <p class="desc">Common topics and where to find them, for when the exact section name isn't obvious.</p>
    <div class="toc-sections" style="columns: 1;">
`;
        for (const entry of visibleIndexTerms) {
          for (const ref of entry.refs) {
            html += `      <div class="toc-chapter" style="margin-bottom: 0.5rem;"><a href="#${ref.anchor}"><strong>${escapeHtml(entry.term)}</strong>, ${escapeHtml(ref.label)}</a></div>\n`;
          }
        }
        html += `
    </div>
  </div>
`;
      }

      html += `
  <div class="footer">
    <img class="footer-logo" src="${LOGO_DATA_URI}" alt="" />
    <div class="flourish">&#10070;</div>
    <p class="footer-tagline">Order in Your Absence</p>
    <p class="footer-meta">legacyarchitectrva.com<br>help@legacyarchitectrva.com &middot; (804) 866-1320</p>
    <div class="footer-qr-wrap"><img class="footer-qr" src="${QR_CODE_DATA_URI}" alt="" /></div>
  </div>
  <script>
    window.computeTocPageNumbers = function() {
      var PAGE_HEIGHT_PX = 9.8 * 96; // Letter height minus 0.6in top+bottom @page margins, at 96 CSS px/in
      var sectionPage = new Map(); // section/chapter/toc element -> page number where it starts
      var page = 2; // the cover always occupies exactly page 1 (page-break-after:always, min-height:100vh)

      var topLevel = Array.prototype.slice.call(document.querySelectorAll('.toc, .chapter'));
      for (var t = 0; t < topLevel.length; t++) {
        var el = topLevel[t];
        sectionPage.set(el, page);
        if (el.classList.contains('toc')) {
          page += Math.max(1, Math.ceil(el.offsetHeight / PAGE_HEIGHT_PX));
          continue;
        }
        // Simulate atomic-unit pagination within this chapter, since cards have
        // page-break-inside:avoid and can leave a gap at the bottom of a page,
        // which simple total-height division doesn't account for. Chapters that
        // don't use the .section/.data-card structure (Introduction, Legal
        // Documents, Successor Roadmap) fall back to simple height division.
        var sections = el.querySelectorAll('.section');
        if (sections.length === 0) {
          page += Math.max(1, Math.ceil(el.offsetHeight / PAGE_HEIGHT_PX));
          continue;
        }
        var units = [];
        for (var s = 0; s < sections.length; s++) {
          var sectionEl = sections[s];
          var heading = sectionEl.querySelector('h3');
          var cards = sectionEl.querySelectorAll('.data-card');
          if (cards.length > 0) {
            for (var c = 0; c < cards.length; c++) {
              units.push({
                sectionEl: sectionEl,
                isFirst: c === 0,
                top: (c === 0 && heading ? heading : cards[c]).getBoundingClientRect().top,
              });
            }
          } else {
            units.push({ sectionEl: sectionEl, isFirst: true, top: sectionEl.getBoundingClientRect().top });
          }
        }
        var chapterHeading = el.querySelector('h2');
        var startTop = chapterHeading ? chapterHeading.getBoundingClientRect().top : el.getBoundingClientRect().top;
        var chapterBottom = el.getBoundingClientRect().bottom;
        var currentPage = page;
        var used = 0;
        var lastTop = startTop;
        for (var u = 0; u < units.length; u++) {
          var nextTop = (u + 1 < units.length) ? units[u + 1].top : chapterBottom;
          var unitHeight = Math.max(0, nextTop - units[u].top) + (u === 0 ? (units[u].top - startTop) : 0);
          if (used > 0 && used + unitHeight > PAGE_HEIGHT_PX) {
            currentPage += 1;
            used = 0;
          }
          if (units[u].isFirst && !sectionPage.has(units[u].sectionEl)) {
            sectionPage.set(units[u].sectionEl, currentPage);
          }
          used += unitHeight;
        }
        page = used > 0 ? currentPage + 1 : currentPage;
      }

      var links = document.querySelectorAll('.toc-chapter > a, .toc-sections a');
      for (var j = 0; j < links.length; j++) {
        var link = links[j];
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) !== '#') continue;
        var target = document.getElementById(href.slice(1));
        if (!target) continue;
        var pageNum = sectionPage.get(target) || sectionPage.get(target.closest('.toc, .chapter'));
        if (!pageNum) continue;
        var existing = link.querySelector('.toc-pagenum');
        if (existing) existing.remove();
        var span = document.createElement('span');
        span.className = 'toc-pagenum';
        span.textContent = String(pageNum);
        link.appendChild(span);
      }
    };
    window.addEventListener('beforeprint', window.computeTocPageNumbers);

    // ── Screen page indicator ──
    // Shows a live "you are here" footer on screen that estimates which PDF
    // page the current scroll position corresponds to, so someone viewing
    // the HTML and someone viewing the printed PDF can reference the same
    // spot. Print CSS only applies during an actual print action, so to
    // estimate this while just scrolling on screen, we measure against a
    // hidden clone with the print font-sizes/width applied directly (see
    // .print-measure-mode rules above). If those print sizes ever change,
    // update the matching .print-measure-mode rule too.
    (function () {
      var PAGE_HEIGHT_PX = 9.8 * 96;
      var chapterMeta = []; // { real, startPage, pageCount }

      function buildMeasureClone() {
        var clone = document.createElement('div');
        clone.className = 'print-measure-mode';
        var realChapters = Array.prototype.slice.call(document.querySelectorAll('.toc, .chapter'));
        var clonedNodes = realChapters.map(function (el) { return el.cloneNode(true); });
        clonedNodes.forEach(function (n) { clone.appendChild(n); });
        document.body.appendChild(clone);

        var page = 2; // cover is always exactly page 1
        for (var i = 0; i < clonedNodes.length; i++) {
          var cloneEl = clonedNodes[i];
          var realEl = realChapters[i];
          var startPage = page;
          if (cloneEl.classList.contains('toc')) {
            page += Math.max(1, Math.ceil(cloneEl.offsetHeight / PAGE_HEIGHT_PX));
            chapterMeta.push({ real: realEl, startPage: startPage, pageCount: page - startPage });
            continue;
          }
          var sections = cloneEl.querySelectorAll('.section');
          if (sections.length === 0) {
            page += Math.max(1, Math.ceil(cloneEl.offsetHeight / PAGE_HEIGHT_PX));
            chapterMeta.push({ real: realEl, startPage: startPage, pageCount: page - startPage });
            continue;
          }
          // Same atomic-unit simulation as computeTocPageNumbers: walk card by
          // card so a page-break-inside:avoid card that doesn't fit on the
          // current page is correctly counted as starting a new one.
          var units = [];
          for (var s = 0; s < sections.length; s++) {
            var sectionEl = sections[s];
            var heading = sectionEl.querySelector('h3');
            var cards = sectionEl.querySelectorAll('.data-card');
            if (cards.length > 0) {
              for (var c = 0; c < cards.length; c++) {
                units.push({ top: (c === 0 && heading ? heading : cards[c]).getBoundingClientRect().top });
              }
            } else {
              units.push({ top: sectionEl.getBoundingClientRect().top });
            }
          }
          var chapterHeading = cloneEl.querySelector('h2');
          var startTop = chapterHeading ? chapterHeading.getBoundingClientRect().top : cloneEl.getBoundingClientRect().top;
          var chapterBottom = cloneEl.getBoundingClientRect().bottom;
          var currentPage = page;
          var used = 0;
          for (var u = 0; u < units.length; u++) {
            var nextTop = (u + 1 < units.length) ? units[u + 1].top : chapterBottom;
            var unitHeight = Math.max(0, nextTop - units[u].top) + (u === 0 ? (units[u].top - startTop) : 0);
            if (used > 0 && used + unitHeight > PAGE_HEIGHT_PX) {
              currentPage += 1;
              used = 0;
            }
            used += unitHeight;
          }
          page = used > 0 ? currentPage + 1 : currentPage;
          chapterMeta.push({ real: realEl, startPage: startPage, pageCount: page - startPage });
        }
        clone.remove();
      }

      function currentChapterAndFraction() {
        var refY = window.scrollY + 80;
        for (var i = 0; i < chapterMeta.length; i++) {
          var el = chapterMeta[i].real;
          var top = el.offsetTop;
          var bottom = top + el.offsetHeight;
          if (refY >= top && refY < bottom) {
            var fraction = (refY - top) / Math.max(1, el.offsetHeight);
            return { meta: chapterMeta[i], fraction: Math.min(0.999, Math.max(0, fraction)) };
          }
        }
        if (chapterMeta.length && refY < chapterMeta[0].real.offsetTop) {
          return { meta: chapterMeta[0], fraction: 0 };
        }
        return null;
      }

      function headingText(el) {
        if (!el) return '';
        var clone = el.cloneNode(true);
        var btn = clone.querySelector('button');
        if (btn) btn.remove();
        return clone.textContent.trim();
      }

      function chapterLabel(el) {
        if (el.classList.contains('toc')) return 'Table of Contents';
        var h2 = el.querySelector('h2');
        var heading = h2 ? headingText(h2) : 'Life Manual';
        var refY = window.scrollY + 80;
        var sections = el.querySelectorAll('.section');
        var sectionLabel = null;
        for (var i = 0; i < sections.length; i++) {
          var s = sections[i];
          if (s.offsetTop <= refY) {
            var h3 = s.querySelector('h3');
            sectionLabel = h3 ? headingText(h3) : null;
          }
        }
        return sectionLabel ? heading + ' \u2014 ' + sectionLabel : heading;
      }

      var totalPages = null;
      function update() {
        var result = currentChapterAndFraction();
        var bar = document.getElementById('screen-page-indicator');
        if (!bar) return;
        if (!result) {
          bar.innerHTML = '<strong>Life Manual</strong>';
          return;
        }
        var meta = result.meta;
        var estPage = meta.startPage + Math.floor(result.fraction * meta.pageCount);
        var label = chapterLabel(meta.real);
        bar.innerHTML = label + ' &nbsp;&middot;&nbsp; <strong>Page ' + estPage + (totalPages ? ' of ' + totalPages : '') + ' (PDF)</strong>';
      }

      var ticking = false;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { update(); ticking = false; });
      }

      window.addEventListener('load', function () {
        var bar = document.createElement('div');
        bar.id = 'screen-page-indicator';
        bar.className = 'screen-page-indicator';
        document.body.appendChild(bar);
        buildMeasureClone();
        if (chapterMeta.length) {
          var last = chapterMeta[chapterMeta.length - 1];
          totalPages = last.startPage + last.pageCount - 1;
        }
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', function () {
          chapterMeta = [];
          buildMeasureClone();
          update();
        });
      });
    })();

    // ── Copy Reference buttons ──
    // Lets someone reading on screen grab a plain-text location (chapter +
    // section name) to text or email someone else, e.g. an attorney looking
    // at their own copy of the same file. A raw #anchor link isn't reliable
    // here since this file is typically opened locally (file://) rather
    // than from a shared URL, so a human-readable reference that works
    // with Ctrl+F in anyone's copy is the more robust choice.
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('.copy-ref-btn');
      if (!btn) return;
      var text = btn.getAttribute('data-copy-ref') || '';
      var done = function () {
        var original = 'Copy Reference';
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else {
        fallbackCopy(text, done);
      }
    });
    function fallbackCopy(text, done) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
  </script>
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

  /**
   * Builds a second, separate rendering of the manual using Paged.js (a real
   * pagination engine) instead of the hand-rolled JS estimate used in the
   * main document's screen indicator. This is the only way to get genuinely
   * accurate, dynamic page numbers and a running chapter name, since the
   * browser's native print engine doesn't support target-counter() or
   * string-set() for this (confirmed by direct testing). Kept as a separate
   * on-demand preview rather than the default view, since Paged.js's preview
   * model always renders using the print (light) styling, which would mean
   * losing the dark/gold screen theme if it were the default experience.
   */
  const buildPrintAccurateVariant = (sourceHtml: string): string => {
    const bodyMatch = sourceHtml.match(/<body>([\s\S]*)<\/body>/);
    let body = bodyMatch ? bodyMatch[1] : "";
    body = body.replace(/<div class="screen-page-indicator"[\s\S]*?<\/div>\s*<\/div>/, "");
    body = body.replace(/<script>[\s\S]*?<\/script>/, "");

    const styleMatch = sourceHtml.match(/<style>([\s\S]*)<\/style>/);
    let css = styleMatch ? styleMatch[1] : "";
    // This view's whole purpose is to preview the printed/PDF output, so the
    // print-only rules apply unconditionally rather than staying gated behind
    // @media print.
    css = css.replace(/@media print\s*{([\s\S]*?)\n    }/, "$1");
    css += `
    .chapter h2, .toc h2 { string-set: chaptername content(); }
    @page {
      size: Letter;
      margin: 0.6in 0.55in;
      @top-left { content: string(chaptername); font-size: 9px; color: #8a8a8a; font-family: 'Libre Baskerville', serif; }
    }
    @page :first {
      @top-left { content: none; }
      @bottom-center { content: none; }
    }
    .toc-chapter > a, .toc-sections a { display: flex; width: 100%; align-items: baseline; }
    .toc-chapter > a::after, .toc-sections a::after {
      content: target-counter(attr(href), page);
      margin-left: auto;
      padding-left: 1em;
      font-family: 'Libre Baskerville', serif;
      font-size: 0.85em;
      color: #4a4a4a;
    }
`;

    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Print-Accurate Preview | ${client?.userName || "Client"}'s Life Manual</title>
<style>
${css}
</style>
</head>
<body>
${body}
<script>
${PAGEDJS_POLYFILL}
</script>
</body>
</html>`;
  };

  const handleOpenPrintAccuratePreview = () => {
    if (!generatedHtml) return;
    const variant = buildPrintAccurateVariant(generatedHtml);
    const blob = new Blob([variant], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
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
          from their portal organized by chapter. If a client's manual only exists as an old PDF,
          use{" "}
          <button
            onClick={() => navigate("/admin/import")}
            className="underline text-gold-primary hover:opacity-80 transition-opacity"
          >
            Import to Life Manual
          </button>
          {" "}first to bring that content into their portal chapters.
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
            Life Manual for {client?.userName} has been generated. Download the HTML file below,
            or use the{" "}
            <button
              onClick={() => navigate("/convert")}
              className="underline text-gold-primary hover:opacity-80 transition-opacity"
            >
              Document Converter
            </button>
            {" "}to export it as a branded PDF with real, selectable text (choose <strong>PDF</strong> as the output format).
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto justify-center flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" /> Download HTML
            </button>
            <button
              onClick={handleOpenPrintAccuratePreview}
              className="w-full sm:w-auto justify-center flex items-center gap-2 bg-black border border-gold-border/40 text-[#e8e6e1] font-heading text-sm font-semibold px-5 py-3 rounded-lg hover:border-gold-primary/60 transition-colors"
              title="Opens a separate preview with verified-accurate page numbers and a running chapter name, for confirming exact page references before sending to a client or attorney."
            >
              <BookOpen className="w-4 h-4" /> Print-Accurate Preview
            </button>
          </div>
          <p className="text-xs text-[#e8e6e1]/60">
            Print-Accurate Preview opens a separate page-numbered rendering for double-checking exact page
            references (e.g. before a call with a client's attorney). The downloaded HTML is the actual
            deliverable; this preview is for verification only.
          </p>

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
