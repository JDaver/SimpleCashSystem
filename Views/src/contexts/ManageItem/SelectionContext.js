import { createContext, useContext } from 'react';

export const SelectionContext = createContext(null);

export const useSelectionContext = () => {
  const context = useContext(SelectionContext);

  if (!context) {
    return {
      isItemSelected: () => false,
      selectionMode: false,
    };
  }

  return context;
};
