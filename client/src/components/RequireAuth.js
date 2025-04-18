import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Kalau belum login, redirect ke halaman login
    return <Navigate to="/" replace />;
  }

  // Kalau sudah login, tampilkan children (misal: Dashboard)
  return children;
};

export default RequireAuth;
