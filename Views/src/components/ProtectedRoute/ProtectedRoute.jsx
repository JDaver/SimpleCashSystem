import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@contexts/Auth';

function ProtectedRoute() {
  const { session } = useAuthContext();
  return session ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
