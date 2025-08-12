import { useState } from "react"
import '../style/manage.css'
import '../style/form.css'
import ManageTable from "../Components/manageTable";
import InsertItemForm from "../Components/manageItem/insertItemForm";
import UpdateItem from "../Components/manageItem/updateItem";


export default function ManageItem() {
  const [selected, setSelected] = useState("manage-box1");

  return (
    <div className="manageItem-page">
      <ManageTable
        title="Modifica Articoli"
        active={selected === "manage-box1"}
        onClick={() => setSelected("manage-box1")}
        children={<UpdateItem/>}
      />
      <ManageTable
        title="Inserisci un nuovo articolo"
        active={selected === "manage-box2"}
        onClick={() => setSelected("manage-box2")}
        children = {<InsertItemForm/>}
      />
    </div>
  );
}
