import { memo } from 'react';
import Keypad from '@themes/Minimal/Keypad';
import './InsertItem.css';

function InputWithKeypad({ id, name, label, value, onInput, onDelete, preset, ...inputProps }) {
  return (
    <div className="form__column">
      <label htmlFor={id} className="form__label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="form__input"
        type="text"
        value={value}
        readOnly
        autoComplete="off"
        {...inputProps}
      />
      <Keypad preset={preset} onInput={onInput} onDelete={onDelete} />
    </div>
  );
}

export default memo(InputWithKeypad);
