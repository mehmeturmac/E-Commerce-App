import axios from 'axios';

const url = process.env.REACT_APP_BASE_ENDPOINT;

export const getProductList = async ({ pageParam = 0 }) => {
  const { data } = await axios(`${url}/product?page=${pageParam}`);
  return data;
};

export const getProduct = async (product_id) => {
  const { data } = await axios(`${url}/product/${product_id}`);
  return data;
};
