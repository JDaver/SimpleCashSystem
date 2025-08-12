import { useDisplay } from "../hooks/productHook";
export default function UpdateItem(){
    const {products,loading, error } = useDisplay();

    if(loading) return <p>Caricamento...</p>
    if(error) return <p>Errore!</p>

    return(
        <>
            {products.map(prod => (
                <p>{prod.name } |||||||||| {prod.price}</p>
            ))}
        </>
    )
}