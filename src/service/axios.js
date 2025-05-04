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

// export const handlePending = state => {
//   state.loading = true;
// };

// export const handleRejected = (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// };

export const handlePending = state => {
  state.loading = true;
  state.error = null; // Очищаємо попередні помилки при старті нового запиту
};

export const handleFulfilled = state => {
  state.loading = false;
  state.error = null; // Очищаємо помилку при успішному виконанні
};

export const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload; // Встановлюємо помилку, отриману з thunk'а
  // Консольне логування вже є в самій функції handleRejected
};
