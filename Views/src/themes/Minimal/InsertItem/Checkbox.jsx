import { memo } from 'react';
import './InsertItem.css';

function Checkbox({ id, label, checked, onChange }) {
  return (
    <label className="checkbox__wrapper" htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkbox__custom" />
      <span>{label}</span>
    </label>
  );
}

export default memo(Checkbox);
