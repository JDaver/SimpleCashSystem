import addImg from "../assets/plus.png"
import remImg from "../assets/minus.png"
import { useDisplay } from "../hooks/productHook"

function SingleItem({name, price, allergens}){
  return(
      <div className="sngl-item">
        <p>{name}</p>
        <p>{price}</p>
        <button className="plus-btn"><img  src={addImg}></img></button>
        <button className="minus-btn"><img src={remImg}/></button>
      </div>
  )
}

export default function(){
  const {products, loading, error} = useDisplay();

  if(loading) return <p>Caricamento...</p>
  if(error) return <p>Errore!</p>

    return(
        <>
          
          <div className="cash">
            <div className="food">  
              <h1>Cucina</h1>
              <div className="btn-section">
                  {products.map(prod => (
                    <SingleItem key= {prod.id} name={prod.name} price = {prod.price}/>))}
              </div>
            </div>
          </div>
        </>
    )
}