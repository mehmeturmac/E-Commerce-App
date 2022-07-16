import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoutes({ allowedRoles }) {
  const { user } = useAuth();
  return allowedRoles.includes(user?.role) ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;
