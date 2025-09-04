import { useState } from "react";
import { useFetchAll } from "@hooks/productsHook";
import { useLongPress } from "@hooks/useLongPress";
import SingleItem from "../Components/SingleItem";
import './DisplayElements.css';
import SlideButton from "./SlideButton";


function DisplayElements(){
    const labelNormal = ["Allergeni","Nome Prodoto","Prezzo","Modifica" ];
    const labelDeleteMode = ["Elimina","Nome Prodoto","Prezzo","Seleziona" ];
    const [active,setActive] = useState(false);
    const longPress = useLongPress(() => {
        console.log("premuto");
        setActive(prev => !prev);}
    ,2000);

    const {products, loading, error} = useFetchAll();
    console.log(active);
    return(
       <div className="elements-container">
        <div {...longPress} className={active ? "label-DelMode" : "label"}>
            <SingleItem PlaceHolders={active ? labelDeleteMode : labelNormal} />
        </div>

        <div className={active ? "display-element-DelMode" : "display-element"}>
                <ul>
                    {active && 
                    (products.map((product) => {
                        return(
                            <SingleItem key={product.id}
                            mode="delete"
                            Extra={true}
                            Record={product} 
                            ButtonsComponent={(props) => <SlideButton {...props} extraMode= {active}/>}/>
                        )
                    }))}

                    {!active && (products.map((product) => {
                        return(
                            <SingleItem key={product.id}
                            mode="display"
                            Extra={product.allergens}
                            Record={product} 
                            ButtonsComponent={(props) => <SlideButton {...props} extraMode= {active}/>}/>
                        )
                    }))}
                    
                </ul>    
        </div>
       </div>
    )
}

export default DisplayElements;