export async function fetchAllProducts() {
    try {
    const res = await fetch('http://localhost:4444/api/items');

    if (!res.ok) {
      throw new Error(`Errore nella fetch, status: ${res.status}`);
    }

    const data = await res.json();
    return data; 
  } catch (err) {
    throw new Error(`Errore nel recuperare i dati: ${err.message}`);
  }
}

export async function insertItem(event) {
  event.preventDefault();
  console.log(event);
  const formData = new FormData(event.target);
  const data = {};
 for (const key of formData.keys()) {
    const values = formData.getAll(key);
    data[key] = values.length > 1 ? values : values[0];
  }
  fetch('http://localhost:4444/api/insert_item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
    .then(data => {
      console.log('Success:', data);
  })
  .catch(err => {
    console.error('Error:', err);
  });
}

export async function deleteItem(id){

  fetch(`http://localhost:4444/api/delete_item/${id}`, {method:'DELETE'})
    .then(res => res.json())
      .then(data => {console.log("eliminato: "+data)})
  .catch (err => {
    console.error("Impossibile elimanare articolo: " + err);
  });
}

export async function modifyItem(){
  //TO DO
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
