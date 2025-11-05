import { useRef, useState, useEffect } from 'react';
export function useInfiniteScroll(fetchNext, hasMoreNext) {
  const bottomLoaderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!bottomLoaderRef.current || !hasMoreNext) return;

    const bottomObserver = new IntersectionObserver(
      async entries => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          await fetchNext();
          setIsLoading(false);
        }
      },
      { threshold: 0.2 }
    );

    bottomObserver.observe(bottomLoaderRef.current);
    return () => bottomObserver.disconnect();
  }, [fetchNext, hasMoreNext]);

  return { bottomLoaderRef, isLoading };
}
