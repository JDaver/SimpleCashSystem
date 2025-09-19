//import { useState } from "react";
import SingleItem from "../Components/SingleItem";
import { useFetchAll } from "@hooks/productsHook"
import './CashierScreen.css';
import CashierButtons from "./CashierButtons";
import InfoButton from "../Components/InfoButton";

export default function CashierScreen(){
  const {products, loading, error} = useFetchAll();
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
            
            {products && 
            products.map((product)=>{
              return (
                <SingleItem key={product.id}
                  mode='cash'
                  Record={product}
                  InfoComponent={InfoButton}
                  ActionButtonsComponent={CashierButtons}
                />
              )})}
          </ul>
        </div>
      </div>
    )
}

