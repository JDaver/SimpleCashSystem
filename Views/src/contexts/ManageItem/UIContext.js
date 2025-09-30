import { createContext, useContext } from 'react';

export const UIContext = createContext(null);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a <UIProvider>');
  }
  return context;
};
