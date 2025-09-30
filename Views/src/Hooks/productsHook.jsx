import { useState, useEffect, useRef } from "react";
import { fetchAllProducts, getPartys } from "@utils/productService";
import { queryItems } from "@utils/productService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { deleteItem } from "../utils/productService";


//Fetch AllProducts
export function useFetchAll(){
  const queryClient = useQueryClient();

  const {data, isLoading, error} = useQuery({
    queryKey:["products"],
    queryFn: fetchAllProducts,
    staleTime: 1000*60*5
  });

  const {mutate: deleteProduct, isPending: deleting } = useMutation({
    mutationFn: deleteItem,
    onMutate: async (id) => {

      await queryClient.invalidateQueries({queryKey:["products"]});
      const ids = Array.isArray(id) ? id : [id];

      const rollBackData = queryClient.getQueryData(["products"]);

      queryClient.setQueryData(["products"], (old) => {
        return {
          ...old,
          formattedData: old.formattedData.filter((p) => !ids.includes(p.id))
        };
      });
      return { rollBackData };
    },
    onError: (err, id, context) => {
      if(context?.rollBackData) queryClient.setQueryData(["products"],context.rollBackData);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["products"] })
  });

  const products = data?.formattedData ?? [];
  return {
    products, 
    loading: isLoading, 
    error,
    deleteProduct,
    deleting
};
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
