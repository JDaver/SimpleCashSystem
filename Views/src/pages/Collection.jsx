import { useState } from "react"
import '../style/manage.css'
import ManageTable from "../Components/ManageTable";


export default function CollectionItem() {
  const [selected, setSelected] = useState("manage-box1");

  return (
    <div className="manageItem-page">
      <ManageTable
        title="Elenco Scontrini"
        active={selected === "manage-box1"}
        onClick={() => setSelected("manage-box1")}
      />
      <ManageTable
        title="Storico dei venduti"
        active={selected === "manage-box2"}
        onClick={() => setSelected("manage-box2")}
      />
    </div>
  );
}
