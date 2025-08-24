import { useFetchAll } from "../../hooks/productsHook";
export default function UpdateItem(){
    const {products,loading, error } = useFetchAll();

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