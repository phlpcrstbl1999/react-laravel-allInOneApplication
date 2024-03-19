import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'animate.css';
import UserRoutes from './components/router/UserRoutes';
import AuthenticationRouter from './components/router/AuthenticationRoutes';
function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/dashboard/*" element={<UserRoutes />} />
          <Route path="/authentication/*" element={<AuthenticationRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
