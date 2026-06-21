import { createContext, useContext } from "react";

interface EditModeState {
  active: boolean;
  selectedKey: string | null;
  select: (key: string) => void;
}

const EditModeContext = createContext<EditModeState>({
  active: false,
  selectedKey: null,
  select: () => {},
});

export const EditModeProvider = EditModeContext.Provider;
export const useEditMode = () => useContext(EditModeContext);
