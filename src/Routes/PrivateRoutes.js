import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import IslogIn from '../utils/IslogIn';

function PrivateRoute({ children }) {
    useEffect(() => {
        if (!IslogIn()) {
            <Navigate to="/" />
        }
    }, [])

    return IslogIn() ? children : <Navigate to="/" />;
}

export default PrivateRoute;