import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    let token = JSON.parse(localStorage.getItem('token'))?.accessToken
    useEffect(() => {
        if (!token) {
            <Navigate to="/" />
        }
    }, [])
    return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;