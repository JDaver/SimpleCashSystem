import React, { useEffect } from 'react';
import { useLongPress } from '@hooks/useLongPress';

import { useUIContext } from '../../../contexts/ManageItem/UIContext';
import SingleItem from '../SingleItem/SingleItem';
import { useProps } from './useDisplayElements';

export default function Label({ topic }) {
  const { labels, setActiveDeleteMode, activeDelMode, clearSelection } = useProps(topic);
  const longPress = useLongPress(() => setActiveDeleteMode(prev => !prev), 2000);
  const isInteractive = topic === 'manage' ? true : false;

  useEffect(() => {
    if (isInteractive && !activeDelMode) clearSelection();
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
