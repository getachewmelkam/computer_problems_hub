import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

export default function ProtectedRoute({ children }) {
  const { isAdmin, authLoading } = useAuth();

  if (authLoading) return <Loader label="Checking credentials" />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return children;
}
