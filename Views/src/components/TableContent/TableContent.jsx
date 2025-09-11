import './TableContent.css';

function TableContent({ children, ...props }) {
  return (
    <div className="table__content" {...props}>
      {children}
    </div>
  );
}

export default TableContent;
