import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useViewTransition } from '@hooks/useViewTransition';
import { ManageItemProvider } from '@contexts/ManageItem';
import Login from '@pages/Login';
import ProtectedRoute from '@components/ProtectedRoute';
import Layout from '@components/Layout';
import SessionExpiredModal from '@components/SessionExpiredModal';

const Home = React.lazy(() => import('@pages/Home'));
const ManageItem = React.lazy(() => import('@pages/ManageItem'));
const Collection = React.lazy(() => import('@pages/Collection'));
const SettingsPage = React.lazy(() => import('@pages/SettingsPage'));
const NotFound = React.lazy(() => import('@pages/NotFound'));

function AppWrapper() {
  const currentLocation = useViewTransition();

  return (
    <>
      <SessionExpiredModal />
      <Routes location={currentLocation}>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="manageitem"
              element={
                <ManageItemProvider>
                  <ManageItem />
                </ManageItemProvider>
              }
            />
            <Route
              path="collection"
              element={
                <ManageItemProvider>
                  <Collection />
                </ManageItemProvider>
              }
            />
            <Route path="settings/*" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default AppWrapper;
