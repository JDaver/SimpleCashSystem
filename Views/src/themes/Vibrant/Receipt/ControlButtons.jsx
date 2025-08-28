
import { useReceipt } from "@contexts/receiptHandlerContext";

export default function ControlButtons(){
    const {clearReceipt} = useReceipt();
    return(
        <div className="control-area">
            <button className="control-btn-clear" onClick={() =>  clearReceipt()}>Pulisci lo scontrino</button>
            <button className="control-btn-submit">Emetti l'ordine</button>
        </div>
    )
}