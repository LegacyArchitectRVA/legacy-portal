import {
  RiArrowLeftSLine as CaretLeft,
  RiLoader4Line as CircleNotch,
  RiAlignCenter as TextAlignCenter,
  RiDeleteBinLine as Trash,
  RiErrorWarningLine as Warning,
  RiCloseLine as X,
} from "@remixicon/react";
import {
  Check,
  Cursor as CursorClick,
  Save as FloppyDisk,
  Paintbrush as PaintBrush,
  AlignLeft as TextAlignLeft,
  AlignRight as TextAlignRight,
  Bold as TextB,
  Italic as TextItalic,
  Underline as TextUnderline,
  Upload,
} from "reicon-react";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import { FullPageLoader } from "../components/FullPageLoader";
import {
  type EditableKind,
  EditModeProvider,
} from "../contexts/EditModeContext";
import { getEditableDefault } from "../lib/editableContentRegistry";
import { SWAPPABLE_MARKER_ICONS } from "../lib/swappableIcons";
import ChapterPage from "./ChapterPage";
import DashboardPage from "./DashboardPage";
import IntroductionPage from "./IntroductionPage";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import ManualViewPage from "./ManualViewPage";
import MessagesPage from "./MessagesPage";
import ProfilePage from "./ProfilePage";
import SettingsPage from "./SettingsPage";
import SignupPage from "./SignupPage";
import UpgradePage from "./UpgradePage";

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
  const generateImageUploadUrl = useMutation(api.admin.generateImageUploadUrl);
  const updateCMSImage = useMutation(api.admin.updateCMSImage);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedKind, setSelectedKind] = useState<EditableKind>("text");
  const [selectedShapeSwappable, setSelectedShapeSwappable] = useState(false);
  const [iconShapeName, setIconShapeName] = useState("");
  const [activePage, setActivePage] = useState<
    | "landing"
    | "dashboard"
    | "upgrade"
    | "login"
    | "signup"
    | "chapter"
    | "settings"
    | "profile"
    | "messages"
    | "manualview"
    | "introduction"
  >("landing");
  const cmsItem = useQuery(
    api.admin.getCMS,
    selectedKey ? { key: selectedKey } : "skip",
  );
  const currentImageUrl = useQuery(
    api.admin.getCMSImageUrl,
    selectedKey && selectedKind === "image" ? { key: selectedKey } : "skip",
  );

  const [content, setContent] = useState("");
  const [fontFamily, setFontFamily] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [textColor, setTextColor] = useState("#f2ede2");
  const [textAlign, setTextAlign] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [iconColor, setIconColor] = useState("#e8c869");
  const [boxBorderColor, setBoxBorderColor] = useState("");
  const [boxBgColor, setBoxBgColor] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [missingFallback, setMissingFallback] = useState(false);

  // Load the extra font set for the picker (Cinzel/Libre Baskerville already loaded globally)
  useEffect(() => {
    const families = FONT_FAMILIES.filter(
      f => f !== "Cinzel" && f !== "Libre Baskerville",
    )
      .map(f => f.replace(/ /g, "+"))
      .join("&family=");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Wrapped in useCallback so its identity stays stable across renders.
  // Without this it's a brand new function every render, which makes the
  // effect below re-fire constantly instead of only when the selection
  // actually changes, resetting the style controls while you're using them.
  const resetStyles = useCallback(() => {
    setFontFamily("");
    setFontSize("");
    setTextColor("#f2ede2");
    setTextAlign("");
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
  }, []);
  useEffect(() => {
    if (!selectedKey) return;
    setMissingFallback(false);

    if (selectedKind === "icon") {
      setIconColor(cmsItem?.value?.trim() || "#e8c869");
      try {
        const m = cmsItem?.metadata ? JSON.parse(cmsItem.metadata) : {};
        setIconShapeName(m.iconName || "");
      } catch {
        setIconShapeName("");
      }
      return;
    }
    if (selectedKind === "box") {
      try {
        const m = cmsItem?.metadata ? JSON.parse(cmsItem.metadata) : {};
        setBoxBorderColor(m.borderColor || "");
        setBoxBgColor(m.bgColor || "");
      } catch {
        setBoxBorderColor("");
        setBoxBgColor("");
      }
      return;
    }

    if (cmsItem?.value?.trim()) {
      setContent(cmsItem.value);
      try {
        const m = cmsItem.metadata ? JSON.parse(cmsItem.metadata) : {};
        setFontFamily(m.fontFamily || "");
        setFontSize(m.fontSize || "");
        setTextColor(m.textColor || "#f2ede2");
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
  }, [selectedKey, selectedKind, cmsItem, resetStyles]);

  const handleImageUpload = async (file: File) => {
    if (!selectedKey) return;
    setImageUploadError("");
    if (!file.type.startsWith("image/")) {
      setImageUploadError("That file isn't an image.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setImageUploadError("Images must be under 8MB.");
      return;
    }
    setImageUploading(true);
    try {
      const uploadUrl = await generateImageUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      if (!result.ok) throw new Error("Upload failed");
      const { storageId } = await result.json();
      await updateCMSImage({ key: selectedKey, storageId });
    } catch {
      setImageUploadError(
        "Something went wrong uploading that image. Try again.",
      );
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedKey) return;
    if (selectedKind === "text" && missingFallback && !content.trim()) return;
    setSaving(true);
    setSaved(false);
    try {
      if (selectedKind === "icon") {
        await updateCMS({
          key: selectedKey,
          value: iconColor,
          metadata: iconShapeName
            ? JSON.stringify({ iconName: iconShapeName })
            : undefined,
        });
      } else if (selectedKind === "box") {
        await updateCMS({
          key: selectedKey,
          value: "box",
          metadata: JSON.stringify({
            borderColor: boxBorderColor,
            bgColor: boxBgColor,
          }),
        });
      } else {
        const metadata = {
          fontFamily,
          fontSize,
          textColor,
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
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!selectedKey) return;
    if (!window.confirm("Reset this element to its default text and styling?"))
      return;
    await deleteCMS({ key: selectedKey });
    setSelectedKey(null);
  };

  if (isAdmin === undefined) {
    return <FullPageLoader />;
  }
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <PaintBrush className="w-10 h-10 text-gold-muted" />
        <p className="text-[#f2ede2]/75">Admin access required.</p>
      </div>
    );
  }

  const niceLabel = selectedKey
    ?.replace(/^trust_card_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
  const isColorKey = !!selectedKey?.endsWith("_color");

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
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-black/60 border-b border-gold-border/20 flex-wrap">
        {[
          { id: "landing" as const, label: "Landing Page" },
          { id: "dashboard" as const, label: "Dashboard" },
          { id: "upgrade" as const, label: "Upgrade" },
          { id: "login" as const, label: "Sign In" },
          { id: "signup" as const, label: "Sign Up" },
          { id: "chapter" as const, label: "Chapter Pages" },
          { id: "introduction" as const, label: "Introduction" },
          { id: "settings" as const, label: "Settings" },
          { id: "profile" as const, label: "Profile" },
          { id: "messages" as const, label: "Messages" },
          { id: "manualview" as const, label: "Manual View" },
        ].map(p => (
          <button
            key={p.id}
            onClick={() => {
              setActivePage(p.id);
              setSelectedKey(null);
            }}
            className={`text-[11px] px-3 py-1.5 rounded-full font-heading shrink-0 transition-colors ${
              activePage === p.id
                ? "bg-gold-dark/25 text-gold-primary"
                : "bg-black/40 text-[#f2ede2]/75 hover:text-[#f2ede2]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* The real page, rendered live, made clickable */}
      <div className="relative">
        <EditModeProvider
          value={{
            active: true,
            selectedKey,
            selectedKind,
            selectedShapeSwappable,
            select: (key, kind = "text", shapeSwappable = false) => {
              setSelectedKey(key);
              setSelectedKind(kind);
              setSelectedShapeSwappable(shapeSwappable);
            },
          }}
        >
          {activePage === "landing" && <LandingPage />}
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "upgrade" && <UpgradePage />}
          {activePage === "login" && <LoginPage />}
          {activePage === "signup" && <SignupPage />}
          {activePage === "chapter" && (
            <ChapterPage chapterIdOverride="digital" />
          )}
          {activePage === "introduction" && <IntroductionPage />}
          {activePage === "settings" && <SettingsPage />}
          {activePage === "profile" && <ProfilePage />}
          {activePage === "messages" && <MessagesPage />}
          {activePage === "manualview" && (
            <ManualViewPage clientUserIdOverride="kn70phfyxm7k4zcrz74898dxvs881k8z" />
          )}
        </EditModeProvider>
      </div>

      {/* Floating edit panel */}
      {selectedKey && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center bg-black/70 animate-modal-backdrop"
          onClick={() => setSelectedKey(null)}
        >
          <div
            className="bg-[#0f0c08] border border-gold-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[85vh] overflow-y-auto p-5 space-y-4 animate-modal-sheet"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-sm text-gold-primary capitalize">
                {niceLabel}
              </h2>
              <button
                onClick={() => setSelectedKey(null)}
                className="text-[#f2ede2]/75"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {selectedKind === "text" && missingFallback && (
              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-300">
                <Warning className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  {isColorKey
                    ? "Couldn't load this element's original color automatically. Pick the current color below before saving, or Cancel to leave it untouched."
                    : "Couldn't load this element's original text automatically. Type the current wording in below before saving, or Cancel to leave it untouched."}
                </span>
              </div>
            )}

            {selectedKind === "text" && (
              <>
                {!isColorKey && (
                  <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={3}
                    className="w-full bg-black border border-gold-border/30 rounded-lg p-3 text-sm text-[#f2ede2] focus:outline-none focus:border-gold-primary/40 resize-y"
                  />
                )}

                {isColorKey && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                      Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={
                          /^#[0-9a-fA-F]{6}$/.test(content)
                            ? content
                            : "#000000"
                        }
                        onChange={e => setContent(e.target.value)}
                        className="w-12 h-12 rounded-lg border border-gold-border/30 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="#7D6224"
                        className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Font */}
                {!isColorKey && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                      Font
                    </label>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {FONT_FAMILIES.map(f => (
                        <button
                          key={f}
                          onClick={() =>
                            setFontFamily(fontFamily === f ? "" : f)
                          }
                          className={`shrink-0 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                            fontFamily === f
                              ? "border-gold-primary bg-gold-dark/15 text-gold-primary"
                              : "border-gold-border/20 text-[#f2ede2]/75"
                          }`}
                          style={{ fontFamily: `'${f}', serif` }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size */}
                {!isColorKey && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {FONT_SIZES.map(s => (
                        <button
                          key={s.value}
                          onClick={() =>
                            setFontSize(fontSize === s.value ? "" : s.value)
                          }
                          className={`px-3 py-1 rounded-full text-[11px] font-heading transition-colors ${
                            fontSize === s.value
                              ? "bg-gold-dark/25 text-gold-primary"
                              : "bg-black/40 text-[#f2ede2]/75"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Real color picker */}
                {!isColorKey && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                      Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={textColor}
                        onChange={e => setTextColor(e.target.value)}
                        className="w-10 h-10 rounded-lg border border-gold-border/30 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={e => setTextColor(e.target.value)}
                        className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {!isColorKey && (
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                        Align
                      </label>
                      <div className="flex gap-1">
                        {TEXT_ALIGNMENTS.map(a => (
                          <button
                            key={a.value}
                            onClick={() =>
                              setTextAlign(textAlign === a.value ? "" : a.value)
                            }
                            className={`p-2 rounded-lg transition-colors ${
                              textAlign === a.value
                                ? "bg-gold-dark/25 text-gold-primary"
                                : "bg-black/40 text-[#f2ede2]/75"
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
                          className={`p-2 rounded-lg ${isBold ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#f2ede2]/75"}`}
                        >
                          <TextB className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setIsItalic(!isItalic)}
                          className={`p-2 rounded-lg ${isItalic ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#f2ede2]/75"}`}
                        >
                          <TextItalic className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setIsUnderline(!isUnderline)}
                          className={`p-2 rounded-lg ${isUnderline ? "bg-gold-dark/25 text-gold-primary" : "bg-black/40 text-[#f2ede2]/75"}`}
                        >
                          <TextUnderline className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {selectedKind === "icon" && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                    Icon Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={
                        /^#[0-9a-fA-F]{6}$/.test(iconColor)
                          ? iconColor
                          : "#000000"
                      }
                      onChange={e => setIconColor(e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gold-border/30 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={iconColor}
                      onChange={e => setIconColor(e.target.value)}
                      placeholder="#e8c869"
                      className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] focus:outline-none"
                    />
                  </div>
                </div>

                {selectedShapeSwappable && (
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                      Icon Shape
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {SWAPPABLE_MARKER_ICONS.map(opt => (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => setIconShapeName(opt.name)}
                          title={opt.label}
                          className={`flex items-center justify-center p-2.5 rounded-lg border transition-colors ${
                            iconShapeName === opt.name
                              ? "border-gold-primary bg-gold-dark/20"
                              : "border-gold-border/30 hover:border-gold-primary/40"
                          }`}
                        >
                          <opt.icon
                            className="w-4 h-4"
                            style={{ color: iconColor }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedKind === "box" && (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                    Border Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={
                        /^#[0-9a-fA-F]{6}$/.test(boxBorderColor)
                          ? boxBorderColor
                          : "#000000"
                      }
                      onChange={e => setBoxBorderColor(e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gold-border/30 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={boxBorderColor}
                      onChange={e => setBoxBorderColor(e.target.value)}
                      placeholder="Leave blank for default"
                      className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block mb-1.5">
                    Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={
                        /^#[0-9a-fA-F]{6}$/.test(boxBgColor)
                          ? boxBgColor
                          : "#000000"
                      }
                      onChange={e => setBoxBgColor(e.target.value)}
                      className="w-12 h-12 rounded-lg border border-gold-border/30 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={boxBgColor}
                      onChange={e => setBoxBgColor(e.target.value)}
                      placeholder="Leave blank for default"
                      className="flex-1 bg-black border border-gold-border/30 rounded-lg px-3 py-2 text-sm text-[#f2ede2] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedKind === "image" && (
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-gold-muted font-heading block">
                  Current Image
                </label>
                {currentImageUrl ? (
                  <img
                    src={currentImageUrl}
                    alt=""
                    className="w-full max-h-40 object-contain rounded-lg border border-gold-border/30 bg-black/40"
                  />
                ) : (
                  <p className="text-xs text-[#f2ede2]/60 italic">
                    Using the default image, nothing's been uploaded for this
                    yet.
                  </p>
                )}

                <label className="flex items-center justify-center gap-2 bg-black border border-gold-border/30 rounded-lg px-3 py-3 text-sm text-[#f2ede2] cursor-pointer hover:border-gold-primary/40 transition-colors">
                  {imageUploading ? (
                    <CircleNotch className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {imageUploading ? "Uploading..." : "Upload New Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={imageUploading}
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                      e.target.value = "";
                    }}
                  />
                </label>
                {imageUploadError && (
                  <p className="text-xs text-red-400">{imageUploadError}</p>
                )}
                <p className="text-[10px] text-[#f2ede2]/50">
                  JPG, PNG, or WebP, up to 8MB. Replaces only this image,
                  everywhere it appears.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              {selectedKind !== "image" && (
                <button
                  onClick={handleSave}
                  disabled={
                    saving ||
                    (selectedKind === "text" &&
                      missingFallback &&
                      !content.trim())
                  }
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4b661] to-[#7D6224] text-[#0f0c08] font-heading text-sm font-semibold py-2.5 rounded-xl disabled:opacity-50"
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
              )}
              <button
                onClick={handleReset}
                className={`flex items-center gap-2 text-red-400/80 hover:text-red-400 text-sm px-3 py-2.5 rounded-xl border border-red-500/20 ${
                  selectedKind === "image" ? "flex-1 justify-center" : ""
                }`}
              >
                <Trash className="w-4 h-4" />
                {selectedKind === "image" && "Reset to Default"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
