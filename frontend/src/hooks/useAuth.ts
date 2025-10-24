import { useEffect, useState } from 'react';
import { setAuthToken } from '../api';

export function useAuth() {
  const getStoredToken = () =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const [token, setToken] = useState<string | null>(getStoredToken);

  // Keep API and localStorage in sync when React changes token
  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem('token', token);
    } else {
      setAuthToken(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  // React to manual token deletion or external changes (e.g. in another tab)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'token') {
        setToken(e.newValue);
      }
    };

    const handleFocus = () => {
      // In case it changed in the same tab (DevTools, manual edit, etc.)
      const current = getStoredToken();
      if (current !== token) setToken(current);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, [token]);

  return { token, setToken };
}
