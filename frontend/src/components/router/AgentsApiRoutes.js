import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import UserAuthGuard from './UserAuthGuard';
import AgentsApi from '../agents-api/Index';

const AgentsApiRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<UserAuthGuard><AgentsApi /></UserAuthGuard>} />
</Routes>
  )
}

export default AgentsApiRoutes
