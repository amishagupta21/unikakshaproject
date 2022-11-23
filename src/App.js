import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Info from './pages/auth/Info';
import SignInOtp from './pages/auth/SignInOtp';
import Error from './pages/404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/util-comonents/Loader';
import { useSelector } from 'react-redux';
import Homepage from './pages/Homepage/Homepage';

const App = () => {
  const isLoader = useSelector((state) => state?.loader?.isLoading);
  return (
    <div>
      {!isLoader ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Homepage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="info" element={<Info />} />
            <Route path="signin-otp" element={<SignInOtp />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Loader />
      )}
      <ToastContainer autoClose={3000} pauseOnHover={false} />
    </div>
  );
};

export default App;
