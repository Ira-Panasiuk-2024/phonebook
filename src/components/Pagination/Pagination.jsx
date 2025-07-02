import { useDispatch, useSelector } from 'react-redux';
import {
  selectPage,
  selectTotalPages,
  selectHasNextPage,
  selectHasPreviousPage,
  selectPerPage,
  selectContactTypeFilter,
  selectIsFavouriteFilter,
  selectSearchQuery,
  selectSortBy,
  selectSortOrder,
} from '../../redux/contacts/selectors';
import { setPage } from '../../redux/contacts/slice';
import { fetchContacts } from '../../redux/contacts/operations';
import css from './Pagination.module.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const hasNextPage = useSelector(selectHasNextPage);
  const hasPreviousPage = useSelector(selectHasPreviousPage);
  const currentPerPage = useSelector(selectPerPage);

  const currentSearchQuery = useSelector(selectSearchQuery);
  const currentContactTypeFilter = useSelector(selectContactTypeFilter);
  const currentIsFavouriteFilter = useSelector(selectIsFavouriteFilter);
  const currentSortBy = useSelector(selectSortBy);
  const currentSortOrder = useSelector(selectSortOrder);

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    dispatch(setPage(newPage));

    const filterParams = {};
    if (currentContactTypeFilter) {
      filterParams.contactType = currentContactTypeFilter;
    }
    if (currentIsFavouriteFilter !== '') {
      filterParams.isFavourite = currentIsFavouriteFilter;
    }

    dispatch(
      fetchContacts({
        page: newPage,
        perPage: currentPerPage,
        query: currentSearchQuery,
        filter: filterParams,
        sortBy: currentSortBy,
        sortOrder: currentSortOrder,
      })
    );
  };

  const pageNumbers = [];

  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow && totalPages > maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={css.paginationContainer}>
      <button
        className={css.paginationButton}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            className={`${css.paginationButton} ${
              1 === currentPage ? css.active : ''
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {startPage > 2 && <span className={css.paginationEllipsis}>...</span>}
        </>
      )}

      {pageNumbers.map(number => (
        <button
          key={number}
          className={`${css.paginationButton} ${
            number === currentPage ? css.active : ''
          }`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className={css.paginationEllipsis}>...</span>
          )}
          <button
            className={`${css.paginationButton} ${
              totalPages === currentPage ? css.active : ''
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className={css.paginationButton}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
