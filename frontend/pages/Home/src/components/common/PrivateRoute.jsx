// // src/components/common/PrivateRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = ({ children }) => {
//   const { isAuthenticated } = useSelector(state => state.user);

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;