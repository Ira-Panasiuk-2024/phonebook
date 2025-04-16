import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registerThunk,
} from './operations';
import toast from 'react-hot-toast';

const initialState = {
  user: {
    name: '',
    email: '',
  },
  token: '',
  isLoggedIn: false,
  isRefreshing: false,
};

const ERROR_TEXT = 'Oops... something went wrong, try again!';

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        toast.success('Successfully registration');
      })
      .addCase(registerThunk.rejected, state => {
        toast.error(ERROR_TEXT);
        return state;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        toast.success('Successfully login');
      })
      .addCase(loginThunk.rejected, state => {
        toast.error(ERROR_TEXT);
        return state;
      })

      .addCase(logoutThunk.fulfilled, state => {
        state.user = { name: '', email: '' };
        state.token = '';
        state.isLoggedIn = false;
        toast.success('Successfully logout');
      })
      .addCase(logoutThunk.rejected, state => {
        toast.error(ERROR_TEXT);
        return state;
      })

      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
