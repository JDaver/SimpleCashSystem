import React from 'react';
import Label from './Label';
import ElementContainer from './ElementsContainer';
import './DisplayElements.css';
import { useRecords } from './useDisplayElements';
function DisplayElements({ topic = 'manage' }) {
  const { records, bottomLoaderRef, hasMoreNext } = useRecords(topic);

  return (
    <div className="elements-container">
      <Label topic={topic} />
      <ElementContainer currentValues={{ records, bottomLoaderRef, hasMoreNext }} topic={topic} />
    </div>
  );
}

export default React.memo(DisplayElements);
