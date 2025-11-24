import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useViewTransition } from '@hooks/useViewTransition';
import { useAuthContext } from '@contexts/Auth';
import { lazyWithLoadOptions } from '@utils/helpers';
import ProtectedRoute from '@components/ProtectedRoute';
import Layout from '@components/Layout';

export const Home = lazyWithLoadOptions(() => import('@pages/Home'), {
  preload: true,
  prefetch: false,
});

export const ManageItem = lazyWithLoadOptions(() => import('@components/ManageItemWrapper'), {
  preload: false,
  prefetch: true,
});

export const Collection = lazyWithLoadOptions(() => import('@components/CollectionWrapper'), {
  preload: false,
  prefetch: true,
});

const SettingsPage = React.lazy(() => import('@pages/SettingsPage'));
const NotFound = React.lazy(() => import('@pages/NotFound'));
const SessionExpiredModal = React.lazy(() => import('@components/SessionExpiredModal'));
const Login = React.lazy(() => import('@pages/Login'));

function AppWrapper() {
  const currentLocation = useViewTransition();
  const { isSessionExpired } = useAuthContext();

  return (
    <>
      {isSessionExpired && (
        <Suspense fallback={null}>
          <SessionExpiredModal />
        </Suspense>
      )}
      <Routes location={currentLocation}>
        <Route
          path="/login"
          element={
            <Suspense fallback={null}>
              <Login />
            </Suspense>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="manageitem" element={<ManageItem />} />
            <Route path="collection" element={<Collection />} />
            <Route path="settings/*" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppWrapper;
