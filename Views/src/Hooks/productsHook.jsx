import { useState } from "react";
import { fetchAllProducts } from "@utils/productService";
import { useEffect } from "react";

export function useFetchAll(){
    const [products, setProducts] = useState([]);
    const [loading,  setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllProducts().then(data => {
            console.log("Risposta dal server:", data);
            setProducts(data);
            setLoading(false);
        }).catch(err => {
            setError(err.message)
            setLoading(false);
        });
    }, []);

    return { products, loading, error};
}
