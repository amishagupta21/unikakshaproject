import './App.css';
import Homepage from './pages/Homepage';
import Profile from './pages/profile';
import LiveClasses from './pages/liveClasses';
import Courses from './pages/courses';
import Login from './pages/auth/Login';
import Forgot from './pages/auth/Forgot';
import Password from './pages/auth/Password';
import Signinverification from './pages/auth/Signinverification';
import Newpassword from './pages/auth/Newpassword';
import Signup from './pages/auth/Signup';
import Otp from './pages/auth/Otp';
import Error from './pages/404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoutes';
import Resetpassword from './pages/auth/Resetpassword';
import SetPasssword from './pages/auth/SetPasssword';
import SideBar from './pages/sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/util-comonents/Loader';
import { useSelector } from 'react-redux';

function App() {
  const isLoader = useSelector((state) => state?.loader?.isLoading);
  return (
    <div>
      {!isLoader ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="home"
              element={
                <PrivateRoute>
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
            <Route
              path="live-classes"
              element={
                <PrivateRoute>
                  <LiveClasses />
                </PrivateRoute>
              }
            />
            <Route
              path="courses"
              element={
                <PrivateRoute>
                  <Courses />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="sidebar" element={<SideBar />} />
            <Route path="password" element={<Password />} />
            <Route path="setpassword" element={<SetPasssword />} />
            <Route path="forgotpassword" element={<Forgot />} />
            <Route path="resetpassword" element={<Resetpassword />} />
            <Route path="newpassword" element={<Newpassword />} />
            <Route path="signup" element={<Signup />} />
            <Route path="verification" element={<Signinverification />} />
            <Route path="otp" element={<Otp />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Loader />
      )}
      <ToastContainer autoClose={3000} pauseOnHover={false} />
    </div>
  );
}

export default App;
