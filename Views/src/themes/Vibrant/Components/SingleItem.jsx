import InfoButton from './InfoButton';
import { useClickOutside } from '@hooks/useClickOutside';
import { useState,useRef } from "react";
import './singleItem.css';

export default function SingleItem({
   Showextra = false, 
   Extra = null,
   ShowRecord = true, 
   record = null, 
   ShowButtons = false, 
   Buttons = null, 
   ShowPlaceHolders = false, 
   PlaceHolders = null
}) {
   
  const {allergens, items, name, price, id, total, date, quantity} = record || {};

  const [show,setShow] = useState(false);
  const popOverRef = useRef(null);
  useClickOutside(popOverRef, () => setShow(false));
    
  return(
      <li className="sngl-item">

        {Showextra &&
        <div className="extra" ref={popOverRef}>
          
              <InfoButton
              Data = {allergens ? allergens : items}
              active = {show}
              onClick={() => setShow(prev => !prev)}
              width={40} height={40} 
              className={(show ? 'info-button-active' : 'info-button')}/> 
          </div> }
        {ShowRecord &&
        <>
          <span className="first-record">{name ? name : id + "~" + date}</span> 
          <span className="second-record">{price ? price : total }€</span>
          {quantity && <span>{quantity} </span>}
        </>
      }
        
      {ShowButtons && <Buttons product={record}/> }
      {ShowPlaceHolders && PlaceHolders.map((label,i) =>{
        return(
          <span key={i} className={`label-${i+1}`}>{label}</span>
          )
        }
      )}
      </li>
  )
}