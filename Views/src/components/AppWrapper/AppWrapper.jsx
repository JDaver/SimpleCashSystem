import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import PageWrapper from '@components/PageWrapper';
import Header from '@components/Header';

const Home = React.lazy(() => import('@pages/Home'));
const ManageItem = React.lazy(() => import('@pages/ManageItem'));
const Collection = React.lazy(() => import('@pages/Collection'));
const SettingsPage = React.lazy(() => import('@pages/SettingsPage'));
const NotFound = React.lazy(() => import('@pages/NotFound'));

function AppWrapper() {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location);

  useEffect(() => {
    if (!document.startViewTransition || currentLocation.pathname === location.pathname) {
      setCurrentLocation(location);
      return;
    }

    const transition = document.startViewTransition(() => {
      setCurrentLocation(location);
    });

    return () => {
      transition?.finished?.catch(() => {});
    };
  }, [location]);

  return (
    <div id="view-wrapper">
      <Header />
      <PageWrapper>
        <Suspense fallback={<div>Page Loader...</div>}>
          <Routes location={currentLocation}>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Navigate to="/" replace />} />
            <Route path="/ManageItem" element={<ManageItem />} />
            <Route path="/Collection" element={<Collection />} />
            <Route path="/SettingsPage" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageWrapper>
    </div>
  );
}

export default AppWrapper;
