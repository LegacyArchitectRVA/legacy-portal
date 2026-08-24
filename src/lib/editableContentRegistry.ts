/**
 * Single source of truth for every editable text block's default
 * (fallback) content. Both the live pages (via EditableText) and the
 * Visual Editor (to pre-fill the textarea correctly even when nothing's
 * been customized yet) read from here, so they can never drift out of
 * sync with each other.
 */
import { chapters } from "../data/chapters";

export const EDITABLE_DEFAULTS: Record<string, string> = {
  landing_hero_title: "When You Can't Be There,\nWill They Know What To Do?",
  landing_hero_subtitle:
    "A Life Manual puts every account, system, and instruction in one place, so the people you love can act without guessing.",
  app_tagline: "This is the missing map.",
  landing_cta_text: "Sign In to Your Portal",
  footer_text:
    "All Life Manuals include: Secure Client Portal access, premium branded PDF, and 72-hour data self-destruct after delivery.",
  trust_card_encrypted_title: "Encrypted & Secure",
  trust_card_encrypted_desc:
    "Your data is protected with enterprise-grade encryption at rest and in transit.",
  trust_card_zeroknowledge_title: "Zero-Knowledge Protocol",
  trust_card_zeroknowledge_desc:
    "After delivery, all files and access are purged. Your information stays with you.",
  trust_card_private_title: "Private & Confidential",
  trust_card_private_desc:
    "Limited to 5 clients per month. Your manual receives our full attention and discretion.",
  dashboard_welcome: "Welcome",
  dashboard_description:
    "Your Life Manual, organized across seven chapters of continuity",
  upgrade_title: "Upgrade Your Life Manual",
  upgrade_vault_desc:
    "A secure foundation for your essential documents and access details.",
  upgrade_archive_desc:
    "Comprehensive clarity for complex lives. Every detail is organized and accessible.",
  upgrade_legacy_desc:
    "Full operational continuity for business owners and multi-estate individuals.",
  upgrade_current_badge: "Current Edition",
  upgrade_cta_prefix: "Upgrade to",
  upgrade_active_badge: "Active",
  upgrade_chapters_included_label: "Pillars Included",
  upgrade_notice_text:
    "Upgrade options only show editions above the client's current edition. Blueprint Session is intentionally excluded from the portal.",
  upgrade_footer_text:
    "All Life Manuals include secure client portal access, a premium branded PDF, and a 72-hour data purge after delivery.",
  upgrade_vault_feature_0: "Core Document Inventory",
  upgrade_vault_feature_1: "Secure Access Framework",
  upgrade_vault_feature_2: "Critical Contact Directory",
  upgrade_archive_feature_0: "Everything in The Vault",
  upgrade_archive_feature_1: "Decision-Making Context",
  upgrade_archive_feature_2: "Asset & Liability Mapping",
  upgrade_archive_feature_3: "Relationship & Dependency Guide",
  upgrade_archive_feature_4: "Digital & Physical Asset Management",
  upgrade_legacy_feature_0: "Everything in The Archive",
  upgrade_legacy_feature_1: "Business Succession Integration",
  upgrade_legacy_feature_2: "Long-Term Stewardship Plan",
  login_title: "Welcome Back",
  login_subtitle: "Sign in to your Life Manual portal",
  login_passkey_button: "Sign In with Face ID / Fingerprint",
  login_email_label: "Email",
  login_password_label: "Password",
  login_forgot_password: "Forgot password?",
  login_submit_button: "Sign In",
  login_footer_prompt: "New client?",
  login_footer_link: "Create an account",
  login_email_placeholder: "your@email.com",
  login_password_placeholder: "Enter your password",
  signup_name_placeholder: "Your full name",
  signup_email_placeholder: "your@email.com",
  signup_password_placeholder: "Choose a strong password",
  signup_title: "Create Your Account",
  signup_subtitle: "Begin your Life Manual today",
  signup_name_label: "Full Name",
  signup_email_label: "Email",
  signup_password_label: "Password",
  signup_password_hint: "Minimum 8 characters",
  signup_submit_button: "Create Account",
  signup_footer_prompt: "Already have an account?",
  signup_footer_link: "Sign in",
  chapter_intro:
    "Need help with this chapter? Contact Legacy Architect RVA for guidance.",
  introduction_title: "Introduction",
  introduction_subtitle:
    "Start here. Review these guides before building your Life Manual.",
  settings_title: "Settings",
  profile_title: "Profile",
  messages_title: "Messages",
  messages_admin_subtitle: "Conversations with your clients",
  messages_client_subtitle: "Secure communication with Legacy Architect RVA",
  manual_view_title: "Life Manual",
};

/**
 * Chapter section titles, descriptions, and table column headers are
 * the actual core content of the Life Manual itself — derived here
 * directly from chapters.ts rather than transcribed by hand, so this
 * can never drift out of sync with what the live pages actually show.
 * Covers all 7 chapters' subsections in one pass.
 */
const CHAPTER_CONTENT_DEFAULTS: Record<string, string> = {};
for (const chapter of chapters) {
  CHAPTER_CONTENT_DEFAULTS[`chapter_${chapter.id}_shorttitle`] =
    chapter.shortTitle;
  CHAPTER_CONTENT_DEFAULTS[`chapter_${chapter.id}_chapterdesc`] =
    chapter.description;
  for (const section of chapter.subSections) {
    CHAPTER_CONTENT_DEFAULTS[
      `chapter_${chapter.id}_section_${section.id}_title`
    ] = section.title;
    CHAPTER_CONTENT_DEFAULTS[
      `chapter_${chapter.id}_section_${section.id}_desc`
    ] = section.description;
    for (const col of section.tableColumns) {
      CHAPTER_CONTENT_DEFAULTS[
        `chapter_${chapter.id}_section_${section.id}_col_${col.key}`
      ] = col.label;
    }
  }
}

export function getEditableDefault(key: string): string {
  return EDITABLE_DEFAULTS[key] || CHAPTER_CONTENT_DEFAULTS[key] || "";
}
