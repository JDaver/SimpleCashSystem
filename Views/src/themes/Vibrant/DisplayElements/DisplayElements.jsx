import { useState, useRef, useCallback } from "react";
import { useFetchAll,useFetchItems } from "@hooks/productsHook";
import { useLongPress } from "@hooks/useLongPress";
import SingleItem from "../Components/SingleItem";
import './DisplayElements.css';
import { useSwipe } from "@hooks/useSwipe";
import SlideButton from "./SlideButton";
import { useFetchReceipts } from "@hooks/receiptHook";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";

const labelManage = ["Allergeni","Nome Prodoto","Prezzo","Modifica" ];
const labelDeleteMode = ["Elimina","Nome Prodoto","Prezzo","Seleziona" ];
const labelReeiptColection = ["Articoli","Scontrino e data","Totale" ];
const labelItemColection = ["In quanti scontrini","Nome Prodotto","Venduti"];


function DisplayElements({topic = "manage", swipeLeft}){
const { products } = useFetchAll();
const { records: items } = useFetchItems();
const { receipts, hasMoreNext,fetchNext } = useFetchReceipts();
const [swipingItem, setSwipingItem] = useState({ id: null, deltaX: 0 });
const [active,setActive] = useState(false);
const recordBeingSwipedRef = useRef(null);
const longPress = useLongPress(() => setActive(prev => !prev),2000);
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


let labels;
let records;


switch(topic) {
    case "manage":
        labels = active ? labelDeleteMode : labelManage;
        records = products;
        break;
    
    case "item":
        labels = labelItemColection;
        records = items || [];
        break;
    
    case "receipt":
        labels = labelReeiptColection;
        records = receipts || []; //funtion for receipts
        break;
    default:
        labels = [];
        records = [];
}
return(
    
   <div className="elements-container">
    <div {...(topic === 'manage' ? longPress : {})} className={active ? "label-DelMode" : "label"}>
        <SingleItem PlaceHolders={labels} />
    </div>
    <div className={active ? "display-element-DelMode" : "display-element"}>
            <ul>
                {active && 
                (records.map((record) => {
                    return(
                        <SingleItem key={record.id}
                        mode="delete"
                        Extra={true}
                        Record={record} 
                        ButtonsComponent={(props) => <SlideButton {...props} extraMode= {active}/>}/>
                    )
                }))}
                {!active && 
                (records.map((record) => {
                    return(
                        // <div
                        //         key={record.id}
                        //         onTouchStart={e => handleTouchStart(e, record)}
                        //         onTouchMove={e => handleTouchMove(e)}
                        //         onTouchEnd={e => handleTouchEnd(e)}
                        //         style={{ touchAction: 'pan-y', display: 'block', width: '100%' }}>
                            <SingleItem 
                                key={record.id}
                                mode="display"
                                Extra={true}
                                Record={record} 
                                ButtonsComponent={topic === 'manage' ? (props) => <SlideButton {...props} extraMode= {active} /> : null }
                        />
                        // </div>
                    )}))}
                 {(topic === 'receipt' && hasMoreNext) && (
                    <div ref={bottomLoaderRef} /*to change style*/ style={{ height: 40, backgroundColor: 'grey' } } />
                 )}
            </ul>    
    </div>
   </div>
)}

export default DisplayElements;



