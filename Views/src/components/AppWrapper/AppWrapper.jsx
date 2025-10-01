import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageWrapper from '@components/PageWrapper';
import Header from '@components/Header';
import { useViewTransition } from '@hooks/useViewTransition';
import { ManageItemProvider } from '@contexts/ManageItem';
// import { GlobalProductsProvider } from '../../contexts/Global';

const Home = React.lazy(() => import('@pages/Home'));
const ManageItem = React.lazy(() => import('@pages/ManageItem'));
const Collection = React.lazy(() => import('@pages/Collection'));
const SettingsPage = React.lazy(() => import('@pages/SettingsPage'));
const NotFound = React.lazy(() => import('@pages/NotFound'));

function AppWrapper() {
  const currentLocation = useViewTransition();

  return (
    <div id="view-wrapper">
      <Header />
      <PageWrapper>
        <Suspense fallback={<div>Page Loader...</div>}>
          <Routes location={currentLocation}>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Navigate to="/" replace />} />
            <Route
              path="/ManageItem"
              element={
                <ManageItemProvider>
                  <ManageItem />
                </ManageItemProvider>
              }
            />
            <Route
              path="/Collection"
              element={
                <ManageItemProvider>
                  <Collection />
                </ManageItemProvider>
              }
            />
            <Route path="/SettingsPage" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageWrapper>
    </div>
  );
}

export default AppWrapper;
