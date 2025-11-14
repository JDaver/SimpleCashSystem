import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  fetchAllProducts,
  getPartys,
  deleteItem,
  insertItem,
  modifyItem,
} from '@utils/productService';
import { queryItems } from '@utils/productService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//------------------------------ EditItem
export function useFetchAll() {
  const queryClient = useQueryClient();
  const [lastContext, setLastContext] = useState(null);

  const [filters, setFiltersState] = useState(
    queryClient.getQueryData({ queryKey: ['filters'] }) ?? { isBeverage: undefined }
  );

  const [orderValues, SetOrderValuesState] = useState(
    queryClient.getQueryData({ queryKey: ['orderValues'] }) ?? { column: 'name', order: 'ASC' }
  );

  const {
    data: productsMap,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['allProducts', filters, orderValues],
    queryFn: () => fetchAllProducts(orderValues, filters, []),
    staleTime: 1000 * 60 * 5,
    select: data => {
      const map = new Map();
      (data?.formattedData ?? []).forEach(p => map.set(p.id, p));
      return map;
    },
  });

  const { mutate: insertProduct } = useMutation({
    mutationFn: insertItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['allProducts', filters, orderValues]);
    },
    onError: err => {
      console.error("Errore nell' inserimento", err);
    },
  });

  const { mutate: editProduct } = useMutation({
    mutationFn: modifyItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['allProducts', filters, orderValues]);
    },
    onError: err => {
      console.error('Errore modifica prodotto:', err);
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async () => {},
    onMutate: async id => {
      const ids = Array.isArray(id) ? id : [id];

      await queryClient.cancelQueries(['allProducts', filters, orderValues]);

      const previousData = queryClient.getQueryData(['allProducts', filters, orderValues]);

      queryClient.setQueryData(['allProducts', filters, orderValues], old => {
        if (!old) return old;
        return {
          ...old,
          formattedData: old.formattedData.filter(p => !ids.includes(p.id)),
        };
      });

      const timeoutDelete = setTimeout(() => {
        deleteItem(ids)
          .then(() => {
            queryClient.invalidateQueries(['allProducts', filters, orderValues]);
          })
          .catch(err => {
            queryClient.setQueryData(['allProducts', filters, orderValues], previousData);
          });
      }, 5000);

      return { previousData, timeoutDelete };
    },
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['allProducts', filters, orderValues], context.previousData);
      }
    },
  });

  const setFilters = newFilters => {
    setFiltersState(newFilters);
    queryClient.setQueryData({ queryKey: ['filters'], data: newFilters });
  };

  const setOrders = newOrders => {
    SetOrderValuesState(newOrders);
    queryClient.setQueryData({ queryKey: ['orderValues'], data: newOrders });
  };

  const undoDelete = () => {
    console.log(lastContext);
    clearTimeout(lastContext.timeoutDelete);
    queryClient.setQueryData(['allProducts', filters, orderValues], restored);
    setLastContext(null);
  };

  const products = productsMap ?? new Map();

  return {
    products,
    loading: isLoading,
    error,
    deleteProduct,
    undoDelete,
    setFilters,
    filters,
    setOrders,
    orderValues,
    insertProduct,
    editProduct,
  };
}

//------------------------------ CashierScreen

export function useFetchCashier() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['currentProducts'],
    queryFn: () => fetchAllProducts(null, null, []),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
  const products = data?.formattedData ?? [];

  return { products, isLoading, error };
}

//------------------------------ SalesHistory

export function useFetchItems() {
  const [records, setRecords] = useState([]);
  const [hasMoreNext, setHasMoreNext] = useState(true);

  const pageRef = useRef(1);
  const isFetchingNext = useRef(false);
  const arraySourceRef = useRef([]);
  const didFirstFetch = useRef(false);

  const maxItemsBuffer = 10;

  useEffect(() => {
    let mounted = true;

    queryItems()
      .then(data => {
        if (mounted && Array.isArray(data)) {
          arraySourceRef.current = data;
          setRecords(data.slice(0, maxItemsBuffer));
          pageRef.current += 1;
        }
        if (data.length <= maxItemsBuffer) setHasMoreNext(false);

        didFirstFetch.current = true;
      })
      .catch(err => console.error('Errore queryItems:', err));

    return () => {
      mounted = false;
    };
  }, []);

  const fetchNext = useCallback(async () => {
    if (!didFirstFetch.current) return;
    if (isFetchingNext.current || !hasMoreNext) return;

    const rightIndex = maxItemsBuffer * pageRef.current;
    const leftIndex = rightIndex - maxItemsBuffer;
    const arraySource = arraySourceRef.current;

    isFetchingNext.current = true;

    const data = arraySource.slice(leftIndex, rightIndex);

    if (!Array.isArray(data) || data.length === 0) {
      setHasMoreNext(false);
      return;
    }

    if (data.length < maxItemsBuffer) {
      setHasMoreNext(false);
    } else {
      pageRef.current += 1;
    }
    setRecords(prev => [...prev, ...data]);

    isFetchingNext.current = false;
  }, [hasMoreNext, maxItemsBuffer]);

  return { records, fetchNext, hasMoreNext };
}

//------------------------------ getParty

export function usePartyNames() {
  const [partyNames, setPartyNames] = useState([]);

  useEffect(() => {
    getPartys()
      .then(data => {
        setPartyNames(data);
      })
      .catch(err => {
        console.log('error in hooks -> ', err);
      });
  }, []);

  return partyNames;
}
