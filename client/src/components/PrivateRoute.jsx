import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // 1. Check for the authentication token in local storage.
    const token = localStorage.getItem('token');

    // 2. If the token exists, render the component the user wants to visit.
    //    If not, redirect them to the login page.
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;