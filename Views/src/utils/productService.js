//private helper
async function productConstructor(formData) {
  const data = {};
  for (const key of formData.keys()) {
    const values = formData.getAll(key);
    data[key] = values.length > 1 ? values : values[0];
  }
  data.isbeverage = formData.get('isbeverage') === 'on';
  data.isglobal = formData.get('isglobal') === 'on';

  return data;
}

export async function fetchAllProducts(orderValues = null, params = null, partyIDs = []) {
  console.log(params);
  try {
    const res = await fetch('http://localhost:4444/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderValues, params, partyIDs }),
    });

    if (!res.ok) {
      throw new Error(`Errore nella fetch, status: ${res.status}`);
    }

    const data = await res.json();
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
  console.log(data);
  try {
    const res = await fetch('http://localhost:4444/api/insert_item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: data }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Errore API: ${text}`);
    }

    const result = await res.json();
    console.log('Success:', result);
    return result;
  } catch (err) {
    console.error("Errore nell'insertItem:", err);
    throw err;
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
  console.log(data);
  try {
    const res = await fetch('http://localhost:4444/api/update_item', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: data }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Errore API: ${text}`);
    }

    const result = await res.json();
    console.log('Success:', result);
    return result;
  } catch (err) {
    console.error('Errore in modifyItem:', err);
    throw err;
  }
}

export async function deleteItem(id) {
  const ids = Array.isArray(id) ? id : [id];
  console.log('Elimino:', ids);

  try {
    const res = await fetch(`http://localhost:4444/api/delete_item?product_id=${ids.join(',')}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Errore HTTP ${res.status}: ${errText}`);
    }
    let data;
    try {
      data = await res.json();
    } catch {
      data = { success: true };
    }

    console.log('Eliminato:', data);
    return data;
  } catch (err) {
    console.error('Impossibile eliminare articolo:', err);
    throw err;
  }
}

export async function queryItems(name = null, price = null, date = null) {
  try {
    const res = await fetch('http://localhost:4444/api/collection_fetch_items');

    if (!res.ok) {
      throw new Error(`Errore nella fetch, status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`Errore nel recuperare i dati: ${err.message}`);
  }
}

export async function getPartys() {
  try {
    const res = await fetch('http://localhost:4444/api/getPartys');

    if (!res.ok) throw new Error(`Errore nella fetch, status: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`errore nel recuperare dati sulle feste: ${err.message}`);
  }
}
