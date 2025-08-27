export async function fetchAllProducts() {
    const result = await fetch('http://localhost:4444/api/items');
    if(!result.ok) throw new Error (`errore, stato: ${result.status}`);
    return await result.json();
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
  console.log("data",data);
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