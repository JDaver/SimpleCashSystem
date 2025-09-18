//import { useState } from "react";
import SingleItem from "../Components/SingleItem";
import { useFetchAll } from "@hooks/productsHook"
import './CashierScreen.css';
import { useReceipt } from "@contexts/receiptHandlerContext";
import CashierButtons from "./CashierButtons";

export default function CashierScreen(){
  const {products, loading, error} = useFetchAll();
  const {receipt , clearReceipt} = useReceipt();
  const label = [
    "Allergeni", 
    "Articolo", 
    "prezzo", 
    "Aggiungi e Rimuovi"
  ];

  const isLoading= (loading ? "Caricamento..." : "");
  const notLoaded =(error ? "Errore!" : "");
 

  
    return(
         <div className="cashier-screen">
          <div className="cashier-screen__wrapper">
            <h1 className="cashier-screen__header">Cucina</h1>
            <div className="label"> <SingleItem
                  PlaceHolders={label}/></div>
            <ul className="cashier-screen__content">

            {error && notLoaded}
            {loading && isLoading}
            {products && products.map((product)=>{
                        return (
                          <SingleItem key={product.id}
                            Extra={product.allergens}
                            Record={product}
                            ShowButtons={true}
                            ButtonsComponent={CashierButtons}
                          />
                        )})}
          </ul>
        </div>
      </div>
    )
}

