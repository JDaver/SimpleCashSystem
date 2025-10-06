import { useCallback, useMemo, useState } from 'react';
import { UIContext } from './UIContext';
import { useProductsContext } from './ProductsContext';
import { useSelectionContext } from './SelectionContext';
import { useEditingContext } from './EditingContext';

export const UIProvider = ({ children }) => {
  const { products, deleteProduct } = useProductsContext();
  const { clearSelection, selectedIds } = useSelectionContext();
  const { setShouldResetForm, setSelectedItem } = useEditingContext();

  const [activeDelMode, setActiveDeleteMode] = useState(false);
  const [activeTable, setActiveTable] = useState('box1');
  const [pendingDelete, setPendingDelete] = useState({ items: [] });

  const isModalOpen = pendingDelete.items.length > 0;

  const handleDeleteConfirmed = useCallback(() => {
    deleteProduct(pendingDelete.items);
    clearSelection();
    setPendingDelete({ items: [] });
    setActiveDeleteMode(false);
  }, [products, clearSelection, pendingDelete]);

  const handleSwipeLeft = useCallback(
    record => {
      if (!record) return;
      setSelectedItem(products.get(record));
      setShouldResetForm(false);
      setActiveTable('box2');
    },
    [products]
  );

  const handleTableChange = useCallback(
    nextId => {
      console.log('Cambio box a:', nextId);
      if (nextId === 'box1') {
        setSelectedItem(null);
        setShouldResetForm(true);
      } else {
        setShouldResetForm(false);
      }
      setActiveTable(nextId);
    },
    [setSelectedItem, setShouldResetForm, setActiveTable]
  );

  const contextValue = useMemo(
    () => ({
      activeTable,
      pendingDelete,
      isModalOpen,
      setPendingDelete,
      handleDeleteConfirmed,
      handleSwipeLeft,
      handleTableChange,
      activeDelMode,
      setActiveDeleteMode,
    }),
    [
      activeTable,
      pendingDelete,
      isModalOpen,
      handleDeleteConfirmed,
      handleSwipeLeft,
      handleTableChange,
      activeDelMode,
      setActiveDeleteMode,
    ]
  );

  return <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>;
};
