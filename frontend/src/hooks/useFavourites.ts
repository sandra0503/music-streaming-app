import { useEffect, useState } from 'react';
import { fetchFavourites } from '../api';
import { Release } from '../models/release';

export function useFavourites(token: string | null) {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const data = await fetchFavourites(token);
        setReleases([...data]);
      } catch (err) {
        console.error('Initial fetch failed', err);
        setError('Failed to load releases');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return { releases, loading, error };
}
