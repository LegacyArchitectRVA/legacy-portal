import { BookOpen, Download, Eye, Map, ClipboardCheck, ShieldCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { LegalDocsBanner } from "../components/LegalDocsBanner";

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
- Access the Life Manual portal using the provided credentials
- Review Chapter 2: Emergency & Successor Orientation
- Contact the individuals listed in the Critical Contact Directory
- Secure all physical documents referenced in Chapter 1

## Phase 2: Short-Term Actions (Days 2-7)
- Notify financial institutions listed in Chapter 3
- Review all digital accounts in Chapter 1: Digital & Access Systems
- Contact the estate attorney and insurance providers
- Begin household continuity actions from Chapter 4

## Phase 3: Ongoing Administration (Weeks 2-8)
- Transfer or close accounts as directed
- File necessary documents with appropriate agencies
- Follow the asset distribution plan
- Complete all items in the Vital Records chapter

## Phase 4: Legacy Preservation
- Review Chapter 6: Context & Legacy Wishes
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

## Chapter 6: Context & Legacy Wishes
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
    id: "engagement-vault-guide",
    title: "Engagement & Vault Guide",
    description: "Understand the security model, data handling, and zero-knowledge architecture behind your portal.",
    icon: <ShieldCheck className="w-6 h-6" />,
    content: `
# Engagement & Vault Guide

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

  const handleDownload = (guide: Guide) => {
    const blob = new Blob([guide.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${guide.title.replace(/\s+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
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
        html.push(`<li class="flex items-start gap-2 text-sm text-[#e8e6e1]/70"><span class="text-[#e8e6e1]/30 mt-0.5">☐</span>${line.slice(6)}</li>`);
      } else if (line.startsWith("- ")) {
        if (!inList) { html.push('<ul class="space-y-1.5 ml-1">'); inList = true; }
        html.push(`<li class="flex items-start gap-2 text-sm text-[#e8e6e1]/70"><span class="text-[#e8c46a]/60 mt-0.5">•</span>${line.slice(2)}</li>`);
      } else if (line.startsWith("---")) {
        if (inList) { html.push("</ul>"); inList = false; }
        html.push('<hr class="border-gold-border/20 my-4" />');
      } else if (line.startsWith("*") && line.endsWith("*")) {
        html.push(`<p class="text-xs text-[#e8e6e1]/50 italic mt-2">${line.slice(1, -1)}</p>`);
      } else if (line.match(/^\d+\.\s/)) {
        if (inList) { html.push("</ul>"); inList = false; }
        const text = line.replace(/^\d+\.\s*/, "");
        const boldMatch = text.match(/\*\*(.+?)\*\*(.*)/);
        if (boldMatch) {
          html.push(`<p class="text-sm text-[#e8e6e1]/70 ml-4 mb-1"><span class="text-[#d9cca0] font-medium">${boldMatch[1]}</span>${boldMatch[2]}</p>`);
        } else {
          html.push(`<p class="text-sm text-[#e8e6e1]/70 ml-4 mb-1">${text}</p>`);
        }
      } else if (line.trim() === "") {
        if (inList) { html.push("</ul>"); inList = false; }
      } else {
        html.push(`<p class="text-sm text-[#e8e6e1]/70 mb-2 leading-relaxed">${line}</p>`);
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
          className="flex items-center gap-2 text-sm text-[#e8e6e1]/60 hover:text-gold-primary transition-colors font-heading"
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
              Download
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
        <h1 className="font-heading text-2xl font-bold text-[#e8e6e1]">Introduction</h1>
        <p className="text-sm text-[#e8e6e1]/60 mt-1">
          Start here. Review these guides before building your Life Manual.
        </p>
      </div>

      {/* Legal Documents Notice */}
      <LegalDocsBanner />

      {/* Welcome card */}
      <div className="bg-[#0a0a0a] rounded-xl p-6 border border-[#e8c46a]/20 bg-gradient-to-r from-[#e8c46a]/[0.04] to-transparent">
        <div className="flex items-start gap-4">
          <img src="/logo.png" alt="Legacy Architect RVA" className="w-14 h-14 object-contain shrink-0" />
          <div>
            <h2 className="font-heading text-lg text-[#e8c46a]">Welcome to Legacy Architect RVA</h2>
            <p className="text-sm text-[#e8e6e1]/70 mt-2 leading-relaxed">
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
                <p className="text-xs text-[#e8e6e1]/60 mt-1.5 leading-relaxed">
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
                className="flex items-center gap-2 text-[11px] font-heading tracking-wider uppercase text-[#e8e6e1]/60 hover:text-[#e8e6e1]/80 transition-colors px-3 py-2"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
