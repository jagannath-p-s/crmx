// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ManagerPage from './pages/ManagerPage';
import SalesmanPage from './pages/SalesmanPage';
import AgentPage from './pages/AgentPage';
import CloserPage from './pages/CloserPage';
import ContactsPage from './pages/ContactsPage';
import { AuthProvider } from './pages/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedRoute element={AdminPage} />} />
          <Route path="/manager" element={<ProtectedRoute element={ManagerPage} />} />
          <Route path="/salesman" element={<ProtectedRoute element={SalesmanPage} />} />
          <Route path="/agent" element={<ProtectedRoute element={AgentPage} />} />
          <Route path="/closer" element={<ProtectedRoute element={CloserPage} />} />
          <Route path="/contacts" element={<ProtectedRoute element={ContactsPage} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
