import { useState, useRef, useCallback, useEffect } from 'react';
import { useFetchReceipts } from '@hooks/receiptHook';
import { useLongPress } from '@hooks/useLongPress';
import SingleItem from '../Components/SingleItem';
import './DisplayElements.css';
import { getProps } from './DisplayElementsHook';
import { useSelectionContext } from '../../../contexts/ManageItem/SelectionContext';
import { useUIContext } from '../../../contexts/ManageItem/UIContext';

function DisplayElements({ topic = 'manage' }) {
  const { clearSelection } = useSelectionContext();
  const { longPress, setActiveDeleteMode, activeDelMode } = useUIContext();

  const {
    labels,
    records,
    actionComponent,
    sideEffectsComponent,
    mode,
    bottomLoaderRef,
    hasMoreNext,
  } = getProps(topic, activeDelMode);
  console.log(records);
  useEffect(() => {
    if (!activeDelMode) clearSelection();
  }, [activeDelMode]);

  return (
    <div className="elements-container">
      <div
        {...(topic === 'manage' ? longPress : {})}
        className={activeDelMode ? 'label-DelMode' : 'label'}
      >
        <SingleItem PlaceHolders={labels} />
      </div>
      <div className={activeDelMode ? 'display-element-DelMode' : 'display-element'}>
        <ul>
          {records.map(record => {
            return (
              <SingleItem
                key={record.id}
                mode={mode}
                Record={record}
                ActionButtonsComponent={actionComponent}
                InfoComponent={sideEffectsComponent}
              />
            );
          })}
          {topic === 'receipt' && hasMoreNext && <div ref={bottomLoaderRef}></div>}
        </ul>
      </div>
    </div>
  );
}

export default DisplayElements;
