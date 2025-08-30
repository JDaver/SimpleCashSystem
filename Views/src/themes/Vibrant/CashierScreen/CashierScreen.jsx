//import { useState } from "react";
import SingleItem from "./SingleItem";
import { useFetchAll } from "@hooks/productsHook"
import './CashierScreen.css';
import { useReceipt } from "@contexts/receiptHandlerContext";

export default function CashierScreen(){
  const {products, loading, error} = useFetchAll();
  const {receipt , clearReceipt} = useReceipt();

  
  const isLoading= (loading ? "Caricamento..." : "");
  const notLoaded =(error ? "Errore!" : "");

  
    return(
         <div className="cashier-screen">
          <div className="cashier-screen__wrapper">
            <h1 className="cashier-screen__header">Cucina</h1>
            <ul className="cashier-screen__content">
                {products.map((product)=>{
                  return (
                    <SingleItem key={product.id} product={product}/>
                  )
                })}
          </ul>
        </div>
      </div>
    )
}

