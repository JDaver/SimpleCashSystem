import SingleItem from '../Components/SingleItem';
import { useUIContext } from '@contexts/ManageItem/UIContext';
import { useProps } from './useDisplayElements';
export default function ElementContainer({ currentValues, topic }) {
  const { records, hasMoreNext, bottomLoaderRef } = currentValues || {};
  const { activeDelMode } = useUIContext();
  const { actionComponent, sideEffectsComponent, mode } = useProps(topic, activeDelMode);
  return (
    <div className={activeDelMode ? 'display-element-DelMode' : 'display-element'}>
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
        {topic === 'receipt' && hasMoreNext && <div ref={bottomLoaderRef}></div>}
      </ul>
    </div>
  );
}
