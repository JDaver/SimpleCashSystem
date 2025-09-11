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
  
  const thereIsDataToShow = allergens?.length > 0 ? 
    allergens : items?.length > 0 ? 
      items : inHowManyReceipts?.length > 0 ? inHowManyReceipts : [];
 
    
  return(
      <li className="sngl-item">

        {Extra &&
        <div className="extra" >
              <InfoButton
              id = {id}
              Data = {allergens ? allergens : (items ? items : inHowManyReceipts)}
              active={thereIsDataToShow.length > 0 || mode === "delete" ? true : false}
              width={40} height={40} 
              mode={mode}
              /> 
          </div> }

        {Record &&
        <>
          <span className="first-record">{name ? name : date ? id +  " ~ " + date : ""}</span> 
          <span className="second-record">{price ? price + " €" : total ? total + " €" : quantity } </span>
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