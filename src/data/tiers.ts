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
      "Covers 7 of 8 chapters: Introduction, Digital Life, Emergency & Successor Access, Financial & Assets, Household Operations, Vital Records, Legacy & Wishes. Built over structured working sessions, with live draft review in the portal.",
    chaptersUnlocked: [1, 2, 3, 4, 5, 6],
    features: [
      "6 to 8 working sessions, 60 to 90 minutes each",
      "Live draft review in the portal",
      "Annual review available",
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
      "Everything Personal covers, plus Business Continuity. Covers all 8 chapters. Built over structured working sessions, with live draft review in the portal.",
    chaptersUnlocked: [1, 2, 3, 4, 5, 6, 7],
    features: [
      "Everything in Personal",
      "8 to 10 working sessions, 60 to 90 minutes each",
      "Business Continuity chapter",
      "Annual review available",
    ],
  },
];

// Pulled directly from legacyarchitectrva.com/services (LINKS object). Keep in sync
// if pricing or links change on the main site.
export const stripeLinks: Record<string, string> = {
  personal_full: "https://buy.stripe.com/14AaEX9rV5ag4wQcMd6Zy02",
  personal_deposit: "https://buy.stripe.com/3cI8wP5bF0U04wQdQh6Zy03",
  business_full: "https://buy.stripe.com/28EbJ1fQjcCIgfy9A16Zy04",
  business_deposit: "https://buy.stripe.com/7sY00jdIbeKQd3mh2t6Zy05",
  annual_review: "https://buy.stripe.com/14A9ATcE7byEe7qdQh6Zy06",
  upgrade_personal_to_business: "https://buy.stripe.com/4gM9AT0Vp7iobZi8vX6Zy07",
};

// Flat fee, same for both editions. Not tied to a specific tier's pricing.
export const annualReview = {
  price: 250,
  priceLabel: "$250",
  link: stripeLinks.annual_review,
};

// The only upgrade path in the current model: Personal to Business.
// Flat fee rather than a prorated difference.
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
