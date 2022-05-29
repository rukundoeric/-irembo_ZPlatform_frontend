/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable import/no-cycle */
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import useGlobalState from './useGlobalState';
import { Constants } from '../helpers/index';
import axios from '../api/_axios';

const { refresh_token_api } = Constants;

function useRefreshToken() {
  const { setAuth } = useAuth();
  const { setAppState } = useGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const goToLogin = () => {
    setTimeout(() => {
      navigate('/login', { state: { from: location }, replace: true });
    }, 3000);
  };
  const refresh = async () => {
    try {
      const res = await axios.get(refresh_token_api);
      setAuth(prev => ({ ...prev, access_token: res.data.access_token }));
      setAppState(prev => ({ ...prev, user: res?.data?.user }));
      return res.data.access_token;
    } catch (error) {
      goToLogin();
      return error.status;
    }
  };
  return refresh;
}

export default useRefreshToken;
