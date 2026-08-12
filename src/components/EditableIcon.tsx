import { useQuery } from "convex/react";
import type { ComponentType } from "react";
import { api } from "../../convex/_generated/api";
import { useEditMode } from "../contexts/EditModeContext";
import { getSwappableIcon } from "../lib/swappableIcons";

interface EditableIconProps {
  /** CMS key controlling this icon's color/shape override. */
  cmsKey: string;
  /** The icon component to render (e.g. a Remix Icon import). */
  icon: ComponentType<any>;
  /** Default color if nothing's been customized yet. */
  defaultColor: string;
  /** Whether this icon's shape (not just color) can be swapped via the editor. */
  shapeSwappable?: boolean;
  size?: number;
  className?: string;
}

/**
 * An icon whose color, and optionally shape, is admin-editable. In edit
 * mode, clicking it opens the same floating panel as EditableText, but
 * with icon-appropriate controls (color picker, and an icon-shape grid
 * if shapeSwappable) rather than a textarea, since selectedKind is "icon".
 * Color is stored as the CMS value; the swapped shape (if any) is stored
 * in metadata, since they're independent choices.
 */
export function EditableIcon({
  cmsKey,
  icon: Icon,
  defaultColor,
  shapeSwappable = false,
  size = 16,
  className = "",
}: EditableIconProps) {
  const cms = useQuery(api.admin.getCMS, { key: cmsKey });
  const color = cms?.value?.trim() ? cms.value : defaultColor;
  let RenderIcon = Icon;
  if (shapeSwappable && cms?.metadata) {
    try {
      const m = JSON.parse(cms.metadata);
      const swapped = m.iconName ? getSwappableIcon(m.iconName) : null;
      if (swapped) RenderIcon = swapped;
    } catch {
      // Malformed metadata: fall back to the default icon shape.
    }
  }
  const { active, selectedKey, selectedKind, select } = useEditMode();

  const isSelected = selectedKey === cmsKey && selectedKind === "icon";
  const editClasses = active
    ? isSelected
      ? "outline outline-2 outline-gold-primary outline-offset-2 rounded-sm cursor-pointer"
      : "outline outline-1 outline-transparent hover:outline-gold-primary/50 outline-offset-2 rounded-sm cursor-pointer transition-[outline-color]"
    : "";

  return (
    <span
      className={`inline-flex ${editClasses}`.trim()}
      onClick={
        active
          ? e => {
              e.preventDefault();
              e.stopPropagation();
              select(cmsKey, "icon", shapeSwappable);
            }
          : undefined
      }
    >
      <RenderIcon className={className} style={{ color }} size={size} />
    </span>
  );
}
