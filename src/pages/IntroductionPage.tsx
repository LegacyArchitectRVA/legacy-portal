import { RiBookOpenLine as BookOpen, RiDownloadLine as Download, RiEyeLine as Eye, RiMapLine as Map, RiClipboardLine as ClipboardCheck, RiShieldCheckLine as ShieldCheck, RiArrowLeftLine as ArrowLeft } from "@remixicon/react";
import { useState } from "react";
import { EditableText } from "../components/EditableText";

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
}

const guides: Guide[] = [
  {
    id: "successor-roadmap",
    title: "Successor Roadmap",
    description: "A step-by-step guide for your designated successor to follow when the time comes.",
    icon: <Map className="w-6 h-6" />,
    content: `
# Successor Roadmap

## Purpose
This roadmap provides your designated successor with a clear, sequential path to follow. It removes ambiguity and ensures nothing is overlooked during a critical transition.

## Phase 1: Immediate Actions (First 24 Hours)
- Locate the Life Manual
- Review Chapter 2: Emergency & Successor Orientation, and check Legal Documents in Force at the top of the portal for what's active and where it's held
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
    `.trim(),
  },
  {
    id: "preparation-checklist",
    title: "Preparation Checklist",
    description: "Track your progress across all seven chapters with this comprehensive readiness checklist.",
    icon: <ClipboardCheck className="w-6 h-6" />,
    content: `
# Preparation Checklist

Use this checklist to ensure your Life Manual is complete and your successor is prepared.

## Chapter 1: Digital & Access Systems
- [ ] All passwords documented in Password Manager section
- [ ] Cloud storage accounts listed with access instructions
- [ ] Email accounts catalogued with recovery information
- [ ] Devices and operating systems documented
- [ ] 2FA and recovery codes securely recorded
- [ ] Subscriptions and renewals tracked
- [ ] Communication platforms documented
- [ ] Digital financial accounts listed
- [ ] Social media accounts and wishes recorded

## Chapter 2: Emergency & Successor Orientation
- [ ] Emergency contacts designated and notified
- [ ] Successor formally designated
- [ ] Immediate action plan documented
- [ ] Critical contact directory completed

## Chapter 3: Financial & Asset Overview
- [ ] All financial accounts listed
- [ ] Insurance policies documented
- [ ] Asset inventory completed
- [ ] Liability overview current

## Chapter 4: Household Continuity
- [ ] Property information documented
- [ ] Vehicle information recorded
- [ ] Utility accounts listed
- [ ] Service providers catalogued
- [ ] Pet care instructions (if applicable)

## Chapter 5: Vital Records
- [ ] Government-issued IDs catalogued
- [ ] Legal documents referenced
- [ ] Medical records and directives noted

## Chapter 6: Legacy & Wishes
- [ ] Personal wishes documented
- [ ] Legacy instructions recorded

## Chapter 7: Business Continuity (if applicable)
- [ ] Business operations documented
- [ ] Key business contacts listed
- [ ] Succession plan in place

---
*Review this checklist quarterly to keep your Life Manual current.*
    `.trim(),
  },
  {
    id: "client-guidebook",
    title: "Client Guidebook",
    description: "Everything you need to know about working with Legacy Architect RVA and building your Life Manual.",
    icon: <BookOpen className="w-6 h-6" />,
    content: `
# Client Guidebook

## Welcome to Legacy Architect RVA

Thank you for choosing to build your Life Manual. This guidebook will help you understand the process, timeline, and what to expect.

## What is a Life Manual?
A Life Manual is a comprehensive, organized document that puts every account, system, and instruction in one place so the people you love can act without guessing.

## The Process
1. **Onboarding** - We schedule an initial 60-minute session to understand your needs and establish your edition tier.
2. **Data Entry** - You work through each chapter at your own pace, entering information into the secure portal.
3. **Review Sessions** - We meet periodically to review progress and ensure completeness.
4. **Delivery** - Once complete, your Life Manual is compiled and delivered to your designated successor(s).
5. **Purge** - Per our zero-knowledge standard, all portal data is purged 72 hours after delivery.

## Your Portal
- Access your portal at any time to add or update information
- Each chapter contains sub-sections with structured fields
- Progress is tracked automatically across all chapters
- Use the messaging feature to communicate with your facilitator

## Editions
- **The Vault** ($950) - Chapters 1, 2, 4, 5 - essential digital and household continuity
- **The Archive** ($1,950) - Adds Chapters 3, 6 - financial overview and legacy wishes
- **The Legacy** ($3,000+) - All 7 chapters including business continuity

## Annual Reviews
Your Life Manual should be reviewed annually to stay current:
- Vault: $400/year
- Archive: $800/year
- Legacy: $1,200/year

## Zero-Knowledge Standard
We never store passwords, recovery codes, or sensitive credentials. All data is purged 72 hours after your Life Manual is delivered. Your security is our highest priority.

---
*Questions? Reach out through the portal messaging system or email help@legacyarchitectrva.com*
    `.trim(),
  },
  {
    id: "engagement-security-guide",
    title: "Engagement & Data Security Guide",
    description: "Understand the security model, data handling, and zero-knowledge architecture behind your portal.",
    icon: <ShieldCheck className="w-6 h-6" />,
    content: `
# Engagement & Data Security Guide

## Security Architecture

### Zero-Knowledge Standard
Legacy Architect RVA operates on a zero-knowledge principle:
- We facilitate the organization of your information but do not retain it
- No passwords, recovery codes, or sensitive credentials are stored
- All portal data is purged 72 hours after delivery
- Your information exists only in the secure portal during the active engagement

### Data Handling
- All data is encrypted in transit and at rest
- Portal access requires authentication
- Session data is isolated per client
- No data is shared with third parties

## Engagement Timeline

### Phase 1: Setup (Week 1)
- Account creation and portal access
- Initial consultation to determine scope
- Edition selection and agreement signing

### Phase 2: Active Build (Weeks 2-8)
- Self-paced data entry through the portal
- Scheduled facilitation sessions as needed
- Progress tracking and milestone reviews

### Phase 3: Review & Delivery (Week 8-10)
- Comprehensive review of all chapters
- Life Manual compilation and formatting
- Delivery to designated recipient(s)

### Phase 4: Purge & Archive (72 hours post-delivery)
- All portal data automatically purged
- Account remains active for future engagements
- Annual review scheduling available

## Support
- Portal messaging: Available 24/7
- Email: help@legacyarchitectrva.com
- Facilitation sessions: Book via Cal.com on your dashboard

---
*This guide is provided as part of your Life Manual engagement with Legacy Architect RVA.*
    `.trim(),
  },
];

export default function IntroductionPage() {
  const [viewingGuide, setViewingGuide] = useState<string | null>(null);
  const activeGuide = guides.find((g) => g.id === viewingGuide);

  const handleDownloadFillableChecklist = async (guide: Guide) => {
    const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
    // Parse the markdown content into {chapterTitle, items[]} groups, reusing
    // the same source content as the print path so there's one source of truth.
    const lines = guide.content.split("\n");
    const groups: { title: string; items: string[] }[] = [];
    let current: { title: string; items: string[] } | null = null;
    for (const line of lines) {
      if (line.startsWith("## ")) {
        current = { title: line.slice(3), items: [] };
        groups.push(current);
      } else if (line.startsWith("- [ ] ") && current) {
        current.items.push(line.slice(6));
      }
    }

    const pdfDoc = await PDFDocument.create();
    const form = pdfDoc.getForm();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

    let logoImage = null;
    try {
      const logoBytes = await fetch(`${window.location.origin}/logo.png`).then((r) => r.arrayBuffer());
      logoImage = await pdfDoc.embedPng(logoBytes);
    } catch {
      // Logo is a nice-to-have on this PDF; proceed without it if it fails to load.
    }

    const PAGE_W = 612;
    const PAGE_H = 792;
    const MARGIN = 54;
    const CONTENT_W = PAGE_W - MARGIN * 2;
    const GOLD = rgb(0.541, 0.427, 0.122); // #8a6d1f
    const DARK = rgb(0.102, 0.102, 0.102);
    const GRAY = rgb(0.33, 0.33, 0.33);

    let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
    let y = PAGE_H - MARGIN;
    let checkboxCounter = 0;

    const ensureSpace = (needed: number) => {
      if (y - needed < MARGIN) {
        page = pdfDoc.addPage([PAGE_W, PAGE_H]);
        y = PAGE_H - MARGIN;
      }
    };

    const wrapText = (text: string, useFont: typeof font, size: number, maxWidth: number): string[] => {
      const words = text.split(" ");
      const out: string[] = [];
      let line = "";
      for (const word of words) {
        const trial = line ? `${line} ${word}` : word;
        if (useFont.widthOfTextAtSize(trial, size) > maxWidth && line) {
          out.push(line);
          line = word;
        } else {
          line = trial;
        }
      }
      if (line) out.push(line);
      return out;
    };

    // Logo + title (first page only)
    if (logoImage) {
      const logoH = 36;
      const logoW = (logoImage.width / logoImage.height) * logoH;
      ensureSpace(logoH + 10);
      page.drawImage(logoImage, { x: (PAGE_W - logoW) / 2, y: y - logoH, width: logoW, height: logoH });
      y -= logoH + 14;
    }
    page.drawText(guide.title.toUpperCase(), {
      x: MARGIN,
      y,
      size: 16,
      font: boldFont,
      color: GOLD,
    });
    y -= 26;

    const introLine = lines.find((l) => l.trim() && !l.startsWith("#"));
    if (introLine) {
      for (const wrapped of wrapText(introLine, italicFont, 10, CONTENT_W)) {
        ensureSpace(16);
        page.drawText(wrapped, { x: MARGIN, y, size: 10, font: italicFont, color: GRAY });
        y -= 14;
      }
      y -= 8;
    }

    for (const group of groups) {
      ensureSpace(30);
      y -= 6;
      page.drawText(group.title.toUpperCase(), { x: MARGIN, y, size: 12, font: boldFont, color: GOLD });
      y -= 8;
      page.drawLine({
        start: { x: MARGIN, y },
        end: { x: PAGE_W - MARGIN, y },
        thickness: 0.5,
        color: rgb(0.85, 0.8, 0.7),
      });
      y -= 16;

      for (const item of group.items) {
        const textX = MARGIN + 20;
        const wrapped = wrapText(item, font, 10.5, CONTENT_W - 20);
        ensureSpace(wrapped.length * 14 + 6);

        checkboxCounter++;
        const checkBox = form.createCheckBox(`item_${checkboxCounter}`);
        checkBox.addToPage(page, {
          x: MARGIN,
          y: y - 9,
          width: 12,
          height: 12,
          borderColor: GOLD,
          borderWidth: 1,
        });

        wrapped.forEach((wline, i) => {
          page.drawText(wline, { x: textX, y: y - i * 14, size: 10.5, font, color: DARK });
        });
        y -= wrapped.length * 14 + 6;
      }
      y -= 6;
    }

    ensureSpace(40);
    y -= 10;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_W - MARGIN, y },
      thickness: 0.5,
      color: rgb(0.85, 0.8, 0.7),
    });
    y -= 20;
    const footerText = "ORDER IN YOUR ABSENCE";
    const footerWidth = boldFont.widthOfTextAtSize(footerText, 9);
    page.drawText(footerText, {
      x: (PAGE_W - footerWidth) / 2,
      y,
      size: 9,
      font: boldFont,
      color: GOLD,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "preparation-checklist.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = (guide: Guide) => {
    if (guide.id === "preparation-checklist") {
      handleDownloadFillableChecklist(guide);
      return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Reuse the same markdown parsing, emitting plain styled HTML instead
    // of Tailwind classes, since the print window has no app stylesheet.
    const lines = guide.content.split("\n");
    const body: string[] = [];
    let inList = false;
    for (const line of lines) {
      if (line.startsWith("# ")) {
        if (inList) { body.push("</ul>"); inList = false; }
        continue; // title already rendered in the document header
      } else if (line.startsWith("## ")) {
        if (inList) { body.push("</ul>"); inList = false; }
        body.push(`<h2>${line.slice(3)}</h2>`);
      } else if (line.startsWith("### ")) {
        if (inList) { body.push("</ul>"); inList = false; }
        body.push(`<h3>${line.slice(4)}</h3>`);
      } else if (line.startsWith("- [ ] ")) {
        if (!inList) { body.push("<ul>"); inList = true; }
        body.push(`<li>☐ ${line.slice(6)}</li>`);
      } else if (line.startsWith("- ")) {
        if (!inList) { body.push("<ul>"); inList = true; }
        body.push(`<li>${line.slice(2)}</li>`);
      } else if (line.startsWith("---")) {
        if (inList) { body.push("</ul>"); inList = false; }
        body.push("<hr />");
      } else if (line.startsWith("*") && line.endsWith("*") && line.length > 1) {
        body.push(`<p class="note">${line.slice(1, -1)}</p>`);
      } else if (line.match(/^\d+\.\s/)) {
        if (inList) { body.push("</ul>"); inList = false; }
        const text = line.replace(/^\d+\.\s*/, "");
        const boldMatch = text.match(/\*\*(.+?)\*\*(.*)/);
        body.push(boldMatch ? `<p><strong>${boldMatch[1]}</strong>${boldMatch[2]}</p>` : `<p>${text}</p>`);
      } else if (line.trim() === "") {
        if (inList) { body.push("</ul>"); inList = false; }
      } else {
        body.push(`<p>${line}</p>`);
      }
    }
    if (inList) body.push("</ul>");

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${guide.title} - Legacy Architect RVA</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Libre Baskerville', serif;
      font-size: 11.5pt;
      line-height: 1.35;
      color: #1a1a1a;
      background: #fdfcfa;
      padding: 1in 0.9in;
    }
    .logo {
      display: block;
      height: 0.55in;
      margin: 0 auto 0.15in;
    }
    .title {
      font-family: 'Cinzel', serif;
      font-size: 18pt;
      text-align: center;
      letter-spacing: 0.05em;
      color: #8a6d1f;
      text-transform: uppercase;
      margin-bottom: 0.2in;
    }
    h2 {
      font-family: 'Cinzel', serif;
      font-size: 13.5pt;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: #8a6d1f;
      margin: 0.18in 0 0.08in;
    }
    h3 {
      font-family: 'Cinzel', serif;
      font-size: 12.5pt;
      color: #4a3a10;
      margin: 0.16in 0 0.06in;
    }
    p { margin-bottom: 0.07in; }
    p.note { font-style: italic; font-size: 10.5pt; color: #555; }
    ul { margin: 0 0 0.1in 0.22in; }
    li { margin-bottom: 0.04in; }
    strong { color: #4a3a10; }
    hr { border: none; border-top: 1px solid #d9cca0; margin: 0.2in 0; }
    .footer {
      margin-top: 0.25in;
      padding-top: 0.15in;
      border-top: 1px solid #d9cca0;
      text-align: center;
      font-family: 'Cinzel', serif;
      font-size: 10pt;
      letter-spacing: 0.1em;
      color: #8a6d1f;
      text-transform: uppercase;
    }
    @media print {
      body { padding: 0.55in 0.65in; }
    }
  </style>
</head>
<body>
  <img class="logo" src="${window.location.origin}/logo.png" alt="Legacy Architect RVA" />
  <div class="title">${guide.title}</div>
  ${body.join("\n  ")}
  <div class="footer">Order in Your Absence</div>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  // Simple markdown-to-HTML renderer
  const renderMarkdown = (md: string) => {
    const lines = md.split("\n");
    const html: string[] = [];
    let inList = false;

    for (const line of lines) {
      if (line.startsWith("# ")) {
        if (inList) { html.push("</ul>"); inList = false; }
        html.push(`<h1 class="font-heading text-2xl text-[#e8c46a] mt-6 mb-3">${line.slice(2)}</h1>`);
      } else if (line.startsWith("## ")) {
        if (inList) { html.push("</ul>"); inList = false; }
        html.push(`<h2 class="font-heading text-lg text-[#d9cca0] mt-5 mb-2">${line.slice(3)}</h2>`);
      } else if (line.startsWith("### ")) {
        if (inList) { html.push("</ul>"); inList = false; }
        html.push(`<h3 class="font-heading text-base text-[#c1b085] mt-4 mb-1.5">${line.slice(4)}</h3>`);
      } else if (line.startsWith("- [ ] ")) {
        if (!inList) { html.push('<ul class="space-y-1.5 ml-1">'); inList = true; }
        html.push(`<li class="flex items-start gap-2 text-sm text-[#e8e6e1]/85"><span class="text-[#e8e6e1]/30 mt-0.5">☐</span>${line.slice(6)}</li>`);
      } else if (line.startsWith("- ")) {
        if (!inList) { html.push('<ul class="space-y-1.5 ml-1">'); inList = true; }
        html.push(`<li class="flex items-start gap-2 text-sm text-[#e8e6e1]/85"><span class="text-[#e8c46a]/75 mt-0.5">•</span>${line.slice(2)}</li>`);
      } else if (line.startsWith("---")) {
        if (inList) { html.push("</ul>"); inList = false; }
        html.push('<hr class="border-gold-border/20 my-4" />');
      } else if (line.startsWith("*") && line.endsWith("*")) {
        html.push(`<p class="text-xs text-[#e8e6e1]/75 italic mt-2">${line.slice(1, -1)}</p>`);
      } else if (line.match(/^\d+\.\s/)) {
        if (inList) { html.push("</ul>"); inList = false; }
        const text = line.replace(/^\d+\.\s*/, "");
        const boldMatch = text.match(/\*\*(.+?)\*\*(.*)/);
        if (boldMatch) {
          html.push(`<p class="text-sm text-[#e8e6e1]/85 ml-4 mb-1"><span class="text-[#d9cca0] font-medium">${boldMatch[1]}</span>${boldMatch[2]}</p>`);
        } else {
          html.push(`<p class="text-sm text-[#e8e6e1]/85 ml-4 mb-1">${text}</p>`);
        }
      } else if (line.trim() === "") {
        if (inList) { html.push("</ul>"); inList = false; }
      } else {
        html.push(`<p class="text-sm text-[#e8e6e1]/85 mb-2 leading-relaxed">${line}</p>`);
      }
    }
    if (inList) html.push("</ul>");
    return html.join("\n");
  };

  if (activeGuide) {
    return (
      <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
        <button
          type="button"
          onClick={() => setViewingGuide(null)}
          className="flex items-center gap-2 text-sm text-[#e8e6e1]/80 hover:text-gold-primary transition-colors font-heading"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Introduction
        </button>
        <div className="bg-[#0a0a0a] rounded-xl p-6 md:p-8 border border-gold-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-[#e8c46a]/10 border border-[#e8c46a]/20 flex items-center justify-center text-[#e8c46a]">
                {activeGuide.icon}
              </div>
              <h1 className="font-heading text-xl text-[#e8e6e1]">{activeGuide.title}</h1>
            </div>
            <button
              type="button"
              onClick={() => handleDownload(activeGuide)}
              className="btn-gold px-4 py-2 text-xs flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </button>
          </div>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(activeGuide.content) }} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-[#e8e6e1]">
          <EditableText cmsKey="introduction_title" as="span" />
        </h1>
        <p className="text-sm text-[#e8e6e1]/80 mt-1">
          <EditableText cmsKey="introduction_subtitle" as="span" />
        </p>
      </div>

      {/* Legal Documents Notice */}

      {/* Welcome card */}
      <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#e8c46a]/20 bg-gradient-to-r from-[#e8c46a]/[0.04] to-transparent">
        <div className="flex items-start gap-4">
          <img src="/logo.png" alt="Legacy Architect RVA" className="w-16 h-16 object-contain shrink-0" />
          <div>
            <h2 className="font-heading text-lg text-[#e8c46a]">Welcome to Legacy Architect RVA</h2>
            <p className="text-sm text-[#e8e6e1]/85 mt-2 leading-relaxed">
              Your Life Manual puts every account, system, and instruction in one place so the people
              you love can act without guessing. Review the guides below to understand the process,
              then begin building your manual chapter by chapter.
            </p>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-gold-border to-transparent" />
        <h3 className="font-heading text-[11px] tracking-[0.15em] text-[#d9cca0]/70 uppercase">
          Essential Guides
        </h3>
        <div className="h-px flex-1 bg-gradient-to-l from-gold-border to-transparent" />
      </div>

      {/* Guide cards — 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide, idx) => (
          <div
            key={guide.id}
            className="bg-[#0a0a0a] rounded-xl p-5 border border-gold-border hover:border-[#e8c46a]/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,196,106,0.04)] flex flex-col"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 rounded-lg bg-[#e8c46a]/10 border border-[#e8c46a]/20 flex items-center justify-center text-[#e8c46a] shrink-0">
                {guide.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-base text-[#e8e6e1]">{guide.title}</h3>
                <p className="text-xs text-[#e8e6e1]/80 mt-1.5 leading-relaxed">
                  {guide.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gold-border/20">
              <button
                type="button"
                onClick={() => setViewingGuide(guide.id)}
                className="flex items-center gap-2 btn-gold-outline px-4 py-2 text-[11px] tracking-wider uppercase flex-1 justify-center"
              >
                <Eye className="w-3.5 h-3.5" />
                View on Site
              </button>
              <button
                type="button"
                onClick={() => handleDownload(guide)}
                className="flex items-center gap-2 text-[11px] font-heading tracking-wider uppercase text-[#e8e6e1]/80 hover:text-[#e8e6e1]/80 transition-colors px-3 py-2"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
