import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import UserAuthGuard from './UserAuthGuard';
import Profile from '../user/profile/Profile';
const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/profile" element={<UserAuthGuard><Profile /></UserAuthGuard>} />
    </Routes>
  )
}

export default UserRoutes
