import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrimaryNavbar from './components/PrimaryNavbar';
import Loader from './components/util-comonents/Loader';
import Error from './pages/404';
import Info from './pages/auth/Info';
import Login from './pages/auth/Login';
import SignInOtp from './pages/auth/SignInOtp';
import Signup from './pages/auth/Signup';
import SignupOtp from './pages/auth/SignupOtp';
import SetPassword from './pages/auth/SetPassword';
import ForgetPassword from './pages/auth/ForgetPassword';
import CourseApplication from './pages/courses/application/CourseApply';
import CourseDetails from './pages/courses/course-details/CourseDetails';
import MyCourses from './pages/courses/my-courses/MyCourses';
import Homepage from './pages/Homepage/Homepage';
import Unikode from './pages/unikode/unikode';
import PrivateRoute from './Routes/PrivateRoutes';
import Toaster from './components/custom-ui-components/Toaster';

import PersonalDetails from './pages/my-profile/PersonalDetails';
import LearnerPayments from './pages/courses/course-details/LearnerPayments';
import UnikodeComponent from './pages/courses/DummyComponent';
import Worldline from './pages/courses/application/WorldLine';

const App = () => {
  const isLoader = useSelector((state) => state?.loader?.isLoading);
  const toaster = useSelector((state) => state?.toaster?.toasterData);
  return (
    <div>
      {isLoader && <Loader />}
      <BrowserRouter>
        <div className="main-sidebar">
          <PrimaryNavbar />
          {toaster?.show && (
            <Toaster
              header={toaster?.header}
              variant={toaster?.variant}
              body={toaster?.body}
              show={toaster?.show}
            />
          )}
          <div>
            <Routes>
              <Route exact={true} path="/" element={<Login />} />

              <Route element={<PrivateRoute />}>
                <Route path="dashboard" element={<Homepage />} />
                <Route path="redirectToUnikode" element={<UnikodeComponent />} />
                <Route path="course/apply/:courseVariantSlug" element={<CourseApplication />} />
                <Route
                  path="course/apply/student/:courseVariantSlug"
                  element={<CourseApplication />}
                />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="unikode" element={<Unikode />} />
                <Route path="course/:courseVariantSlug" element={<CourseDetails />} />
                <Route path="my-profile" element={<PersonalDetails />} />
                <Route path="payment" element={<LearnerPayments />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="set-password" element={<SetPassword />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="info" element={<Info />} />
              <Route path="signin-otp" element={<SignInOtp />} />
              <Route path="signup-otp" element={<SignupOtp />} />
              <Route path="worldline" element={<Worldline />} />

              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
