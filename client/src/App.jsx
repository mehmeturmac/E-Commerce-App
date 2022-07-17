import { Routes, Route } from 'react-router-dom';
import './App.css';

import ProtectedRoutes from './pages/ProtectedRoutes';

import Navbar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
      <Navbar />
      <div id="content">
        <Routes>
          <Route path="/" exact element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="*" element={<Error404 />} />

          <Route element={<ProtectedRoutes allowedRoles={['user', 'admin']} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
