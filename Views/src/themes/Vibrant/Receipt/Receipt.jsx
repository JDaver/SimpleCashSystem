import './Receipt.css';
import TableReceipt from "./TableReceipt"
import ControlButtons from "./ControlButtons"
export default function Receipt(){
    return(
    <div className="Receipt_wrapper">
        <TableReceipt/>
        <ControlButtons/>
        </div>
    )
}