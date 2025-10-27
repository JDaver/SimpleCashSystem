import { useCallback, useMemo, useState } from 'react';
import { useFetchAll } from '@hooks/productsHook';
import { ProductsContext } from './ProductsContext';

export const ProductsProvider = ({ children }) => {
  const {
    products,
    loading,
    filters,
    setFilters,
    setOrders,
    orderValues,
    deleteProduct,
    undoDelete,
    insertProduct,
    editProduct,
  } = useFetchAll();
  const allProductsIds = useMemo(() => {
    return Array.from(products.values()).map(p => p.id);
  }, [products]);

  const contextValue = useMemo(
    () => ({
      products,
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
