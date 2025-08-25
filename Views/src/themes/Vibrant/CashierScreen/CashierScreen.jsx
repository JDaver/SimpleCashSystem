//import { useState } from "react";
import SingleItem from "./SingleItem";
import { useFetchAll } from "@hooks/productsHook"
import './CashierScreen.css';

function RepresentationBox({children}){
  return(
    <>
      <div className="cashier-screen">
        <div className="cashier-screen__wrapper">
          <h1 className="cashier-screen__header">Cucina</h1>
          <ul className="cashier-screen__content">
            {children}
          </ul>
        </div>
      </div>
    </>
  )
}
export default function CashierScreen(){
  const {products, loading, error} = useFetchAll();

  const isLoading= (loading ? "Caricamento..." : "");
  const notLoaded =(error ? "Errore!" : "");
  console.log("Component caricato(vibrant->cashier)")
    return(
        <>
            <RepresentationBox>
              <>
                {isLoading}
                {notLoaded}
                {products.map(prod => (
                    <SingleItem key= {prod.id} product = {prod} />))}
              </>
              </RepresentationBox>
        </>
    )
}

