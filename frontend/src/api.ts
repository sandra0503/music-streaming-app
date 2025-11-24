import axios, { AxiosInstance } from 'axios';
import { Release } from './models/release';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
});

export interface LoginResponse {
  token: string;
  username?: string;
  favourites: string[];
}

export interface SignupResponse {
  msg?: string;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token?: string | null): void => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

export const signup = (payload: { email: string; password: string }) =>
  api.post<SignupResponse>('/auth/signup', payload);

export const login = (payload: { email: string; password: string }) =>
  api.post<LoginResponse>('/auth/login', payload);

// Discover page
export async function fetchNinaReleases(
  query: string,
  token: string
): Promise<Release[]> {
  const result = await api
    .get(`/discover?limit=50`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      console.error('API error:', err);
    });
  return result?.data.releases || [];
}

export async function fetchNinaStaffPickReleases(
  query: string,
  token: string
): Promise<Release[]> {
  const result = await api
    .get(`/discover/picks?limit=50`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      console.error('API error:', err);
    });
  return result?.data.releases || [];
}

// Audio player
export async function markAsFavourite(releaseId: string): Promise<void> {
  const result = await api
    .post(`/favourites/add?key=${releaseId}`)
    .catch((err) => {
      console.error('API error:', err);
    });
  return result?.data.favourites || [];
}

export async function removeFavourite(releaseId: string): Promise<void> {
  const result = await api
    .post(`/favourites/remove?key=${releaseId}`)
    .catch((err) => {
      console.error('API error:', err);
    });
  return result?.data.favourites || [];
}

// Favourites page
export async function fetchFavourites(token: string): Promise<Release[]> {
  const result = await api
    .get(`/favourites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      console.error('API error:', err);
    });
  return result?.data.favourites || [];
}

export default api;
