//import { useState } from "react";
/*TO DO: fixx allineation of labels with chore records row */
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
                  ShowRecord = {false}
                  ShowPlaceHolders={true}
                  PlaceHolders={label}/></div>
            <ul className="cashier-screen__content">

                {products.map((product)=>{
                  return (
                    <SingleItem key={product.id}
                    Showextra={true}
                    record={product}
                    ShowButtons={true}
                    Buttons={CashierButtons}
                    />
                    
                  )
                })}
          </ul>
        </div>
      </div>
    )
}

