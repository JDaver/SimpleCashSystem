import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import './Keypad.css';
import React, { useMemo } from 'react';

const PRESET_KEYS = {
  numeric: '123456789,0'.split(''),
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
};

const MemoArrowLeft = React.memo(ArrowLeftIcon);

function Keypad({ keys = [], preset = null, onInput, onDelete, showDelete = true }) {
  const finalKeys = useMemo(() => (preset ? PRESET_KEYS[preset] : keys), [preset, keys]);

  return (
    <div className={`keypad ${preset}`}>
      {finalKeys.map(key => (
        <button
          key={key}
          aria-label={`Key ${key}`}
          type="button"
          className={`keypad__key keypad__key-${preset}`}
          onClick={() => onInput?.(key)}
        >
          {key}
        </button>
      ))}
      {showDelete && (
        <button
          aria-label="Delete"
          type="button"
          className={`keypad__key keypad__key-${preset} keypad__key-delete`}
          onClick={onDelete}
        >
          <MemoArrowLeft width={30} height={30} />
        </button>
      )}
    </div>
  );
}

export default React.memo(Keypad);
