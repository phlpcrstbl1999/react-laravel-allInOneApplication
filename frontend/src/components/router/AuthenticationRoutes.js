import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import Login from '../authentication/login/Login';
import Register from '../authentication/register/Register';

const AuthenticationRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default AuthenticationRouter
