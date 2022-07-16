import axios from 'axios';

const url = process.env.REACT_APP_BASE_ENDPOINT;

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [url];
    const token = localStorage.getItem('access-token');
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(`${url}/product?page=${pageParam}`);
  return data;
};

export const fetchProduct = async (product_id) => {
  const { data } = await axios.get(`${url}/product/${product_id}`);
  return data;
};

export const fetchRegister = async (input) => {
  const { data } = await axios.post(`${url}/auth/register`, input);
  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(`${url}/auth/login`, input);
  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(`${url}/auth/me`);
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(`${url}/auth/logout`, {
    refresh_token: localStorage.getItem('refresh-token'),
  });
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(`${url}/order`, input);
  return data;
};
