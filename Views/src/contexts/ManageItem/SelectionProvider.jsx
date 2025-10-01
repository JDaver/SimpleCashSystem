import { useCallback, useMemo } from 'react';
import { useSelectedItemsReducer } from '@hooks/useSelectedItemsReducer';
import { SelectionContext } from './SelectionContext';
import { useFetchAll } from '@hooks/productsHook';

export const SelectionProvider = ({ children }) => {
  const { selectedIds, selectAll, toggleItem, clearSelection } = useSelectedItemsReducer();
  const { products, loading } = useFetchAll();

  const allProductsIds = useMemo(() => {
    return products.map(p => p.id);
  }, [products]);

  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds]);

  const isItemSelected = useCallback(id => selectedIdsSet.has(id), [selectedIdsSet]);

  const selectionMode = useMemo(() => selectedIds.length > 0, [selectedIds]);

  const contextValue = useMemo(
    () => ({
      selectedIds,
      selectionMode,
      selectAll,
      isItemSelected,
      toggleItem,
      clearSelection,
      allProductsIds,
    }),
    [
      selectedIds,
      selectionMode,
      selectAll,
      isItemSelected,
      toggleItem,
      clearSelection,
      allProductsIds,
    ]
  );

  return <SelectionContext.Provider value={contextValue}>{children}</SelectionContext.Provider>;
};
