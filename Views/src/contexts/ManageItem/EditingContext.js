import { createContext, useContext } from 'react';

export const EditingContext = createContext(null);

export const useEditingContext = () => {
  const context = useContext(EditingContext);
  if (!context) {
    throw new Error('useEditingContext must be used within a <EditingProvider>');
  }
  return context;
};
