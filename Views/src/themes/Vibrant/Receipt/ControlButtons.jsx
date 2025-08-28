import ArrowUpCircleIcon from "@heroicons/react/24/outline/ArrowUpCircleIcon";
import { useReceipt } from "@contexts/receiptHandlerContext";
import { createReceipt } from "@utils/receiptService";

export default function ControlButtons(){
    const {clearReceipt,receipt,totalOfReceipt} = useReceipt();
    console.log(receipt);
    const user = "Unset"; //datafield for filtering party names -> to be implemented in future
    return(
        <form onSubmit={createReceipt} method='POST'>
            <input type="hidden" name="receipt" value={JSON.stringify(receipt)}/>
            <input type="hidden" name="id_party" value="1"/>
            <input type="hidden" name="tot_price" value={(totalOfReceipt > 0) ? totalOfReceipt : ""} required/>
            
        <div className="control-area">
            <button className="control-btn-clear" onClick={() =>  clearReceipt()} type="button">Pulisci lo scontrino</button>
            <button className="control-btn-submit"><ArrowUpCircleIcon style={{width:60, height:30}} type="submit"/></button>
        </div>
        </form>
    )
}