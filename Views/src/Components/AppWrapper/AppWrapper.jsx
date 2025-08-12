import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function AppWrapper() {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location);

  useEffect(() => {
    if (!document.startViewTransition || currentLocation === location) {
      setCurrentLocation(location);
      return;
    }

    const transition = document.startViewTransition(() => {
      setCurrentLocation(location);
    });

    return () => {
      transition?.finished?.catch(() => {});
    };
  }, [location, currentLocation]);

  return (
    <div id="view-wrapper">
      <Outlet />
    </div>
  );
}

export default AppWrapper;
