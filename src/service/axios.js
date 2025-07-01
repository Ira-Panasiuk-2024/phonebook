import axios from 'axios';

export const baseAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9393',
  withCredentials: true,
});

export const setAuthHeader = token => {
  baseAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  baseAxios.defaults.headers.common.Authorization = '';
};

export const handlePending = state => {
  state.loading = true;
  state.error = null;
};

export const handleFulfilled = state => {
  state.loading = false;
  state.error = null;
};

export const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
