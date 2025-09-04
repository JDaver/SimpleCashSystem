import InfoButton from './InfoButton';
import { useClickOutside } from '@hooks/useClickOutside';
import { useState,useRef } from "react";
import './singleItem.css';

export default function SingleItem({
   Extra = null,
   Record = null, 
   ButtonsComponent = null, 
   PlaceHolders = null
}) {
   
  const {allergens, items, name, price, id, total, date, quantity} = Record || {};

  const [show,setShow] = useState(false);
  const popOverRef = useRef(null);
  useClickOutside(popOverRef, () => setShow(false));
    
  return(
      <li className="sngl-item">

        {Extra &&
        <div className="extra" ref={popOverRef}>
              <InfoButton
              Data = {allergens}
              active = {show}
              onClick={() => setShow(prev => !prev)}
              width={40} height={40} 
              className={(show ? 'info-button-active' : 'info-button')}/> 
          </div> }

        {Record &&
        <>
          <span className="first-record">{name ? name : id + "~" + date}</span> 
          <span className="second-record">{price ? price : total }€</span>
          {quantity && <span>{quantity} </span>}
        </>
      }
        
      {ButtonsComponent && <ButtonsComponent product={Record}/> }
      {PlaceHolders && PlaceHolders.map((label,i) =>{
        return(
          <span key={i} className={`label-${i+1}`}>{label}</span>
          )
        }
      )}
      </li>
  )
}