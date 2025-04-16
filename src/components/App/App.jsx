import { useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Layout from '../Layout/Layout';
import PrivateRoute from '../PrivateRoute';
import RestrictedRoute from '../RestrictedRoute';

import { refreshUserThunk } from '../../redux/auth/operations';
import { selectIsRefreshing } from '../../redux/auth/selectors';

import css from './App.module.css';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('../../pages/RegistrationPage/RegistrationPage')
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() =>
  import('../../pages/ContactsPage/ContactsPage')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? null : (
    <div className={css.container}>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route index element={
            <RestrictedRoute>
              <HomePage />
            </RestrictedRoute>
            }
          />

          <Route
            path="/registration"
            element={
              <RestrictedRoute>
                <RegistrationPage />
              </RestrictedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <RestrictedRoute>
                <LoginPage />
              </RestrictedRoute>
            }
          />
          
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />

        </Route>
      </Routes>
    </div>
  );
};

export default App;
