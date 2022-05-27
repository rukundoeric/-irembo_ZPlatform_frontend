import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    auth?.access_token
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
