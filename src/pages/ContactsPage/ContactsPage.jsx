import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState(currentSearchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(currentSearchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [currentSearchQuery]);

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
      query: debouncedSearchQuery,
      filter: filterParams,
      sortBy: currentSortBy,
      sortOrder: currentSortOrder,
    };

    dispatch(fetchContacts(requestParams));
  }, [
    dispatch,
    currentPage,
    currentPerPage,
    debouncedSearchQuery,
    currentContactTypeFilter,
    currentIsFavouriteFilter,
    currentSortBy,
    currentSortOrder,
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
