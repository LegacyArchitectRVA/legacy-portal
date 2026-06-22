import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEditMode } from "../contexts/EditModeContext";
import type { ComponentType } from "react";

interface EditableIconProps {
  /** CMS key controlling this icon's color override. */
  cmsKey: string;
  /** The icon component to render (e.g. a Remix Icon import). */
  icon: ComponentType<any>;
  /** Default color if nothing's been customized yet. */
  defaultColor: string;
  size?: number;
  className?: string;
}

/**
 * An icon whose color is admin-editable. In edit mode, clicking it opens
 * the same floating panel as EditableText/EditableIcon, but the panel
 * shows icon-appropriate controls (just a color picker) rather than a
 * textarea, since selectedKind is "icon".
 */
export function EditableIcon({ cmsKey, icon: Icon, defaultColor, size = 16, className = "" }: EditableIconProps) {
  const cms = useQuery(api.admin.getCMS, { key: cmsKey });
  const color = cms?.value?.trim() ? cms.value : defaultColor;
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
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              select(cmsKey, "icon");
            }
          : undefined
      }
    >
      <Icon className={className} style={{ color }} size={size} />
    </span>
  );
}
