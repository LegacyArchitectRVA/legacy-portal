import {
  RiBankCardLine as CreditCard,
  RiSplitCellsHorizontal as SquareSplitVertical,
} from "@remixicon/react";
import { useQuery } from "convex/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Shield } from "reicon-react";
import { api } from "../../convex/_generated/api";
import { FullPageLoader } from "../components/FullPageLoader";
import {
  getTierByName,
  stripeLinks,
  upgradePersonalToBusiness,
} from "../data/tiers";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetTierId = searchParams.get("tier") || "business";
  const profile = useQuery(api.profile.getMyProfile);

  if (profile === undefined) {
    return <FullPageLoader />;
  }

  const targetTier = getTierByName(targetTierId);

  if (!targetTier) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-[#f2ede2]/75">Invalid tier selected.</p>
        <button
          onClick={() => navigate("/upgrade")}
          className="mt-4 text-gold-primary hover:text-gold-bright"
        >
          &larr; Back to Upgrade
        </button>
      </div>
    );
  }

  const fullLink = stripeLinks[`${targetTierId}_full`];
  const depositLink = stripeLinks[`${targetTierId}_deposit`];

  // The only real upgrade path in the current model. Anyone navigating here
  // through the app's own Upgrade page arrives this way. Charges a flat fee
  // for the difference instead of the full Business edition price.
  const isGenuineUpgrade =
    profile?.tier === "personal" && targetTierId === "business";

  if (isGenuineUpgrade) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <button
          onClick={() => navigate("/upgrade")}
          className="flex items-center gap-2 text-sm text-[#f2ede2]/80 hover:text-gold-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Upgrade
        </button>

        <div className="text-center space-y-3">
          <h1 className="font-heading text-3xl text-gold-gradient">
            Upgrade to Business
          </h1>
          <p className="text-[#f2ede2]/75 leading-relaxed max-w-lg mx-auto">
            You already have a Personal Life Manual underway. This upgrade adds
            Business Continuity and everything else the Business edition covers,
            for a flat fee rather than the full Business price.
          </p>
        </div>

        <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 text-center">
          <p className="text-xs text-gold-muted uppercase tracking-widest font-heading mb-2">
            Upgrade Fee
          </p>
          <p className="font-heading text-4xl text-gold-bright">
            {upgradePersonalToBusiness.priceLabel}
          </p>
          <p className="text-xs text-[#f2ede2]/75 mt-1">
            One-time payment. No deposit split.
          </p>
        </div>

        <a
          href={upgradePersonalToBusiness.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-left p-5 rounded-xl border border-gold-border bg-[#0f0c08] hover:border-gold-primary/40 hover:shadow-[0_0_20px_rgba(212,182,97,0.06)] transition-all duration-300 flex items-start gap-4 group block"
        >
          <div className="w-10 h-10 rounded-xl bg-gold-dark/15 flex items-center justify-center shrink-0 group-hover:bg-gold-dark/25 transition-colors">
            <CreditCard className="w-5 h-5 text-gold-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-lg text-[#f2ede2] group-hover:text-gold-primary transition-colors">
              Pay Upgrade Fee
            </h3>
            <p className="text-sm text-[#f2ede2]/80 mt-1">
              One-time payment of {upgradePersonalToBusiness.priceLabel}.
              Unlocks the Business Continuity chapter right away.
            </p>
          </div>
          <span className="font-heading text-lg text-gold-primary shrink-0 mt-1">
            {upgradePersonalToBusiness.priceLabel}
          </span>
        </a>

        <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
          <h3 className="font-heading text-sm text-gold-primary">
            What's Included
          </h3>
          <p className="text-xs text-[#f2ede2]/80 leading-relaxed">
            Everything Personal already covers, plus the Business Continuity
            chapter and the working sessions to complete it.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] text-[#f2ede2]/75">
          <Shield className="w-3 h-3" />
          <span>
            Secure payment processed by Stripe. Legacy Architect RVA never
            stores card data.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate("/upgrade")}
        className="flex items-center gap-2 text-sm text-[#f2ede2]/80 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Upgrade
      </button>

      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-heading text-3xl text-gold-gradient">
          Upgrade to {targetTier.name}
        </h1>
        <p className="text-[#f2ede2]/75 leading-relaxed max-w-lg mx-auto">
          This link charges the full {targetTier.name} edition price. If that
          doesn't match your situation, message us before you pay and we'll sort
          out the right amount directly.
        </p>
      </div>

      {/* Price Summary */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 text-center">
        <p className="text-xs text-gold-muted uppercase tracking-widest font-heading mb-2">
          {targetTier.name} Edition Price
        </p>
        <p className="font-heading text-4xl text-gold-bright">
          {targetTier.priceLabel}
        </p>
        <p className="text-xs text-[#f2ede2]/75 mt-1">
          Deposit: {targetTier.depositPriceLabel}, balance due on delivery
        </p>
      </div>

      {/* Payment Options */}
      <div className="space-y-3">
        {/* Pay in Full */}
        {fullLink && (
          <a
            href={fullLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left p-5 rounded-xl border border-gold-border bg-[#0f0c08] hover:border-gold-primary/40 hover:shadow-[0_0_20px_rgba(212, 182, 97,0.06)] transition-all duration-300 flex items-start gap-4 group block"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-dark/15 flex items-center justify-center shrink-0 group-hover:bg-gold-dark/25 transition-colors">
              <CreditCard className="w-5 h-5 text-gold-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg text-[#f2ede2] group-hover:text-gold-primary transition-colors">
                Pay in Full
              </h3>
              <p className="text-sm text-[#f2ede2]/80 mt-1">
                One-time payment of {targetTier.priceLabel}. Immediate full
                access to {targetTier.name}.
              </p>
            </div>
            <span className="font-heading text-lg text-gold-primary shrink-0 mt-1">
              {targetTier.priceLabel}
            </span>
          </a>
        )}

        {/* Deposit */}
        {depositLink && (
          <a
            href={depositLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left p-5 rounded-xl border border-gold-border bg-[#0f0c08] hover:border-gold-primary/40 hover:shadow-[0_0_20px_rgba(212, 182, 97,0.06)] transition-all duration-300 flex items-start gap-4 group block"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-dark/15 flex items-center justify-center shrink-0 group-hover:bg-gold-dark/25 transition-colors">
              <SquareSplitVertical className="w-5 h-5 text-gold-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg text-[#f2ede2] group-hover:text-gold-primary transition-colors">
                Deposit Now
              </h3>
              <p className="text-sm text-[#f2ede2]/80 mt-1">
                {targetTier.depositPriceLabel} to begin. Balance due on
                delivery.
              </p>
            </div>
            <span className="font-heading text-lg text-gold-muted shrink-0 mt-1">
              {targetTier.depositPriceLabel}
            </span>
          </a>
        )}
      </div>

      {/* Info */}
      <div className="bg-[#0f0c08] rounded-xl border border-gold-border p-5 space-y-3">
        <h3 className="font-heading text-sm text-gold-primary">
          What's Included
        </h3>
        <p className="text-xs text-[#f2ede2]/80 leading-relaxed">
          All Life Manuals include: Secure Client Portal access, premium branded
          PDF, and 72-hour data self-destruct after delivery.
        </p>
        <ul className="text-xs text-[#f2ede2]/75 space-y-1.5">
          {targetTier.features.map(f => (
            <li key={f} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold-primary" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Security */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[#f2ede2]/75">
        <Shield className="w-3 h-3" />
        <span>
          Secure payment processed by Stripe. Legacy Architect RVA never stores
          card data.
        </span>
      </div>
    </div>
  );
}
