import { useState } from 'react';
import './Settings.css';
import General from './Roots/General';
import Receipts from './Roots/Receipts';
import Users from './Roots/Users';
import Download from './Roots/Download';
import Delete from './Roots/Delete';


const SettingsDiv = [
        { id: "general", label: "Generali", component: <General /> },
        { id: "scontrini", label: "Scontrini", component: <Receipts /> },
        { id: "utenti", label: "Utenti", component: <Users /> },
        { id: "scarica", label: "Scarica", component: <Download /> },
        { id: "elimina", label: "Elimina", component: <Delete /> },
    ];

export default function Settings(){
    const [active, setActive] = useState("general");
    
    const current = SettingsDiv.find((location) => location.id === active);

    return(
    <div className="settings-wrapper">
      <div className="settings-container">
        {SettingsDiv.map((location) => (
            <button key={location.id} 
                className={location.id === active ? 'settings__link active' : 'settings__link'}
                onClick={() => setActive(location.id)}
            >
            {location.label}
            </button>
        ))}
      </div>
      {current.component}
    </div>
    )
}