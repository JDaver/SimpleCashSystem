import './TableSection.css';

function TableSection({ children, ...props }) {
  return (
    <div className="table__section" {...props}>
      {children}
    </div>
  );
}

export default TableSection;
