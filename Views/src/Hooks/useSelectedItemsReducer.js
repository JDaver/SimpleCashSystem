import { useCallback, useReducer } from 'react';
import { selectedItemsReducer } from '../reducers/selectedItemsReducer';

export function useSelectedItemsReducer() {
  const [selectedItems, dispatch] = useReducer(selectedItemsReducer, []);

  const toggleItem = useCallback(item => {
    dispatch({ type: 'TOGGLE', item });
  }, []);

  const selectAll = useCallback(items => {
    dispatch({ type: 'SELECT_ALL', items });
  }, []);

  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  return {
    selectedItems,
    toggleItem,
    selectAll,
    clearSelection,
  };
}
