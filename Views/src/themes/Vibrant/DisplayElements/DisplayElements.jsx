import { useState } from "react";
import { useFetchAll } from "@hooks/productsHook";
import { useLongPress } from "@hooks/useLongPress";
import SingleItem from "../Components/SingleItem";
import './DisplayElements.css';
import SlideButton from "./SlideButton";


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
    console.log(active);
    return(
       <>
        <div {...longPress} className="display-elements-wrapper">
            <SingleItem product={label}
             showButtons={false}
             ShowPlaceHolder={true}
             PlaceHolder={active ? "Elimina" : "Modifica"} />
        </div>

        <div className={!active ? "display-element" : "display-element-DelMode"}>
                <ul>
                    {products.map((product) => {
                        return(
                            <SingleItem key={product.id}
                            product={product} 
                            ShowButtons={true}
                            Buttons={(props) => <SlideButton {...props} extraMode= {active}/>}/>
                        )
                    })}
                </ul>    
        </div>
       </>
    )
}

export default DisplayElements;