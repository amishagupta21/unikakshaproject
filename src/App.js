import './App.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Info from './pages/auth/Info';
import SignInOtp from './pages/auth/SignInOtp';
import Error from './pages/404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoutes';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/util-comonents/Loader';
import { useSelector } from 'react-redux';
import CourseApplication from './pages/courses/application/CourseApply';
import Homepage from './pages/Homepage/Homepage';
import MyCourses from './pages/courses/my-courses/MyCourses';
import Footer from './components/Footer';
import SignupOtp from './pages/auth/SignupOtp';
import CourseDetails from './pages/courses/course-details/CourseDetails';
import PrimaryNavbar from './components/PrimaryNavbar';

const App = () => {
  const isLoader = useSelector((state) => state?.loader?.isLoading);
  return (
    <div>
      {!isLoader ? (
        <BrowserRouter>
            <PrimaryNavbar />
            <Routes>
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Homepage />
                  </PrivateRoute>
                }
              />
              <Route path="course/apply" element={<PrivateRoute> <CourseApplication /> </PrivateRoute>} />
              <Route path='my-courses' element={<PrivateRoute><MyCourses/></PrivateRoute>} />
              <Route path='course/:courseVariantSlug/:courseId' element={<PrivateRoute><CourseDetails /></PrivateRoute>}/>
              <Route path="/" element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="info" element={<Info />} />
              <Route path="signin-otp" element={<SignInOtp />} />
              <Route path="signup-otp" element={<SignupOtp />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>

      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
