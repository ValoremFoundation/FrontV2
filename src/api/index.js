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

export const pinFileToIPFS = async file => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //we gather a local file from the API for this example, but you can gather the file from anywhere
  // let data = new FormData();
  // data.append('file', fs.createReadStream('./yourfile.png'));
  return await axios.post(url, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
      pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
      pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
    },
  });
};

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/categories`);
};
