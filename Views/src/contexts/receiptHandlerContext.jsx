import { createContext, useContext, useState } from "react";

const ReceiptContext = createContext();

export function ReceiptProvider({children}){
    const [receipt,setReceipt] = useState([]);

    //check del prodotto
    const productIsOnReceipt =((productId) => {
        return receipt.some((item) => item.id === productId);
    })

    //adding items
    const addToReceipt = (product) => {
        setReceipt ((prevReceipt) => {
            const exist = productIsOnReceipt(product.id);
            if(exist){
                return prevReceipt.map((item)=>
                    item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
            }else{
                return [...prevReceipt, {...product, quantity: 1}]
            }
        });
    };

    //update
  const decrementQuantityInReceipt = (id) => {
    setReceipt((prevReceipt) => {
        return prevReceipt
        .map((item) => {
            if (item.id === id) {
            const newQty = item.quantity - 1;
            return { ...item, quantity: newQty };
            }
            return item;
        })
        .filter((item) => item.quantity > 0); // rimuove articoli con qty 0
  });
};


    //removing
    const removeFromReceipt = (id) => {
       setReceipt((prevReceipt) => prevReceipt.filter((item) => item.id !== id));
    };

    //clear
    const clearReceipt = () => setReceipt([]);

    const totalOfReceipt = receipt.reduce((sum,item) => sum + item.price * item.quantity, 0);

    return (
        <ReceiptContext.Provider value ={{receipt, productIsOnReceipt, addToReceipt, decrementQuantityInReceipt, removeFromReceipt, clearReceipt, totalOfReceipt}}>
            {children}
        </ReceiptContext.Provider>
    );
}

export function useReceipt() {
    return useContext(ReceiptContext);
}