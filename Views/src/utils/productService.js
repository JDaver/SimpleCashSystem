import { apiFetch } from './fetchWrapper';
import { commaToDotNumberConverter } from '@utils/helpers';
//private helper
async function productConstructor(formData) {
  const data = {};
  for (const key of formData.keys()) {
    const values = formData.getAll(key);
    data[key] = values.length > 1 ? values : values[0];
  }
  data.isbeverage = formData.get('isbeverage') === 'on';
  data.isglobal = formData.get('isglobal') === 'on';
  data.price = data.price ? commaToDotNumberConverter(data.price) : null;

  return data;
}

export async function fetchAllProducts(orderValues = null, params = null, partyIDs = []) {
  try {
    const data = await apiFetch('http://localhost:4444/api/items', {
      method: 'POST',
      body: JSON.stringify({ orderValues, params, partyIDs }),
    });

    return data;
  } catch (err) {
    throw new Error(`Errore nel recuperare i dati: ${err.message}`);
  }
}

export async function insertItem(formData) {
  const valuesForCheck = Object.fromEntries(formData.entries());

  if (!valuesForCheck.product_name || !valuesForCheck.price) {
    throw new Error('Impossibile inserire prodotti vuoti.');
  }
  if (!valuesForCheck.isglobal && !valuesForCheck.partyIDs) {
    throw new Error('Un prodotto deve essere globale o appartenere ad una festa.');
  }
  const data = await productConstructor(formData);

  try {
    const dataRes = await apiFetch('http://localhost:4444/api/insert_item', {
      method: 'POST',
      body: JSON.stringify({ product: data }),
    });
    return dataRes;
  } catch (err) {
    console.error("Errore nell'insertItem:", err);
    throw new Error(`Errore della rete`);
  }
}

export async function modifyItem(formData) {
  const valuesForCheck = Object.fromEntries(formData.entries());
  if (!valuesForCheck.product_name || !valuesForCheck.price) {
    throw new Error('Impossibile inserire prodotti vuoti.');
  }
  if (!valuesForCheck.isglobal && !valuesForCheck.partyIDs) {
    throw new Error('Un prodotto deve essere globale o appartenere ad una festa.');
  }

  const data = await productConstructor(formData);
  try {
    const dataRes = await apiFetch('http://localhost:4444/api/update_item', {
      method: 'PUT',
      body: JSON.stringify({ product: data }),
    });

    return dataRes;
  } catch (err) {
    console.error('Errore in modifyItem:', err);
    throw new Error('Errore della rete: Impossibile modificare l`artiolo.');
  }
}

export async function deleteItem(id) {
  const ids = Array.isArray(id) ? id : [id];

  try {
    const dataRes = await apiFetch(
      `http://localhost:4444/api/delete_item?product_id=${ids.join(',')}`,
      {
        method: 'DELETE',
      }
    );
    return dataRes;
  } catch (err) {
    console.error('Impossibile eliminare articolo:', err);
    throw new Error('Impossibile eliminare articolo');
  }
}

export async function queryItems(name = null, price = null, date = null) {
  try {
    const data = await apiFetch('http://localhost:4444/api/collection_fetch_items');

    return data;
  } catch (err) {
    throw new Error(`Errore nel recuperare i dati: ${err.message}`);
  }
}

export async function getPartys() {
  try {
    const res = await apiFetch('http://localhost:4444/api/getPartys');
    return res;
  } catch (err) {
    throw new Error(`errore nel recuperare dati sulle feste: ${err.message}`);
  }
}
