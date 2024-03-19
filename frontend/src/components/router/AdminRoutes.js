import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import Admin from '../admin/Admin';
import AdminAuthGuard from './AdminAuthGuard';
const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<AdminAuthGuard><Admin /></AdminAuthGuard>} />
    </Routes>
  )
}

export default AdminRoutes
