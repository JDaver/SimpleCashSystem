import { useState, useEffect, useRef } from 'react';
import { fetchAllProducts, getPartys } from '@utils/productService';
import { queryItems } from '@utils/productService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteItem, insertItem, modifyItem } from '../utils/productService';

//Fetch AllProducts: TO IMPLEMENT MUTATION FOR UPDATE AND INSERT
export function useFetchAll() {
  const queryClient = useQueryClient();

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
    queryKey: ['products', filters, orderValues],
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
      queryClient.invalidateQueries(['products', filters, orderValues]);
    },
    onError: err => {
      console.error("Errore nell' inserimento", err);
    },
  });
  const { mutate: editProduct } = useMutation({
    mutationFn: modifyItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['products', filters, orderValues]);
    },
    onError: err => {
      console.error('Errore modifica prodotto:', err);
    },
  });

  const { mutate: deleteProduct } = useMutation({
    mutationFn: deleteItem,
    onMutate: async id => {
      const ids = Array.isArray(id) ? id : [id];
      console.log(ids);

      await queryClient.cancelQueries(['products', filters, orderValues]);

      const previousData = queryClient.getQueryData(['products', filters, orderValues]);

      queryClient.setQueryData(['products', filters, orderValues], old => {
        if (!old) return old;
        return {
          ...old,
          formattedData: old.formattedData.filter(p => !ids.includes(p.id)),
        };
      });

      return { previousData };
    },
    onError: (err, id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['products', filters, orderValues], context.previousData);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['products', filters, orderValues]);
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

  const products = productsMap ?? new Map();

  return {
    products,
    loading: isLoading,
    error,
    deleteProduct,
    setFilters,
    filters,
    setOrders,
    orderValues,
    insertProduct,
    editProduct,
  };
}

/**
 *
 * @returns
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export function useFetchItems() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    queryItems()
      .then(data => {
        setRecords(data);
      })
      .catch(err => {
        console.log('error in hooks -> ', err);
      });
  }, []);

  return { records };
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
      const data = await queryReceipts({ page });

      console.log(page, ' **** ', data);

      if (!data || data.length < maxItems) {
        setHasMoreNext(false);
      }

      setReceipts(prev => (prev = [...prev, ...data]));

      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error fetching next receipts:', err);
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
    hasMoreNext,
  };
}

export function usePartyNames() {
  const [partyNames, setPartyNames] = useState([]);
  const [error, setError] = useState(null);

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
