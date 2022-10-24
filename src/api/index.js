import axios from 'axios';

export const login = async data => {
  console.log('>>>>>>>>>>>>>>>>>>>>>> user 2 ');
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`, data);
};
