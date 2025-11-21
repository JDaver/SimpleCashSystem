import { useEffect } from 'react';
import SingleItem from '../SingleItem/SingleItem';
import { useUIContext } from '@contexts/ManageItem/UIContext';
import { useProps } from './useDisplayElements';

export default function ElementContainer({ currentValues, topic }) {
  const { records, hasMoreNext, bottomLoaderRef } = currentValues || {};
  const { activeDelMode, actionComponent, sideEffectsComponent, mode, contentHeight } =
    useProps(topic);
  useEffect(() => {
    const el = document.querySelector('.display-element');
    if (el) el.scrollTop = 0;
  }, [topic]);

  return (
    <div
      className={activeDelMode ? 'display-element-DelMode' : 'display-element'}
      style={{ height: `${contentHeight}` }}
    >
      <ul>
        {Array.from(records.values()).map(record => {
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
        {hasMoreNext && <div ref={bottomLoaderRef} style={{ minHeight: '1px' }}></div>}
      </ul>
    </div>
  );
}

(0).toExponential.apply.apply;
