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
  perPage: 10,
  totalPages: 1,
  totalItems: 0,
  hasNextPage: false,
  hasPreviousPage: false,
  loading: false,
  error: null,
  contactTypeFilter: '',
  isFavouriteFilter: '',
  sortBy: 'phoneNumber',
  sortOrder: 'asc',
  searchQuery: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setContactTypeFilter: (state, action) => {
      state.contactTypeFilter = action.payload;
    },
    setIsFavouriteFilter: (state, action) => {
      state.isFavouriteFilter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.items = action.payload.data.data || [];
          state.page = action.payload.data.page || 1;
          state.perPage = action.payload.data.perPage || 10;
          state.totalPages = action.payload.data.totalPages || 1;
          state.totalItems = action.payload.data.totalItems || 0;
          state.hasNextPage = action.payload.data.hasNextPage;
          state.hasPreviousPage = action.payload.data.hasPreviousPage;
        } else {
          state.items = [];
          console.error(
            'Fetch contacts returned unexpected data structure:',
            action.payload
          );
        }
      })
      .addCase(addContactOperation.fulfilled, (_state, _action) => {
        void _state;
        void _action;
      })
      .addCase(deleteContactOperation.fulfilled, (_state, _action) => {
        void _state;
        void _action;
      })
      .addCase(editContactOperation.fulfilled, (_state, _action) => {
        void _state;
        void _action;
      })
      .addCase(logoutOperation.fulfilled, state => {
        Object.assign(state, initialState);
      })
      .addMatcher(isPending, handlePending)
      .addMatcher(isFulfilled, handleFulfilled)
      .addMatcher(isRejected, handleRejected);
  },
});

export const {
  setPage,
  setPerPage,
  setContactTypeFilter,
  setIsFavouriteFilter,
  setSortBy,
  setSortOrder,
  setSearchQuery,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
