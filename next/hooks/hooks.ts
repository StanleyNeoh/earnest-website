import { useEffect, useLayoutEffect, useRef, useState } from "react";

type FetcherResponse<T> = {
    data: T[];
    total: number;
}

type ItemsState<T> = {
  items: T[];
  shouldLoadMore: boolean;
}

export function useLoadManager<T>(
    fetcher: (start: number) => Promise<FetcherResponse<T>>,
    initial: T[],
    cache_key: string,
    cache_ttl: number = 1000 * 60 * 60, // 1 hour in ms
) {
  const loadTriggerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ItemsState<T>>({
    items: initial,
    shouldLoadMore: true,
  });

  useLayoutEffect(() => {
    const cached = localStorage.getItem(cache_key);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        console.log("Cached data:", parsed.data);
        if (
          parsed.timestamp 
          && Date.now() - parsed.timestamp < cache_ttl
          // immediately invalidate cache if initial does not match prefix
          && JSON.stringify(parsed.data.slice(0, initial.length)) === JSON.stringify(initial) 
        ) {
          setItems({
            items: parsed.data,
            shouldLoadMore: true,
          });
        }
      } catch {}
    }
  }, [initial, cache_key, cache_ttl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (loading) return;
        if (!items.shouldLoadMore || entries[0].intersectionRatio <= 0) return;

        try {
          setLoading(true);
          const { data, total } = await fetcher(items.items.length);
          setLoading(false);
          setItems((prev) => {
            // Ensure the data fetched is correct
            if (prev.items.length !== items.items.length) {
              console.warn("Data is fetch is outdated");
              return prev;
            }

            const _items = [...prev.items, ...data];
            localStorage.setItem(
              cache_key,
              JSON.stringify({ data: _items, timestamp: Date.now() })
            );
            return {
              items: _items,
              shouldLoadMore: _items.length < total,
            };
          }); 
        } catch (error) {
          console.error("Error fetching more projects:", error);
        }
      }
    );
    if (!loadTriggerRef.current) return;
    observer.observe(loadTriggerRef.current!);
    return () => {
      observer.disconnect();
    }
  }, [loading, items, loadTriggerRef, fetcher, cache_key]);

  return {
    items: items.items,
    loading,
    loadTriggerRef,
  };
}