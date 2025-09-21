import { useFetchAll } from '@hooks/productsHook';
import { useSelectedItemsReducer } from '@hooks/useSelectedItemsReducer';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ManageItemStateContext } from './ManageItemStateContext';
import { ManageItemActionsContext } from './ManageItemActionsContext';

export const ManageItemProvider = ({ children }) => {
  const { products, deleteProduct } = useFetchAll();
  const { selectedItems, selectAll, toggleItem, clearSelection } = useSelectedItemsReducer();
  const [activeTable, setActiveTable] = useState('box1');
  const [shouldResetForm, setShouldResetForm] = useState(false);
  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const [pendingDelete, setPendingDelete] = useState({ items: [] });
  const selectedItemRef = useRef(null);
  const selectionMode = selectedItems.length > 0;
  const isModalOpen = pendingDelete.items.length > 0;

  const memoizedProducts = products;

  const deleteItem = useCallback(
    itemsToDelete => {
      const idsToDelete = (Array.isArray(itemsToDelete) ? itemsToDelete : [itemsToDelete]).map(
        item => item.id
      );

      setDeletedItemIds(prev => [...prev, ...idsToDelete]);
      clearSelection();
      setPendingDelete({ items: [] });
    },
    [clearSelection]
  );

  const handleSelectAll = useCallback(() => {
    selectAll(memoizedProducts);
  }, [selectAll, memoizedProducts]);

  const handleClear = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  const handleDeleteConfirmed = useCallback(() => {
    console.log(pendingDelete.id);
    // deleteProduct(selectedItems.id);
   
  },[deleteProduct, pendingDelete?.id]);

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

  const stateValue = useMemo(
    () => ({
      selectedItems,
      selectionMode,
      isModalOpen,
      pendingDelete,
      activeTable,
      shouldResetForm,
      selectedItemRef,
      memoizedProducts,
    }),
    [
      selectedItems,
      selectionMode,
      isModalOpen,
      pendingDelete,
      activeTable,
      shouldResetForm,
      memoizedProducts,
    ]
  );

  const actionsValue = useMemo(
    () => ({
      setPendingDelete,
      toggleItem,
      deleteItem,
      handleSelectAll,
      handleClear,
      handleDeleteConfirmed,
      handleSwipeLeft,
      handleTableChange,
      deleteProduct
    }),
    [
      setPendingDelete,
      toggleItem,
      deleteItem,
      handleSelectAll,
      handleClear,
      handleDeleteConfirmed,
      handleSwipeLeft,
      handleTableChange,
      deleteProduct
    ]
  );

  return (
    <ManageItemStateContext.Provider value={stateValue}>
      <ManageItemActionsContext.Provider value={actionsValue}>
        {children}
      </ManageItemActionsContext.Provider>
    </ManageItemStateContext.Provider>
  );
};

export default ManageItemProvider;
