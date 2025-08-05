import React from "react";
import cat from '../assets/404_cat.png'

export default function NotFound() {
    return<>
        <div className="not-found">
            <img className="cat" src={cat} alt="cat" />
            <div className="not-found-text">
            <h1>Error 404</h1>
            <h3>Pagina non trovata!</h3>
            </div>
        </div>
    </>
}