import { useDispatch, useSelector } from 'react-redux';

import {
  setContactTypeFilter,
  setIsFavouriteFilter,
  setSearchQuery,
  setSortBy,
  setSortOrder,
} from '../../redux/contacts/slice';
import {
  selectContactTypeFilter,
  selectIsFavouriteFilter,
  selectSearchQuery,
  selectSortBy,
  selectSortOrder,
} from '../../redux/contacts/selectors';

import css from './ContactFilters.module.css';

const ContactFilters = () => {
  const dispatch = useDispatch();
  const contactType = useSelector(selectContactTypeFilter);
  const isFavourite = useSelector(selectIsFavouriteFilter);
  const searchQuery = useSelector(selectSearchQuery);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

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

  const handleSearchQueryChange = e => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSortByChange = e => {
    dispatch(setSortBy(e.target.value));
  };

  const handleSortOrderChange = e => {
    dispatch(setSortOrder(e.target.value));
  };

  return (
    <div className={css.filtersContainer}>
      <div className={css.filterGroup}>
        <label htmlFor="searchQuery" className={css.label}>
          Search contacts:
        </label>
        <input
          id="searchQuery"
          className={css.input}
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search by name, number, email..."
        />
      </div>

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

      <div className={css.filterGroup}>
        <label htmlFor="sortBy" className={css.label}>
          Sort by:
        </label>
        <select
          id="sortBy"
          className={css.select}
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value="name">Name</option>
          <option value="phoneNumber">Phone Number</option>
          <option value="email">Email</option>
          <option value="contactType">Contact Type</option>
          <option value="isFavourite">Favourite</option>
          <option value="createdAt">Creation Date</option>
        </select>
      </div>

      <div className={css.filterGroup}>
        <label htmlFor="sortOrder" className={css.label}>
          Sort Order:
        </label>
        <select
          id="sortOrder"
          className={css.select}
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default ContactFilters;
