import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import ContactFilters from '../../components/ContactFilters/ContactFilters';
import Pagination from '../../components/Pagination/Pagination';
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

  const debouncedSearchQuery = useDebounce(currentSearchQuery, 1000);

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

    const shouldFetch =
      debouncedSearchQuery.length === 0 ||
      debouncedSearchQuery.length >= 2 ||
      currentContactTypeFilter ||
      currentIsFavouriteFilter !== '' ||
      currentPage !== 1 ||
      currentPerPage !== 10 ||
      currentSortBy !== 'phoneNumber' ||
      currentSortOrder !== 'asc';

    if (shouldFetch) {
      dispatch(fetchContacts(requestParams));
    }
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
      <Pagination />
    </>
  );
};

export default ContactsPage;
