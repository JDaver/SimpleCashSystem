import React from 'react';

export function lazyWithLoadOptions(factory, options = { preload: true, prefetch: true }) {
  const Component = React.lazy(factory);

  if (options.preload) {
    Component.preload = factory;
  }

  if (options.prefetch) {
    Component.prefetch = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => factory());
      } else {
        setTimeout(() => factory(), 200);
      }
    };
  }

  return Component;
}

export function formatPrice(price, currency = '€') {
  if (price == null || price === '') return '';

  const str = String(price).replace(/\./g, ',');
  const [intPart, decPart = ''] = str.split(',');

  const integer = intPart.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const decimal = decPart.replace(/\D/g, '').padEnd(2, '0').slice(0, 2);

  return `${integer},${decimal} ${currency}`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function commaToDotNumberConverter(price) {
  if (!/[0-9,]+$/.test(price)) return;
  if (!price || price.length < 3) return price;

  const dottedValue = price.replace(',', '.');
  return dottedValue;
}

export function dotToCommaNumberConverter(price) {
  if (typeof price != String) String(price);
  if (!/[0-9.]+$/.test(price)) return undefined;

  const commaValue = price.replace('.', ',');
  return commaValue;
}
