import { useCallback, useMemo, useState } from 'react';
import { useFetchAll } from '@hooks/productsHook';
import { ProductsContext } from './ProductsContext';

export const ProductsProvider = ({ children }) => {
  const { products, loading } = useFetchAll();

  return <ProductsContext.Provider value={products}>{children}</ProductsContext.Provider>;
};

// const [deletedItemIds, setDeletedItemIds] = useState([]);

// const deleteItems = useCallback(itemsToDelete => {
//   const ids = (Array.isArray(itemsToDelete) ? itemsToDelete : [itemsToDelete]).map(p => p.id);
//   setDeletedItemIds(prev => [...prev, ...ids]);
// }, []);

// const productMap = useMemo(() => {
//   const map = new Map();
//   filteredProducts.forEach(p => map.set(p.id, p));
//   return map;
// }, [filteredProducts]);

// const contextValue = useMemo(
//   () => ({ filteredProducts, deleteItems, productMap }),
// [filteredProducts, deleteItems, productMap]
// );
