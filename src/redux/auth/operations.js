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
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 11000
      ) {
        toast.error('User already exist!');
      } else {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            'Registration failed'
        );
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
      toast.error(
        error.response?.data?.message || error.message || 'Login failed'
      );
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
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || 'Logout failed'
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) {
      clearAuthHeader();
      return thunkApi.rejectWithValue('No token found');
    }
    setAuthHeader(savedToken);

    try {
      const { data } = await baseAxios.get('auth/refresh');
      return data.data;
    } catch (error) {
      clearAuthHeader();
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Session refresh failed'
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
