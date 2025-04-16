import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/filters/slice';

import css from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filters.filter);

  const onSearch = value => {
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.find}>
      <p className={css.text}>Find contacts by name or number</p>

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
