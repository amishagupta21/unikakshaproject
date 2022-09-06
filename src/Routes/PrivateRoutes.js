import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "universal-cookie";

function PrivateRoute({ children }) {

  let user = JSON.parse(localStorage.getItem("user"))
  let token = user?.stsTokenManager?.accessToken;
  // let tokenCookies = Cookies.get('access_token')

  useEffect(() => {
    if (!token) {
      <Navigate to="/" />
    }
  }, [])
  return token ? children : <Navigate to="/" />
}

export default PrivateRoute
