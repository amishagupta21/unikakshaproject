import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ children }) {
  const accessToken = JSON.parse(localStorage.getItem('user'))?.stsTokenManager?.accessToken;

  useEffect(() => {
    if (!accessToken) {
      <Navigate to="/" />;
    }
  }, []);

  return accessToken ? (
    <div>
      <div className="wrapper">
        <div className="main-wrapper">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" replace/>
  );
}

export default PrivateRoute;
