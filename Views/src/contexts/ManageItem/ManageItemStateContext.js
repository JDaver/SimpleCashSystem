import { createContext, useContext } from 'react';

export const ManageItemStateContext = createContext(null);

export const useManageItemState = () => {
  const context = useContext(ManageItemStateContext);
  if (!context) {
    throw new Error('useManageItemState must be used within a <ManageItemProvider>');
  }
  return context;
};
