import addImg from "@assets/plus.png"
import remImg from "@assets/minus.png";
import { useClickOutside } from '@hooks/useClickOutside';
import { useState,useRef } from "react";
import { ExclamationTriangleIcon} from '@heroicons/react/24/outline';


export default function SingleItem({product}){
    const [show,setShow] = useState(false);
    const popOverRef = useRef(null);
    const allergens = product.allergens

    useClickOutside(popOverRef, () => setShow(false));

  return(
      <li className="sngl-item">
        {allergens ? <ExclamationTriangleIcon onClick={() => setShow(prev => !prev)} className={(show ? 'allergens-btn-active' : 'allergens-btn')} width={30} height={30}/>  : ""}
        {show && (<div ref ={popOverRef} className="allergensPopOver">
            <ul>
                {(Array.isArray(allergens) ? allergens : [allergens]).map((item, index) =>(
                    <li key={index}>{item}</li>
                )) }
            </ul>
            </div>)}
        <p>{product.name}</p>
        <p>{product.price}</p>
        <button className="plus-btn"><img  src={addImg} ></img></button>
        <button className="minus-btn"><img src={remImg}/></button>
      </li>
  )
}