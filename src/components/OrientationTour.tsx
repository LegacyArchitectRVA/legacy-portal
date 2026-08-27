import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const STEPS = [
  {
    title: "Welcome to your portal",
    body: "This is your private workspace. Everything you build stays under your control. We never keep a permanent copy of your Life Manual content.",
  },
  {
    title: "Your profile",
    body: "Add your name, phone, and a photo if you like. You can also upload a family crest. This page is the first place to make the portal yours.",
  },
  {
    title: "How the work happens",
    body: "After you engage, chapters appear in the sidebar. You’ll build them with Craig in structured sessions. Progress shows here in the portal.",
  },
  {
    title: "You’re ready",
    body: "Explore the dashboard next, or stay here and finish your profile. If anything feels unclear, message Craig from the Messages section.",
  },
];

const STORAGE_KEY = "la_portal_orientation_done";

export function OrientationTour() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const welcome = searchParams.get("welcome") === "1";
    const alreadyDone = localStorage.getItem(STORAGE_KEY) === "1";
    if (welcome && !alreadyDone) {
      setOpen(true);
      searchParams.delete("welcome");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  if (!open) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const finish = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0f0c08] border border-[rgba(212,182,97,0.35)] rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-2">
          <p className="text-[11px] uppercase tracking-widest text-[#d4b661]/80 font-heading mb-2">
            Orientation · {step + 1} of {STEPS.length}
          </p>
          <h2 className="font-heading text-xl text-[#f2ede2] mb-3">
            {current.title}
          </h2>
          <p className="text-sm text-[#f2ede2]/85 leading-relaxed">
            {current.body}
          </p>
        </div>

        <div className="flex justify-center gap-1.5 py-4">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step
                  ? "w-6 bg-[#d4b661]"
                  : i < step
                    ? "w-1.5 bg-[#d4b661]/50"
                    : "w-1.5 bg-[#f2ede2]/20"
              }`}
            />
          ))}
        </div>

        <div className="px-6 pb-6 flex gap-3">
          {!isLast && (
            <button
              type="button"
              onClick={finish}
              className="flex-1 text-xs text-[#f2ede2]/60 hover:text-[#f2ede2] transition-colors py-2.5"
            >
              Skip
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (isLast) {
                finish();
                navigate("/dashboard");
              } else {
                setStep(s => s + 1);
              }
            }}
            className="flex-1 bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] font-heading text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
          >
            {isLast ? "Go to Dashboard" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
