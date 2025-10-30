function Checkbox({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export default Checkbox;
