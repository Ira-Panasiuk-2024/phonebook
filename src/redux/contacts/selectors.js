export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectPage = state => state.contacts.page;
export const selectPerPage = state => state.contacts.perPage;
export const selectTotalPages = state => state.contacts.totalPages;
export const selectTotalItems = state => state.contacts.totalItems;

export const selectContactTypeFilter = state =>
  state.contacts.contactTypeFilter;
export const selectIsFavouriteFilter = state =>
  state.contacts.isFavouriteFilter;

export const selectSearchQuery = state => state.contacts.searchQuery;
export const selectSortBy = state => state.contacts.sortBy;
export const selectSortOrder = state => state.contacts.sortOrder;

export const selectContactById = (state, contactId) =>
  state.contacts.items.find(contact => contact._id === contactId);
