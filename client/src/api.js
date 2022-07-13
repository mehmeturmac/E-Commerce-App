import axios from 'axios';

const url = process.env.REACT_APP_BASE_ENDPOINT;

export const getProductList = async () => {
  const { data } = await axios(`${url}/product`);
  return data;
};

export const getProduct = async (product_id) => {
  const { data } = await axios(`${url}/product/${product_id}`);
  return data;
};
