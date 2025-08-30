import { useClickOutside } from '@hooks/useClickOutside';
import { useState,useRef } from "react";
import { ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import CashierButtons from './CashierButtons';


export default function SingleItem({product,showButtons = true}){
    
    const [show,setShow] = useState(false);
    const popOverRef = useRef(null);
    const allergens = product.allergens

    useClickOutside(popOverRef, () => setShow(false));
    
  return(
      <li className="sngl-item">
        <div className="exclamation-triangle">
        {allergens ? <ExclamationTriangleIcon onClick={() => setShow(prev => !prev)} width={30} height={30} className={(show ? 'allergens-btn-active' : 'allergens-btn')} />: ""}
        {show && (<div ref ={popOverRef} className="allergensPopOver">
            <ul>
                {(Array.isArray(allergens) ? allergens : [allergens]).map((item, index) =>(
                    <li key={index}>{item}</li>
                ))}
            </ul>
            </div>)}
        </div>
        <p className="product-name">{product.name}</p>
        <p className="product-price">{product.price}</p>
        {showButtons && <CashierButtons product={product}/>}
        
      </li>
  )
}