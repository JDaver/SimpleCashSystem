import './Toolbar.css';

const Toolbar = ({ children, ...props }) => {
  return (
    <div className="toolbar" {...props}>
      {children}
    </div>
  );
};

Toolbar.displayName = 'Toolbar';

const ToolbarSection = ({ children, ...props }) => {
  return (
    <div className="toolbar__section" {...props}>
      {children}
    </div>
  );
};

Toolbar.Section = ToolbarSection;
ToolbarSection.displayName = 'ToolbarSection';

const ToolbarLabel = ({ children, ...props }) => {
  return (
    <span className="toolbar__label" {...props}>
      {children}
    </span>
  );
};

Toolbar.Label = ToolbarLabel;
ToolbarLabel.displayName = 'ToolbarLabel';

const ToolbarButton = ({ children, ...props }) => {
  return (
    <button className="toolbar__button" {...props}>
      {children}
    </button>
  );
};

Toolbar.Button = ToolbarButton;
ToolbarButton.displayName = 'ToolbarButton';

export default Toolbar;
