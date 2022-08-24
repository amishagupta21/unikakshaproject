import './App.css';
import Homepage from './pages/Homepage';
import Profile from './pages/profile';
import Login from './pages/auth/Login';
import Forgot from './pages/auth/Forgot';
import Password from './pages/auth/Password';
import Setpassword from './pages/auth/Setpassword';
import Signinverification from './pages/auth/Signinverification';
import Newpassword from './pages/auth/Newpassword';
import Signup from './pages/auth/Signup';
import Sidebar from './pages/sidebar/index';
import Header from './pages/header/index';
import Otp from './pages/auth/Otp';
import Error from './pages/404'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

const array = ["/login", "/", "/signup"];
const array1 = ["/login", "/", "/signup"];

function App() {
  useEffect(() => {
    const array = ["/login", "/", "/signup"];
    if (array.includes(window.location.pathname)) {
      document.body.classList.add("auth");
    } else {
      document.body.classList.remove("auth");
    }
  }, []);
  const [active, setActive] = useState(false);
  return (
    <div>
       <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="forgotpassword" element={<Forgot />} />
          </Routes>
          <Routes>
          <Route path="setpassword" element={<Setpassword />} />
          </Routes>
          <Routes>
          <Route path="password" element={<Password />} />
          </Routes>
          <Routes>
          <Route path="newpassword" element={<Newpassword />} />
          </Routes>
          <Routes>
          <Route path="signup" element={<Signup />} />
          </Routes>
          <Routes>
          <Route path="verification" element={<Signinverification />} />
          </Routes>
          <Routes>
          <Route path="otp" element={<Otp />} />
          </Routes>
        <div className={active ? "wrapper active" : "wrapper"}>
        {!array.includes(window.location.pathname) && (
          <Header setActive={setActive} />
        )}
        {!array1.includes(window.location.pathname) && <Sidebar />}
        <div className="layout-right">
        <Routes>
          <Route path="home" element={<Homepage />} />
          </Routes>
          <Routes>
          <Route path="profile" element={<Profile />} />
          </Routes>
          <Routes>
          <Route path="header" element={<Header />} />
          </Routes>
          <Routes>
        
          <Route path="*" element={<Error />} />
        </Routes>
        </div>
        </div>
        </Router>
    </div>
    
  );
}

export default App;
