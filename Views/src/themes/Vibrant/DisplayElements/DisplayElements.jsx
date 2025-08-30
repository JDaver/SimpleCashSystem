import { useState } from "react";
import { useFetchAll } from "@hooks/productsHook";
import { useLongPress } from "@hooks/useLongPress";
import SingleItem from "../CashierScreen/SingleItem";
import './DisplayElements.css';


function DisplayElements(){
    const label = {
    name: "Nome Prodoto",
    price: "prezzo",
};
    const [active,setActive] = useState(false);
    const longPress = useLongPress(() => {
        console.log("premuto");
        setActive(prev => !prev);}
    ,2000);
    const {products, loading, error} = useFetchAll();

    return(
        <div className="display-elements-wrapper">
            <SingleItem product={label} showButtons={false} />
            <div {...longPress} className={!active ? "display-element" : "display-element-DelMode"}>
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