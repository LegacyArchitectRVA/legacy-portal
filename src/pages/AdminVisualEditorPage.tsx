import { useMutation, useQuery } from "convex/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import {
  Type,
  Paintbrush,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Save,
  Eye,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
} from "lucide-react";

// Available CMS keys for editing
const CMS_KEYS = [
  // Landing page
  { key: "landing_hero_title", label: "Landing Hero Title", category: "Landing Page" },
  { key: "landing_hero_subtitle", label: "Landing Hero Subtitle", category: "Landing Page" },
  { key: "landing_cta_text", label: "Landing CTA Button Text", category: "Landing Page" },
  
  // Dashboard
  { key: "dashboard_welcome", label: "Dashboard Welcome Message", category: "Dashboard" },
  { key: "dashboard_description", label: "Dashboard Description", category: "Dashboard" },
  
  // Upgrade page
  { key: "upgrade_title", label: "Upgrade Page Title", category: "Upgrade Page" },
  { key: "upgrade_vault_desc", label: "Vault Tier Description", category: "Upgrade Page" },
  { key: "upgrade_archive_desc", label: "Archive Tier Description", category: "Upgrade Page" },
  { key: "upgrade_legacy_desc", label: "Legacy Tier Description", category: "Upgrade Page" },
  
  // Chapter pages
  { key: "chapter_intro", label: "Chapter Introduction Text", category: "Chapters" },
  { key: "chapter_complete_msg", label: "Chapter Complete Message", category: "Chapters" },
  
  // General
  { key: "app_tagline", label: "Application Tagline", category: "General" },
  { key: "footer_text", label: "Footer Text", category: "General" },
  { key: "contact_email", label: "Contact Email", category: "General" },
];

// Font families available
const FONT_FAMILIES = [
  { value: "Cinzel", label: "Cinzel (Headers)" },
  { value: "Libre Baskerville", label: "Libre Baskerville (Body)" },
  { value: "Inter", label: "Inter (Modern)" },
  { value: "Playfair Display", label: "Playfair Display (Elegant)" },
  { value: "Lora", label: "Lora (Readable)" },
  { value: "Merriweather", label: "Merriweather (Classic)" },
];

// Color presets matching the luxury theme
const COLOR_PRESETS = [
  { value: "#d9cca0", label: "Gold Light", category: "Gold" },
  { value: "#b89f6b", label: "Gold Medium", category: "Gold" },
  { value: "#8b7355", label: "Gold Dark", category: "Gold" },
  { value: "#e8c46a", label: "Gold Accent", category: "Gold" },
  { value: "#ffffff", label: "White", category: "Neutral" },
  { value: "#e8e6e1", label: "Off White", category: "Neutral" },
  { value: "#0a0a0a", label: "Black", category: "Neutral" },
  { value: "#1a1a1a", label: "Dark Gray", category: "Neutral" },
  { value: "#2a2a2a", label: "Medium Gray", category: "Neutral" },
];

// Text alignment options
const TEXT_ALIGNMENTS = [
  { value: "left", label: "Left", icon: AlignLeft },
  { value: "center", label: "Center", icon: AlignCenter },
  { value: "right", label: "Right", icon: AlignRight },
];

// Font size presets
const FONT_SIZES = [
  { value: "text-xs", label: "Extra Small" },
  { value: "text-sm", label: "Small" },
  { value: "text-base", label: "Base" },
  { value: "text-lg", label: "Large" },
  { value: "text-xl", label: "Extra Large" },
  { value: "text-2xl", label: "2XL" },
  { value: "text-3xl", label: "3XL" },
  { value: "text-4xl", label: "4XL" },
];

export default function AdminVisualEditorPage() {
  const navigate = useNavigate();
  const isAdmin = useQuery(api.admin.isAdmin);
  const cmsList = useQuery(api.admin.listCMS);
  const updateCMS = useMutation(api.admin.updateCMS);
  const deleteCMS = useMutation(api.admin.deleteCMS);
  
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  // Style states for the selected element
  const [fontFamily, setFontFamily] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [textAlign, setTextAlign] = useState<string>("");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  
  // Load CMS content
  useEffect(() => {
    if (cmsList) {
      const cmsMap = new Map(cmsList.map((c: any) => [c.key, c]));
      // If there's a selected key, load its content
      if (selectedKey) {
        const cmsItem = cmsMap.get(selectedKey);
        if (cmsItem) {
          setContent(cmsItem.value);
          // Parse style metadata if present
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
            // No metadata or invalid JSON
          }
        } else {
          setContent("");
          resetStyles();
        }
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
  
  const toggleCategory = (category: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setExpandedCategories(newSet);
  };
  
  const isCategoryExpanded = (category: string) => expandedCategories.has(category);
  
  const handleSelectKey = (key: string) => {
    setSelectedKey(key);
    setIsEditing(true);
  };
  
  const handleSave = async () => {
    if (!selectedKey) return;
    setSaving(true);
    try {
      const metadata = {
        fontFamily,
        fontSize,
        textColor,
        bgColor,
        textAlign,
        isBold,
        isItalic,
        isUnderline,
      };
      await updateCMS({
        key: selectedKey,
        value: content,
        metadata: JSON.stringify(metadata),
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (!selectedKey) return;
    if (!window.confirm(`Are you sure you want to delete "${selectedKey}"?`)) return;
    setDeleting(true);
    try {
      await deleteCMS({ key: selectedKey });
      setSelectedKey("");
      setContent("");
      resetStyles();
      setIsEditing(false);
    } finally {
      setDeleting(false);
    }
  };
  
  const handleCreateNew = () => {
    const newKey = prompt("Enter a new CMS key:");
    if (newKey && newKey.trim()) {
      setSelectedKey(newKey.trim());
      setContent("");
      resetStyles();
      setIsEditing(true);
    }
  };
  
  const getPreviewStyle = () => {
    const styles: React.CSSProperties = {};
    if (fontFamily) styles.fontFamily = fontFamily;
    if (fontSize) {
      const sizeMap: Record<string, string> = {
        "text-xs": "0.75rem",
        "text-sm": "0.875rem",
        "text-base": "1rem",
        "text-lg": "1.125rem",
        "text-xl": "1.25rem",
        "text-2xl": "1.5rem",
        "text-3xl": "1.875rem",
        "text-4xl": "2.25rem",
      };
      styles.fontSize = sizeMap[fontSize] || fontSize;
    }
    if (textColor) styles.color = textColor;
    if (bgColor) styles.backgroundColor = bgColor;
    if (textAlign) styles.textAlign = textAlign as any;
    if (isBold) styles.fontWeight = "bold";
    if (isItalic) styles.fontStyle = "italic";
    if (isUnderline) styles.textDecoration = "underline";
    return styles;
  };
  
  const getCMSKeysByCategory = () => {
    const map = new Map<string, typeof CMS_KEYS>();
    CMS_KEYS.forEach((item) => {
      if (!map.has(item.category)) {
        map.set(item.category, []);
      }
      map.get(item.category)!.push(item);
    });
    return map;
  };
  
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LayoutDashboard className="w-10 h-10 text-gold-muted mb-4" />
        <p className="text-[#e8e6e1]/75">Admin access required.</p>
      </div>
    );
  }
  
  const categories = getCMSKeysByCategory();
  const selectedCMS = cmsList?.find((c: any) => c.key === selectedKey);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-gold-gradient">
            Visual Editor
          </h1>
          <p className="text-[#e8e6e1]/75 mt-1">
            Carrd-style editor for typography, colors, and content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-gold-muted hover:text-gold-primary transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Admin
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - CMS Keys */}
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border overflow-hidden">
          <div className="p-4 border-b border-gold-border/30">
            <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Content Blocks
            </h2>
          </div>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {Array.from(categories.entries()).map(([category, keys]) => (
              <div key={category} className="border-b border-gold-border/10">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full p-3 text-left flex items-center justify-between hover:bg-[#e8c46a]/5 transition-colors"
                >
                  <span className="font-heading text-xs text-gold-muted uppercase tracking-widest">
                    {category}
                  </span>
                  {isCategoryExpanded(category) ? (
                    <ChevronUp className="w-4 h-4 text-gold-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gold-muted" />
                  )}
                </button>
                {isCategoryExpanded(category) && (
                  <div className="px-3 pb-2 space-y-1">
                    {keys.map((item) => {
                      const hasContent = cmsList?.some((c: any) => c.key === item.key);
                      const isSelected = selectedKey === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => handleSelectKey(item.key)}
                          className={`w-full text-left p-2 rounded text-xs transition-colors ${
                            isSelected
                              ? "bg-gold-primary/20 text-gold-primary"
                              : "text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5 hover:text-[#e8e6e1]"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                hasContent ? "bg-emerald-400" : "bg-gray-600"
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                          <code className="text-[10px] text-gold-muted/50 mt-1 block">
                            {item.key}
                          </code>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            
            {/* Add new CMS key */}
            <div className="p-3">
              <button
                onClick={handleCreateNew}
                className="w-full flex items-center justify-center gap-2 text-xs text-gold-muted hover:text-gold-primary transition-colors py-2 border border-dashed border-gold-border/30 rounded"
              >
                <Plus className="w-4 h-4" />
                Add New Block
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Editor Header */}
          <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-4">
            {isEditing ? (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-gold-primary">
                    {selectedCMS?.key || selectedKey}
                  </h3>
                  <p className="text-[10px] text-[#e8e6e1]/50 mt-1">
                    {CMS_KEYS.find((k) => k.key === selectedKey)?.label || "Custom Block"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="text-[10px] text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : <Trash2 className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#d9cca0] to-[#b89f6b] text-[#0a0a0a] font-heading text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-3 h-3" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[#e8e6e1]/50">
                <Paintbrush className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select a content block to edit</p>
              </div>
            )}
          </div>
          
          {/* Content Editor */}
          {isEditing && (
            <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-4">
              <h4 className="font-heading text-xs text-gold-muted uppercase tracking-widest mb-3">
                Content
              </h4>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your content here..."
                className="w-full bg-black border border-gold-border/30 rounded-lg p-4 text-[#e8e6e1] placeholder:text-[#e8e6e1]/30 focus:outline-none focus:border-gold-primary min-h-[200px] resize-none font-serif"
                style={getPreviewStyle()}
              />
            </div>
          )}
          
          {/* Preview */}
          {isEditing && content && (
            <div className="bg-[#0a0a0a] rounded-xl border border-gold-border p-4">
              <h4 className="font-heading text-xs text-gold-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                <Eye className="w-3 h-3" />
                Preview
              </h4>
              <div
                className="p-4 bg-black rounded-lg min-h-[100px]"
                style={getPreviewStyle()}
              >
                {content}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Sidebar - Style Controls */}
        <div className="bg-[#0a0a0a] rounded-xl border border-gold-border overflow-hidden">
          <div className="p-4 border-b border-gold-border/30">
            <h2 className="font-heading text-sm text-gold-primary flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Style Controls
            </h2>
          </div>
          <div className="p-4 space-y-6">
            {/* Typography */}
            <div>
              <h4 className="font-heading text-xs text-gold-muted uppercase tracking-widest mb-3">
                Typography
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-[#e8e6e1]/75 uppercase tracking-widest mb-1 block">
                    Font Family
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full bg-black border border-gold-border/30 rounded px-2 py-1.5 text-xs text-[#e8e6e1] focus:outline-none focus:border-gold-primary cursor-pointer"
                  >
                    <option value="">Default</option>
                    {FONT_FAMILIES.map((f) => (
                      <option key={f.value} value={f.value}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-[10px] text-[#e8e6e1]/75 uppercase tracking-widest mb-1 block">
                    Font Size
                  </label>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full bg-black border border-gold-border/30 rounded px-2 py-1.5 text-xs text-[#e8e6e1] focus:outline-none focus:border-gold-primary cursor-pointer"
                  >
                    <option value="">Default</option>
                    {FONT_SIZES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsBold(!isBold)}
                    className={`p-1.5 rounded border transition-colors ${
                      isBold
                        ? "bg-gold-primary/20 border-gold-primary text-gold-primary"
                        : "border-gold-border/30 text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5"
                    }`}
                    title="Bold"
                  >
                    <Bold className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsItalic(!isItalic)}
                    className={`p-1.5 rounded border transition-colors ${
                      isItalic
                        ? "bg-gold-primary/20 border-gold-primary text-gold-primary"
                        : "border-gold-border/30 text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5"
                    }`}
                    title="Italic"
                  >
                    <Italic className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={`p-1.5 rounded border transition-colors ${
                      isUnderline
                        ? "bg-gold-primary/20 border-gold-primary text-gold-primary"
                        : "border-gold-border/30 text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5"
                    }`}
                    title="Underline"
                  >
                    <Underline className="w-3 h-3" />
                  </button>
                </div>
                
                <div>
                  <label className="text-[10px] text-[#e8e6e1]/75 uppercase tracking-widest mb-1 block">
                    Text Alignment
                  </label>
                  <div className="flex gap-1">
                    {TEXT_ALIGNMENTS.map((a) => {
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.value}
                          onClick={() => setTextAlign(a.value)}
                          className={`flex-1 p-1.5 rounded border transition-colors flex items-center justify-center ${
                            textAlign === a.value
                              ? "bg-gold-primary/20 border-gold-primary text-gold-primary"
                              : "border-gold-border/30 text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5"
                          }`}
                          title={a.label}
                        >
                          <Icon className="w-3 h-3" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Colors */}
            <div>
              <h4 className="font-heading text-xs text-gold-muted uppercase tracking-widest mb-3">
                Colors
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-[#e8e6e1]/75 uppercase tracking-widest mb-1 block">
                    Text Color
                  </label>
                  <select
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full bg-black border border-gold-border/30 rounded px-2 py-1.5 text-xs text-[#e8e6e1] focus:outline-none focus:border-gold-primary cursor-pointer"
                  >
                    <option value="">Default</option>
                    {COLOR_PRESETS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[#e8e6e1]/75 uppercase tracking-widest mb-1 block">
                    Background Color
                  </label>
                  <select
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full bg-black border border-gold-border/30 rounded px-2 py-1.5 text-xs text-[#e8e6e1] focus:outline-none focus:border-gold-primary cursor-pointer"
                  >
                    <option value="">Transparent</option>
                    {COLOR_PRESETS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Quick Style Presets */}
            <div>
              <h4 className="font-heading text-xs text-gold-muted uppercase tracking-widest mb-3">
                Quick Styles
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setFontFamily("Cinzel");
                    setFontSize("text-xl");
                    setTextColor("#d9cca0");
                    setTextAlign("center");
                    setIsBold(true);
                  }}
                  className="text-[10px] bg-black border border-gold-border/30 rounded px-2 py-1.5 text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5 transition-colors"
                >
                  Heading Gold
                </button>
                <button
                  onClick={() => {
                    setFontFamily("Libre Baskerville");
                    setFontSize("text-base");
                    setTextColor("#e8e6e1");
                    setTextAlign("left");
                    setIsBold(false);
                    setIsItalic(false);
                  }}
                  className="text-[10px] bg-black border border-gold-border/30 rounded px-2 py-1.5 text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5 transition-colors"
                >
                  Body Text
                </button>
                <button
                  onClick={() => {
                    setFontFamily("Cinzel");
                    setFontSize("text-sm");
                    setTextColor("#b89f6b");
                    setTextAlign("center");
                    setIsBold(false);
                  }}
                  className="text-[10px] bg-black border border-gold-border/30 rounded px-2 py-1.5 text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5 transition-colors"
                >
                  Subtle Label
                </button>
                <button
                  onClick={() => {
                    resetStyles();
                  }}
                  className="text-[10px] bg-black border border-gold-border/30 rounded px-2 py-1.5 text-[#e8e6e1]/75 hover:bg-[#e8c46a]/5 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for loading state
function Loader2({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <path d="M12 3v3" />
      <path d="M12 18v3" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <path d="M19.12 4.88a2 2 0 0 0-2.24 0l-.88.88a2 2 0 0 0 0 2.82l.88.88a2 2 0 0 0 2.24 0l.88-.88a2 2 0 0 0 0-2.82l-.88-.88Z" />
      <path d="M4.88 19.12a2 2 0 0 0 2.24 0l.88-.88a2 2 0 0 0 0-2.82l-.88-.88a2 2 0 0 0-2.24 0l-.88.88a2 2 0 0 0 0 2.82l.88.88Z" />
      <path d="M19.12 19.12a2 2 0 0 0-2.24 0l-.88-.88a2 2 0 0 0-2.82 0l-.88.88a2 2 0 0 0 0 2.24l.88.88a2 2 0 0 0 2.24 0l.88-.88a2 2 0 0 0 0-2.82l-.88-.88Z" />
      <path d="M4.88 4.88a2 2 0 0 0 2.24 0l.88.88a2 2 0 0 0 2.82 0l.88-.88a2 2 0 0 0 0-2.24l-.88-.88a2 2 0 0 0-2.82 0l-.88.88a2 2 0 0 0 0 2.24Z" />
    </svg>
  );
}

// Helper component for chevron left
function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
