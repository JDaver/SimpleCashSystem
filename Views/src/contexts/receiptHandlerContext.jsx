import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ReceiptContext = createContext();

export function ReceiptProvider({ children }) {
  const [receipt, setReceipt] = useState([]);

  // filter product helper
  const filterProduct = useCallback(product => {
    const { allergens, ...filtered } = product;
    return filtered;
  }, []);

  // check if product is on receipt
  const productIsOnReceipt = useCallback(
    productId => receipt.some(item => item.id === productId),
    [receipt]
  );

  // add items
  const addToReceipt = useCallback(
    product => {
      product = filterProduct(product);
      setReceipt(prevReceipt => {
        const exist = prevReceipt.some(item => item.id === product.id);
        if (exist) {
          return prevReceipt.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevReceipt, { ...product, quantity: 1 }];
        }
      });
    },
    [filterProduct]
  );

  // decrement quantity
  const decrementQuantityInReceipt = useCallback(id => {
    setReceipt(prevReceipt =>
      prevReceipt
        .map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter(item => item.quantity > 0)
    );
  }, []);

  // remove
  const removeFromReceipt = useCallback(id => {
    setReceipt(prevReceipt => prevReceipt.filter(item => item.id !== id));
  }, []);

  // clear
  const clearReceipt = useCallback(() => setReceipt([]), []);

  // total
  const totalOfReceipt = useMemo(() => {
    return receipt.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }, [receipt]);

  const value = useMemo(
    () => ({
      receipt,
      productIsOnReceipt,
      addToReceipt,
      decrementQuantityInReceipt,
      removeFromReceipt,
      clearReceipt,
      totalOfReceipt,
    }),
    [
      receipt,
      productIsOnReceipt,
      addToReceipt,
      decrementQuantityInReceipt,
      removeFromReceipt,
      clearReceipt,
      totalOfReceipt,
    ]
  );

  return <ReceiptContext.Provider value={value}>{children}</ReceiptContext.Provider>;
}

export function useReceipt() {
  return useContext(ReceiptContext);
}
