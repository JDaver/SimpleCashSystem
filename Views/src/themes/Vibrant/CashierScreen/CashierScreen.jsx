//import { useState } from "react";
import SingleItem from "../Components/SingleItem";
import { useFetchAll } from "@hooks/productsHook"
import './CashierScreen.css';
import { useReceipt } from "@contexts/receiptHandlerContext";
import CashierButtons from "./CashierButtons";

export default function CashierScreen(){
  const {products, loading, error} = useFetchAll();
  const {receipt , clearReceipt} = useReceipt();
  const label = {
    product:{
      name: "Nome Prodoto",
      price: "prezzo",
    },
    actions: "Aggiungi e Rimuovi"
  };

  
  const isLoading= (loading ? "Caricamento..." : "");
  const notLoaded =(error ? "Errore!" : "");

  
    return(
         <div className="cashier-screen">
          <div className="cashier-screen__wrapper">
            <h1 className="cashier-screen__header">Cucina</h1>
            <ul className="cashier-screen__content">
              <SingleItem product={label.product} ShowButtons={false} ShowPlaceHolder={true} PlaceHolder={label.actions}/>
                {products.map((product)=>{
                  return (
                    <SingleItem key={product.id}
                    product={product}
                    ShowButtons={true}
                     Buttons={CashierButtons}
                    >{product.name}
                    </SingleItem>
                  )
                })}
          </ul>
        </div>
      </div>
    )
}

