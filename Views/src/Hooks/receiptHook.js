import { useState, useRef, useEffect, useCallback } from 'react';
import { queryReceipts } from '../utils/receiptService';

export function useFetchReceipts() {
  const [receipts, setReceipts] = useState([]);
  const pageRef = useRef(1);
  const isFetchingNext = useRef(false);
  const didFetch = useRef(false);
  const [hasMoreNext, setHasMoreNext] = useState(true);
  const maxItems = 10; //ideally to set at 50/100

  const fetchNext = useCallback(async () => {
    if (isFetchingNext.current || !hasMoreNext) return;
    isFetchingNext.current = true;

    try {
      const data = await queryReceipts({ page: pageRef.current, limit: maxItems });

      if (!Array.isArray(data) || data.length === 0) {
        setHasMoreNext(false);
        return;
      }

      setReceipts(prev => [...prev, ...data]);

      if (data.length < maxItems) {
        setHasMoreNext(false);
      } else {
        pageRef.current += 1;
      }
    } catch (err) {
      console.error('Error fetching next receipts:', err);
    } finally {
      isFetchingNext.current = false;
    }
  }, [hasMoreNext, maxItems]);

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
