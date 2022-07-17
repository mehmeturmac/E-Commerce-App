import { Routes, Route, Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Box, Container } from '@chakra-ui/react';

import Orders from './Orders';
import Products from './Products';
import ProductDetail from './ProductDetail';
import NewProduct from './NewProduct';

function Admin() {
  return (
    <Container maxW="7xl">
      <nav>
        <ul className={styles.adminmenu}>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
        </ul>
      </nav>

      <Box mt={10}>
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:product_id" element={<ProductDetail />} />
          <Route path="/products/new" element={<NewProduct />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default Admin;
