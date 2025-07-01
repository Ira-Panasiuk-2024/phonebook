import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import ContactFilters from '../../components/ContactFilters/ContactFilters';

import { fetchContacts } from '../../redux/contacts/operations';

import {
  selectIsLoading,
  selectPage,
  selectPerPage,
  selectContactTypeFilter,
  selectIsFavouriteFilter,
} from '../../redux/contacts/selectors';

import { selectFilter } from '../../redux/filters/selectors';

import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const currentPage = useSelector(selectPage);
  const currentPerPage = useSelector(selectPerPage);
  const currentSearchQuery = useSelector(selectFilter);
  const currentContactTypeFilter = useSelector(selectContactTypeFilter);
  const currentIsFavouriteFilter = useSelector(selectIsFavouriteFilter);

  useEffect(() => {
    const filterParams = {};
    if (currentContactTypeFilter) {
      filterParams.contactType = currentContactTypeFilter;
    }
    if (currentIsFavouriteFilter !== '') {
      filterParams.isFavourite = currentIsFavouriteFilter;
    }

    dispatch(
      fetchContacts({
        page: currentPage,
        perPage: currentPerPage,
        query: currentSearchQuery,
        filter: filterParams,
      })
    );
  }, [
    dispatch,
    currentPage,
    currentPerPage,
    currentSearchQuery,
    currentContactTypeFilter,
    currentIsFavouriteFilter,
  ]);

  return (
    <>
      <h2 className={css.title}>Your contacts</h2>
      <div>{isLoading && 'Request in progress...'}</div>
      <ContactForm />
      <SearchBox />
      <ContactFilters />
      <ContactList />
    </>
  );
};

export default ContactsPage;
