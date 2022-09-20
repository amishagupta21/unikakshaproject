import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../pages/header';
import SideBar from '../pages/sidebar';

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
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="main-wrapper">
          <Header />
          <div>{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoute;
