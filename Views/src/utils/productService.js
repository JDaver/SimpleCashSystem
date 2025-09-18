async function productConstructor(formData) {
  const data = {}; 
   for (const key of formData.keys()) {
    const values = formData.getAll(key);
    data[key] = values.length > 1 ? values : values[0];
  }
  data.isbeverage = formData.get("isbeverage") === "on";
  data.isglobal = formData.get("isglobal") === "on";
 
  return data;
}


export async function fetchAllProducts(params=null,partyIDs = [] ) {
    try {
    const query = new URLSearchParams();
    if(params) query.append("params", params);
    if(partyIDs.length) query.append("partyIDs", partyIDs.join(","));  
    const res = await fetch(`http://localhost:4444/api/items?${query.toString()}`);

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
  const formData = new FormData(event.target);
  const valuesForCheck = Object.fromEntries(formData.entries());
  if(!valuesForCheck.product_name || !valuesForCheck.price){
    throw new Error("Impossibile inserire prodotti vuoti.");
  }
  
  const data = await productConstructor(formData);
  console.log(data);
  fetch('http://localhost:4444/api/insert_item', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: data})
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
      .then(data => {console.log("eliminato: " + data)})
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


export async function getPartys() {
  try{
    const res = await fetch('http://localhost:4444/api/getPartys');

    if(!res.ok) throw new Error(`Errore nella fetch, status: ${res.status}`);

    const data = await res.json();
    return data;
  }catch(err){
    throw new Error(`errore nel recuperare dati sulle feste: ${err.message}`)
  }
}
