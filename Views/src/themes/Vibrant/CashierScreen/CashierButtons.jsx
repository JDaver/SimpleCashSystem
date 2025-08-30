import addImg from "@assets/plus.png"
import remImg from "@assets/minus.png";
import { useReceipt } from "@contexts/receiptHandlerContext";

export default function CashierButtons(product){
    const {addToReceipt, productIsOnReceipt, decrementQuantityInReceipt} = useReceipt();

    return (
         <div>
                <button className="plus-btn" onTouchEnd={()=> addToReceipt(product)}><img  src={addImg} ></img></button>
                <button className={productIsOnReceipt(product.id) ? "minus-btn" : "minus-btn-disabled"} onTouchEnd={() => decrementQuantityInReceipt(product.id)}> <img src={remImg}/></button>
            </div>
    );
}