import axios, { AxiosInstance } from 'axios';
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,
});

export interface LoginResponse {
  token: string;
  username?: string;
}

export interface SignupResponse {
  msg?: string;
}

export const setAuthToken = (token?: string | null): void => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

export const signup = (payload: { email: string; password: string }) =>
  api.post<SignupResponse>('/auth/signup', payload);

export const login = (payload: { email: string; password: string }) =>
  api.post<LoginResponse>('/auth/login', payload);

export const getProtected = (): Promise<{ msg: string }> =>
  api.get('/protected');

export default api;
