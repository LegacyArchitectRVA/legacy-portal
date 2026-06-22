import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEditMode } from "../contexts/EditModeContext";

interface EditableImageProps {
  /** CMS key controlling this image's override. */
  cmsKey: string;
  /** The image to show if nothing's been uploaded yet. */
  defaultSrc: string;
  alt: string;
  className?: string;
}

/**
 * An <img> that an admin can replace via the Visual Editor. Shows the
 * default image until something's actually been uploaded for this key,
 * never silently swaps to a placeholder. The upload control itself lives
 * in the editor's floating panel (selectedKind "image"), not inline here,
 * matching the same click-to-select pattern as every other Editable*.
 */
export function EditableImage({ cmsKey, defaultSrc, alt, className = "" }: EditableImageProps) {
  const customUrl = useQuery(api.admin.getCMSImageUrl, { key: cmsKey });
  const src = customUrl || defaultSrc;
  const { active, selectedKey, selectedKind, select } = useEditMode();

  const isSelected = selectedKey === cmsKey && selectedKind === "image";
  const editClasses = active
    ? isSelected
      ? "outline outline-2 outline-gold-primary outline-offset-2 cursor-pointer"
      : "outline outline-1 outline-transparent hover:outline-gold-primary/50 outline-offset-2 cursor-pointer transition-[outline-color]"
    : "";

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${editClasses}`.trim()}
      onClick={
        active
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              select(cmsKey, "image");
            }
          : undefined
      }
    />
  );
}
