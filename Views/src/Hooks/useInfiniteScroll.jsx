import { useRef, useState, useEffect } from "react";
export function useInfiniteScroll(fetchNext, hasMoreNext) {
  const bottomLoaderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    if (!bottomLoaderRef.current || !hasMoreNext) return;

    const bottomObserver = new IntersectionObserver(
      async entries => {
        if (entries[0].isIntersecting && !isLoadingRef.current) {
          isLoadingRef.current = true;
          setIsLoading(true);
          await fetchNext();
          setIsLoading(false);
          isLoadingRef.current = false;
        }
      },
      { threshold: 1 }
    );

    bottomObserver.observe(bottomLoaderRef.current);
    return () => bottomObserver.disconnect();
  }, [fetchNext, hasMoreNext]);

  return { bottomLoaderRef, isLoading };
}


