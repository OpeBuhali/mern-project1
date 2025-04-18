import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'; // Import Home
import RequireAuth from './components/RequireAuth';
import AutoLogout from './components/AutoLogout';

function App() {
  return (
    <Router>
      <AutoLogout/>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Halaman Utama */}
        <Route path="/home" element={<Home />} /> {/* Halaman Home yang bisa diakses */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
