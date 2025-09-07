import { useState } from "react";
import { useFetchAll,useFetchItems } from "@hooks/productsHook";
import { useLongPress } from "@hooks/useLongPress";
import SingleItem from "../Components/SingleItem";
import './DisplayElements.css';
import SlideButton from "./SlideButton";

const labelManage = ["Allergeni","Nome Prodoto","Prezzo","Modifica" ];
const labelDeleteMode = ["Elimina","Nome Prodoto","Prezzo","Seleziona" ];
const labelReeiptColection = ["Articoli","Scontrino e data","Totale" ];
const labelItemColection = ["In quanti scontrini","Nome Prodotto","Venduti"];


function DisplayElements({topic = "manage"}){
const {products, loading, error} = useFetchAll();
const {records: items} = useFetchItems();
const [active,setActive] = useState(false);
const longPress = useLongPress(() => setActive(prev => !prev),2000);

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
        records = []; //funtion for receipts
        break;
    default:
        labels = [];
        records = [];
}

console.log( records);
    
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
                {!active && (records.map((record) => {
                    return(
                        <SingleItem key={record.id}
                        mode="display"
                        Extra={true}
                        Record={record} 
                        ButtonsComponent={topic === 'manage' ? (props) => <SlideButton {...props} extraMode= {active} /> : null }
                        />
                    )
                }))}
                
            </ul>    
    </div>
   </div>
)}

export default DisplayElements;