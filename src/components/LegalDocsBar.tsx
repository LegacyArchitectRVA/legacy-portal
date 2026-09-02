import {
  RiArrowDownSLine as ChevronDown,
  RiMoneyDollarCircleLine as FinancialPoaIcon,
  RiParentLine as GuardianshipIcon,
  RiLockUnlockLine as HipaaIcon,
  RiQuillPenLine as LetterIcon,
  RiFileShieldLine as LivingWillIcon,
  RiScalesLine as Scale,
} from "@remixicon/react";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
  Gift as BeneficiaryIcon,
  Suitcase as BusinessIcon,
  HeartPulse as HealthcarePoaIcon,
  Safe as TrustIcon,
  FileText as WillIcon,
} from "reicon-react";
import { api } from "../../convex/_generated/api";
import { IconMedallion } from "./TrustIcons";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

const DOCUMENT_ICONS: Record<string, any> = {
  Will: WillIcon,
  Trust: TrustIcon,
  "Financial Power of Attorney": FinancialPoaIcon,
  "Healthcare Power of Attorney": HealthcarePoaIcon,
  "Living Will (Advance Directive)": LivingWillIcon,
  "HIPAA Authorization": HipaaIcon,
  "Guardianship Designation": GuardianshipIcon,
  "Beneficiary Designations": BeneficiaryIcon,
  "Letter of Intent": LetterIcon,
  "Business Succession Plan": BusinessIcon,
};

const DOCUMENT_GROUPS = [
  {
    label: "Personal Documents",
    types: [
      "Will",
      "Trust",
      "Financial Power of Attorney",
      "Healthcare Power of Attorney",
      "Living Will (Advance Directive)",
      "HIPAA Authorization",
      "Guardianship Designation",
      "Beneficiary Designations",
      "Letter of Intent",
    ],
  },
  {
    label: "Business Documents",
    types: ["Business Succession Plan"],
  },
];

export function LegalDocsBar() {
  const [expanded, setExpanded] = useState(false);
  const documents = useQuery(api.legalDocuments.getMyLegalDocuments);
  const upsert = useMutation(api.legalDocuments.upsertLegalDocument);

  if (documents === undefined) return null;

  const activeCount = documents.filter(d => d.inForce).length;

  const handleToggle = (documentType: string, inForce: boolean) => {
    const current = documents.find(d => d.documentType === documentType);
    upsert({ documentType, inForce, notes: current?.notes || "" });
  };

  const handleNotesChange = (documentType: string, notes: string) => {
    const current = documents.find(d => d.documentType === documentType);
    upsert({ documentType, inForce: current?.inForce || false, notes });
  };

  return (
    <div className="sticky top-14 md:top-0 z-20 border-b border-red-900/40 bg-[#1a0606]">
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-left"
      >
        <Scale className="w-4 h-4 text-red-400 shrink-0" />
        <span className="text-xs font-heading tracking-wide uppercase text-red-200">
          Legal Documents in Force
        </span>
        <span
          className="ml-1 px-2 py-0.5 rounded-full bg-transparent border border-[#e8c869] text-[#e8c869] font-bold tabular-nums"
          style={{ fontSize: "11.55px" }}
        >
          {activeCount} ACTIVE
        </span>
        <ChevronDown
          className={`w-4 h-4 text-red-300 ml-auto transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-red-900/30 pt-3 max-h-[60vh] overflow-y-auto">
          <p className="text-[11px] text-red-200/70 leading-relaxed">
            If you have active legal documents, those documents take legal
            precedence over anything recorded in your Life Manual. This portal
            is for organizational reference only and does not constitute legal
            advice.
          </p>
          {DOCUMENT_GROUPS.map(group => {
            const groupDocs = group.types
              .map(type => documents.find(d => d.documentType === type))
              .filter((d): d is NonNullable<typeof d> => !!d);
            if (groupDocs.length === 0) return null;
            return (
              <div key={group.label} className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-red-300/60 font-heading">
                  {group.label}
                </p>
                <div className="space-y-2">
                  {groupDocs.map(doc => (
                    <div
                      key={doc.documentType}
                      className="rounded-lg bg-black/30 border border-red-900/30 p-3 space-y-2"
                    >
                      <div className="flex items-center gap-3">
                        <IconMedallion
                          icon={DOCUMENT_ICONS[doc.documentType] || Scale}
                          size={14}
                          boxSize={28}
                          color="#f87171"
                        />
                        <span className="text-sm text-[#f2ede2] flex-1">
                          {doc.documentType}
                        </span>
                        <Switch
                          checked={doc.inForce}
                          onCheckedChange={checked =>
                            handleToggle(doc.documentType, checked)
                          }
                        />
                      </div>
                      {doc.inForce && (
                        <Textarea
                          placeholder="Optional notes (where it's held, date executed, etc.)"
                          defaultValue={doc.notes || ""}
                          onBlur={e =>
                            handleNotesChange(doc.documentType, e.target.value)
                          }
                          className="text-xs bg-black/40 border-red-900/30 resize-none"
                          rows={2}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
