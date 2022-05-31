import axios from 'axios';

const BASE = `${process.env.REACT_APP_API_URL}`;
const UPLOAD_BASE = `${process.env.REACT_APP_UPLOAD_BASE}`;
export const axiosPrivate = axios.create({
  baseURL: BASE,
  header: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
export const axiosUplaod = axios.create({
  baseURL: UPLOAD_BASE,
  withCredentials: false,
});
export default axios.create({
  baseURL: BASE,
  withCredentials: true,
});
