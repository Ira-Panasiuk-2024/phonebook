import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';

import {
  fetchContacts,
  addContactOperation,
  deleteContactOperation,
  editContactOperation,
  logoutOperation,
} from './operations';

import {
  handlePending,
  handleFulfilled,
  handleRejected,
} from '../../service/axios';

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder // ВАЖЛИВО: Спочатку додаємо всі обробники `addCase` зі специфічною логікою // Потім додаємо загальні обробники `addMatcher` // Обробка успішного отримання контактів (fulfilled)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload.data)) {
          state.items = action.payload.data;
          state.page = action.payload.page || 1;
          state.totalPages = action.payload.totalPages || 1;
        } else {
          state.items = [];
          state.page = 1;
          state.totalPages = 1;
          console.error(
            'Fetch contacts returned unexpected data structure:',
            action.payload
          );
        }
      })

      .addCase(addContactOperation.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      .addCase(deleteContactOperation.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })

      .addCase(editContactOperation.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(logoutOperation.fulfilled, state => {
        state.items = [];
        state.page = 1;
        state.totalPages = 1;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutOperation.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      .addMatcher(isPending, handlePending)
      .addMatcher(isFulfilled, handleFulfilled)
      .addMatcher(isRejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
