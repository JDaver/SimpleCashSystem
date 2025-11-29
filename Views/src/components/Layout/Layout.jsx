import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageWrapper from '@components/PageWrapper';
import Header from '@components/Header';
import Footer from '../Footer';
import DotsLoader from '../DotsLoader';

function Layout() {
  return (
    <div id="view-wrapper">
      <Header />
      <PageWrapper>
        <Suspense fallback={<DotsLoader />}>
          <Outlet />
        </Suspense>
      </PageWrapper>
      <Footer />
    </div>
  );
}

export default Layout;
