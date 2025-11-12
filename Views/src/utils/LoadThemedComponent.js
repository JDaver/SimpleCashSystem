import React from 'react';

const componentMap = {
  minimal: {
    CashierScreen: () => import('@themes/Minimal/CashierScreen'),
    Receipt: () => import('@themes/Minimal/Receipt'),
    EditItem: () => import('@themes/Minimal/EditItem'),
    InsertItem: () => import('@themes/Minimal/InsertItem'),
    SalesHistory: () => import('@themes/Minimal/SalesHistory'),
    ReceiptsHistory: () => import('@themes/Minimal/ReceiptsHistory'),
    Settings: () => import('@themes/Minimal/Settings'),
  },
  vibrant: {
    CashierScreen: () => import('@themes/Vibrant/CashierScreen'),
    Receipt: () => import('@themes/Vibrant/Receipt'),
    InsertItem: () => import('@themes/Vibrant/InsertItem'),
    DisplayElements: () => import('@themes/Vibrant/DisplayElements'),
    Settings: () => import('@themes/Vibrant/Settings'),
  },
};

const lazyComponentCache = {};
// let currentCachedTheme = null;

export function loadThemedComponent(theme, componentName) {
  // if (currentCachedTheme !== theme) {
  //   Object.keys(lazyComponentCache).forEach(key => delete lazyComponentCache[key]);
  //   currentCachedTheme = theme;
  // }
  const cacheKey = `${theme}_${componentName}`;

  if (lazyComponentCache[cacheKey]) {
    return lazyComponentCache[cacheKey];
  }

  const loader = componentMap?.[theme]?.[componentName];

  if (!loader) {
    throw new Error(`No component found for theme "${theme}" and component "${componentName}"`);
  }

  const LazyComponent = React.lazy(loader);
  lazyComponentCache[cacheKey] = LazyComponent;
  return LazyComponent;
}
