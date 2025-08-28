import { useState } from "react";
import NumericKeypad from "./numericKeypad";
import SelectAllergenes from "./selectAllergenes";

/*function handleSubmit(event) {
  event.preventDefault();
  console.log(event);
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

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
}*/

export default function InsertItemForm() {
    return <>
        <form className="insertForm" onSubmit={handleSubmit} method="POST">
            
        <div className="sngl-label">
            <label> Nome prodotto</label>
            <input type="text" name="product_name" defaultValue={null}/>
        </div>
            <SelectAllergenes/>
            <NumericKeypad/>
            <button type="submit">invia</button>
        </form>
    </>
}