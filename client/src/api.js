import axios from 'axios';

const url = process.env.REACT_APP_BASE_ENDPOINT;

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
