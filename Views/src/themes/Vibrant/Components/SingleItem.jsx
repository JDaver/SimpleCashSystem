import InfoButton from './InfoButton';
import './singleItem.css';

export default function SingleItem({
   mode = 'display',
   Extra = null,
   Record = null, 
   ButtonsComponent = null, 
   PlaceHolders = null 
}) {

  const {allergens, items, inHowManyReceipts, name, price, id, total, date, quantity} = Record || {};
  
  const dataToShow = allergens?.length > 0 ? allergens : items?.length > 0 ? items : [];
 
    
  return(
      <li className="sngl-item">

        {Extra &&
        <div className="extra" >
              <InfoButton
              id = {id}
              Data = {allergens ? allergens : (items ? items : inHowManyReceipts)}
              active={dataToShow.length > 0 ? true : false}
              width={40} height={40} 
              mode={mode}
              /> 
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