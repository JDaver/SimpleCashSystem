import { useState, useRef, useEffect } from "react";
import { queryReceipts } from "../utils/receiptService";

export function useFetchReceipts() {
  const [receipts, setReceipts] = useState([]);
  const pageRef = useRef(1);
  const isFetchingNext = useRef(false);
  const didFetch = useRef(false);
  const [hasMoreNext, setHasMoreNext] = useState(true);
  const maxItems = 20; //ideally to set at 50/100
  

  const fetchNext = async () => {
    if (isFetchingNext.current || !hasMoreNext) return;
    isFetchingNext.current = true;

    try {
      const data = await queryReceipts({page:pageRef.current, limit:maxItems});
      if (!data || data.length < maxItems) {
        setHasMoreNext(false);
      }
      setReceipts(prev => prev = [...prev, ...data]);
      pageRef.current += 1;
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
    hasMoreNext,
  };
}


