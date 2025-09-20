import { useState, useRef, useCallback } from "react";
import { useFetchReceipts } from "@hooks/receiptHook";
import { useLongPress } from "@hooks/useLongPress";
import SingleItem from "../Components/SingleItem";
import './DisplayElements.css';

import { getProps } from "./DisplayElementsHook";
import { useManageItemActions } from "../../../contexts/ManageItem/ManageItemActionsContext";



function DisplayElements({topic = "manage"}){
const {handleClear} = useManageItemActions();
const [activeDelMode,setActiveDeleteMode] = useState(false);
const longPress = useLongPress(() => setActiveDeleteMode(prev => !prev),2000);
const {labels, records, actionComponent, sideEffectsComponent, mode, bottomLoaderRef} = getProps(topic,activeDelMode);

if(!activeDelMode) handleClear();

return(
    
   <div className="elements-container">
    <div {...(topic === 'manage' ? longPress : {})} className={activeDelMode ? "label-DelMode" : "label"}>
        <SingleItem PlaceHolders={labels} />
    </div>
    <div className={activeDelMode ? "display-element-DelMode" : "display-element"}>
            <ul>
                {(records.map((record) => {
                    return(
                        <SingleItem key={record.id}
                        mode={mode}
                        Record={record} 
                        ActionButtonsComponent={actionComponent}
                        InfoComponent={sideEffectsComponent}
                        />
                    )}))}
              
                 {(topic === 'receipt' && hasMoreNext) && (
                    <div ref={bottomLoaderRef} /*to change style*/ style={{ height: 40, backgroundColor: 'grey' } } />
                 )}
            </ul>    
    </div>
   </div>
)}

export default DisplayElements;



