import { useEffect, useState } from 'react';
import { setAuthToken } from '../api';

export function useAuth() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
    } else {
      localStorage.removeItem('token');
      setAuthToken(null);
    }
  }, [token]);

  return { token, setToken };
}
