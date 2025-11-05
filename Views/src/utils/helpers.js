export function formatPrice(price) {
  if (price == null || price === '') return '';

  const str = String(price).replace(/\./g, ',');
  const [intPart, decPart = ''] = str.split(',');

  const integer = intPart.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const decimal = decPart.replace(/\D/g, '').padEnd(2, '0').slice(0, 2);

  return `${integer},${decimal}`;
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
