import axios from 'axios';

export const login = async data => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`, data);
};

export const getProfile = async header => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/me`, {
    headers: header,
  });
};

export const uploadFile = async formData => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/files`, formData);
};

export const updateProfile = async (data, header) => {
  return await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/users/me`, data, {
    headers: header,
  });
};
