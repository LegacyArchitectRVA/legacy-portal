import { useMutation, useQuery } from "convex/react";
import { CaretDown as ChevronDown, Scales as Scale } from "@phosphor-icons/react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { IconMedallion } from "./TrustIcons";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

export function LegalDocsBar() {
  const [expanded, setExpanded] = useState(false);
  const documents = useQuery(api.legalDocuments.getMyLegalDocuments);
  const upsert = useMutation(api.legalDocuments.upsertLegalDocument);

  if (documents === undefined) return null;

  const activeCount = documents.filter((d) => d.inForce).length;

  const handleToggle = (documentType: string, inForce: boolean) => {
    const current = documents.find((d) => d.documentType === documentType);
    upsert({ documentType, inForce, notes: current?.notes || "" });
  };

  const handleNotesChange = (documentType: string, notes: string) => {
    const current = documents.find((d) => d.documentType === documentType);
    upsert({ documentType, inForce: current?.inForce || false, notes });
  };

  return (
    <div className="sticky top-14 md:top-0 z-20 border-b border-red-900/40 bg-[#1a0606]">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-left"
      >
        <Scale className="w-4 h-4 text-red-400 shrink-0" />
        <span className="text-xs font-heading tracking-wide uppercase text-red-200">
          Legal Documents in Force
        </span>
        <span
          className="ml-1 px-2 py-0.5 rounded-full bg-transparent border border-[#e8c46a] text-[#e8c46a] font-bold tabular-nums"
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
        <div className="px-4 pb-4 space-y-3 border-t border-red-900/30 pt-3 max-h-[60vh] overflow-y-auto">
          <p className="text-[11px] text-red-200/70 leading-relaxed">
            If you have active legal documents, those documents take legal
            precedence over anything recorded in your Life Manual. This
            portal is for organizational reference only and does not
            constitute legal advice.
          </p>
          {documents.map((doc) => (
            <div
              key={doc.documentType}
              className="rounded-lg bg-black/30 border border-red-900/30 p-3 space-y-2"
            >
              <div className="flex items-center gap-3">
                <IconMedallion icon={Scale} size={14} boxSize={28} color="#f87171" />
                <span className="text-sm text-[#e8e6e1] flex-1">
                  {doc.documentType}
                </span>
                <Switch
                  checked={doc.inForce}
                  onCheckedChange={(checked) =>
                    handleToggle(doc.documentType, checked)
                  }
                />
              </div>
              {doc.inForce && (
                <Textarea
                  placeholder="Optional notes (where it's held, date executed, etc.)"
                  defaultValue={doc.notes || ""}
                  onBlur={(e) =>
                    handleNotesChange(doc.documentType, e.target.value)
                  }
                  className="text-xs bg-black/40 border-red-900/30 resize-none"
                  rows={2}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
