import { useState } from "react"
import '../style/manage.css'
import ManageTable from "../Components/ManageTable";


export default function ManageItem() {
  const [selected, setSelected] = useState("manage-box1");

  return (
    <div className="manageItem-page">
      <ManageTable
        title="Modifica Articoli"
        active={selected === "manage-box1"}
        onClick={() => setSelected("manage-box1")}
      />
      <ManageTable
        title="Inserisci un nuovo articolo"
        active={selected === "manage-box2"}
        onClick={() => setSelected("manage-box2")}
      />
    </div>
  );
}
