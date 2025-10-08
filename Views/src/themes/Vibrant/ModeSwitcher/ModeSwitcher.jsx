function ModeSwitcher({ checked, action, label, name = null }) {
  return (
    <div className="mode-switcher">
      <label className="mode-switcher__content">
        <input type="checkBox" name={name} onChange={action} checked={checked} />
        <span className="mode-switcher__slider" />
      </label>
      <p className="mode-switcher__label">{label}</p>
    </div>
  );
}

export default ModeSwitcher;
