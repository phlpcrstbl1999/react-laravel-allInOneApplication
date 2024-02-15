import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import Admin from '../admin/Admin';
const AdminRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Admin />} />
    </Routes>
    </>
  )
}

export default AdminRoutes
