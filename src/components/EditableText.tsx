import { useCmsValue, useCmsStyle, cmsStyleToCss } from "../hooks/useCms";
import { useEditMode } from "../contexts/EditModeContext";
import { getEditableDefault } from "../lib/editableContentRegistry";
import type { ElementType, CSSProperties } from "react";

interface EditableTextProps {
  cmsKey: string;
  /** Optional — if omitted, the shared registry's default for this key is used. */
  fallback?: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** For multi-line text (e.g. hero titles using \n for line breaks) */
  preserveLineBreaks?: boolean;
}

export function EditableText({
  cmsKey,
  fallback,
  as: Tag = "span",
  className = "",
  style,
  preserveLineBreaks,
}: EditableTextProps) {
  const resolvedFallback = fallback ?? getEditableDefault(cmsKey);
  const value = useCmsValue(cmsKey, resolvedFallback);
  const cmsStyle = useCmsStyle(cmsKey);
  const { active, selectedKey, select } = useEditMode();

  const isSelected = selectedKey === cmsKey;
  const mergedStyle: CSSProperties = { ...style, ...cmsStyleToCss(cmsStyle) };

  const editClasses = active
    ? isSelected
      ? "outline outline-2 outline-gold-primary outline-offset-2 rounded-sm cursor-pointer"
      : "outline outline-1 outline-transparent hover:outline-gold-primary/50 outline-offset-2 rounded-sm cursor-pointer transition-[outline-color]"
    : "";

  const content = preserveLineBreaks
    ? value.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          {i < value.split("\n").length - 1 && <br />}
        </span>
      ))
    : value;

  return (
    <Tag
      style={mergedStyle}
      className={`${className} ${editClasses}`.trim()}
      onClick={
        active
          ? (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              select(cmsKey);
            }
          : undefined
      }
    >
      {content}
    </Tag>
  );
}
