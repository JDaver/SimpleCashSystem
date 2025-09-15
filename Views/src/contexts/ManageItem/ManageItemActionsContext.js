import { createContext, useContext } from 'react';

export const ManageItemActionsContext = createContext(null);

export const useManageItemActions = () => {
  const context = useContext(ManageItemActionsContext);
  if (!context) {
    throw new Error('useManageItemActions must be used within a <ManageItemProvider>');
  }
  return context;
};
