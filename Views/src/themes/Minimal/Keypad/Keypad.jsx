import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import './Keypad.css';

const PRESET_KEYS = {
  numeric: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'],
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
};

function Keypad({ keys = [], preset = null, onInput, onDelete, showDelete = true }) {
  const finalKeys = preset ? PRESET_KEYS[preset] : keys;

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
          <ArrowLeftIcon width={40} height={40} />
        </button>
      )}
    </div>
  );
}

export default Keypad;
