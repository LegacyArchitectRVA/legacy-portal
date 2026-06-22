import { createContext, useContext } from "react";

export type EditableKind = "text" | "icon" | "box";

interface EditModeState {
  active: boolean;
  selectedKey: string | null;
  selectedKind: EditableKind;
  selectedShapeSwappable: boolean;
  select: (key: string, kind?: EditableKind, shapeSwappable?: boolean) => void;
}

const EditModeContext = createContext<EditModeState>({
  active: false,
  selectedKey: null,
  selectedKind: "text",
  selectedShapeSwappable: false,
  select: () => {},
});

export const EditModeProvider = EditModeContext.Provider;
export const useEditMode = () => useContext(EditModeContext);
