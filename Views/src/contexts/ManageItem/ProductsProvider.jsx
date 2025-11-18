import { useCallback, useMemo, useState } from 'react';
import { useFetchAll } from '@hooks/productsHook';
import { ProductsContext } from './ProductsContext';

export const ProductsProvider = ({ children }) => {
  const {
    records,
    hasMoreNext,
    fetchNext,
    loading,
    filters,
    setFilters,
    setOrders,
    orderValues,
    deleteProduct,
    undoDelete,
    insertProduct,
    editProduct,
    allProductsIds,
  } = useFetchAll();

  const products = useMemo(() => {
    const map = new Map();
    (records ?? []).forEach(p => map.set(p.id, p));
    return map;
  }, [records]);

  const contextValue = useMemo(
    () => ({
      products,
      hasMoreNext,
      fetchNext,
      allProductsIds,
      setFilters,
      filters,
      setOrders,
      orderValues,
      deleteProduct,
      undoDelete,
      insertProduct,
      editProduct,
    }),
    [
      products,
      hasMoreNext,
      fetchNext,
      allProductsIds,
      setFilters,
      filters,
      setOrders,
      orderValues,
      deleteProduct,
      undoDelete,
      insertProduct,
      editProduct,
    ]
  );
  return <ProductsContext.Provider value={contextValue}>{children}</ProductsContext.Provider>;
};
