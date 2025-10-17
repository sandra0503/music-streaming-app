import { useEffect, useRef, useState } from 'react';
import { fetchNinaReleases } from '../api';
import { Release } from '../models/release';

export function useReleases(query: string) {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isFirstRender = useRef(true);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // initial load
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await fetchNinaReleases('');
        if (isMounted) setReleases(data);
      } catch (err) {
        console.error('Initial fetch failed', err);
        if (isMounted) setError('Failed to load releases');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // query changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let isMounted = true;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchNinaReleases(query);
        if (isMounted) setReleases(data);
      } catch (err) {
        console.error('Query fetch failed', err);
        if (isMounted) setError('Failed to load releases');
      } finally {
        if (isMounted) setLoading(false);
      }
    }, 400);

    return () => {
      isMounted = false;
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  return { releases, loading, error };
}
