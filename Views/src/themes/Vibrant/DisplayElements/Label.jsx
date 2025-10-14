import React, { useEffect } from 'react';
import { useLongPress } from '@hooks/useLongPress';
import { useSelectionContext } from '../../../contexts/ManageItem/SelectionContext';
import { useUIContext } from '../../../contexts/ManageItem/UIContext';
import SingleItem from '../Components/SingleItem';
import { useProps } from './useDisplayElements';

export default function Label({ topic }) {
  const { setActiveDeleteMode, activeDelMode } = useUIContext();
  const longPress = useLongPress(() => setActiveDeleteMode(prev => !prev), 2000);
  const { clearSelection } = useSelectionContext();
  const isInteractive = topic === 'manage' ? true : false;
  const { labels } = useProps(topic, activeDelMode);

  useEffect(() => {
    if (!activeDelMode) clearSelection();
  }, [activeDelMode]);

  return (
    <div
      {...(isInteractive ? longPress : {})}
      className={activeDelMode ? 'label-DelMode' : 'label'}
    >
      <SingleItem PlaceHolders={labels} />
    </div>
  );
}
