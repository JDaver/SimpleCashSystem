/** Custom hook to handle view transitions and prevent UI flickers and layout shifts during route changes.
 *
 * - Returns `currentLocation` which represents the current route location to render.
 * - Provides the user an optional `shouldTransition` function which allows you to control when to trigger a transition.
 *
 **/

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useViewTransition(shouldTransition = (from, to) => from.pathname !== to.pathname) {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location);

  useEffect(() => {
    if (!document.startViewTransition || !shouldTransition(currentLocation, location)) {
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

  return currentLocation;
}
