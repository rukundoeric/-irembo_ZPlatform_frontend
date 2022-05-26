/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { Constants } from '../helpers/index';
import axios from '../api/_axios';
import useAuth from './useAuth';

const { logout_api } = Constants;

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logout = async () => {
    setAuth({});
    try {
      await axios(logout_api);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
