import { useState } from "react";
import { useFetchAll } from "../../../Hooks/productsHook";
import { useLongPress } from "../../../Hooks/useLongPress";
import SingleItem from "../CashierScreen/SingleItem";
import './DisplayElements.css';

function DisplayElements(){
    const [active,setActive] = useState();
    const longPress = useLongPress(() => {
    console.log("premuto");
    setActive(prev => !prev);}
    ,2000);
    const {products, loading, error} = useFetchAll();

    return(
        <div className="display-elements-wrapper">
            <div {...longPress} className={active ? "display-element" : "display-element-DelMode"}>
                <ul>
                    {products.map((product) => {
                        return(
                            <SingleItem key={product.id} product={product} showButtons={false}/>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default DisplayElements;