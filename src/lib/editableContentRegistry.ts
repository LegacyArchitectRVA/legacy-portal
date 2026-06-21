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
};

export function getEditableDefault(key: string): string {
  return EDITABLE_DEFAULTS[key] || "";
}
