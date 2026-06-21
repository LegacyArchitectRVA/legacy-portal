import { useMutation, useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import {
  TextAa,
  PaintBrush,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  TextB,
  TextItalic,
  TextUnderline,
  FloppyDisk,
  Eye,
  Trash,
  Plus,
  CaretDown,
  CaretLeft,
  SquaresFour,
  CircleNotch,
  MagnifyingGlass,
  X,
  Check,
} from "@phosphor-icons/react";

// Available CMS keys for editing
const CMS_KEYS = [
  { key: "landing_hero_title", label: "Landing Hero Title", category: "Landing Page" },
  { key: "landing_hero_subtitle", label: "Landing Hero Subtitle", category: "Landing Page" },
  { key: "landing_cta_text", label: "Landing CTA Button Text", category: "Landing Page" },
  { key: "dashboard_welcome", label: "Dashboard Welcome Message", category: "Dashboard" },
  { key: "dashboard_description", label: "Dashboard Description", category: "Dashboard" },
  { key: "upgrade_title", label: "Upgrade Page Title", category: "Upgrade Page" },
  { key: "upgrade_vault_desc", label: "Vault Tier Description", category: "Upgrade Page" },
  { key: "upgrade_archive_desc", label: "Archive Tier Description", category: "Upgrade Page" },
  { key: "upgrade_legacy_desc", label: "Legacy Tier Description", category: "Upgrade Page" },
  { key: "chapter_intro", label: "Chapter Introduction Text", category: "Chapters" },
  { key: "chapter_complete_msg", label: "Chapter Complete Message", category: "Chapters" },
  { key: "app_tagline", label: "Application Tagline", category: "General" },
  { key: "footer_text", label: "Footer Text", category: "General" },
  { key: "contact_email", label: "Contact Email", category: "General" },
];

const FONT_FAMILIES = [
  { value: "Cinzel", label: "Cinzel", sample: "Headers" },
  { value: "Libre Baskerville", label: "Libre Baskerville", sample: "Body" },
  { value: "Inter", label: "Inter", sample: "Modern" },
  { value: "Playfair Display", label: "Playfair Display", sample: "Elegant" },
  { value: "Lora", label: "Lora", sample: "Readable" },
  { value: "Merriweather", label: "Merriweather", sample: "Classic" },
];

const COLOR_PRESETS = [
  { value: "#d9cca0", label: "Gold Light" },
  { value: "#b89f6b", label: "Gold Medium" },
  { value: "#8b7355", label: "Gold Dark" },
  { value: "#e8c46a", label: "Gold Accent" },
  { value: "#ffffff", label: "White" },
  { value: "#e8e6e1", label: "Off White" },
  { value: "#0a0a0a", label: "Black" },
  { value: "#1a1a1a", label: "Dark Gray" },
  { value: "#2a2a2a", label: "Medium Gray" },
];

const TEXT_ALIGNMENTS = [
  { value: "left", label: "Left", icon: TextAlignLeft },
  { value: "center", label: "Center", icon: TextAlignCenter },
  { value: "right", label: "Right", icon: TextAlignRight },
];

const FONT_SIZES = [
  { value: "text-xs", label: "XS", px: "0.75rem" },
  { value: "text-sm", label: "SM", px: "0.875rem" },
  { value: "text-base", label: "Base", px: "1rem" },
  { value: "text-lg", label: "LG", px: "1.125rem" },
  { value: "text-xl", label: "XL", px: "1.25rem" },
  { value: "text-2xl", label: "2XL", px: "1.5rem" },
  { value: "text-3xl", label: "3XL", px: "1.875rem" },
  { value: "text-4xl", label: "4XL", px: "2.25rem" },
];

const FONT_SIZE_PX: Record<string, string> = Object.fromEntries(FONT_SIZES.map((f) => [f.value, f.px]));

export default function AdminVisualEditorPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const cmsList = useQuery(api.admin.listCMS);
  const updateCMS = useMutation(api.admin.updateCMS);
  const deleteCMS = useMutation(api.admin.deleteCMS);

  const [selectedKey, setSelectedKey] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyInput, setNewKeyInput] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "editor">("list");

  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [textColor, setTextColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textAlign, setTextAlign] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  useEffect(() => {
    if (cmsList && selectedKey) {
      const cmsMap = new Map(cmsList.map((c: any) => [c.key, c]));
      const cmsItem = cmsMap.get(selectedKey);
      if (cmsItem) {
        setContent(cmsItem.value);
        try {
          const metadata = cmsItem.metadata ? JSON.parse(cmsItem.metadata) : {};
          setFontFamily(metadata.fontFamily || "");
          setFontSize(metadata.fontSize || "");
          setTextColor(metadata.textColor || "");
          setBgColor(metadata.bgColor || "");
          setTextAlign(metadata.textAlign || "");
          setIsBold(metadata.isBold || false);
          setIsItalic(metadata.isItalic || false);
          setIsUnderline(metadata.isUnderline || false);
        } catch {
          resetStyles();
        }
      } else {
        setContent("");
        resetStyles();
      }
    }
  }, [cmsList, selectedKey]);

  const resetStyles = () => {
    setFontFamily("");
    setFontSize("");
    setTextColor("");
    setBgColor("");
    setTextAlign("");
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
  };

  const handleSelectKey = (key: string) => {
    setSelectedKey(key);
    setMobileView("editor");
    setSaved(false);
  };

  const handleSave = async () => {
    if (!selectedKey) return;
    setSaving(true);
    setSaved(false);
    try {
      const metadata = { fontFamily, fontSize, textColor, bgColor, textAlign, isBold, isItalic, isUnderline };
      await updateCMS({ key: selectedKey, value: content, metadata: JSON.stringify(metadata) });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedKey) return;
    if (!window.confirm(`Reset "${selectedKey}" to its default? This removes your customization.`)) return;
    setDeleting(true);
    try {
      await deleteCMS({ key: selectedKey });
      setSelectedKey("");
      setContent("");
      resetStyles();
      setMobileView("list");
    } finally {
      setDeleting(false);
    }
  };

  const handleCreateNew = () => {
    const key = newKeyInput.trim();
    if (!key) return;
    setSelectedKey(key);
    setContent("");
    resetStyles();
    setShowNewKeyModal(false);
    setNewKeyInput("");
    setMobileView("editor");
  };

  const getPreviewStyle = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    if (fontFamily) styles.fontFamily = `'${fontFamily}', serif`;
    if (fontSize) styles.fontSize = FONT_SIZE_PX[fontSize] || fontSize;
    if (textColor) styles.color = textColor;
    if (bgColor) styles.backgroundColor = bgColor;
    if (textAlign) styles.textAlign = textAlign as any;
    if (isBold) styles.fontWeight = "bold";
    if (isItalic) styles.fontStyle = "italic";
    if (isUnderline) styles.textDecoration = "underline";
    return styles;
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
        <SquaresFour className="w-10 h-10 text-gold-muted" weight="duotone" />
        <p className="text-[#e8e6e1]/75">Admin access required.</p>
      </div>
    );
  }

  const filtered = CMS_KEYS.filter(
    (k) =>
      k.label.toLowerCase().includes(search.toLowerCase()) ||
      k.category.toLowerCase().includes(search.toLowerCase())
  );
  const categories = Array.from(new Set(filtered.map((k) => k.category)));
  const selectedMeta = CMS_KEYS.find((k) => k.key === selectedKey);
  const isCustomKey = selectedKey && !selectedMeta;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient flex items-center gap-2.5">
            <PaintBrush className="w-7 h-7 text-gold-primary" weight="duotone" />
            Visual Editor
          </h1>
          <p className="text-[#e8e6e1]/75 mt-1 text-sm">
            Edit the words and styling clients see, with a live preview as you go
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="text-sm text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1 shrink-0"
        >
          <CaretLeft className="w-4 h-4" weight="bold" />
          Back to Admin
        </button>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-5">
        {/* Content list — always visible on desktop, toggled on mobile */}
        <div className={`${mobileView === "list" ? "block" : "hidden lg:block"} space-y-3`}>
          <div className="relative">
            <MagnifyingGlass className="w-4 h-4 text-gold-muted absolute left-3 top-1/2 -translate-y-1/2" weight="bold" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search content..."
              className="w-full bg-[#0a0a0a] border border-gold-border/30 rounded-xl pl-9 pr-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none focus:border-gold-primary/40"
            />
          </div>

          <div className="bg-[#0a0a0a] border border-gold-border/30 rounded-xl overflow-hidden max-h-[60vh] lg:max-h-[65vh] overflow-y-auto">
            {categories.map((category) => (
              <div key={category}>
                <div className="px-4 py-2 bg-black/30 text-[10px] uppercase tracking-widest text-gold-muted font-heading sticky top-0">
                  {category}
                </div>
                {filtered
                  .filter((k) => k.category === category)
                  .map((item) => {
                    const cmsItem = cmsList?.find((c: any) => c.key === item.key);
                    const isActive = selectedKey === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => handleSelectKey(item.key)}
                        className={`w-full text-left px-4 py-3 border-b border-gold-border/10 transition-colors flex items-center justify-between gap-2 ${
                          isActive ? "bg-gold-dark/15 text-gold-primary" : "text-[#e8e6e1]/85 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-sm truncate">{item.label}</span>
                        {cmsItem && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0" title="Customized" />
                        )}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowNewKeyModal(true)}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-gold-border/40 text-gold-muted hover:text-gold-primary hover:border-gold-primary/40 text-sm py-2.5 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" weight="bold" />
            Add Custom Block
          </button>
        </div>

        {/* Editor + preview */}
        <div className={`${mobileView === "editor" ? "block" : "hidden lg:block"} space-y-5`}>
          {!selectedKey ? (
            <div className="bg-[#0a0a0a] border border-gold-border/30 rounded-xl flex flex-col items-center justify-center gap-3 py-20 text-center">
              <TextAa className="w-10 h-10 text-gold-muted/60" weight="duotone" />
              <p className="text-sm text-[#e8e6e1]/75">Select a content block to edit</p>
            </div>
          ) : (
            <>
              {/* Mobile back button */}
              <button
                onClick={() => setMobileView("list")}
                className="lg:hidden flex items-center gap-1.5 text-sm text-gold-muted hover:text-gold-primary"
              >
                <CaretLeft className="w-4 h-4" weight="bold" />
                All Content
              </button>

              {/* Live preview */}
              <div className="rounded-xl border border-gold-border/30 overflow-hidden">
                <div className="px-4 py-2 bg-black/30 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-muted font-heading">
                  <Eye className="w-3.5 h-3.5" weight="duotone" />
                  Live Preview
                </div>
                <div className="bg-[#050505] p-8 min-h-[120px] flex items-center justify-center">
                  <p style={getPreviewStyle()} className="text-[#e8e6e1] max-w-md">
                    {content || "Your text will appear here..."}
                  </p>
                </div>
              </div>

              {/* Content editor */}
              <div className="bg-[#0a0a0a] border border-gold-border/30 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
                    <TextAa className="w-4 h-4" weight="duotone" />
                    {selectedMeta?.label || selectedKey}
                  </h2>
                  {isCustomKey && (
                    <span className="text-[9px] text-gold-muted bg-gold-dark/15 px-2 py-0.5 rounded-full">Custom</span>
                  )}
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter content..."
                  rows={3}
                  className="w-full bg-black border border-gold-border/30 rounded-lg p-3 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none focus:border-gold-primary/40 resize-y"
                />
              </div>

              {/* Style controls */}
              <div className="bg-[#0a0a0a] border border-gold-border/30 rounded-xl p-5 space-y-5">
                <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
                  <PaintBrush className="w-4 h-4" weight="duotone" />
                  Style
                </h2>

                {/* Font family */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-2">
                    Font
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FONT_FAMILIES.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setFontFamily(fontFamily === f.value ? "" : f.value)}
                        className={`text-left px-3 py-2 rounded-lg border text-xs transition-colors ${
                          fontFamily === f.value
                            ? "border-gold-primary bg-gold-dark/15 text-gold-primary"
                            : "border-gold-border/20 text-[#e8e6e1]/75 hover:border-gold-primary/30"
                        }`}
                        style={{ fontFamily: `'${f.value}', serif` }}
                      >
                        {f.label}
                        <span className="block text-[9px] opacity-60">{f.sample}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font size */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-2">
                    Size
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {FONT_SIZES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setFontSize(fontSize === s.value ? "" : s.value)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-heading transition-colors ${
                          fontSize === s.value
                            ? "bg-gold-dark/25 text-gold-primary"
                            : "bg-black/40 text-[#e8e6e1]/75 hover:text-[#e8e6e1]"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text color */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-2">
                    Text Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setTextColor(textColor === c.value ? "" : c.value)}
                        title={c.label}
                        className="relative w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                        style={{
                          backgroundColor: c.value,
                          borderColor: textColor === c.value ? "#d9cca0" : "rgba(217,204,160,0.2)",
                        }}
                      >
                        {textColor === c.value && (
                          <Check
                            className="w-4 h-4 absolute inset-0 m-auto"
                            weight="bold"
                            color={c.value === "#0a0a0a" || c.value === "#1a1a1a" ? "#fff" : "#0a0a0a"}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Alignment + weight */}
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-2">
                      Align
                    </label>
                    <div className="flex gap-1">
                      {TEXT_ALIGNMENTS.map((a) => (
                        <button
                          key={a.value}
                          onClick={() => setTextAlign(textAlign === a.value ? "" : a.value)}
                          className={`p-2 rounded-lg transition-colors ${
                            textAlign === a.value
                              ? "bg-gold-dark/25 text-gold-primary"
                              : "bg-black/40 text-[#e8e6e1]/75 hover:text-[#e8e6e1]"
                          }`}
                        >
                          <a.icon className="w-4 h-4" weight="bold" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-2">
                      Weight
                    </label>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setIsBold(!isBold)}
                        className={`p-2 rounded-lg transition-colors ${isBold ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"}`}
                      >
                        <TextB className="w-4 h-4" weight="bold" />
                      </button>
                      <button
                        onClick={() => setIsItalic(!isItalic)}
                        className={`p-2 rounded-lg transition-colors ${isItalic ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"}`}
                      >
                        <TextItalic className="w-4 h-4" weight="bold" />
                      </button>
                      <button
                        onClick={() => setIsUnderline(!isUnderline)}
                        className={`p-2 rounded-lg transition-colors ${isUnderline ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#e8e6e1]/75"}`}
                      >
                        <TextUnderline className="w-4 h-4" weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? (
                    <CircleNotch className="w-4 h-4 animate-spin" weight="bold" />
                  ) : saved ? (
                    <Check className="w-4 h-4" weight="bold" />
                  ) : (
                    <FloppyDisk className="w-4 h-4" weight="duotone" />
                  )}
                  {saved ? "Saved" : "Save Changes"}
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 text-red-400/80 hover:text-red-400 text-sm px-4 py-3 rounded-xl border border-red-500/20 hover:border-red-500/40 transition-colors disabled:opacity-50"
                >
                  {deleting ? <CircleNotch className="w-4 h-4 animate-spin" weight="bold" /> : <Trash className="w-4 h-4" weight="duotone" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* New custom block modal */}
      {showNewKeyModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70"
          onClick={() => setShowNewKeyModal(false)}
        >
          <div
            className="bg-[#0a0a0a] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
                <Plus className="w-4 h-4" weight="bold" />
                Add Custom Block
              </h2>
              <button onClick={() => setShowNewKeyModal(false)} className="text-[#e8e6e1]/75">
                <X className="w-4 h-4" weight="bold" />
              </button>
            </div>
            <p className="text-xs text-[#e8e6e1]/75">
              Give it a short, unique key (used internally, not shown to clients).
            </p>
            <input
              type="text"
              value={newKeyInput}
              onChange={(e) => setNewKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreateNew()}
              placeholder="e.g. settings_intro_text"
              className="w-full bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#e8e6e1] placeholder:text-[#e8e6e1]/50 focus:outline-none"
              autoFocus
            />
            <button
              onClick={handleCreateNew}
              disabled={!newKeyInput.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-sm font-semibold py-2.5 rounded-lg disabled:opacity-50"
            >
              <Plus className="w-4 h-4" weight="bold" />
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
