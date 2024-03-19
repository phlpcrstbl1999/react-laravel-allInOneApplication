import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import Dashboard from '../user/Dashboard';
import UserAuthGuard from './UserAuthGuard';
const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<UserAuthGuard><Dashboard /></UserAuthGuard>} />
    </Routes>
  )
}

export default UserRoutes
