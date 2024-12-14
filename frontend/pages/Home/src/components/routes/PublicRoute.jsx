// src/components/routes/PublicRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;
