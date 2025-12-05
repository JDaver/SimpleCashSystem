import { apiFetch } from './fetchWrapper';
export async function getParties() {
  try {
    const res = await apiFetch('http://localhost:4444/api/getParties');
    console.log('RISPOSTA CRUD:', res);
    return res;
  } catch (err) {
    throw new Error(`errore nel recuperare dati sulle feste: ${err.message}`);
  }
}
export async function createParty(nameParty) {
  try {
    const dataRes = await apiFetch('http://localhost:4444/api/create_party', {
      method: 'PUT',
      body: JSON.stringify({ nameParty: nameParty }),
    });
    return dataRes;
  } catch (err) {
    throw new Error(`errore nella creazione della festa: ${err.message}`);
  }
}

export async function deleteParty(idParty) {
  try {
    const dataRes = await apiFetch('http://localhost:4444/api/delete_party', {
      method: 'DELETE',
      body: JSON.stringify({ idParty: idParty }),
    });
    return dataRes;
  } catch (err) {
    throw new Error(`errore nell'eliminazione della festa: ${err.message}`);
  }
}

export async function updateParty(idParty, newNameParty) {
  try {
    const dataRes = await apiFetch('http://localhost:4444/api/update_party', {
      method: 'PUT',
      body: JSON.stringify({ idParty: idParty, newNameParty: newNameParty }),
    });
    return dataRes;
  } catch (err) {
    throw new Error(`errore nella modifica della festa: ${err.message}`);
  }
}
