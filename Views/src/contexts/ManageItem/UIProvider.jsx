import { useCallback, useMemo, useState } from 'react';
import { UIContext } from './UIContext';
import { useProductsContext } from './ProductsContext';
import { useSelectionContext } from './SelectionContext';
import { useEditingContext } from './EditingContext';

export const UIProvider = ({ children }) => {
  const { products } = useProductsContext();
  const { clearSelection } = useSelectionContext();
  const { setShouldResetForm, setSelectedItem } = useEditingContext();

  const [activeTable, setActiveTable] = useState('box1');
  const [pendingDelete, setPendingDelete] = useState({ items: [] });

  const isModalOpen = pendingDelete.items.length > 0;

  const handleDeleteConfirmed = useCallback(() => {
    // deleteItems(pendingDelete.items);
    clearSelection();
    // setPendingDelete({ items: [] });
  }, [products, clearSelection]);

  const handleSwipeLeft = useCallback(
    record => {
      if (!record) return;
      setSelectedItem(record);
      setShouldResetForm(false);
      setActiveTable('box2');
    },
    [products]
  );

  const handleTableChange = useCallback(nextId => {
    if (nextId === 'box1') {
      setSelectedItem(null);
      setShouldResetForm(true);
    } else {
      setShouldResetForm(false);
    }
    setActiveTable(nextId);
  }, []);

  const contextValue = useMemo(
    () => ({
      activeTable,
      pendingDelete,
      isModalOpen,
      setPendingDelete,
      handleDeleteConfirmed,
      handleSwipeLeft,
      handleTableChange,
    }),
    [
      activeTable,
      pendingDelete,
      isModalOpen,
      handleDeleteConfirmed,
      handleSwipeLeft,
      handleTableChange,
    ]
  );

  return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>;
};
