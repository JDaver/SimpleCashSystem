import { useCallback, useMemo, useState } from 'react';
import { useFetchAll } from '@hooks/productsHook';
import { ProductsContext } from './ProductsContext';

export const ProductsProvider = ({ children }) => {
  const { products, loading } = useFetchAll();
  const allProductsIds = useMemo(() => {
    return products.map(p => p.id);
  }, [products]);
  const contextValue = useMemo(() => ({ allProductsIds }), [allProductsIds]);
  return <ProductsContext.Provider value={contextValue}>{children}</ProductsContext.Provider>;
};
