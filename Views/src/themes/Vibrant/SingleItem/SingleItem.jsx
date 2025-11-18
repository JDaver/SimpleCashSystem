import React from 'react';
import { getComponentProps } from './useSingleItem';
import './singleItem.css';

function SingleItem({
  mode = 'manage',
  Record = {},
  ActionButtonsComponent = null,
  InfoComponent = null,
  PlaceHolders = null,
}) {
  const { allergens, items, inHowManyReceipts, name, price, id, total, date, quantity } = Record;
  const infoData = { allergens, items, inHowManyReceipts };
  const { actionProps, infoProps, firstValue, secondValue } = getComponentProps(
    mode,
    Record,
    infoData
  );

  const showRecord = Record && Object.keys(Record).length > 0;

  return (
    <li className="sngl-item">
      {InfoComponent && infoProps.active && <InfoComponent {...infoProps} />}

      {showRecord && (
        <>
          <span className="first-record">{firstValue}</span>
          <span className="second-record">{secondValue}</span>
        </>
      )}

      {ActionButtonsComponent && (
        <span className="action-record">
          <ActionButtonsComponent {...actionProps} />
        </span>
      )}

      {PlaceHolders &&
        PlaceHolders.map((label, i) => {
          return (
            <span key={i} className={`label-${i + 1}`}>
              {label}
            </span>
          );
        })}
    </li>
  );
}

export default React.memo(SingleItem);
