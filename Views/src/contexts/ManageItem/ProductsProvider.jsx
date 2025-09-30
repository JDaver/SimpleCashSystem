import { useCallback, useMemo, useState } from 'react';
import { useFetchAll } from '@hooks/productsHook';
import { ProductsContext } from './ProductsContext';

export const ProductsProvider = ({ children }) => {
  const { products } = useFetchAll();
  const [deletedItemIds, setDeletedItemIds] = useState([]);

  const deleteItems = useCallback(itemsToDelete => {
    const ids = (Array.isArray(itemsToDelete) ? itemsToDelete : [itemsToDelete]).map(p => p.id);
    setDeletedItemIds(prev => [...prev, ...ids]);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => !deletedItemIds.includes(p.id));
  }, [products, deletedItemIds]);

  const productMap = useMemo(() => {
    const map = new Map();
    filteredProducts.forEach(p => map.set(p.id, p));
    return map;
  }, [filteredProducts]);

  const contextValue = useMemo(
    () => ({ filteredProducts, deleteItems, productMap }),
    [filteredProducts, deleteItems, productMap]
  );

  return <ProductsContext.Provider value={contextValue}>{children}</ProductsContext.Provider>;
};
