import './Receipt.css';
import TableReceipt from "./TableReceipt"
import ControlButtons from "./ControlButtons"
export default function Receipt(){
    return(
    <div className="Recipt_wrapper">
        <TableReceipt></TableReceipt>
        <ControlButtons></ControlButtons>
    </div>
    )
}