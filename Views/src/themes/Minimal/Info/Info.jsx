import { memo } from 'react';
import './Info.css';

function Info({ className, gridColumns = 'repeat(3, 250px)', gap = '6rem', children, ...props }) {
  const combinedClassName = ['info__wrapper', className].filter(Boolean).join(' ');
  return (
    <div className={combinedClassName} style={{ gridTemplateColumns: gridColumns, gap }} {...props}>
      {children}
    </div>
  );
}

export default memo(Info);
