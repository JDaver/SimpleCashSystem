import InfoButton from './AllergensButton';
import { useClickOutside } from '@hooks/useClickOutside';
import { useState,useRef } from "react";

export default function SingleItem({Showextra = false , Extra = null, product, ShowButtons = false, Buttons = null, ShowPlaceHolder = false, PlaceHolder = null}){
    const allergens = product.allergens
    const [show,setShow] = useState(false);
    const popOverRef = useRef(null);
    

    useClickOutside(popOverRef, () => setShow(false));
    
  return(
      <li className="sngl-item">
        <div className="exclamation-triangle">

        {allergens ? <div ref={popOverRef}>
            <InfoButton
            Data = {product.allergens}
            active = {show}
            onClick={() => setShow(prev => !prev)}
            width={30} height={30} 
            className={(show ? 'allergens-btn-active' : 'allergens-btn')}/>
        </div> : "" }
        

        </div>
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
        {ShowButtons && <Buttons product={product}/> }
        {ShowPlaceHolder && <p>{PlaceHolder}</p>}
      </li>
  )
}