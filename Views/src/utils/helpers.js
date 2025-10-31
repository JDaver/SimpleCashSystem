export function formatPrice(price) {
  if (price == null || price === '') return '';

  const str = String(price).replace(/\./g, ',');
  const [intPart, decPart = ''] = str.split(',');

  const integer = intPart.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  const decimal = decPart.replace(/\D/g, '').padEnd(2, '0').slice(0, 2);

  return `${integer},${decimal}`;
}
