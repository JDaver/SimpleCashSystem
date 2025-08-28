import './Receipt.css';
import TableReceipt from "./TableReceipt"
import ControlButtons from "./ControlButtons"
export default function Receipt(){
    return(
    <div className="receipt_wrapper">
        <TableReceipt/>
        <ControlButtons/>
        </div>
    )
}