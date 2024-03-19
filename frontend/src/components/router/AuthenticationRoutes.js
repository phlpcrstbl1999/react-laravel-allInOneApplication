import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import Login from '../authentication/login/Login';
import Register from '../authentication/register/Register';
import AuthGuard from './AuthGuard';

const AuthenticationRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<AuthGuard><Login /></AuthGuard>} />
        <Route path="/register" element={<AuthGuard><Register /></AuthGuard>} />
    </Routes>
  )
}

export default AuthenticationRouter
