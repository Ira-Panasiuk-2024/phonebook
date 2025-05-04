import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registerThunk,
} from './operations';

import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from '../../service/axios';

// const initialState = {
//   user: {
//     name: '',
//     email: '',
//   },
//   token: '',
//   isLoggedIn: false,
//   isRefreshing: false,
// };

// const ERROR_TEXT = 'Oops... something went wrong, try again!';

// const slice = createSlice({
//   name: 'auth',
//   initialState,
//   extraReducers: builder => {
//     builder
//       .addCase(registerThunk.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.isLoggedIn = true;
//         state.token = action.payload.token;
//         toast.success('Successfully registration');
//       })
//       .addCase(registerThunk.rejected, state => {
//         toast.error(ERROR_TEXT);
//         return state;
//       })

//       .addCase(loginThunk.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.isLoggedIn = true;
//         state.token = action.payload.token;
//         toast.success('Successfully login');
//       })
//       .addCase(loginThunk.rejected, state => {
//         toast.error(ERROR_TEXT);
//         return state;
//       })

//       .addCase(logoutThunk.fulfilled, state => {
//         state.user = { name: '', email: '' };
//         state.token = '';
//         state.isLoggedIn = false;
//         toast.success('Successfully logout');
//       })
//       .addCase(logoutThunk.rejected, state => {
//         toast.error(ERROR_TEXT);
//         return state;
//       })

//       .addCase(refreshUserThunk.fulfilled, (state, action) => {
//         state.user.name = action.payload.name;
//         state.user.email = action.payload.email;
//         state.isLoggedIn = true;
//         state.isRefreshing = false;
//       })
//       .addCase(refreshUserThunk.pending, state => {
//         state.isRefreshing = true;
//       })
//       .addCase(refreshUserThunk.rejected, state => {
//         state.isRefreshing = false;
//       });
//   },
// });

// export const authReducer = slice.reducer;

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: null, // Часто зручніше використовувати null для відсутності токена
  isLoggedIn: false,
  isRefreshing: false,
  loading: false, // Додаємо стан завантаження
  error: null, // Додаємо стан помилки
};

const ERROR_TEXT = 'Oops... something went wrong, try again!';

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder // Використовуємо addMatcher для централізованої обробки pending, fulfilled, rejected // Це застосується до всіх thunk-ів, доданих через addCase
      .addMatcher(isPending, handlePending)
      .addMatcher(isFulfilled, handleFulfilled)
      .addMatcher(isRejected, handleRejected) // Обробка конкретних fulfilled станів

      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        toast.success('Successfully registered!'); // Змінено текст для точності
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        toast.success('Successfully logged in!'); // Змінено текст для точності
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false; // Axios header очищається в thunk'у logoutThunk (в finally)
        toast.success('Successfully logged out!'); // Змінено текст для точності
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload; // Припускаємо, що refresh повертає лише об'єкт користувача
        state.isLoggedIn = true;
        state.isRefreshing = false; // Токен не оновлюється при refresh, використовується той, що вже є
      }) // Обробка конкретних rejected станів

      .addCase(registerThunk.rejected, (state, action) => {
        // handleRejected вже встановить state.error = action.payload
        // Додатково можемо скинути стан авторизації при помилці реєстрації,
        // хоча зазвичай при rejected реєстрації користувач і так не залогінений.
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false;
        toast.error(action.payload?.message || ERROR_TEXT); // Використовуємо повідомлення з payload, якщо є
      })
      .addCase(loginThunk.rejected, (state, action) => {
        // handleRejected вже встановить state.error = action.payload
        // Скидаємо стан авторизації при помилці входу
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false;
        toast.error(action.payload?.message || ERROR_TEXT); // Використовуємо повідомлення з payload, якщо є
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        // handleRejected вже встановить state.error = action.payload
        // Навіть якщо вихід на бекенді не вдався, на фронтенді часто скидають стан
        // для уникнення зациклення. Axios header очищається в thunk'у в finally.
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false;
        toast.error(action.payload?.message || ERROR_TEXT); // Використовуємо повідомлення з payload, якщо є
      })
      .addCase(refreshUserThunk.pending, state => {
        // handlePending вже встановить loading: true, error: null
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.rejected, state => {
        // handleRejected вже встановить state.error = action.payload, loading: false
        state.isRefreshing = false; // Обов'язково скидаємо стан, якщо refresh не вдався (токен недійсний)
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false; // Тут можна показати toast, хоча часто при помилці refresh просто перенаправляють на логін // toast.error('Session expired. Please log in again.');
      });
  },
});

export const authReducer = slice.reducer;
