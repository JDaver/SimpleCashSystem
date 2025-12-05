import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { fetchAllProducts, deleteItem, insertItem, modifyItem } from '@utils/productService';
import { getParties } from '@utils/partiesService';
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['allProducts', filters, orderValues],
    queryFn: () => fetchAllProducts(orderValues, filters, []),
    staleTime: 1000 * 60 * 5,
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
    clearTimeout(lastContext.timeoutDelete);
    queryClient.setQueryData(['allProducts', filters, orderValues], restored);
    setLastContext(null);
  };

  const dataArray = Array.isArray(data?.formattedData) ? data.formattedData : [];
  const { records, hasMoreNext, fetchNext } = useDataVirtualizer(dataArray, 10);

  const allProductsIds = useMemo(() => {
    return dataArray.map(p => p.id);
  }, [dataArray]);

  return {
    records,
    hasMoreNext,
    fetchNext,
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
    allProductsIds,
  };
}

//------------------------------ CashierScreen

export function useFetchCashier(filtersParam = null) {
  const queryClient = useQueryClient();
  const initialFilters = queryClient.getQueryData(['filters']) ??
    filtersParam ?? { isBeverage: undefined };
  const { data, isLoading, error } = useQuery({
    queryKey: ['currentProducts', filtersParam],
    queryFn: () => fetchAllProducts(null, filtersParam, []),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const dataArray = Array.isArray(data?.formattedData) ? data.formattedData : [];
  const { records, hasMoreNext, fetchNext } = useDataVirtualizer(dataArray, 10);

  const products = records ?? [];

  return {
    products,
    hasMoreNext,
    fetchNext,
    isLoading,
    error,
  };
}

//------------------------------ SalesHistory

export function useFetchItems() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['itemsHistory'],
    queryFn: () => queryItems(),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const dataArray = Array.isArray(data) ? data : [];
  const { records, hasMoreNext, fetchNext } = useDataVirtualizer(dataArray, 10);
  return { records, fetchNext, hasMoreNext };
}

//------------------------------ getParty

export function usePartyNames() {
  console.log('getParties importato:', getParties);
  const { data: partyNames = [] } = useQuery({
    queryKey: ['partyNames'],
    queryFn: () => getParties(),
    staleTime: 1000 * 60 * 5,
  });
  console.log(partyNames);
  return partyNames;
}

//VIRTUALIZER HELPER
function useDataVirtualizer(data, maxItemsBuffer) {
  const [records, setRecords] = useState([]);
  const [hasMoreNext, setHasMoreNext] = useState(true);
  const pageRef = useRef(1);
  const isFetchingNext = useRef(false);
  const arraySourceRef = useRef([]);

  useEffect(() => {
    if (!Array.isArray(data)) return;
    arraySourceRef.current = data;
    const firstPage = data.slice(0, maxItemsBuffer);
    setRecords(firstPage);
    setHasMoreNext(data.length > maxItemsBuffer);
    pageRef.current = 1;
  }, [data, maxItemsBuffer]);

  const fetchNext = useCallback(() => {
    if (isFetchingNext.current || !hasMoreNext) return;

    const start = pageRef.current * maxItemsBuffer;
    const nextSlice = arraySourceRef.current.slice(start, start + maxItemsBuffer);

    if (!nextSlice.length) {
      setHasMoreNext(false);
      return;
    }

    setRecords(prev => [...prev, ...nextSlice]);
    pageRef.current += 1;
    if (nextSlice.length < maxItemsBuffer) setHasMoreNext(false);
  }, [hasMoreNext, maxItemsBuffer]);

  return { records, fetchNext, hasMoreNext };
}
