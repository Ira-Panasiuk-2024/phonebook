import clsx from 'clsx';
import css from '../AuthNav/AuthNav.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

export default buildLinkClass;
