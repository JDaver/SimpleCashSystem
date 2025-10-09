import './PageWrapper.css';

function PageWrapper({ children, className = '', ...props }) {
  return (
    <main className={`page-wrapper ${className}`.trim()} id="page-transition" {...props}>
      {children}
    </main>
  );
}

export default PageWrapper;
