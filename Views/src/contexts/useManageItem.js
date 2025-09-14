import { useContext } from 'react';
import ManageItemContext from './ManageItemContext';

export const useManageItem = () => {
  const context = useContext(ManageItemContext);
  if (!context) {
    throw new Error('useManageItem must be used within a <ManageItemProvider>');
  }
  return context;
};
