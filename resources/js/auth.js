import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

// Interceptor para añadir el token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export const login = async (credentials) => {
  return await api.post('/auth/signin', credentials);
};

export const logout = async () => {
  return await api.post('/logout');
};