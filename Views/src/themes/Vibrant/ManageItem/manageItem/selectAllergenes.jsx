export default function selectAllergenes(){
    return(
        <div className="sngl-label">
         <fieldset>
    <legend>Seleziona Allergeni</legend>
    
    <label>
        <input type="checkbox" name="allergens" value="glutine" />
        <span>Cereali contenenti glutine</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="crostacei" />
        <span>Crostacei</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="uova" />
        <span>Uova</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="pesce" />
        <span>Pesce</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="arachidi" />
        <span>Arachidi</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="soia" />
        <span>Soia</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="latte" />
        <span>Latte</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="frutta-a-guscio" />
        <span>Frutta a guscio</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="sedano" />
        <span>Sedano</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="senape" />
        <span>Senape</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="sesamo" />
        <span>Semi di sesamo</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="solfiti" />
        <span>Anidride solforosa e solfiti</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="lupini" />
        <span>Lupini</span>
    </label>
    
    <label>
        <input type="checkbox" name="allergens" value="molluschi" />
        <span>Molluschi</span>
    </label>
</fieldset>

     </div>
    )
}