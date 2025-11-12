import { memo } from 'react';
import './Item.css';

function Item({
  className,
  gap,
  gridTemplateColumns,
  renderInfo,
  renderActions,
  children,
  ...props
}) {
  const combinedClassName = ['item', className].filter(Boolean).join(' ');
  return (
    <div className={combinedClassName} {...props}>
      {children}
      <div className="item__info" style={{ gap, gridTemplateColumns }}>
        {renderInfo?.()}
      </div>
      <div className="item__actions">{renderActions?.()}</div>
    </div>
  );
}

export default memo(Item);
