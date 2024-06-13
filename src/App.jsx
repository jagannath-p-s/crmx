import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ManagerPage from './pages/ManagerPage';
import SalesmanPage from './pages/SalesmanPage';
import AgentPage from './pages/AgentPage';
import CloserPage from './pages/CloserPage';
import ContactsPage from './pages/ContactsPage'; // Import ContactsPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/salesman" element={<SalesmanPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/closer" element={<CloserPage />} />
        <Route path="/contacts" element={<ContactsPage />} /> {/* Add the route for ContactsPage */}
      </Routes>
    </Router>
  );
};

export default App;
