import './PageWrapper.css';

function PageWrapper({ children, ...props }) {
  return (
    <main className="page-wrapper" id="page-transition" {...props}>
      {children}
    </main>
  );
}

export default PageWrapper;
