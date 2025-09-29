import { createContext, useContext } from 'react';

export const ProductsContext = createContext(null);

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a <ProductsProvider>');
  }
  return context;
};
