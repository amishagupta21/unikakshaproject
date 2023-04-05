import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';
import { firebase } from '../../firebase/firebase';
import { setLoading } from '../../redux/actions/LoaderActions';
import ApiService from '../../services/ApiService';
import SocialLogin from '../../utils-componets/SocialLogin';
import './auth.scss';
import LeftBox from './components/LeftBox';
import AuthModal from './components/AuthModal';
import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import './Login.scss';
import { rightArrow } from '../../assets/images';
import OtpInput from 'react-otp-input';
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import Footer from '../../components/Footer';


const Login = () => {
  let isAuth =
    useSelector((state) => state?.auth?.isAuthenticated) ||
    JSON.parse(localStorage.getItem('isAuthenticated'));
  const [loading, setloading] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState('');
  const [authErrorNotRegistered, setAuthErrorNotRegistered] = useState(false);
  const [authErrorRegistered, setAuthErrorRegistered] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const cookie = new Cookies();
  const [userData, setUserData] = React.useState();
  const [mobileNumberHaveValue, setMobileNumberHaveValue] = useState(false);

  const [OTPSent, setOTPSent] = useState(false);
  const [OTPLabel, setOTPLabel] = useState('Get OTP');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState();
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState(false);
  const auth = getAuth;
  const configureCaptcha = () => {
   return window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signin-container', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    });

  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

     
    // if (isAuth) {
    //   navigate('/dashboard');
    // }
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
          setIsResendDisabled(false);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const checkIfUserExists = async (email, phone) => {
    const result = await ApiService('user/check-exists', 'POST', { email, phone }, true);
    return result?.data?.data?.user;
  };

  const getUserBasicInfo = async (uid) => {
    const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
    return response.data.data.userProfile?.information_data ? true : false;
  };

  const singInwithEmail = async (values) => {

    setAuthError();
    setloading(true);
    dispatch(setLoading(true));
    const { email, password } = values;

    const userisExist = await checkIfUserExists(email, null);

    if (userisExist) {
      setAuthErrorNotRegistered(false);
      // const { phone } = user;
      // if (phone) {
      //   sendOTP(phone);
      // } else {

      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
          const { user } = response.user.multiFactor;

          // firebase.auth().currentUser.updateProfile({ displayName: userisExist?.displayName });


          // var firebaseUser = userCredential.user;
          setloading(false);
          dispatch(setLoading(false));
          dispatch(setIsAuthenticated(true));
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Log in Succesfull', {
            theme: 'colored',
          });

          const isBasicInfoExists = getUserBasicInfo(user.uid);
          if (isBasicInfoExists) {
            const redirectUrl = searchParams.get('redirect');
            if (redirectUrl) {
              navigate(redirectUrl);
            } else {
              navigate('/dashboard');
            }
          } else {
            navigate('/info');
          }

          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
          // setAuthError('This e-mail is not registered with us. Please sign up.');
          setAuthErrorNotRegistered(true);
          setloading(false);
          dispatch(setLoading(false));
        });

      // }
      setloading(false);
      dispatch(setLoading(false));
    } else {
      setAuthErrorNotRegistered(true);
      // setAuthError('This e-mail is not registered with us. Please sign up.');
      setloading(false);
      dispatch(setLoading(false));
    }
  };


  const signInWithNumber = async (values) => {
    setAuthError();
    dispatch(setLoading(true));
    setloading(true);
    const { mobileNumber } = values;
    const user = await checkIfUserExists(null, `${mobileNumber}`);
    if (user) {
      const { phone, uid } = user;
      if (phone) {
        sendOTP(phone);
      }
      setloading(false);
      dispatch(setLoading(false));
    } else {
      setAuthError('User not found')
      setloading(false);
      dispatch(setLoading(false));
    }
  };



  // const sendOTP = async (phoneNumber) => {
  //   dispatch(setLoading(true));
  //   setloading(true);
  //   setPhoneNumber(phoneNumber)


  //   const appVerifier = configureCaptcha();
  //   firebase
  //     .auth()
  //     .signInWithPhoneNumber(`${phoneNumber}`, appVerifier)
  //     .then(async (confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       toast.success('OTP has been Sent to Mobile Number', {
  //         theme: 'colored',
  //       });

  //       // OTPTimer();

  //       // const redirectUrl = searchParams.get('redirect');
  //       // const signInUrl = redirectUrl
  //       //   ? `/signin-otp?redirect=${searchParams.get('redirect')}`
  //       //   : '/signin-otp';
  //       // navigate(signInUrl, {
  //       //   state: {
  //       //     phoneNumber: phoneNumber,
  //       //   },
  //       // });
  //       dispatch(setLoading(false));
  //       setOTPLabel('OTP Sent')
  //       setOTPSent(true);
  //       setloading(false);
  //     })
  //     .catch((error) => {
  //       toast.error(`${error}`, {
  //         theme: 'colored',
  //       });
  //       setloading(false);
  //       dispatch(setLoading(false));
  //     });
  // };


  const sendOTP = async (phoneNumber) => {
    // Dispatch an action to set the loading state to true
    dispatch(setLoading(true));
    setloading(true);
    setPhoneNumber(phoneNumber);

    // Configure the reCAPTCHA verifier
    const appVerifier = configureCaptcha();

    // Send the OTP to the user's phone number
    firebase
      .auth()
      .signInWithPhoneNumber(`${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success('OTP has been Sent to Mobile Number', {
          theme: 'colored',
        });

        // Set the OTP timer
        setMinutes(0);
        setSeconds(20);

        dispatch(setLoading(false));
        setOTPLabel('OTP Sent');
        setOTPSent(true);
        setloading(false);
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
        setloading(false);
        dispatch(setLoading(false));
      });
  };

  const onSubmitOTP = () => {
    setloading(true);
    dispatch(setLoading(true));

    window.confirmationResult
      .confirm(otp && otp)
      .then(async (response) => {
        const { user } = response;
        if (user) {
          setloading(false);
          dispatch(setLoading(false));

          dispatch(setIsAuthenticated(true));
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('Log in Succesfull', {
            theme: 'colored',
          });

          const isBasicInfoExists = await getUserBasicInfo(user.uid);
          if (isBasicInfoExists) {
            const redirectUrl = searchParams.get('redirect');
            if (redirectUrl) {
              navigate(redirectUrl);
            } else {
              navigate('/dashboard');
            }
          } else {
            navigate('/info');
          }
        }
      })
      .catch((error) => {
        setloading(false);
        dispatch(setLoading(false));

        // navigate('/login');
        setOtpError('Invalid Code!');
      });
  };

  const countdown = () => {
    if (seconds > 0) {
      setSeconds((prev) => prev - 1);
    } else if (minutes > 0) {
      setSeconds(59);
      setMinutes((prev) => prev - 1);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(countdown, 1000);
  //   return () => clearInterval(interval);
  // }, [seconds, minutes]);

  // const resendOTP = (phone) => {
  //   if (seconds === 0 && minutes === 0) {
  //     setOtp('');
  //     setOtpError(null);
  //     setIsResendDisabled(true);
  //     setMinutes(2);
  //     setSeconds(0);
  //     sendOTP(phone);
  //   }
  // };

  const resendOTP = (phone) => {
   
    if (seconds === 0 && minutes === 0) {
      setOtp('');
      setOtpError(null);
      setIsResendDisabled(true);
      setMinutes(0);
      setSeconds(20);
      window.location.reload()
    }
  };

  return (
    <>
      {/* <AuthNavbar /> */}
      <div className='auth-modal'>
        <AuthModal show={show} handleClose={handleClose} handleShow={handleShow} email={userData} sendOTP={sendOTP} />
      </div>
      <section className="auth_layout login_screen auth-unikaksha login">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div className="log-in-title">Log in to UniKaksha</div>
            <div href="#" className="resetpassword create-account">
              Don't have account?
              <Link to="/signup" state={searchParams}>
                &nbsp;Sign up
              </Link>
            </div>
            <div href="#" className="signin-text">
              Login with
            </div>
            <div className="auth_form">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={12}>
                    <Nav variant="pills" className="custom-tabs-container">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Mobile</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Email</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Formik
                          initialValues={{
                            mobileNumber: cookie.get('mobileNumber')
                              ? cookie.get('mobileNumber')
                              : '',
                            mobileLength: null,
                          }}
                          validationSchema={Yup.object().shape({
                            mobileNumber: Yup.number().required(
                              'Mobile number is a required field'
                            ),
                            // ((values.mobileNumber.length-values.mobileLength) === 10)
                          })}
                          onSubmit={(values) => {
                            signInWithNumber(values);
                          }}
                          render={({
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            values,
                            errors,
                            touched,
                            validateForm,
                            setFieldValue,
                          }) => (
                            <Form>
                              <h2 className="title-head">Sign in to Unikaksha</h2>
                              <div id="signin-container"></div>
                              {/* {authError && (
                                <Alert key="danger" variant="danger">
                                  {authError}
                                </Alert>
                              )} */}
                              <Field
                                name="mobileNumber"
                                render={({ field, formProps }) => (
                                  <Row className="mb-0">
                                    <FormLabel>Enter Number</FormLabel>
                                    <PhoneInput
                                      placeholder="Enter mobile number"
                                      preferredCountries={['in']}
                                      country={'in'}
                                      value={field.value}
                                      onChange={(phone, data) => {
                                        setFieldValue('mobileNumber', phone);
                                        setFieldValue('mobileLength', data.dialCode.length);
                                      }}
                                      countryCodeEditable={false}
                                    />
                                  </Row>



                                )}
                              />
                              {(values.mobileNumber.length - values.mobileLength === 10) && (


                                <Button
                                  type={OTPSent ? 'button' : 'submit'}
                                  variant="outline-primary"
                                  className={OTPSent ? 'otp-sent' : 'get-otp-btn'}>

                                  {OTPLabel}
                                </Button>

                              )}
                              {OTPSent && (
                                <>
                                  <div className="otp-input">
                                    <OtpInput value={otp} onChange={(e) => setOtp(e)} numInputs={6} />
                                  </div>

                                  <div className="d-flex justify-content-between mt-2">
                                    <div>
                                      <span>Did not receive OTP?</span>
                                    </div>

                                    <div>

                                      <a
                                        style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                                        className={isResendDisabled ? 'resend-otp disabled' : 'resend-otp'}
                                        onClick={() => resendOTP(phoneNumber)}>
                                        Resend OTP
                                      </a>
                                      <span>
                                        {' '}
                                        in {minutes < 10 ? `0${minutes}` : minutes}:{' '}
                                        {seconds < 10 ? `0${seconds}` : seconds}
                                      </span>
                                    </div>


                                  </div>
                                  {otpError && (
                                    <>
                                      <div className="error-text">You have enterd Invalid OTP  </div>
                                    </>
                                  )}
                                </>
                              )}

                              {authError && (
                                <>
                                  <div className="error-text">This mobile number is not registered with us. Please
                                    <Link to="/signup" state={searchParams}>
                                      &nbsp;Sign up.
                                    </Link></div>
                                  {/* <div className="error-text">This e-mail is not registered with us. Please <Link to="/signup" state={searchParams}>
                                        &nbsp;Sign up
                                      </Link>. </div> */}

                                  <div className="error-text">If you have previously logged in to your account. Please try log in using your Email Id.  </div>
                                </>
                              )}
                              {errors.mobileNumber && touched.mobileNumber ? (
                                <div className="error-text">{errors.mobileNumber}</div>
                              ) : null}

                              <Row>
                                <div>
                                  {/* <Link to="/forget-password" className='fp'>
                                  Forgot Password?</Link> */}
                                </div>
                              </Row>
                              <div className="d-grid gap-2 mt-4">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  disabled={!(otp.length === 6) || loading}
                                  onClick={onSubmitOTP}
                                >
                                  {loading ? 'Loading...' : 'Log in'}
                                </Button>

                              </div>
                            </Form>
                          )}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Formik
                          initialValues={{
                            email: cookie.get('userName') ? cookie.get('userName') : '',
                            password: ''
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string().email('Invalid email').required('Required'),
                            password: Yup.string()
                              .required('Please enter your password'),
                          })}
                          onSubmit={(values) => {
                            singInwithEmail(values);
                          }}
                          render={({ values, errors, touched, validateForm }) => (
                            <Form>
                              <h2 className="title-head">Sign in to Unikaksha</h2>
                              {/* {authError && (
                                <Alert key="danger" variant="danger">
                                  {authError}
                                </Alert>
                              )} */}
                              <Field
                                name="email"
                                render={({ field, formProps }) => (
                                  <Row className="mb-0">
                                    <FormGroup
                                      controlId="email"
                                      className="form-group-1 mb-3"
                                      as={Col}
                                      md="12">
                                      <FormLabel>Enter Email</FormLabel>
                                      <FormControl
                                        placeholder="Enter Email ID"
                                        type={'text'}
                                        value={field.value}
                                        onChange={field.onChange}
                                      />
                                    </FormGroup>
                                  </Row>
                                )}
                              />
                              {errors.email && touched.email ? (
                                <div className="error-text">{errors.email}</div>
                              ) : null}



                              <Field
                                name="password"
                                render={({ field, formProps }) => (
                                  <Row className="mb-0">
                                    <FormGroup
                                      controlId="password"
                                      className="form-group-1 mb-0"
                                      as={Col}
                                      md="12">
                                      <FormLabel>
                                        Enter password
                                      </FormLabel>
                                      <FormControl
                                        placeholder="Enter your password here"
                                        type={'password'}
                                        value={field.value}
                                        onChange={field.onChange}
                                      />
                                    </FormGroup>
                                  </Row>
                                )}
                              />
                              <div className='mb-4'>
                                <Link to="/forget-password" className='fp'>
                                  Forgot Password?</Link>
                              </div>
                              {errors.password && touched.password ? (
                                <div className="error-text">{errors.password}</div>
                              ) : null}
                              <div>

                                {authErrorNotRegistered && (
                                  <>
                                    <div className="error-text">Invalid Credentials or Don't have account? Please <Link to="/signup" state={searchParams}>
                                      &nbsp;Sign up
                                    </Link>.</div>
                                    {/* <div className="error-text">This e-mail is not registered with us. Please <Link to="/signup" state={searchParams}>
                                &nbsp;Sign up
                              </Link>. </div> */}

                                    <div className="error-text">If you have previously logged in to your account. Please try log in using your mobile number.  </div>
                                  </>
                                )}

                              </div>
                              <div className="d-grid gap-2">
                                <Button
                                  type="submit"
                                  className="btn-secondary"
                                  variant="secondary"
                                  disabled={!values.email || loading}>
                                  {loading ? 'Loading...' : 'Log in'}
                                </Button>
                              </div>
                              <div className="d-grid gap-2 mt-3">
                                <Button
                                  type="submit"
                                  className="btn-secondary btn-secondary-out"
                                  variant="outline-secondary"
                                >Log in without password
                                </Button>
                                <p className="sml-info">You will receive a link to login without password if your email is registered with us</p>
                              </div>
                            </Form>
                          )}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              <div className="space-or mt-4">
                <span>OR</span>
              </div>
              <SocialLogin />
            </div>
          </div>
        </div>
      </section>
      <Footer />

    </>
  );
};

export default Login;
