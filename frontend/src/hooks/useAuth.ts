import { useEffect, useState } from 'react';
import { setAuthToken } from '../api';

export function useAuth() {
  const initialToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // Immediately set token in API
  if (initialToken) setAuthToken(initialToken);

  const [token, setToken] = useState<string | null>(initialToken);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem('token', token);
    } else {
      setAuthToken(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  return { token, setToken };
}
