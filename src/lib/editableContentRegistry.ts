/**
 * Single source of truth for every editable text block's default
 * (fallback) content. Both the live pages (via EditableText) and the
 * Visual Editor (to pre-fill the textarea correctly even when nothing's
 * been customized yet) read from here, so they can never drift out of
 * sync with each other.
 */
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
  dashboard_description: "Your Life Manual, organized across seven chapters of continuity",
  upgrade_title: "Upgrade Your Life Manual",
  upgrade_vault_desc: "A secure foundation for your essential documents and access details.",
  upgrade_archive_desc:
    "Comprehensive clarity for complex lives. Every detail is organized and accessible.",
  upgrade_legacy_desc:
    "Full operational continuity for business owners and multi-estate individuals.",
  upgrade_current_badge: "Current Edition",
  upgrade_cta_prefix: "Upgrade to",
  upgrade_active_badge: "Active",
  upgrade_chapters_included_label: "Chapters Included",
  upgrade_notice_text:
    "Upgrade options only show editions above the client's current edition. Blueprint Session is intentionally excluded from the portal.",
  upgrade_footer_text:
    "All Life Manuals include secure client portal access, a premium branded PDF, and a 72-hour data purge after delivery.",
  login_title: "Welcome Back",
  login_subtitle: "Sign in to your Life Manual portal",
  login_passkey_button: "Sign In with Face ID / Fingerprint",
  login_email_label: "Email",
  login_password_label: "Password",
  login_forgot_password: "Forgot password?",
  login_submit_button: "Sign In",
  login_footer_prompt: "New client?",
  login_footer_link: "Create an account",
  signup_title: "Create Your Account",
  signup_subtitle: "Begin your Life Manual today",
  signup_name_label: "Full Name",
  signup_email_label: "Email",
  signup_password_label: "Password",
  signup_password_hint: "Minimum 8 characters",
  signup_submit_button: "Create Account",
  signup_footer_prompt: "Already have an account?",
  signup_footer_link: "Sign in",
  chapter_intro: "Need help with this chapter? Contact Legacy Architect RVA for guidance.",
  introduction_title: "Introduction",
  introduction_subtitle: "Start here. Review these guides before building your Life Manual.",
  settings_title: "Settings",
  profile_title: "Profile",
  messages_title: "Messages",
  messages_admin_subtitle: "Conversations with your clients",
  messages_client_subtitle: "Secure communication with Legacy Architect RVA",
  manual_view_title: "Life Manual",
};

export function getEditableDefault(key: string): string {
  return EDITABLE_DEFAULTS[key] || "";
}
