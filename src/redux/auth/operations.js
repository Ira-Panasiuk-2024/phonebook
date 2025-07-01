import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { baseAxios, setAuthHeader, clearAuthHeader } from '../../service/axios';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const { data } = await baseAxios.post('auth/register', credentials);
      setAuthHeader(data.data.accessToken);
      return data.data;
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
      const { data } = await baseAxios.post('auth/login', credentials);
      setAuthHeader(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await baseAxios.post('auth/logout');
      clearAuthHeader();
    } catch (error) {
      toast.error(error.message || 'Logout failed');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) {
      return thunkApi.rejectWithValue('token is not exist');
    }
    setAuthHeader(savedToken);

    try {
      const { data } = await baseAxios.get('auth/refresh');
      return data.data;
    } catch (error) {
      toast.error(error.message || 'Session refresh failed');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
