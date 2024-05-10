import React from 'react'
import { Routes, Route } from 'react-router-dom'; 
import UserAuthGuard from './UserAuthGuard';
import Helpdesk from '../helpdesk/user/Dashboard';
import TicketDescription from '../helpdesk/user/TicketDescription';

const HelpdeskRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<UserAuthGuard><Helpdesk/></UserAuthGuard>} />
        <Route path="/ticket-details" element={<UserAuthGuard><TicketDescription/></UserAuthGuard>} />
    </Routes>
  )
}

export default HelpdeskRoutes
