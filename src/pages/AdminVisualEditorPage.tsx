import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import LandingPage from "./LandingPage";
import { EditModeProvider } from "../contexts/EditModeContext";
import { getEditableDefault } from "../lib/editableContentRegistry";
import {
  PaintBrush,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextB,
  TextItalic,
  TextUnderline,
  FloppyDisk,
  Trash,
  CaretLeft,
  CircleNotch,
  X,
  Check,
  CursorClick,
} from "@phosphor-icons/react";

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
    if (cmsItem) {
      setContent(cmsItem.value || "");
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
    } else if (cmsItem === null) {
      setContent(getEditableDefault(selectedKey));
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
        <CircleNotch className="w-6 h-6 text-gold-muted animate-spin" weight="bold" />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <PaintBrush className="w-10 h-10 text-gold-muted" weight="duotone" />
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
          <CaretLeft className="w-4 h-4" weight="bold" />
          Admin
        </button>
        <div className="flex items-center gap-2 text-xs text-gold-muted font-heading">
          <CursorClick className="w-4 h-4" weight="duotone" />
          Click anything below to edit it
        </div>
      </div>

      {/* The real Landing Page, rendered live, made clickable */}
      <div className="relative">
        <EditModeProvider value={{ active: true, selectedKey, select: setSelectedKey }}>
          <LandingPage />
        </EditModeProvider>
      </div>

      {/* Floating edit panel */}
      {selectedKey && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/70"
          onClick={() => setSelectedKey(null)}
        >
          <div
            className="bg-[#0a0a0a] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm text-gold-primary capitalize">{niceLabel}</h2>
              <button onClick={() => setSelectedKey(null)} className="text-[#e8e6e1]/75">
                <X className="w-4 h-4" weight="bold" />
              </button>
            </div>

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
                      <a.icon className="w-4 h-4" weight="bold" />
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
                    <TextB className="w-4 h-4" weight="bold" />
                  </button>
                  <button
                    onClick={() => setIsItalic(!isItalic)}
                    className={`p-2 rounded-lg ${isItalic ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"}`}
                  >
                    <TextItalic className="w-4 h-4" weight="bold" />
                  </button>
                  <button
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={`p-2 rounded-lg ${isUnderline ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"}`}
                  >
                    <TextUnderline className="w-4 h-4" weight="bold" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-2.5 rounded-xl disabled:opacity-50"
              >
                {saving ? (
                  <CircleNotch className="w-4 h-4 animate-spin" weight="bold" />
                ) : saved ? (
                  <Check className="w-4 h-4" weight="bold" />
                ) : (
                  <FloppyDisk className="w-4 h-4" weight="duotone" />
                )}
                {saved ? "Saved" : "Save"}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-red-400/80 hover:text-red-400 text-sm px-3 py-2.5 rounded-xl border border-red-500/20"
              >
                <Trash className="w-4 h-4" weight="duotone" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
