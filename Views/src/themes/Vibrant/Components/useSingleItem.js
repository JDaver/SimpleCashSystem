import { dotToCommaNumberConverter } from '@utils/helpers';
//PRIVATE HELPERS
function thereIsDataToShow(infoData) {
  const { allergens, items, inHowManyReceipts } = infoData || {};
  let dataToShow = [];

  if (allergens?.length > 0) {
    dataToShow = Array.isArray(allergens) ? allergens : [allergens];
    return dataToShow;
  } else if (items?.length > 0) {
    dataToShow = Array.isArray(items) ? items : [items];
    return dataToShow;
  } else if (inHowManyReceipts?.length > 0) {
    dataToShow = Array.isArray(inHowManyReceipts) ? inHowManyReceipts : [inHowManyReceipts];
    return dataToShow;
  }

  return [];
}

//PUBLIC HELPERS
export function getComponentProps(topic, record, infoData) {
  const dataToShow = thereIsDataToShow(infoData);
  switch (topic) {
    case 'cash':
      return {
        actionProps: { product: record },
        infoProps: {
          Data: dataToShow,
          active: dataToShow.length > 0 ? true : false,
          width: 50,
          height: 50,
        },
        firstValue: record.name,
        secondValue: dotToCommaNumberConverter(record.price) + ' €',
      };
    case 'manage':
      return {
        actionProps: { record },
        infoProps: {
          Data: dataToShow,
          active: dataToShow.length > 0 ? true : false,
          width: 50,
          height: 50,
        },
        firstValue: record.name,
        secondValue: dotToCommaNumberConverter(record.price) + ' €',
      };
    case 'item':
      return {
        actionProps: {},
        infoProps: {
          Data: dataToShow,
          active: dataToShow.length > 0 ? true : false,
          width: 40,
          height: 40,
        },
        firstValue: record.name,
        secondValue: record.quantity,
      };
    case 'receipt':
      return {
        actionProps: {},
        infoProps: {
          Data: dataToShow,
          title: record.id + ' ~ ' + record.date,
          active: dataToShow.length > 0 ? true : false,
          width: 40,
          height: 40,
        },
        firstValue: record.id + ' ~ ' + record.date,
        secondValue: dotToCommaNumberConverter(record.total) + ' €',
      };
    case 'delete':
      return {
        actionProps: { product: record },
        infoProps: { record },
        firstValue: record.name,
        secondValue: dotToCommaNumberConverter(record.price) + ' €',
      };
    default:
      return { actionProps: {}, infoProps: {}, firstValue, secondValue };
  }
}
