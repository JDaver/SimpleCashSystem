import { useState, useEffect, useRef } from "react";
import { fetchAllProducts } from "@utils/productService";
import { queryItems } from "@utils/productService";
import { queryReceipts } from "../utils/receiptService";

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

export function useFetchItems(){
      const [records, setRecords] = useState([]);

    useEffect(() => {
        queryItems().then(data => {
            console.log("Risposta dal server:", data);
            setRecords(data);
        }).catch(err => {
            console.log("error in hooks -> ",err);
        });
    }, []);

    return { records};
}


