import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'animate.css';
import AdminRoutes from './components/router/AdminRoutes';
import AuthenticationRouter from './components/router/AuthenticationRoutes';
function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/authentication/*" element={<AuthenticationRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
