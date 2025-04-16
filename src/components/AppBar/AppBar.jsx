import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import Navigation from '../Navigation/Navigation';
import UserMenu from '../UserMenu//UserMenu';
import AuthNav from '../AuthNav/AuthNav';
import css from './AppBar.module.css';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      
      <nav className={css.navList}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </nav>
        
    </header>
  );
};

export default AppBar;
