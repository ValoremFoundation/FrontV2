import axios from 'axios';

export const login = async data => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`, data);
};
