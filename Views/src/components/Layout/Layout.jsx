import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageWrapper from '@components/PageWrapper';
import Header from '@components/Header';
import Footer from '../Footer';

function Layout() {
  return (
    <div id="view-wrapper">
      <Header />
      <PageWrapper>
        <Suspense fallback={<div>Page Loader...</div>}>
          <Outlet />
        </Suspense>
      </PageWrapper>
      <Footer />
    </div>
  );
}

export default Layout;
