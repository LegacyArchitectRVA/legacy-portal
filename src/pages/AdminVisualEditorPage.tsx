import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import LandingPage from "./LandingPage";
import DashboardPage from "./DashboardPage";
import UpgradePage from "./UpgradePage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ChapterPage from "./ChapterPage";
import { EditModeProvider } from "../contexts/EditModeContext";
import { getEditableDefault } from "../lib/editableContentRegistry";
import { RiPaintBrushLine as PaintBrush, RiAlignLeft as TextAlignLeft, RiAlignCenter as TextAlignCenter, RiAlignRight as TextAlignRight, RiBold as TextB, RiItalic as TextItalic, RiUnderline as TextUnderline, RiSaveLine as FloppyDisk, RiDeleteBinLine as Trash, RiArrowLeftSLine as CaretLeft, RiLoader4Line as CircleNotch, RiCloseLine as X, RiCheckLine as Check, RiCursorLine as CursorClick, RiErrorWarningLine as Warning } from "@remixicon/react";

const FONT_FAMILIES = [
  "Cinzel",
  "Libre Baskerville",
  "Playfair Display",
  "Cormorant Garamond",
  "EB Garamond",
  "Lora",
  "Merriweather",
  "Crimson Pro",
  "Inter",
  "Montserrat",
  "Bodoni Moda",
  "Marcellus",
];

const TEXT_ALIGNMENTS = [
  { value: "left", icon: TextAlignLeft },
  { value: "center", icon: TextAlignCenter },
  { value: "right", icon: TextAlignRight },
];

const FONT_SIZES = [
  { value: "text-xs", label: "XS" },
  { value: "text-sm", label: "SM" },
  { value: "text-base", label: "Base" },
  { value: "text-lg", label: "LG" },
  { value: "text-xl", label: "XL" },
  { value: "text-2xl", label: "2XL" },
  { value: "text-3xl", label: "3XL" },
  { value: "text-4xl", label: "4XL" },
];

export default function AdminVisualEditorPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const updateCMS = useMutation(api.admin.updateCMS);
  const deleteCMS = useMutation(api.admin.deleteCMS);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<"landing" | "dashboard" | "upgrade" | "login" | "signup" | "chapter">("landing");
  const cmsItem = useQuery(api.admin.getCMS, selectedKey ? { key: selectedKey } : "skip");

  const [content, setContent] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [textColor, setTextColor] = useState("#e8e6e1");
  const [textAlign, setTextAlign] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [missingFallback, setMissingFallback] = useState(false);

  // Load the extra font set for the picker (Cinzel/Libre Baskerville already loaded globally)
  useEffect(() => {
    const families = FONT_FAMILIES.filter((f) => f !== "Cinzel" && f !== "Libre Baskerville")
      .map((f) => f.replace(/ /g, "+"))
      .join("&family=");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (!selectedKey) return;
    setMissingFallback(false);
    if (cmsItem && cmsItem.value?.trim()) {
      setContent(cmsItem.value);
      try {
        const m = cmsItem.metadata ? JSON.parse(cmsItem.metadata) : {};
        setFontFamily(m.fontFamily || "");
        setFontSize(m.fontSize || "");
        setTextColor(m.textColor || "#e8e6e1");
        setTextAlign(m.textAlign || "");
        setIsBold(!!m.isBold);
        setIsItalic(!!m.isItalic);
        setIsUnderline(!!m.isUnderline);
      } catch {
        resetStyles();
      }
    } else {
      // No saved record, or a saved record with an effectively-empty value
      // (matching useCmsValue's own "blank counts as uncustomized" rule on
      // the live page) — fall back to the registry default either way.
      const fallback = getEditableDefault(selectedKey);
      setContent(fallback);
      if (!fallback) setMissingFallback(true);
      resetStyles();
    }
  }, [selectedKey, cmsItem]);

  const resetStyles = () => {
    setFontFamily("");
    setFontSize("");
    setTextColor("#e8e6e1");
    setTextAlign("");
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
  };

  const handleSave = async () => {
    if (!selectedKey) return;
    if (missingFallback && !content.trim()) return;
    setSaving(true);
    setSaved(false);
    try {
      const metadata = { fontFamily, fontSize, textColor, textAlign, isBold, isItalic, isUnderline };
      await updateCMS({ key: selectedKey, value: content, metadata: JSON.stringify(metadata) });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!selectedKey) return;
    if (!window.confirm("Reset this element to its default text and styling?")) return;
    await deleteCMS({ key: selectedKey });
    setSelectedKey(null);
  };

  if (isAdmin === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <CircleNotch className="w-6 h-6 text-gold-muted animate-spin" />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <PaintBrush className="w-10 h-10 text-gold-muted" />
        <p className="text-[#e8e6e1]/75">Admin access required.</p>
      </div>
    );
  }

  const niceLabel = selectedKey
    ?.replace(/^trust_card_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen">
      {/* Editor chrome header */}
      <div className="sticky top-0 z-40 bg-black border-b border-gold-border/30 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-1.5 text-sm text-gold-muted hover:text-gold-primary transition-colors"
        >
          <CaretLeft className="w-4 h-4" />
          Admin
        </button>
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gold-muted font-heading text-right">
          <CursorClick className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          Tap to edit
        </div>
      </div>

      {/* Page switcher */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-black/60 border-b border-gold-border/20 overflow-x-auto">
        {[
          { id: "landing" as const, label: "Landing Page" },
          { id: "dashboard" as const, label: "Dashboard" },
          { id: "upgrade" as const, label: "Upgrade" },
          { id: "login" as const, label: "Sign In" },
          { id: "signup" as const, label: "Sign Up" },
          { id: "chapter" as const, label: "Chapter Pages" },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePage(p.id);
              setSelectedKey(null);
            }}
            className={`text-[11px] px-3 py-1.5 rounded-full font-heading shrink-0 transition-colors ${
              activePage === p.id
                ? "bg-gold-dark/25 text-gold-primary"
                : "bg-black/40 text-[#e8e6e1]/75 hover:text-[#e8e6e1]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* The real page, rendered live, made clickable */}
      <div className="relative">
        <EditModeProvider value={{ active: true, selectedKey, select: setSelectedKey }}>
          {activePage === "landing" && <LandingPage />}
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "upgrade" && <UpgradePage />}
          {activePage === "login" && <LoginPage />}
          {activePage === "signup" && <SignupPage />}
          {activePage === "chapter" && <ChapterPage chapterIdOverride="digital" />}
        </EditModeProvider>
      </div>

      {/* Floating edit panel */}
      {selectedKey && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/70 animate-modal-backdrop"
          onClick={() => setSelectedKey(null)}
        >
          <div
            className="bg-[#0a0a0a] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-5 space-y-4 animate-modal-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm text-gold-primary capitalize">{niceLabel}</h2>
              <button onClick={() => setSelectedKey(null)} className="text-[#e8e6e1]/75">
                <X className="w-4 h-4" />
              </button>
            </div>

            {missingFallback && (
              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-300">
                <Warning className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Couldn't load this element's original text automatically. Type the
                  current wording in below before saving, or Cancel to leave it untouched.
                </span>
              </div>
            )}

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="w-full bg-black border border-gold-border/30 rounded-lg p-3 text-sm text-[#e8e6e1] focus:outline-none focus:border-gold-primary/40 resize-y"
            />

            {/* Font */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                Font
              </label>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {FONT_FAMILIES.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFontFamily(fontFamily === f ? "" : f)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                      fontFamily === f
                        ? "border-gold-primary bg-gold-dark/15 text-gold-primary"
                        : "border-gold-border/20 text-[#e8e6e1]/75"
                    }`}
                    style={{ fontFamily: `'${f}', serif` }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FONT_SIZES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setFontSize(fontSize === s.value ? "" : s.value)}
                    className={`px-3 py-1 rounded-full text-[11px] font-heading transition-colors ${
                      fontSize === s.value ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Real color picker */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gold-border/30 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#e8e6e1] focus:outline-none"
                />
              </div>
            </div>

            {/* Align + weight */}
            <div className="flex items-center gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                  Align
                </label>
                <div className="flex gap-1">
                  {TEXT_ALIGNMENTS.map((a) => (
                    <button
                      key={a.value}
                      onClick={() => setTextAlign(textAlign === a.value ? "" : a.value)}
                      className={`p-2 rounded-lg transition-colors ${
                        textAlign === a.value ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"
                      }`}
                    >
                      <a.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                  Weight
                </label>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsBold(!isBold)}
                    className={`p-2 rounded-lg ${isBold ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"}`}
                  >
                    <TextB className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsItalic(!isItalic)}
                    className={`p-2 rounded-lg ${isItalic ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"}`}
                  >
                    <TextItalic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={`p-2 rounded-lg ${isUnderline ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"}`}
                  >
                    <TextUnderline className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleSave}
                disabled={saving || (missingFallback && !content.trim())}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-2.5 rounded-xl disabled:opacity-50"
              >
                {saving ? (
                  <CircleNotch className="w-4 h-4 animate-spin" />
                ) : saved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <FloppyDisk className="w-4 h-4" />
                )}
                {saved ? "Saved" : "Save"}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-red-400/80 hover:text-red-400 text-sm px-3 py-2.5 rounded-xl border border-red-500/20"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
