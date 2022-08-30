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
import Otp from './pages/auth/Otp';
import SideBar from './pages/sidebar';

import Error from './pages/404'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoutes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="home"
            element={<PrivateRoute>
              <Homepage />
            </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="sidebar" element={<SideBar />} />
          <Route path="forgotpassword" element={<Forgot />} />
          <Route path="setpassword" element={<Setpassword />} />
          <Route path="password" element={<Password />} />
          <Route path="newpassword" element={<Newpassword />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verification" element={<Signinverification />} />
          <Route path="otp" element={<Otp />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;