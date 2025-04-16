import { NavLink } from 'react-router-dom';
import buildLinkClass from '../Navigation/buildLinkClass';

const AuthNav = () => {
  return (
    <>
      <NavLink to="/registration" className={buildLinkClass}>
        Registration
      </NavLink>
      <NavLink to="/login" className={buildLinkClass}>
        Login
      </NavLink>
    </>
  );
};

export default AuthNav;
