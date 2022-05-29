import { useContext } from 'react';
import Provider from '../context/Provider';

const { StateContext } = Provider;
const useGlobalState = () => useContext(StateContext);
export default useGlobalState;
