import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import ContactFilters from '../../components/ContactFilters/ContactFilters';

import { fetchContacts } from '../../redux/contacts/operations';
import {
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectContactTypeFilter,
  selectIsFavouriteFilter,
  selectSearchQuery,
  selectSortBy,
  selectSortOrder,
} from '../../redux/contacts/selectors';

import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const currentPage = useSelector(selectPage);
  const currentPerPage = useSelector(selectPerPage);

  const currentSearchQuery = useSelector(selectSearchQuery);
  const currentContactTypeFilter = useSelector(selectContactTypeFilter);
  const currentIsFavouriteFilter = useSelector(selectIsFavouriteFilter);
  const currentSortBy = useSelector(selectSortBy);
  const currentSortOrder = useSelector(selectSortOrder);

  const previousFiltersRef = useRef({});

  const fetchContactsData = params => {
    dispatch(fetchContacts(params));
  };

  const debouncedSearchFetch = useMemo(
    () => debounce(fetchContactsData, 500),
    []
  );

  const debouncedFiltersFetch = useMemo(
    () => debounce(fetchContactsData, 200),
    []
  );

  useEffect(() => {
    const filterParams = {};
    if (currentContactTypeFilter) {
      filterParams.contactType = currentContactTypeFilter;
    }
    if (currentIsFavouriteFilter !== '') {
      filterParams.isFavourite = currentIsFavouriteFilter;
    }

    const requestParams = {
      page: currentPage,
      perPage: currentPerPage,
      query: currentSearchQuery,
      filter: filterParams,
      sortBy: currentSortBy,
      sortOrder: currentSortOrder,
    };

    const previousFilters = previousFiltersRef.current;

    const onlySearchChanged =
      previousFilters.contactType === currentContactTypeFilter &&
      previousFilters.isFavourite === currentIsFavouriteFilter &&
      previousFilters.sortBy === currentSortBy &&
      previousFilters.sortOrder === currentSortOrder &&
      previousFilters.page === currentPage &&
      previousFilters.perPage === currentPerPage &&
      previousFilters.searchQuery !== currentSearchQuery;

    previousFiltersRef.current = {
      contactType: currentContactTypeFilter,
      isFavourite: currentIsFavouriteFilter,
      sortBy: currentSortBy,
      sortOrder: currentSortOrder,
      page: currentPage,
      perPage: currentPerPage,
      searchQuery: currentSearchQuery,
    };

    if (onlySearchChanged) {
      debouncedFiltersFetch.cancel();
      debouncedSearchFetch(requestParams);
    } else {
      debouncedSearchFetch.cancel();
      debouncedFiltersFetch(requestParams);
    }

    return () => {
      debouncedSearchFetch.cancel();
      debouncedFiltersFetch.cancel();
    };
  }, [
    currentPage,
    currentPerPage,
    currentSearchQuery,
    currentContactTypeFilter,
    currentIsFavouriteFilter,
    currentSortBy,
    currentSortOrder,
    debouncedSearchFetch,
    debouncedFiltersFetch,
  ]);

  return (
    <>
      <h2 className={css.title}>Your contacts</h2>
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactForm />
      <ContactFilters />
      <ContactList />
    </>
  );
};

export default ContactsPage;
