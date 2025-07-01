import { useDispatch, useSelector } from 'react-redux';

import { fetchContacts } from '../../redux/contacts/operations';
import {
  selectPage,
  selectPerPage,
  selectContactTypeFilter,
  selectIsFavouriteFilter,
} from '../../redux/contacts/selectors';
import { changeFilter } from '../../redux/filters/slice';
import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const currentPerPage = useSelector(selectPerPage);
  const currentContactTypeFilter = useSelector(selectContactTypeFilter);
  const currentIsFavouriteFilter = useSelector(selectIsFavouriteFilter);
  const filter = useSelector(state => state.filters.filter);

  const onSearch = value => {
    dispatch(changeFilter(value));

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
        query: value,
        filter: filterParams,
      })
    );
  };

  return (
    <div className={css.find}>
      <p className={css.text}>Find contacts by contactType or isFavourite</p>

      <input
        type="text"
        className={css.input}
        value={filter || ''}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search contacts..."
      />
    </div>
  );
};

export default SearchBox;
