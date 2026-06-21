import { ArrowLeft } from "@phosphor-icons/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRIVACY_SECTIONS = [
  {
    heading: "1. Introduction",
    body: `Legacy Architect RVA ("we," "us," or "our") provides private continuity facilitation services, including the creation of personalized Life Manuals. We utilize digital tools, including the Client Portal and the Life Manual Generator, to support this service. This Privacy Policy describes how we collect, use, store, and permanently delete your personal information across all of our platforms.

We are deeply committed to your privacy. The sensitive nature of the information you entrust to us is not taken lightly, and we have designed our systems with privacy as a core principle.`,
  },
  {
    heading: "2. Information We Collect",
    body: `Account Information (required for portal access):
• Name and email address
• Encrypted password (never stored in plain text)

Life Manual Data (submitted through the Client Portal or provided during consultations):
• Emergency contacts and successor information
• Names of spouse, children, and designated emergency contacts
• Phone numbers and addresses for schools, businesses, and key contacts
• Digital accounts, devices, and subscriptions
• Financial information (accounts, insurance, investments, debts)
• Household and property details
• Vital records and legal documents
• Personal letters, traditions, and memories
• Business continuity information (Legacy tier only)

The specific categories collected depend on your service tier (The Vault, The Archive, or The Legacy).`,
  },
  {
    heading: "3. How We Use Your Information",
    body: `Your information is used exclusively to:
• Create your personalized Life Manual
• Track your portal completion progress during the active engagement
• Communicate with you about your manual's status

We do not sell, share, rent, trade, or otherwise disclose your personal information to any third parties. Your data is never used for marketing, advertising, analytics, profiling, or any purpose beyond delivering your Life Manual.`,
  },
  {
    heading: "4. Zero-Knowledge Protocol",
    body: `Our Core Privacy Commitment. All of our digital tools operate as temporary, secure workspaces. We follow a Zero-Knowledge Protocol, which means:
• Temporary retention only. Your data exists on our systems only during the active engagement period while your Life Manual is being built.
• Permanent deletion upon delivery. Once your Life Manual is delivered, all submitted data is permanently purged from our systems. An automatic self-destruct occurs 72 hours after delivery as an additional safeguard.
• No copies retained. After purging, your delivered Life Manual is the only copy in existence, and it belongs exclusively to you.
• Minimal audit trail. We retain only a record that a purge occurred (date and client name) for our compliance records. No content or personal data is included in audit logs.`,
  },
  {
    heading: "5. Data Security",
    body: `We protect your information using industry-standard security measures:
• Encryption in transit: All data transmitted via HTTPS/TLS encryption
• Encryption at rest: All stored data is encrypted using AES-256 standard encryption
• Secure authentication: Passwords are cryptographically hashed using industry-standard algorithms
• Limited access: Only your assigned Legacy Architect has access to your data`,
  },
  {
    heading: "6. Data Breach Notification",
    body: `In the unlikely event of a data breach affecting your personal information, we will:
• Notify you promptly via the email address associated with your account
• Describe the nature and scope of the breach
• Identify the categories of data potentially affected
• Detail the steps we are taking in response
• Provide guidance on steps you can take to protect yourself`,
  },
  {
    heading: "7. Your Rights",
    body: `You have the right to:
• Access and review all data you have submitted at any time during your active engagement
• Request correction of any inaccurate information
• Request early deletion of your data before your manual is delivered
• Receive written confirmation when your data has been purged
• Request the deletion of your account and all associated data at any time`,
  },
  {
    heading: "8. Data Retention",
    body: `During active engagement, your data is retained only while your Life Manual is being built. The Client Portal displays your progress and allows edits during this period.

After delivery: All portal data is permanently purged within 72 hours of delivery. Your account login credentials may be retained to allow you to verify that your data has been purged, but can be deleted upon request.

The Life Manual Generator: Data entered by your Legacy Architect into the Generator tool is used solely to produce your PDF and is not stored beyond the active session.`,
  },
  {
    heading: "9. Third-Party Services",
    body: `Our platforms are hosted on secure, enterprise-grade infrastructure. We do not share your Life Manual data with any third-party services, advertisers, or data brokers. Authentication and hosting services may process limited technical data (such as IP address and email) as necessary to provide the service.`,
  },
  {
    heading: "10. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Material changes will be communicated via email or through a notice on the portal. Continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
  {
    heading: "11. Contact",
    body: `For questions, concerns, or requests regarding this Privacy Policy or your personal data:

Legacy Architect RVA
23600 Mercantile Rd, Suite C-100
Postbox CR030394
Beachwood, OH 44122
Web: legacyarchitectrva.com`,
  },
];

const TERMS_SECTIONS = [
  {
    heading: "1. Overview",
    body: `These Terms of Service ("Terms") govern your use of the Legacy Architect RVA Client Portal and related digital tools (collectively, the "Service"), operated by Legacy Architect RVA ("we," "us," or "our"). By creating an account or using the Service, you agree to these Terms.

The Service is a private, secure digital workspace designed to facilitate the creation of your personalized Life Manual as part of Legacy Architect RVA's continuity facilitation service.`,
  },
  {
    heading: "2. Service Description",
    body: `Legacy Architect RVA provides:
• Client Portal: A temporary, encrypted workspace where clients submit personal information used to build their Life Manual.
• Life Manual Creation: Your dedicated Legacy Architect reviews, organizes, and crafts your submitted information into a comprehensive, branded Life Manual document.
• Delivery: Your completed Life Manual is delivered as a professional PDF document for your exclusive retention.

Service tiers (The Vault, The Archive, The Legacy) determine the scope of pillars and content included in your Life Manual, as agreed upon at the time of engagement.`,
  },
  {
    heading: "3. Account Responsibilities",
    body: `By creating an account, you agree to:
• Provide accurate and current information
• Maintain the security of your login credentials
• Notify us immediately if you suspect unauthorized access to your account
• Accept responsibility for all activity that occurs under your account`,
  },
  {
    heading: "4. Data Ownership",
    body: `You retain full ownership of all information and content you submit through the portal. Legacy Architect RVA claims no ownership rights over your personal data or Life Manual content. We access your data solely to fulfill the contracted service.`,
  },
  {
    heading: "5. Zero-Knowledge Protocol",
    body: `Data Handling Commitment. Our platforms operate under a Zero-Knowledge Protocol:
• All data submitted through the portal is permanently deleted within 72 hours of Life Manual delivery.
• Your delivered Life Manual becomes the sole existing copy of this information.
• We retain only a minimal audit record (date and name) of the purge event.
• No copies, backups, or archives of your personal data are maintained after delivery.`,
  },
  {
    heading: "6. Acceptable Use",
    body: `You agree to use the Service only for its intended purpose: submitting personal and organizational information for the creation of your Life Manual. You may not:
• Use the Service for illegal purposes.
• Attempt to access other users' data or accounts.
• Interfere with or disrupt the Service's infrastructure.
• Share your account credentials with others.`,
  },
  {
    heading: "7. Service Availability",
    body: `We strive to maintain reliable access to the portal during your active engagement. However, we do not guarantee uninterrupted availability and may perform maintenance as needed. Extended outages will be communicated in advance when possible.`,
  },
  {
    heading: "8. Fees & Payment",
    body: `Service fees are agreed upon before engagement begins and are governed by a separate Client Services Agreement. These Terms govern your use of the digital tools only. Payment processing is handled by our third-party payment provider and is subject to their terms and conditions.`,
  },
  {
    heading: "9. Intellectual Property",
    body: `The Legacy Architect RVA brand, portal design, Life Manual templates, and related materials are the intellectual property of Legacy Architect RVA. Your Life Manual content belongs to you; the format, design, and template remain ours.`,
  },
  {
    heading: "10. Testimonials & Media Usage",
    body: `By engaging Legacy Architect RVA's services, you grant Legacy Architect RVA a perpetual, non-exclusive, royalty-free license to use any feedback, testimonials, reviews, comments, or statements you provide, whether submitted through the portal, communicated via email, phone, social media, or other channels, for marketing, promotional, and educational purposes, including but not limited to:
• Social media posts and advertisements
• Website content, landing pages, and search engine listings
• Print and digital marketing materials
• Case studies, client success stories, and promotional content

Legacy Architect RVA may use your first name, general geographic area, and service tier for attribution purposes. No personally identifiable financial, legal, or Life Manual content will ever be disclosed in any testimonial or marketing material.

Testimonials may be edited for length, clarity, or grammar while preserving the original meaning and intent. Legacy Architect RVA will not fabricate or materially alter the substance of any client statement.

You may request the removal of a specific testimonial at any time by contacting us directly. Removal will be processed within 30 business days, though content already distributed to third-party platforms may persist beyond our control.`,
  },
  {
    heading: "11. Limitation of Liability",
    body: `To the maximum extent permitted by law, Legacy Architect RVA shall not be liable for:
• Loss or corruption of data submitted through the portal, except as caused by our gross negligence
• Damages resulting from unauthorized access to your account due to your failure to maintain credential security
• Indirect, incidental, consequential, or punitive damages arising from the use or inability to use the Service
• Delays in delivery caused by circumstances beyond our reasonable control
• Actions taken by third-party service providers, including payment processors and hosting platforms

Our total liability for any claim arising from or related to the Service shall not exceed the total amount paid by you for your service tier.`,
  },
  {
    heading: "12. Termination",
    body: `Either party may terminate the engagement at any time. Upon termination:
• Your portal access will be disabled.
• All submitted data will be permanently purged per the Zero-Knowledge Protocol.
• Refund eligibility will be determined per the Client Services Agreement.`,
  },
  {
    heading: "13. Governing Law",
    body: `These Terms are governed by the laws of the Commonwealth of Virginia. Any disputes will be resolved in the courts of Richmond, Virginia.`,
  },
  {
    heading: "14. Contact",
    body: `For questions, concerns, or requests regarding these Terms of Service:

Legacy Architect RVA
23600 Mercantile Rd, Suite C-100
Postbox CR030394
Beachwood, OH 44122
Web: legacyarchitectrva.com`,
  },
];

function Document({
  title,
  effectiveDate,
  sections,
}: {
  title: string;
  effectiveDate: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-xl text-gold-primary">{title}</h2>
        <p className="text-[11px] text-[#e8e6e1]/75 mt-1">Effective Date: {effectiveDate}</p>
      </div>
      {sections.map((s) => (
        <div key={s.heading}>
          <h3 className="font-heading text-sm text-gold-muted uppercase tracking-wide mb-1.5">
            {s.heading}
          </h3>
          <p className="text-sm text-[#e8e6e1]/85 leading-relaxed whitespace-pre-line">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function LegalPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"privacy" | "terms">("privacy");

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <button
        onClick={() => navigate("/settings")}
        className="flex items-center gap-2 text-sm text-[#e8e6e1]/80 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Settings
      </button>

      <h1 className="font-heading text-3xl text-gold-gradient">Legal</h1>

      <div className="flex gap-2 border-b border-gold-border/30">
        <button
          onClick={() => setTab("privacy")}
          className={`px-4 py-2 text-sm font-heading transition-colors ${
            tab === "privacy" ? "text-gold-primary border-b-2 border-gold-primary" : "text-[#e8e6e1]/75"
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setTab("terms")}
          className={`px-4 py-2 text-sm font-heading transition-colors ${
            tab === "terms" ? "text-gold-primary border-b-2 border-gold-primary" : "text-[#e8e6e1]/75"
          }`}
        >
          Terms of Service
        </button>
      </div>

      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 md:p-6">
        {tab === "privacy" ? (
          <Document title="Portal Privacy Policy" effectiveDate="April 25, 2026" sections={PRIVACY_SECTIONS} />
        ) : (
          <Document title="Terms of Service" effectiveDate="April 25, 2026" sections={TERMS_SECTIONS} />
        )}
      </div>
    </div>
  );
}
