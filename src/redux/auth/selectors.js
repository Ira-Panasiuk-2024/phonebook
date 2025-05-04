export const selectIsLoggedIn = state => state.auth.isLoggedIn; // Перевіряємо, чи користувач залогінений
export const selectUser = state => state.auth.user; // Отримуємо об'єкт користувача
export const selectToken = state => state.auth.token; // Отримуємо токен
export const selectIsRefreshing = state => state.auth.isRefreshing; // Перевіряємо, чи відбувається оновлення даних користувача
export const selectLoading = state => state.auth.loading; // Перевіряємо загальний стан завантаження
export const selectError = state => state.auth.error;
