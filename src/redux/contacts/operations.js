import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseAxios, clearAuthHeader } from '../../service/axios';

const DEFAULT_PARAMS = {
  page: 1,
  perPage: 10,
  sortBy: 'phoneNumber',
  sortOrder: 'asc',
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (params = {}, thunkAPI) => {
    try {
      const queryParams = { ...DEFAULT_PARAMS, ...params };
      const response = await baseAxios.get('/contacts', {
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const addContactOperation = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      const formData = new FormData();

      if (contactData.name) formData.append('name', contactData.name);
      if (contactData.phoneNumber)
        formData.append('phoneNumber', contactData.phoneNumber);
      if (contactData.email) formData.append('email', contactData.email);
      if (contactData.contactType)
        formData.append('contactType', contactData.contactType);
      if (contactData.isFavourite !== undefined)
        formData.append('isFavourite', contactData.isFavourite);

      if (contactData.photo && contactData.photo instanceof File) {
        formData.append('photo', contactData.photo);
      }

      const response = await baseAxios.post('/contacts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Contact successfully added!');
      thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding contact');
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteContactOperation = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await baseAxios.delete(`/contacts/${id}`);
      toast.success('Contact successfully deleted!');
      thunkAPI.dispatch(fetchContacts());
      return id;
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error('Contact not found');
        return thunkAPI.rejectWithValue('Contact not found');
      } else {
        toast.error(error.response?.data?.message || 'Error deleting contact');
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || error.message
        );
      }
    }
  }
);

export const editContactOperation = createAsyncThunk(
  'contacts/editContact',
  async ({ id, ...contactData }, thunkAPI) => {
    try {
      const formData = new FormData();

      if (contactData.name) formData.append('name', contactData.name);
      if (contactData.phoneNumber)
        formData.append('phoneNumber', contactData.phoneNumber);
      if (contactData.email) formData.append('email', contactData.email);
      if (contactData.contactType)
        formData.append('contactType', contactData.contactType);
      if (contactData.isFavourite !== undefined)
        formData.append('isFavourite', contactData.isFavourite);

      if (contactData.photo && contactData.photo instanceof File) {
        formData.append('photo', contactData.photo);
      }

      const response = await baseAxios.patch(`/contacts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Contact successfully updated!');
      thunkAPI.dispatch(fetchContacts());
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating contact');
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const logoutOperation = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await baseAxios.post('/auth/logout');
      clearAuthHeader();
      toast.success('You have successfully logged out!');
      return;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error while logging out');
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
