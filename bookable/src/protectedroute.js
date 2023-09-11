
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated }) => {
    //console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Route element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
