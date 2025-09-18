import { useState, useEffect, useRef } from "react";
import { fetchAllProducts, getPartys } from "@utils/productService";
import { queryItems } from "@utils/productService";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";


export function useFetchAll(){
  const {data, isLoading, error} = useQuery({
    queryKey:["products"],
    queryFn: fetchAllProducts,
  });

  const products = data?.formattedData ?? [];
  return {products, loading: isLoading, error};
}

export function useFetchItems(){
      const [records, setRecords] = useState([]);

    useEffect(() => {
        queryItems().then(data => {
            setRecords(data);
        }).catch(err => {
            console.log("error in hooks -> ",err);
        });
    }, []);

    return { records};
}


export function useFetchReceipts() {
  const [receipts, setReceipts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMoreNext, setHasMoreNext] = useState(true);
  const maxItems = 10;
  const isFetchingNext = useRef(false);
  const didFetch = useRef(false);

  const fetchNext = async () => {
    if (isFetchingNext.current || !hasMoreNext) return;
    isFetchingNext.current = true;

    try {
      const data = await queryReceipts({page});

      console.log(page," **** ", data);

      if (!data || data.length < maxItems) {
        setHasMoreNext(false);
      }

      setReceipts(prev => prev = [...prev, ...data]);

      setPage(prev => prev + 1);
    } catch (err) {
      console.error("Error fetching next receipts:", err);
    } finally {
      isFetchingNext.current = false;
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchNext();
  }, []);

  return {
    receipts,
    fetchNext,
    hasMoreNext
  };
}

export function usePartyNames(){
  const [partyNames,setPartyNames] = useState([]);
  const [error,setError] = useState(null);

     useEffect(() => {
        getPartys().then(data => {
            setPartyNames(data);
        }).catch(err => {
            console.log("error in hooks -> ",err);
        });
    }, []);

  return partyNames;
}
