import axios from 'axios';

// const BASE = `${process.env.REACT_APP_API_URL}`;
const BASE = 'http://localhost:8100';
export const axiosPrivate = axios.create({
  baseURL: BASE,
  header: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
export default axios.create({
  baseURL: BASE,
  withCredentials: true,
});
