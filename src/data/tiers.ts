export interface Tier {
  id: "vault" | "archive" | "legacy";
  name: string;
  price: number;
  priceLabel: string;
  reviewPrice: number;
  reviewPriceLabel: string;
  description: string;
  chaptersUnlocked: number[];
  features: string[];
}

export const tiers: Tier[] = [
  {
    id: "vault",
    name: "The Vault",
    price: 950,
    priceLabel: "$950",
    reviewPrice: 400,
    reviewPriceLabel: "$400",
    description:
      "A secure foundation for your essential documents and access details.",
    chaptersUnlocked: [1, 2, 4, 5],
    features: [
      "Core Document Inventory",
      "Secure Access Framework",
      "Critical Contact Directory",
    ],
  },
  {
    id: "archive",
    name: "The Archive",
    price: 1950,
    priceLabel: "$1,950",
    reviewPrice: 800,
    reviewPriceLabel: "$800",
    description:
      "Comprehensive clarity for complex lives. Every detail is organized and accessible.",
    chaptersUnlocked: [1, 2, 3, 4, 5, 6],
    features: [
      "Everything in The Vault",
      "Decision-Making Context",
      "Asset & Liability Mapping",
      "Relationship & Dependency Guide",
      "Digital & Physical Asset Management",
    ],
  },
  {
    id: "legacy",
    name: "The Legacy",
    price: 3000,
    priceLabel: "$3,000+",
    reviewPrice: 1200,
    reviewPriceLabel: "$1,200",
    description:
      "Full operational continuity for business owners and multi-estate individuals.",
    chaptersUnlocked: [1, 2, 3, 4, 5, 6, 7],
    features: [
      "Everything in The Archive",
      "Business Succession Integration",
      "Long-Term Stewardship Plan",
    ],
  },
];

export const tierAccess: Record<string, number[]> = {
  vault: [1, 2, 4, 5],
  archive: [1, 2, 3, 4, 5, 6],
  legacy: [1, 2, 3, 4, 5, 6, 7],
};

export const stripeLinks: Record<string, string> = {
  vault_archive_full: "https://buy.stripe.com/eVqcMYbTAd1p3l66xo1Nu05",
  vault_legacy_full: "https://buy.stripe.com/4gMbIUaPw9PddZKg7Y1Nu06",
  archive_legacy_full: "https://buy.stripe.com/cNibIUaPwe5tcVGcVM1Nu07",
  vault_archive_half: "https://buy.stripe.com/eVqfZa6zgbXlf3O8Fw1Nu0c",
  vault_legacy_half: "https://buy.stripe.com/cNi8wI3n46D1g7Sf3U1Nu0d",
  archive_legacy_half: "https://buy.stripe.com/00w4gs1eW1iH6xibRI1Nu0b",
  review_vault: "https://buy.stripe.com/4gMeV64r80eD1cY1d41Nu08",
  review_archive: "https://buy.stripe.com/dRmdR27Dke5t1cY7Bs1Nu09",
  review_legacy: "https://buy.stripe.com/fZucMY6zg4uT3l66xo1Nu0a",
};

export function getTierByName(name: string): Tier | undefined {
  return tiers.find(t => t.id === name);
}

export function canAccessChapter(tier: string, chapterNumber: number): boolean {
  const access = tierAccess[tier];
  return access ? access.includes(chapterNumber) : false;
}
