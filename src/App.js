import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard'; 
import CustomerDashboard from './components/CustomerDashboard';
import SupplierDashboard from './components/SupplierDashboard';  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/supplierdashboard" element={<SupplierDashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;
