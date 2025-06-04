// ✅ RequireAdmin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('gabkut_user'));

  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RequireAdmin;
