import { Routes, Route, Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Box } from '@chakra-ui/react';

import Home from './Home';
import Orders from './Orders';
import Products from './Products';

function Admin() {
  return (
    <div>
      <nav>
        <ul className={styles.adminmenu}>
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>

      <Box mt={10}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Box>
    </div>
  );
}

export default Admin;
