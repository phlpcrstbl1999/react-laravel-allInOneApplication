import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const loginToken = localStorage.getItem('loginToken');

  if (loginToken) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AuthGuard;