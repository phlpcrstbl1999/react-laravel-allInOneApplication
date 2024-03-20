import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'animate.css';
import UserRoutes from './components/router/UserRoutes';
import AuthenticationRouter from './components/router/AuthenticationRoutes';
import Dashboard from './components/user/Dashboard';
function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="/authentication/*" element={<AuthenticationRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
