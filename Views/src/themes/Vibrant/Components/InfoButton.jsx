import { ExclamationTriangleIcon, TrashIcon} from '@heroicons/react/24/outline';
import { useState,useRef } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';
import { deleteItem } from '@utils/productService';

export default function InfoButton({
  Data = null, 
  mode = "display",
  id = null,
   ...props 
  }){

  
  let Icon = ExclamationTriangleIcon;  
  if(mode === "delete") Icon = TrashIcon;

  const items = Array.isArray(Data) ? Data : Data ? [Data] : [];
  const [show,setShow] = useState();
  const popOverRef = useRef(null);
  useClickOutside(popOverRef, () => setShow(false));

  const handleClick = (id) => {
    if(mode === "display"){
      setShow(prev => !prev);
    }else if(mode === "delete"){
      deleteItem(id);
      // console.log(id);
    }
  }

  return (
    <>
      <button 
      {...props } 
      onClick={() =>handleClick(id)} 
      ref={popOverRef}
      className={(show ? 'info-button-active' : 'info-button')}>
        <Icon  style={{ width: props.width || 24, height: props.height || 24 }} />
      </button>
      
      {show && items.length > 0 && (
        <div className="allergensPopOver">
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}