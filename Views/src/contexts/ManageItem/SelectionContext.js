import { createContext, useContext } from 'react';

export const SelectionContext = createContext(null);

export const useSelectionContext = () => {
  const context = useContext(SelectionContext);

  if (!context) {
    throw new Error('useSelectionContext must be used within a <SelectionProvider>');
  }

  return context;
};
