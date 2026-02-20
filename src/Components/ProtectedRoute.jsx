import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by checking for token in localStorage
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  // If no token or user, redirect to login page
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the children components
  return children;
};

export default ProtectedRoute;
