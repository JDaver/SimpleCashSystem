import React from 'react';
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/24/outline';

const MemoTrashIcon = React.memo(TrashIcon);
const MemoChevronLeftIcon = React.memo(ChevronLeftIcon);

function ActionButtons({ onDelete }) {
  return (
    <>
      <span className="item__swipe-hint">
        <MemoChevronLeftIcon width={30} height={20} />
        Scorri per modificare
      </span>
      <button data-ignore-gesture type="button" onClick={onDelete}>
        <MemoTrashIcon width={30} height={30} />
      </button>
    </>
  );
}

export default React.memo(ActionButtons);
