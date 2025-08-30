import React from 'react';

const componentMap = {
  minimal: {
    CashierScreen: () => import('@themes/Minimal/CashierScreen'),
    Receipt: () => import('@themes/Minimal/Receipt'),
    TableGroup: () => import('@themes/Minimal/TableGroup'),
    Table: () => import('@themes/Minimal/Table'),
    TableSection: () => import('@themes/Minimal/TableSection'),
    TableControls: () => import('@themes/Minimal/TableControls'),
    InsertItem: () => import('@themes/Minimal/InsertItem')
  },
  vibrant: {
    CashierScreen: () => import('@themes/Vibrant/CashierScreen'),
    Receipt: () => import('@themes/Vibrant/Receipt'),
    TableGroup: () => import('@themes/Vibrant/tableComponents/TableGroup'),
    Table: () => import('@themes/Vibrant/tableComponents/Table'),
    TableSection: () => import('@themes/Vibrant/tableComponents/TableSection'),
    TableControls: () => import('@themes/Vibrant/tableComponents/TableControls'),
    InsertItem: () => import('@themes/Vibrant/InsertItem')
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
