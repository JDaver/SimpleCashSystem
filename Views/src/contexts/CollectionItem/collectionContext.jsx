import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CollectionContext = createContext();

export function CollectionProvider({ children }) {
  const [itemsInReceipt, setItemsInReceipt] = useState([]);
  const [title, setTitle] = useState('');

  const totalReceipt = useMemo(
    () => itemsInReceipt.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
    [itemsInReceipt]
  );

  const isModalOpen = itemsInReceipt.length > 0;
  const value = useMemo(
    () => ({ itemsInReceipt, setItemsInReceipt, totalReceipt, isModalOpen, title, setTitle }),
    [itemsInReceipt, totalReceipt, isModalOpen, title]
  );
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
}

export function useCollectionProvider() {
  return useContext(CollectionContext);
}
