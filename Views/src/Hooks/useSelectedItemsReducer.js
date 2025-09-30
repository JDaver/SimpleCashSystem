import { useCallback, useReducer } from 'react';
import { selectedItemsReducer } from '@reducers/SelectedItemsReducer';

export function useSelectedItemsReducer() {
  const [selectedIds, dispatch] = useReducer(selectedItemsReducer, []);

  const toggleItem = useCallback(id => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  const selectAll = useCallback(ids => {
    dispatch({ type: 'SELECT_ALL', ids });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  return {
    selectedIds,
    toggleItem,
    selectAll,
    clearSelection,
  };
}
