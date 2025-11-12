import React from 'react';
import './DisplayElements.css';

function DisplayElements({
  borderRadius = '8px',
  gap = '6rem',
  gridTemplateColumns = '1fr auto',
  infoGridColumns = 'repeat(3, 250px)',
  actionsGridColumns = '1fr',
  height = '450px',
  headerBgColor = 'var(--neutral-500)',
  headerTextColor = 'var(--neutral-100)',
  paddingBlock = '0.725rem',
  paddingInline = '1rem',
  width = '100%',
  labels = [],
  actionLabels = [],
  children,
}) {
  const hasActions = actionLabels.length > 0;
  return (
    <div className="display-elements__wrapper" style={{ width }}>
      <div
        className="display-elements__labels"
        style={{
          backgroundColor: headerBgColor,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          color: headerTextColor,
          gap,
          gridTemplateColumns,
          paddingBlock,
          paddingInline,
        }}
      >
        <div
          className="display-elements__labels-left"
          style={{ gap, gridTemplateColumns: infoGridColumns }}
        >
          {labels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
        {hasActions && (
          <div
            className="display-elements__labels-right"
            style={{ gridTemplateColumns: actionsGridColumns }}
          >
            {actionLabels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        )}
      </div>
      <div className="display-elements__list" style={{ height }}>
        {React.Children.map(children, child => {
          if (typeof child.type === 'string') return child;

          return React.cloneElement(child, {
            gridTemplateColumns,
            gap,
          });
        })}
      </div>
    </div>
  );
}

export default React.memo(DisplayElements);
