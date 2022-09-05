import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  let user = JSON.parse(localStorage.getItem("user"))
  let token = user?.stsTokenManager?.accessToken;

  console.log("user :: ", user);
  useEffect(() => {
    if (!token) {
      <Navigate to="/" />
    }
  }, [])
  return token ? children : <Navigate to="/" />
}

export default PrivateRoute
