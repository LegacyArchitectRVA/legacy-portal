import { useQuery } from "convex/react";
import { ArrowLeft, CreditCard, Shield, SplitSquareVertical } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { stripeLinks, getTierByName } from "../data/tiers";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetTierId = searchParams.get("tier") || "archive";
  const profile = useQuery(api.profile.getMyProfile);
  const currentTier = profile?.tier || "vault";
  const targetTier = getTierByName(targetTierId);
  const currentTierInfo = getTierByName(currentTier);

  if (!targetTier) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-[#e8e6e1]/50">Invalid tier selected.</p>
        <button onClick={() => navigate("/upgrade")} className="mt-4 text-gold-primary hover:text-gold-bright">
          &larr; Back to Upgrade
        </button>
      </div>
    );
  }

  const fullKey = `${currentTier}_${targetTierId}_full`;
  const halfKey = `${currentTier}_${targetTierId}_half`;
  const fullLink = stripeLinks[fullKey];
  const halfLink = stripeLinks[halfKey];
  const priceDiff = targetTier.price - (currentTierInfo?.price || 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate("/upgrade")}
        className="flex items-center gap-2 text-sm text-[#e8e6e1]/60 hover:text-gold-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Upgrade
      </button>

      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="font-heading text-3xl text-gold-gradient">
          Upgrade to {targetTier.name}
        </h1>
        <p className="text-[#e8e6e1]/50 leading-relaxed max-w-lg mx-auto">
          {targetTier.name}. Choose your payment option below.
        </p>
      </div>

      {/* Price Summary */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 text-center">
        <p className="text-xs text-gold-muted uppercase tracking-widest font-heading mb-2">Upgrade Price</p>
        <p className="font-heading text-4xl text-gold-bright">${priceDiff.toLocaleString()}</p>
        <p className="text-xs text-[#e8e6e1]/50 mt-1">
          {currentTierInfo?.name} &rarr; {targetTier.name}
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
            className="w-full text-left p-5 rounded-xl border border-gold-border bg-[#0a0a0a] hover:border-gold-primary/40 hover:shadow-[0_0_20px_rgba(217,204,160,0.06)] transition-all duration-300 flex items-start gap-4 group block"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-dark/15 flex items-center justify-center shrink-0 group-hover:bg-gold-dark/25 transition-colors">
              <CreditCard className="w-5 h-5 text-gold-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg text-[#e8e6e1] group-hover:text-gold-primary transition-colors">
                Pay in Full
              </h3>
              <p className="text-sm text-[#e8e6e1]/60 mt-1">
                One-time payment of ${priceDiff.toLocaleString()}. Immediate full access to {targetTier.name}.
              </p>
            </div>
            <span className="font-heading text-lg text-gold-primary shrink-0 mt-1">
              ${priceDiff.toLocaleString()}
            </span>
          </a>
        )}

        {/* 50/50 Split */}
        {halfLink && (
          <a
            href={halfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left p-5 rounded-xl border border-gold-border bg-[#0a0a0a] hover:border-gold-primary/40 hover:shadow-[0_0_20px_rgba(217,204,160,0.06)] transition-all duration-300 flex items-start gap-4 group block"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-dark/15 flex items-center justify-center shrink-0 group-hover:bg-gold-dark/25 transition-colors">
              <SplitSquareVertical className="w-5 h-5 text-gold-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-lg text-[#e8e6e1] group-hover:text-gold-primary transition-colors">
                50/50 Split
              </h3>
              <p className="text-sm text-[#e8e6e1]/60 mt-1">
                Two payments of ${Math.round(priceDiff / 2).toLocaleString()}. Access begins after first payment.
              </p>
            </div>
            <span className="font-heading text-lg text-gold-muted shrink-0 mt-1">
              2 &times; ${Math.round(priceDiff / 2).toLocaleString()}
            </span>
          </a>
        )}
      </div>

      {/* Info */}
      <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-5 space-y-3">
        <h3 className="font-heading text-sm text-gold-primary">What's Included</h3>
        <p className="text-xs text-[#e8e6e1]/60 leading-relaxed">
          All Life Manuals include: Secure Client Portal access, premium branded PDF,
          and 72-hour data self-destruct after delivery.
        </p>
        <ul className="text-xs text-[#e8e6e1]/50 space-y-1.5">
          {targetTier.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold-primary" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Security */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-[#e8e6e1]/50">
        <Shield className="w-3 h-3" />
        <span>Secure payment processed by Stripe. Legacy Architect RVA never stores card data.</span>
      </div>
    </div>
  );
}
