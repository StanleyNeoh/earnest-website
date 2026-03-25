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

  // Check for updates mechanism using global endpoint
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/system/last-update`, {
          headers: {
            // Optional: Add token if we decide to restrict it later, currently public
            // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          }
        });
        
        if (response.ok) {
          const { timestamp } = await response.json();
          if (!timestamp) return;

          const cached = localStorage.getItem(cache_key);
          if (cached) {
            const parsed = JSON.parse(cached);
            // If remote system updated time is newer than our local cache timestamp
            if (parsed.timestamp && timestamp > parsed.timestamp) {
              console.log(`[useLoadManager] Global update detected. Invalidating ${cache_key}. Remote: ${timestamp}, Local: ${parsed.timestamp}`);
              localStorage.removeItem(cache_key);
              setItems({
                items: initial,
                shouldLoadMore: true,
              });
            }
          }
        }
      } catch (error) {
        console.error("[useLoadManager] Error checking for global updates:", error);
      }
    })();
  }, [cache_key, initial]);

  useLayoutEffect(() => {
    const cached = localStorage.getItem(cache_key);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
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