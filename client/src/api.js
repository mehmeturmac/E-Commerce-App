import axios from 'axios';

export const productList = async () => {
  const { data } = await axios('http://localhost:4000/product');
  return data;
};
