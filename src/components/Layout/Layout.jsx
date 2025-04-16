import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppBar from '../AppBar/AppBar';

const Layout = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Suspense fallback={null}>
        <AppBar />
        <Outlet />
      </Suspense>
    </>
  );
};

export default Layout;
