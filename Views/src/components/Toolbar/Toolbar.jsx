import './Toolbar.css';

const Toolbar = ({ children, ...props }) => {
  return (
    <div className="toolbar" {...props}>
      {children}
    </div>
  );
};

Toolbar.displayName = 'Toolbar';

const ToolbarSection = ({ side, children, ...props }) => {
  return (
    <div side={side} className={`toolbar__section ${side}`} {...props}>
      {children}
    </div>
  );
};

Toolbar.Section = ToolbarSection;
ToolbarSection.displayName = 'ToolbarSection';

const ToolbarLabel = ({ className, children, ...props }) => {
  const combinedClassName = ['toolbar__label', className].filter(Boolean).join(' ');
  return (
    <span className={combinedClassName} {...props}>
      {children}
    </span>
  );
};

Toolbar.Label = ToolbarLabel;
ToolbarLabel.displayName = 'ToolbarLabel';

const ToolbarButton = ({ className, children, ...props }) => {
  const combinedClassName = ['toolbar__button', className].filter(Boolean).join(' ');
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

Toolbar.Button = ToolbarButton;
ToolbarButton.displayName = 'ToolbarButton';

export default Toolbar;
