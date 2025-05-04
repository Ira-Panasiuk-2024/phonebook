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

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
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
        toast.success('Successfully registered!');
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        toast.success('Successfully logged in!');
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false;
        toast.success('Successfully logged out!');
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })

      .addCase(registerThunk.rejected, (state, action) => {
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false;
        toast.error(action.payload?.message || ERROR_TEXT);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false;
        toast.error(action.payload?.message || ERROR_TEXT);
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false;
        toast.error(action.payload?.message || ERROR_TEXT);
      })
      .addCase(refreshUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.rejected, state => {
        state.isRefreshing = false;
        state.user = { name: '', email: '' };
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = slice.reducer;
