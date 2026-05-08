import { Scale, AlertTriangle } from "lucide-react";

/**
 * Persistent banner shown throughout Life Manual chapter pages.
 * Reminds users that legal documents (wills, trusts, POA, etc.)
 * take precedence over anything in the Life Manual.
 */
export function LegalDocsBanner() {
  return (
    <div className="legal-notice px-4 py-3 flex items-start gap-3 mb-5">
      <div className="w-9 h-9 rounded-lg bg-[#CD7F32]/10 flex items-center justify-center shrink-0 mt-0.5">
        <Scale className="w-4.5 h-4.5 text-[#CD7F32]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-heading text-xs tracking-wide text-[#e8e6e1]/80 uppercase">
            Legal Documents in Force
          </h4>
          <AlertTriangle className="w-3 h-3 text-[#CD7F32]/60" />
        </div>
        <p className="text-[11px] text-[#e8e6e1]/60 leading-relaxed mt-0.5">
          If you have active legal documents (wills, trusts, powers of attorney, healthcare directives),
          those documents take legal precedence over anything recorded in your Life Manual.
          This portal is for organizational reference only and does not constitute legal advice.
        </p>
      </div>
    </div>
  );
}
