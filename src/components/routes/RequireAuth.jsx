/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useGlobalState from '../../hooks/useGlobalState';
import NotFound from '../shared/NotFound';

function RequireAuth({ roles }) {
  const { auth } = useAuth();
  const { appState: { user } } = useGlobalState();
  const location = useLocation();

  return (
    (auth?.access_token && user?.role?.split('.')[roles[1]] === '1') ? <Outlet />
      : (auth?.access_token && user?.role?.split('.')[roles[1]] === '0') ? <NotFound />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
