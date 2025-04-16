import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContactOperation,
  deleteContactOperation,
  editContactOperation,
  logoutOperation,
} from './operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addContactOperation.pending, state => {
        state.loading = true;
      })
      .addCase(addContactOperation.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContactOperation.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteContactOperation.pending, state => {
        state.loading = true;
      })
      .addCase(deleteContactOperation.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteContactOperation.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(editContactOperation.pending, state => {
        state.loading = true;
      })
      .addCase(editContactOperation.fulfilled, (state, action) => {
        const contactToEdit = state.items.find(
          contact => contact.id === action.payload.id
        );
        if (contactToEdit) {
          contactToEdit.name = action.payload.name;
          contactToEdit.number = action.payload.number;
        }
        state.loading = false;
      })
      .addCase(editContactOperation.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(logoutOperation.pending, state => {
        state.loading = true;
      })
      .addCase(logoutOperation.fulfilled, state => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutOperation.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
