import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './components/Footer';
import PrimaryNavbar from './components/PrimaryNavbar';
import Loader from './components/util-comonents/Loader';
import Error from './pages/404';
import Info from './pages/auth/Info';
import Login from './pages/auth/Login';
import SignInOtp from './pages/auth/SignInOtp';
import Signup from './pages/auth/Signup';
import SignupOtp from './pages/auth/SignupOtp';
import CourseApplication from './pages/courses/application/CourseApply';
import CourseDetails from './pages/courses/course-details/CourseDetails';
import MyCourses from './pages/courses/my-courses/MyCourses';
import Homepage from './pages/Homepage/Homepage';
import Unikode from './pages/unikode/unikode';
import PrivateRoute from './Routes/PrivateRoutes';

const App = () => {
  const isLoader = useSelector((state) => state?.loader?.isLoading);
  console.log(`isLoader`, isLoader);
  const isAuthenticated =
    useSelector((state) => state?.auth?.isAuthenticated) || localStorage.getItem('isAuthenticated');

  return (
    <div>
      {isLoader && <Loader />}

      <BrowserRouter>
        <PrimaryNavbar />
        <Routes>
          <Route exact={true} path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Homepage />} />
            <Route path="course/apply/:courseVariantSlug" element={<CourseApplication />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path='unikode' element={<Unikode />} />
            <Route path="course/:courseVariantSlug" element={<CourseDetails />} />
          </Route>
          {/* <Route path="dashboard" element={<PrivateRoute><Homepage /></PrivateRoute>}/>
              <Route path="course/apply" element={<PrivateRoute> <CourseApplication /> </PrivateRoute>} />
              <Route path='my-courses' element={<PrivateRoute><MyCourses/></PrivateRoute>} />
              <Route path='course/:courseVariantSlug/:courseId' element={<PrivateRoute><CourseDetails /></PrivateRoute>}/> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="info" element={<Info />} />
          <Route path="signin-otp" element={<SignInOtp />} />
          <Route path="signup-otp" element={<SignupOtp />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
