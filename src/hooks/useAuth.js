import { useContext } from 'react';
import Provider from '../context/Provider';

const { AuthContext } = Provider;
const useAuth = () => useContext(AuthContext);
export default useAuth;
