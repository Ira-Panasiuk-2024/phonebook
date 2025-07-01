import { useDispatch, useSelector } from 'react-redux';

import {
  setContactTypeFilter,
  setIsFavouriteFilter,
} from '../../redux/contacts/slice';
import {
  selectContactTypeFilter,
  selectIsFavouriteFilter,
} from '../../redux/contacts/selectors';
import css from './ContactFilters.module.css';

const ContactFilters = () => {
  const dispatch = useDispatch();
  const contactType = useSelector(selectContactTypeFilter);
  const isFavourite = useSelector(selectIsFavouriteFilter);

  const handleContactTypeChange = e => {
    dispatch(setContactTypeFilter(e.target.value));
  };

  const handleIsFavouriteChange = e => {
    let value = e.target.value;
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else {
      value = '';
    }
    dispatch(setIsFavouriteFilter(value));
  };

  return (
    <div className={css.filtersContainer}>
      <div className={css.filterGroup}>
        <label htmlFor="contactType" className={css.label}>
          Filter by Type:
        </label>
        <select
          id="contactType"
          className={css.select}
          value={contactType}
          onChange={handleContactTypeChange}
        >
          <option value="">All</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
        </select>
      </div>

      <div className={css.filterGroup}>
        <label htmlFor="isFavourite" className={css.label}>
          Filter by Favorite:
        </label>
        <select
          id="isFavourite"
          className={css.select}
          value={
            isFavourite === true ? 'true' : isFavourite === false ? 'false' : ''
          }
          onChange={handleIsFavouriteChange}
        >
          <option value="">All</option>
          <option value="true">Favorites</option>
          <option value="false">Non-Favorites</option>
        </select>
      </div>
    </div>
  );
};

export default ContactFilters;
