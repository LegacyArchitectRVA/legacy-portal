import { createContext, useContext } from "react";

export type EditableKind = "text" | "icon" | "box";

interface EditModeState {
  active: boolean;
  selectedKey: string | null;
  selectedKind: EditableKind;
  select: (key: string, kind?: EditableKind) => void;
}

const EditModeContext = createContext<EditModeState>({
  active: false,
  selectedKey: null,
  selectedKind: "text",
  select: () => {},
});

export const EditModeProvider = EditModeContext.Provider;
export const useEditMode = () => useContext(EditModeContext);
