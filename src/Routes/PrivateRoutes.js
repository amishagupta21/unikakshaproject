import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "universal-cookie";
import Header from "../pages/header";
import SideBar from "../pages/sidebar";

function PrivateRoute({ children }) {

  var cookie = new Cookies();

  let user = JSON.parse(localStorage.getItem("user"))
  let token = user?.stsTokenManager?.accessToken;
  let tokenCookies = cookie.get('access_token')
  console.log("tokenCookies", tokenCookies)

  useEffect(() => {
    if (!tokenCookies) {
      <Navigate to="/" />
    }
  }, [])
  return tokenCookies ? <div>
    <div className="wrapper">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main-wrapper">
        <Header />
        <div>
          {children}
        </div>
      </div>
    </div>


  </div> : <Navigate to="/" />
}

export default PrivateRoute
