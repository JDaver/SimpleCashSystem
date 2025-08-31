import ArrowUpCircleIcon from "@heroicons/react/24/outline/ArrowUpCircleIcon";
import { useReceipt } from "@contexts/receiptHandlerContext";
import { createReceipt } from "@utils/receiptService";

export default function ControlButtons(){
    const {clearReceipt,receipt,totalOfReceipt} = useReceipt();
    const filteredReceipt = JSON.stringify(receipt.map(({ id, quantity }) => ({ id, quantity })));
    console.log(receipt); //Debug

   async function handleSubmit(event){
        event.preventDefault();

        createReceipt(event)
        .then(() => clearReceipt())  
        .catch((err) => console.log(err));
    }

    return(
        <form onSubmit={handleSubmit} method='POST'>
            <input type="hidden" name="receipt" value={filteredReceipt}/>
            <input type="hidden" name="id_party" value="1"/>
            <input type="hidden" name="tot_price" value={(totalOfReceipt > 0) ? totalOfReceipt : ""} required/>
            
        <div className="control-area">
            <button className="control-btn-clear" onClick={() =>  clearReceipt()} type="button">Pulisci lo scontrino</button>
            <button className="control-btn-submit"><ArrowUpCircleIcon style={{width:60, height:30}} type="submit"/></button>
        </div>
        </form>
    )
}