import { useCmsValue } from "../hooks/useCms";
import { useEditMode } from "../contexts/EditModeContext";
import { getEditableDefault } from "../lib/editableContentRegistry";
import type { InputHTMLAttributes } from "react";

interface EditableInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  /** CMS key controlling this field's placeholder text. */
  placeholderCmsKey: string;
  className?: string;
}

/**
 * A normal controlled <input> whose placeholder text is admin-editable.
 * Placeholder text can't use EditableText (it's an attribute, not a
 * rendered child), so in edit mode this renders a transparent clickable
 * overlay instead, the same gold-outline affordance as EditableText, and
 * disables real typing so an admin tapping a field to edit its
 * placeholder doesn't accidentally start filling out the live form.
 */
export function EditableInput({ placeholderCmsKey, className = "", ...inputProps }: EditableInputProps) {
  const resolvedFallback = getEditableDefault(placeholderCmsKey);
  const placeholder = useCmsValue(placeholderCmsKey, resolvedFallback);
  const { active, selectedKey, select } = useEditMode();

  const isSelected = selectedKey === placeholderCmsKey;
  const editClasses = active
    ? isSelected
      ? "outline outline-2 outline-gold-primary outline-offset-2 rounded-lg"
      : "outline outline-1 outline-transparent hover:outline-gold-primary/50 outline-offset-2 rounded-lg transition-[outline-color]"
    : "";

  return (
    <div className="relative">
      <input
        {...inputProps}
        placeholder={placeholder}
        readOnly={active}
        className={`${className} ${editClasses}`.trim()}
      />
      {active && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            select(placeholderCmsKey);
          }}
          className="absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Edit placeholder text for ${placeholderCmsKey}`}
        />
      )}
    </div>
  );
}
