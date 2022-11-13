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

export const getGeoLocationFromAddress = async address => {
  return await axios.get(`https://positionstack.com/geo_api.php?query=${encodeURI(address)}`);
};

export const getGeoLocationFromIPAddress = async () => {
  const {
    data: { ip },
  } = await axios.get('https://api.ipify.org/?format=json');
  return await axios.get(`https://ipapi.co/${ip}/json/`);
};

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/categories`);
};

export const tokenCreate = async (data, header) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/tokens`, data, { headers: header });
};

export const tokenMint = async (tokenId, data) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/tokens/${tokenId}/mint`, data);
};

export const tokenById = async (tokenId, header) => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/tokens/${tokenId}`, { headers: header });
};

export const tokenUpdate = async data => {
  return await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/tokens`, data);
};

export const tokenList = async (tokenId, data) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/tokens/${tokenId}/list`, data);
};

export const tokenBurn = async (tokenId, data) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/tokens/${tokenId}/burn`, data);
};

export const tokenTransfer = async (tokenId, data) => {
  return await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/tokens/${tokenId}/transfer`, data);
};
