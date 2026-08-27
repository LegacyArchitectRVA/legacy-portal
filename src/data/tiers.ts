export interface Tier {
  id: "personal" | "business";
  name: string;
  price: number;
  priceLabel: string;
  depositPrice: number;
  depositPriceLabel: string;
  tagline: string;
  description: string;
  chaptersUnlocked: number[];
  features: string[];
}

export const tiers: Tier[] = [
  {
    id: "personal",
    name: "Personal",
    price: 1500,
    priceLabel: "$1,500",
    depositPrice: 750,
    depositPriceLabel: "$750",
    tagline: "Your life, in one place",
    description:
      "Covers 6 of 7 pillars: Digital Life, Emergency & Successor Access, Financial & Assets, Household Operations, Vital Records, Legacy & Wishes. Built over structured working sessions, with live draft review in the portal.",
    chaptersUnlocked: [1, 2, 3, 4, 5, 6],
    features: [
      "6 to 8 working sessions, 60 to 90 minutes each",
      "Live draft review in the portal",
      "Annual review available ($250)",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 2500,
    priceLabel: "$2,500",
    depositPrice: 1250,
    depositPriceLabel: "$1,250",
    tagline: "Everything, plus what keeps it running",
    description:
      "Everything Personal covers, plus Business Continuity. Covers all 7 pillars. Built over structured working sessions, with live draft review in the portal.",
    chaptersUnlocked: [1, 2, 3, 4, 5, 6, 7],
    features: [
      "Everything in Personal",
      "8 to 10 working sessions, 60 to 90 minutes each",
      "Business Continuity chapter",
      "Annual review available ($250)",
    ],
  },
];

// Stripe payment links — keep in sync with main site / Stripe dashboard.
export const stripeLinks: Record<string, string> = {
  personal_full: "https://buy.stripe.com/eVqdR9eMfdGM5AUfYp6Zy08",
  personal_deposit: "https://buy.stripe.com/14A7sLcE77io2oI4fH6Zy09",
  business_full: "https://buy.stripe.com/8x2cN5avZdGM9Ra8vX6Zy0a",
  business_deposit: "https://buy.stripe.com/aFa4gz7jNdGM5AUh2t6Zy0b",
  annual_review: "https://buy.stripe.com/14A9ATcE7byEe7qdQh6Zy06",
  upgrade_personal_to_business: "https://buy.stripe.com/4gM9AT0Vp7iobZi8vX6Zy07",
};

// Flat fee, same for both editions.
export const annualReview = {
  price: 250,
  priceLabel: "$250",
  link: stripeLinks.annual_review,
};

// Personal → Business upgrade is the difference only ($2,500 − $1,500).
export const upgradePersonalToBusiness = {
  price: 1000,
  priceLabel: "$1,000",
  link: stripeLinks.upgrade_personal_to_business,
};

export function getTierByName(name: string): Tier | undefined {
  return tiers.find(t => t.id === name);
}

export function canAccessChapter(tier: string, chapterNumber: number): boolean {
  const t = getTierByName(tier);
  return t ? t.chaptersUnlocked.includes(chapterNumber) : false;
}
