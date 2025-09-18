import { useState, useRef, useCallback } from "react";
import { useFetchAll,useFetchItems } from "@hooks/productsHook";
import { useLongPress } from "@hooks/useLongPress";
import SingleItem from "../Components/SingleItem";
import './DisplayElements.css';
import { useSwipe } from "@hooks/useSwipe";
import SlideButton from "./SlideButton";
import { useFetchReceipts } from "@hooks/receiptHook";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import InfoButton from "../Components/InfoButton";

const labelManage = ["Allergeni","Nome Prodoto","Prezzo","Modifica" ];
const labelDeleteMode = ["Elimina","Nome Prodoto","Prezzo","Seleziona" ];
const labelReceiptColection = ["Articoli","Scontrino e data","Totale" ];
const labelItemCollection = ["In quanti scontrini","Nome Prodotto","Venduti"];


function DisplayElements({topic = "manage", swipeLeft}){
const { products } = useFetchAll();
const { records: items } = useFetchItems();
const { receipts, hasMoreNext,fetchNext } = useFetchReceipts();
const [swipingItem, setSwipingItem] = useState({ id: null, deltaX: 0 });
const [activeDelMode,setActiveDeleteMode] = useState(false);
const recordBeingSwipedRef = useRef(null);
const longPress = useLongPress(() => setActiveDeleteMode(prev => !prev),2000);
const { bottomLoaderRef, isLoading } = useInfiniteScroll(fetchNext, hasMoreNext);

const isItemBeingSwiped = useCallback(
    product => swipingItem.id === product.id && Math.abs(swipingItem.deltaX) > 5,
    [swipingItem]
  );



const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (recordBeingSwipedRef.current) {
        console.log("swipe avvenuto");
        swipeLeft(recordBeingSwipedRef.current);
      }
    },
    onSwipeProgress: ({ deltaX }) => {
      if (recordBeingSwipedRef.current) {
        setSwipingItem({ id: recordBeingSwipedRef.current.id, deltaX });
      }
    },
    threshold: 30,
  });

   const handleTouchStart = useCallback(
    (e, product) => {
      recordBeingSwipedRef.current = product;
        console.log(recordBeingSwipedRef);
      swipeHandlers.onTouchStart(e);
      setSwipingItem({ id: product.id, deltaX: 0 });
    },
    [swipeHandlers]
  );

  const handleTouchMove = useCallback(
    e => {
      swipeHandlers.onTouchMove(e);
      console.log(swipingItem);
    },
    [swipeHandlers]
  );

  const handleTouchEnd = useCallback(
    e => {
      swipeHandlers.onTouchEnd(e);
      

      setSwipingItem({ id: null, deltaX: 0 });
    },
    [swipeHandlers]
  );


let labels = [];
let records = [];
let actionComponent = null;
let sideEffectsComponent = null;
let mode = topic;


switch(topic) {
    case "manage":
        labels = activeDelMode ? labelDeleteMode : labelManage;
        records = products;
        actionComponent = activeDelMode ? null : <SlideButton/>;
        sideEffectsComponent = InfoButton;
        mode = activeDelMode ? "delete" : "manage";
        break;
    
    case "item":
        labels = labelItemCollection;
        records = items || [];
        actionComponent = null;
        sideEffectsComponent = <InfoButton/>
        mode = "item"
        break;
    
    case "receipt":
        labels = labelReceiptColection;
        records = receipts || []; //funtion for receipts
        actionComponent = null;
        sideEffectsComponent = <InfoButton/>
        mode = "receipt";
        break;
    default:
        labels = [];
        records = [];
        actionComponent = null;
        sideEffectsComponent = null;
        mode = topic;
}
return(
    
   <div className="elements-container">
    <div {...(topic === 'manage' ? longPress : {})} className={activeDelMode ? "label-DelMode" : "label"}>
        <SingleItem PlaceHolders={labels} />
    </div>
    <div className={activeDelMode ? "display-element-DelMode" : "display-element"}>
            <ul>
                {(records.map((record) => {
                    return(
                        <SingleItem key={record.id}
                        mode={mode}
                        Record={record} 
                        ButtonsComponent={actionComponent}
                        InfoComponent={sideEffectsComponent}
                        />
                    )}))}
              
                 {(topic === 'receipt' && hasMoreNext) && (
                    <div ref={bottomLoaderRef} /*to change style*/ style={{ height: 40, backgroundColor: 'grey' } } />
                 )}
            </ul>    
    </div>
   </div>
)}

export default DisplayElements;



