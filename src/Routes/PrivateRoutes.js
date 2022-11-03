import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

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
          <div>{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
