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
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from 'firebase/auth';
import Footer from '../../components/Footer';
import { redirect } from 'react-router-dom';
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
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(true);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const auth = getAuth;
  const configureCaptcha = () => {
    if (!window.recaptchaVerifier) {
      return (
        //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signin-container', {
        //   size: 'invisible',
        //   callback: (response) => {},
        //   defaultCountry: 'IN',
        // }

        // )
        (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signin-container', {
          size: 'invisible',
          callback: (response) => {
            // console.log(response);
          },
          defaultCountry: 'IN',
        }))
      );
    }
    return window.recaptchaVerifier;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
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
    return () => clearInterval(interval);
  }, [seconds, minutes]);

  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, []);

  const checkIfUserExists = async (email, phone) => {
    const result = await ApiService('user/check-exists', 'POST', { email, phone }, true);
    if (email === null || email === undefined) {
      return result?.data?.data?.byPhone?.user;
    }
    return result?.data?.data?.byEmail?.user;
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

    try {
      const userisExist = await checkIfUserExists(email, null);

      if (userisExist) {
        setAuthErrorNotRegistered(false);

        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (response) => {
            const { user } = response.user.multiFactor;

            const userData = {
              form_name: 'Login-In-Event',
              email: email,
            };
            const result = await ApiService('centralised/create', 'POST', userData);
            const userId = result?.data?.data?._id;
            const userNameEvent = result?.data?.data?.full_name;
            const userNumber = result?.data?.data?.whatsapp_number;

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

            // MoEngage tracking
            Moengage.track_event('Log-In-Event', {
              FullName: userNameEvent,
              Email: email,
              PhoneNumber: userNumber,
            });
            Moengage.add_user_name(userNameEvent);
            Moengage.add_email(email);
            Moengage.add_mobile(userNumber);
            Moengage.add_unique_user_id(userId);
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            setAuthErrorNotRegistered(true);
            setloading(false);
            dispatch(setLoading(false));
          });
      } else {
        setAuthErrorNotRegistered(true);
        setloading(false);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error('Error:', error);
      setloading(false);
      dispatch(setLoading(false));
    }
  };

  const signInWithNumber = async (values) => {
    setAuthError();
    dispatch(setLoading(true));
    setloading(true);
    const { mobileNumber } = values;
    const user = await checkIfUserExists(null, `+${mobileNumber}`);

    if (user) {
      const { phone } = user;

      if (phone) {
        sendOTP(phone);
      }
      // setloading(false);
      // dispatch(setLoading(false));
    } else {
      setAuthError('User not found');
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

        setMinutes(1);
        setSeconds(59);

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

  const onSubmitOTP = async (values) => {
    setloading(true);
    dispatch(setLoading(true));

    const { email } = values;

    const userData = {
      // "full_name": values.email,
      form_name: 'Login-In-Event',
      // "email": values.email,
      whatsapp_number: phoneNumber,
    };
    const result = await ApiService('centralised/create', 'POST', userData);
    const userId = result?.data?.data?._id;
    const userNameEvent = result?.data?.data?.full_name;

    const userEmail = result?.data?.data?.email;

    Moengage.track_event('Log-In-Event', {
      FullName: userNameEvent,
      Email: userEmail,
      PhoneNumber: phoneNumber,
    });
    Moengage.add_user_name(userNameEvent);
    Moengage.add_email(userEmail);
    Moengage.add_mobile(phoneNumber);
    Moengage.add_unique_user_id(userId);

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

  const resendOTP = () => {
    if (seconds === 0 && minutes === 0) {
      setOtp('');
      setOtpError(null);
      setIsResendDisabled(true);
      setMinutes(1);
      setSeconds(59);
      sendOTP(phone);
    }
  };

  return (
    <>
      {/* <AuthNavbar /> */}
      <div className="auth-modal">
        <AuthModal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          email={userData}
          sendOTP={sendOTP}
        />
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
                                        if (isPhoneNumberEditable) {
                                          setFieldValue('mobileNumber', phone);
                                          setFieldValue('mobileLength', data.dialCode.length);
                                        }
                                      }}
                                      countryCodeEditable={false}
                                    />
                                  </Row>
                                )}
                              />
                              {/* {values.mobileNumber.length - values.mobileLength === 10 && isPhoneNumberEditable && (
                                <Button
                                  type={OTPSent ? 'button' : 'submit'}
                                  variant="outline-primary"
                                  className={OTPSent ? 'otp-sent' : 'get-otp-btn'}
                                  disabled={OTPSent}>
                                  {OTPLabel}
                                </Button>
                              )} */}
                              {values.mobileNumber.length - values.mobileLength === 10 &&
                                isPhoneNumberEditable && (
                                  <>
                                    <Button
                                      variant="link"
                                      onClick={() => {
                                        setIsPhoneNumberEditable(true);
                                        setOTPSent(false);
                                        setOtp('');
                                      }}
                                      className="edit-phone-number-btn">
                                      <img
                                        className="pencil-login"
                                        height={20}
                                        width={15}
                                        src="data:image/jpeg;base64,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"
                                      />
                                    </Button>
                                    <Button
                                      type="submit"
                                      variant="outline-primary"
                                      className="get-otp-btn"
                                      disabled={OTPSent}>
                                      Get OTP
                                    </Button>
                                  </>
                                )}
                              {OTPSent && (
                                <>
                                  <div className="otp-input">
                                    <OtpInput
                                      value={otp}
                                      onChange={(e) => setOtp(e)}
                                      numInputs={6}
                                    />
                                  </div>

                                  <div className="d-flex justify-content-between mt-2">
                                    <div>
                                      <span>Did not receive OTP?</span>
                                    </div>

                                    <div>
                                      <a
                                        style={{
                                          cursor: !minutes && !seconds ? 'pointer' : 'not-allowed',
                                        }}
                                        className={
                                          isResendDisabled ? 'resend-otp disabled' : 'resend-otp'
                                        }
                                        onClick={() => resendOTP(values)}>
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
                                      <div className="error-text">You have enterd Invalid OTP </div>
                                    </>
                                  )}
                                </>
                              )}

                              {authError && (
                                <>
                                  <div className="error-text">
                                    This mobile number is not registered with us. Please
                                    <Link to="/signup" state={searchParams}>
                                      &nbsp;Sign up.
                                    </Link>
                                  </div>
                                  {/* <div className="error-text">This e-mail is not registered with us. Please <Link to="/signup" state={searchParams}>
                                        &nbsp;Sign up
                                      </Link>. </div> */}

                                  <div className="error-text">
                                    If you have previously logged in to your account. Please try log
                                    in using your Email Id.{' '}
                                  </div>
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
                                  onClick={() => onSubmitOTP(values)}>
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
                            password: '',
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string().email('Invalid email').required('Required'),
                            password: Yup.string().required('Please enter your password'),
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
                                      <FormLabel>Enter password</FormLabel>
                                      <FormControl
                                        placeholder="Enter your password here"
                                        type={confirmShowPassword ? 'text' : 'password'}
                                        maxLength={32}
                                        // type={'password'}
                                        value={field.value}
                                        onChange={field.onChange}
                                      />
                                      <Button
                                        variant="outline-secondary"
                                        className="password0-toggle"
                                        onClick={() =>
                                          setConfirmShowPassword(!confirmShowPassword)
                                        }>
                                        {confirmShowPassword ? (
                                          <i className="bi bi-eye-slash-fill"></i>
                                        ) : (
                                          <i className="bi bi-eye-fill"></i>
                                        )}
                                      </Button>
                                    </FormGroup>
                                  </Row>
                                )}
                              />

                              {errors.password && touched.password ? (
                                <div className="error-text">{errors.password}</div>
                              ) : null}
                              <div>
                                {authErrorNotRegistered && (
                                  <>
                                    <div className="error-text">
                                      Invalid Credentials or Don't have account? Please{' '}
                                      <Link to="/signup" state={searchParams}>
                                        &nbsp;Sign up
                                      </Link>
                                      .
                                    </div>
                                    {/* <div className="error-text">This e-mail is not registered with us. Please <Link to="/signup" state={searchParams}>
                                &nbsp;Sign up
                              </Link>. </div> */}

                                    <div className="error-text">
                                      If you have previously logged in to your account. Please try
                                      log in using your mobile number.{' '}
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="d-grid gap-2">
                                <Button
                                  type="submit"
                                  className="btn-secondary"
                                  variant="secondary"
                                  // onClick={emailUniqueId()}
                                  disabled={!values.email || loading}>
                                  {loading ? 'Loading...' : 'Log in'}
                                </Button>
                              </div>
                              {/* <div className="d-grid gap-2 mt-3">
                                <Button
                                  type="submit"
                                  className="btn-secondary btn-secondary-out"
                                  variant="outline-secondary">
                                  Log in without password
                                </Button>
                                <p className="sml-info">You will receive a link to login without password if your email is registered with us</p>
                              </div> */}
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
