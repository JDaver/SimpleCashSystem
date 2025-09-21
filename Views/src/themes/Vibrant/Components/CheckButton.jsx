import redCross from '@assets/redCross.png';
import { useManageItemState } from '../../../contexts/ManageItem/ManageItemStateContext';
import { useManageItemActions } from '../../../contexts/ManageItem/ManageItemActionsContext';
import { useCallback } from 'react';

export default function CheckButton({record}){
const {selectedItems} = useManageItemState();
const {toggleItem} = useManageItemActions();

const isSelected = (selectedItems.includes(record));

const selectItem = useCallback ( product => {
    toggleItem(product);
},[toggleItem]);

    return(
        <button onClick={() => selectItem(record)}>
            <img src={redCross} 
            className='red-cross'
            style={!isSelected ? {filter:"grayscale(100%)" }:{}} />
        </button>
    )
}