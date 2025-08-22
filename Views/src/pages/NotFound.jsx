import Error from '@components/Error';

function NotFound() {
  return <Error code={'404'} message={'Pagina non trovata!'} />;
}

export default NotFound;
