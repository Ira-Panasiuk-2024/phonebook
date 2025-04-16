import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const isDevelopment = process.env.NODE_ENV === 'development';

axios.defaults.baseURL = isDevelopment
  ? 'http://localhost:9393'
  : 'https://contacts-app-5c5h.onrender.com';

axios.defaults.withCredentials = true;

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post('users/signup', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (error.response.data.code === 11000) {
        toast.error('User already exist!');
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post('users/login', credentials);
      setAuthHeader(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');

    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) {
      return thunkApi.rejectWithValue('token is not exist');
    }
    setAuthHeader(savedToken);

    try {
      const { data } = await axios.get('users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
