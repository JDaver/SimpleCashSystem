import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import PageWrapper from '../PageWrapper/PageWrapper';
import ManageItem from '../../pages/ManageItem';
import Collection from '../../pages/Collection';
import Terminate from '../../pages/TerminateSession';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';

function AppWrapper() {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location);

  useEffect(() => {
    if (!document.startViewTransition || currentLocation.key === location.key) {
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
      <Navbar />
      <PageWrapper>
        <Routes location={currentLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route path="/ManageItem" element={<ManageItem />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/TerminateSession" element={<Terminate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageWrapper>
    </div>
  );
}

export default AppWrapper;
