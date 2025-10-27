import { apiFetch } from './fetchWrapper';

//privateHelper
async function productsConstructor(formData) {
  const receiptJSON = formData.get('receipt');
  // const now = now - 365 * 24 * 60 * 60 * 1000;
  const data = {
    id_party: formData.get('id_party'),
    tot_price: formData.get('tot_price'),
    receiptOBJ: receiptJSON ? JSON.parse(receiptJSON) : [],
    date: Date.now(),
  };
  return data;
}

export async function createReceipt(event) {
  const formData = new FormData(event.target);
  const data = await productsConstructor(formData);

  if (data.receiptOBJ.length === 0)
    throw new Error('Impossibile emettere scontrino, devi selezionare almeno un ogggetto.');

  return apiFetch('http://localhost:4444/api/create_receipt', {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then(data => {
      return 'Scontrino emesso correttamente';
    })
    .catch(err => {
      throw new Error('Errore nell`emissione dello scontrino');
    });
}

export async function queryReceipts({
  date = null,
  id_party = null,
  order = null,
  page = 1,
  column = null,
  limit = 10,
}) {
  const params = new URLSearchParams();
  params.append('page', page);
  params.append('limit', limit);

  if (date != null) params.append('date', date);
  if (id_party != null) params.append('id_party', id_party);
  if (order != null) params.append('order', order);
  if (column != null) params.append('column', column);

  try {
    const dataRes = await apiFetch(
      `http://localhost:4444/api/collection_fetch_receipts?${params.toString()}`
    );
    return dataRes;
  } catch (err) {
    throw new Error(`Errore nel recuperare i dati: ${err.message}`);
  }
}

export async function getYear() {
  try {
    const dataRes = await apiFetch('http://localhost:4444/api/getYears', { method: 'GET' });

    return dataRes.map(r => Number(r.year));
  } catch (err) {
    console.error(err);
    return [];
  }
}
