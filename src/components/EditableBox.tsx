import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEditMode } from "../contexts/EditModeContext";
import type { ReactNode, CSSProperties } from "react";

interface EditableBoxProps {
  /** CMS key controlling this box's border/background color override. */
  cmsKey: string;
  /** Default border color if nothing's been customized yet. */
  defaultBorderColor?: string;
  /** Default background color if nothing's been customized yet. */
  defaultBgColor?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * A wrapper div whose border-color and background-color are admin-
 * editable, on top of whatever className/style it's given. Stores both
 * values together as JSON in the CMS metadata field (the unused `value`
 * field just holds a marker), since a box edit is really one combined
 * "look" rather than separate fields.
 */
export function EditableBox({
  cmsKey,
  defaultBorderColor,
  defaultBgColor,
  className = "",
  style,
  children,
}: EditableBoxProps) {
  const cms = useQuery(api.admin.getCMS, { key: cmsKey });
  let borderColor = defaultBorderColor;
  let bgColor = defaultBgColor;
  if (cms?.metadata) {
    try {
      const parsed = JSON.parse(cms.metadata);
      if (parsed.borderColor) borderColor = parsed.borderColor;
      if (parsed.bgColor) bgColor = parsed.bgColor;
    } catch {
      // Ignore malformed metadata, fall back to defaults.
    }
  }
  const { active, selectedKey, selectedKind, select } = useEditMode();

  const isSelected = selectedKey === cmsKey && selectedKind === "box";
  const editClasses = active
    ? isSelected
      ? "outline outline-2 outline-gold-primary outline-offset-2 cursor-pointer"
      : "outline outline-1 outline-transparent hover:outline-gold-primary/50 outline-offset-2 cursor-pointer transition-[outline-color]"
    : "";

  return (
    <div
      className={`${className} ${editClasses}`.trim()}
      style={{
        ...style,
        ...(borderColor ? { borderColor } : {}),
        ...(bgColor ? { backgroundColor: bgColor } : {}),
      }}
      onClick={
        active
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              select(cmsKey, "box");
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
