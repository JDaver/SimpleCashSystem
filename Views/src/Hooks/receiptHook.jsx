import { useState, useRef, useEffect } from "react";
import { queryReceipts } from "../utils/receiptService";
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


