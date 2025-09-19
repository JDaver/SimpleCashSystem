import InfoButton from './InfoButton';
import { getComponentProps } from './useSingleItem';
import './singleItem.css';

export default function SingleItem({
  mode = 'display',
  Record = {}, 
  ActionButtonsComponent = null,
  InfoComponent = null, 
  PlaceHolders = null 
}) {

  const {allergens,items,inHowManyReceipts, name,price,id,total,date,quantity} = Record;
  const infoData = {allergens, items, inHowManyReceipts};
  const {actionProps, infoProps} = getComponentProps(mode, Record, infoData)

    
  return(
      <li className="sngl-item">
        {InfoComponent && <InfoComponent {...infoProps} />}

        {Record &&
        <>
          <span className="first-record">{name ? name : date ? id +  " ~ " + date : ""}</span> 
          <span className="second-record">{price ? price + " €" : total ? total + " €" : quantity } </span>
        </>}
        
      {ActionButtonsComponent && <ActionButtonsComponent {...actionProps}/> }

      {PlaceHolders && PlaceHolders.map((label,i) =>{
        return(
          <span key={i} className={`label-${i+1}`}>{label}</span>
        )})}
      </li>
  )
}

