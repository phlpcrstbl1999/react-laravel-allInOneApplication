
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminAuthGuard = ({ children }) => {
  const loginToken = localStorage.getItem('loginToken');

  if (loginToken) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default AdminAuthGuard;