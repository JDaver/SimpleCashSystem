//import { useState } from "react";
import addImg from "@assets/plus.png"
import remImg from "@assets/minus.png"
import { useFetchAll } from "@hooks/productsHook"
import './CashierScreen.css';

/*function DropdownDisplay({items}){
    const [isOpen,setIsOpen] = useState(false);

    return(
        <>
        <button onClick={() => setIsOpen(!isOpen)}>
                Allergeni
                <span>{isOpen ? "▲" : "▼" }</span>
            </button>

            {isOpen && (
                <ul>
                    {(Array.isArray(items) ? items : [items]).map((item, index) =>(
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </>
    )
}*/

function SingleItem({product}){
  return(
      <li className="sngl-item">
        <button>allergens</button>
        <p>{product.name}</p>
        <p>{product.price}</p>
        {product.allergens != null ? /*<DropdownDisplay items = {product.allergens}/>*/"" : ""}
        <button className="plus-btn"><img  src={addImg} ></img></button>
        <button className="minus-btn"><img src={remImg}/></button>
      </li>
  )
}
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

