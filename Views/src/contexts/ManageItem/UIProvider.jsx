import { useCallback, useMemo, useState } from 'react';
import { UIContext } from './UIContext';
import { useProductsContext } from './ProductsContext';
import { useSelectionContext } from './SelectionContext';
import { useEditingContext } from './EditingContext';
import { useToast } from '@components/Toast/Toast';
import { useTheme } from '@contexts/Theme';
import { ArrowUturnDownIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';

export const UIProvider = ({ children }) => {
  const { products, deleteProduct, filters, orderValues } = useProductsContext();
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  // const { undoDelete } = useFetchAll();
  const { clearSelection, selectedIds } = useSelectionContext();
  const { setShouldResetForm, setSelectedItem } = useEditingContext();
  const { addToast, closeToast } = useToast();
  const [activeDelMode, setActiveDeleteMode] = useState(false);
  const [activeTable, setActiveTable] = useState('box1');
  const [pendingDelete, setPendingDelete] = useState({ items: [] });

  const isModalOpen = pendingDelete.items.length > 0;

  const handleDeleteConfirmed = useCallback(() => {
    const currentFilters = filters;
    const currentOrderValues = orderValues;
    deleteProduct(pendingDelete.items, {
      onSuccess: (_data, _variables, context) => {
        clearSelection();
        setPendingDelete({ items: [] });
        setActiveDeleteMode(false);
        const toastId = addToast({
          content: ({ onClose }) => (
            <div className={`${theme}-toast warning`}>
              <span>L'articolo e' stato eliminato</span>
              <button
                onTouchStart={() => {
                  clearTimeout(context.timeoutDelete);
                  queryClient.setQueryData(
                    ['allProducts', currentFilters, currentOrderValues],
                    context.previousData
                  );
                  onClose();
                }}
              >
                <ArrowUturnDownIcon height={25} width={25} />
              </button>
            </div>
          ),
          duration: 5000,
        });
      },
      onError: error => {
        addToast({
          content: () => (
            <div className={`${theme}-toast error`}>
              <span>{error.message}</span>
            </div>
          ),
          duration: 5000,
        });
      },
    });
  }, [
    deleteProduct,
    pendingDelete.items,
    clearSelection,
    addToast,
    setPendingDelete,
    setActiveDeleteMode,
  ]);

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
