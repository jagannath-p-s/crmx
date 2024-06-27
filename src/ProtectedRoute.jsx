import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './pages/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { user } = useAuth();

  return user ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
