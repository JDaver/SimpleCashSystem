import ArrowUpCircleIcon from "@heroicons/react/24/outline/ArrowUpCircleIcon";
import { useReceipt } from "@contexts/receiptHandlerContext";

export default function ControlButtons(){
    const {clearReceipt,receipt} = useReceipt();
    console.log(receipt);
    return(
        <form onSubmit method='POST'>
        <div className="control-area">
            <button className="control-btn-clear" onClick={() =>  clearReceipt()}>Pulisci lo scontrino</button>
            <button className="control-btn-submit"><ArrowUpCircleIcon style={{width:60, height:30}} type="submit"/></button>
        </div>
        </form>
    )
}