/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import Splash from '../shared/Splash';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  const stopLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh();
      stopLoading();
    };
    !auth.access_token ? verifyRefreshToken() : stopLoading();
  }, []);

  return (
    <>
      {isLoading ? <Splash /> : <Outlet />}
    </>
  );
}

export default PersistLogin;
