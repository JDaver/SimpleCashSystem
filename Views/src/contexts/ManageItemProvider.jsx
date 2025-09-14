import { useFetchAll } from '@hooks/productsHook';
import { useSelectedItemsReducer } from '@hooks/useSelectedItemsReducer';
import { useCallback, useMemo, useRef, useState } from 'react';
import ManageItemContext from './ManageItemContext';

export const ManageItemProvider = ({ children }) => {
  const { products: fetchedProducts } = useFetchAll();
  const { selectedItems, selectAll, toggleItem, clearSelection } = useSelectedItemsReducer();
  const [activeTable, setActiveTable] = useState('box1');
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const [pendingDelete, setPendingDelete] = useState({ items: [] });
  const selectedItemRef = useRef(null);
  const selectionMode = selectedItems.length > 0;
  const isModalOpen = pendingDelete.items.length > 0;

  const memoizedProducts = useMemo(() => {
    return fetchedProducts.filter(product => !deletedItemIds.includes(product.id));
  }, [fetchedProducts, deletedItemIds]);

  const deleteItem = useCallback(itemsToDelete => {
    const idsToDelete = (Array.isArray(itemsToDelete) ? itemsToDelete : [itemsToDelete]).map(
      item => item.id
    );

    setDeletedItemIds(prev => [...prev, ...idsToDelete]);
    clearSelection();
    setPendingDelete({ items: [] });
  }, []);

  const handleSelectAll = useCallback(() => {
    selectAll(memoizedProducts);
  }, [selectAll, memoizedProducts]);

  const handleClear = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  const handleDeleteConfirmed = useCallback(() => {
    deleteItem(pendingDelete.items);
  }, [deleteItem, pendingDelete]);

  const handleSwipeLeft = useCallback(item => {
    selectedItemRef.current = item;
    setShouldResetForm(false);
    setActiveTable('box2');
  }, []);

  const handleTableChange = useCallback(nextId => {
    if (nextId === 'box1') {
      selectedItemRef.current = null;
      setShouldResetForm(true);
    } else {
      setShouldResetForm(false);
    }
    setActiveTable(nextId);
  }, []);

  const contextValue = useMemo(
    () => ({
      selectedItems,
      selectAll,
      toggleItem,
      clearSelection,
      activeTable,
      shouldResetForm,
      pendingDelete,
      setPendingDelete,
      isModalOpen,
      selectionMode,
      selectedItemRef,
      memoizedProducts,
      deleteItem,
      handleSelectAll,
      handleClear,
      handleDeleteConfirmed,
      handleSwipeLeft,
      handleTableChange,
    }),
    [
      selectedItems,
      selectAll,
      toggleItem,
      clearSelection,
      activeTable,
      shouldResetForm,
      pendingDelete,
      isModalOpen,
      selectionMode,
      memoizedProducts,
      deleteItem,
      handleSelectAll,
      handleClear,
      handleDeleteConfirmed,
      handleSwipeLeft,
      handleTableChange,
    ]
  );

  return <ManageItemContext.Provider value={contextValue}>{children}</ManageItemContext.Provider>;
};
