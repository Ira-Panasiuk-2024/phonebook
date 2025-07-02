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

  // Отримуємо поточні значення фільтрів/пошуку/сортування
  // Це потрібно, щоб при зміні сторінки, ці параметри не скидалися
  const currentSearchQuery = useSelector(selectSearchQuery);
  const currentContactTypeFilter = useSelector(selectContactTypeFilter);
  const currentIsFavouriteFilter = useSelector(selectIsFavouriteFilter);
  const currentSortBy = useSelector(selectSortBy);
  const currentSortOrder = useSelector(selectSortOrder);

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) {
      return; // Запобігаємо виходу за межі сторінок
    }

    dispatch(setPage(newPage)); // Оновлюємо поточну сторінку в Redux

    // Формуємо об'єкт фільтрів для передачі на бекенд
    const filterParams = {};
    if (currentContactTypeFilter) {
      filterParams.contactType = currentContactTypeFilter;
    }
    if (currentIsFavouriteFilter !== '') {
      filterParams.isFavourite = currentIsFavouriteFilter;
    }

    // Відправляємо запит на бекенд з новими параметрами пагінації
    // та збереженими параметрами пошуку, фільтрації та сортування
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

  // Генеруємо масив номерів сторінок для відображення
  const pageNumbers = [];
  // Логіка для відображення обмеженої кількості номерів сторінок навколо поточної
  const maxPagesToShow = 5; // Наприклад, показуємо 5 сторінок
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Коригуємо startPage, якщо endPage досяг totalPages, але не maxPagesToShow
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

      {/* Відображення першої сторінки, якщо вона не в діапазоні */}
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

      {/* Номери сторінок */}
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

      {/* Відображення останньої сторінки, якщо вона не в діапазоні */}
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
