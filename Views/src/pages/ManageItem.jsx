import { useState } from "react"
import '../style/manage.css'

function ManageTable({onClick,active}){
    return(
        <>
            <div className={`manage-table ${active ? "active" : ""}`}>
                <div className="header-table" onClick={()=> onClick("table")}>
                    Modifica Articoli
                </div>
                <div className="body-table"> contenuto </div>
            </div>
        </>
    )
}

function InsertItem({onClick,active}){
    return(
        <>
            <div className={`insert-table ${active ? "active" : ""}`}>
                <div className="header-table" onClick={()=> onClick("insert")}>
                    Inserisci un nuovo articolo
                </div>
                <div className="body-table"> contenuto 2</div>
            </div>
        </>
    )
}

export default function ManageItem(){
    const [ selectedForm , setSelectedForm ] = useState("table");
    
    return  (
        <>
            <div className="manageItem-page">  
                <ManageTable 
                    onClick = {setSelectedForm}
                    active = {selectedForm === "table"}
                />
                <InsertItem
                    onClick = {setSelectedForm}
                    active = {selectedForm === "insert"}

                />
            </div>
        </>
    )
}