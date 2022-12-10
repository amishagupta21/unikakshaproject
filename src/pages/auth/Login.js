import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
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

const Login = () => {
  let isAuth = useSelector((state) => state?.auth?.isAuthenticated) || JSON.parse(localStorage.getItem("isAuthenticated"));
  const [loading, setloading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const cookie = new Cookies();

  const configureCaptcha = () => {
    return (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('signin-container', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));
  };

  useEffect(() => {
    if(isAuth) {
      navigate('/dashboard');
    }
  },[])

  const checkIfUserExists = async (email, phone) => {
    const result = await ApiService('user/check-exists', 'POST', { email, phone }, true);
    return result?.data?.data?.user;
  };

  const singInwithEmail = async (values) => {
    setloading(true);
    dispatch(setLoading(true));
    const { email } = values;
    const user = await checkIfUserExists(email, null);
    if (user) {
      const { phone, uid } = user;
      if (phone) {
        sendOTP(phone);
      }
      setloading(false);
      dispatch(setLoading(false));
    } else {
      // TODO
      // user not found
      alert('User Not Found');
      setloading(false);
      dispatch(setLoading(false));
    }
  };

  const signInWithNumber = async (values) => {
    dispatch(setLoading(true));
    setloading(true);
    const { mobileNumber } = values;
    const user = await checkIfUserExists(null, `+${mobileNumber}`);
    if (user) {
      const { phone, uid } = user;
      if (phone) {
        sendOTP(phone);
      }
      setloading(false);
      dispatch(setLoading(false));
    } else {
      alert('User Not Found');
      setloading(false);
      dispatch(setLoading(false));
    }
  };

  const sendOTP = async (phoneNumber) => {
    dispatch(setLoading(true));
    setloading(true);
    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(`${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success('OTP has been Sent to Mobile Number', {
          theme: 'colored',
        });

        const redirectUrl = searchParams.get('redirect');
        const signInUrl = redirectUrl
          ? `/signin-otp?redirect=${searchParams.get('redirect')}`
          : '/signin-otp';
        navigate(signInUrl, {
          state: {
            phoneNumber: phoneNumber,
          },
        });
        dispatch(setLoading(false));
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

  return (
    <div>
      {/* <AuthNavbar /> */}
      <section className="auth_layout login_screen">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div className="log-in-title">Log in</div>
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
                            mobileNumber: Yup.number().required('A phone number is required'),
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
                              <div id="signin-container"> </div>
                              <Field
                                name="mobileNumber"
                                render={({ field, formProps }) => (
                                  <Row className="mb-0">
                                    <FormLabel>Enter Number</FormLabel>
                                    <PhoneInput
                                      country={'in'}
                                      placeholder="Enter mobile number"
                                      value={field.value}
                                      onChange={(phone, data) => {
                                        setFieldValue('mobileNumber', phone);
                                        setFieldValue('mobileLength', data.dialCode.length);
                                      }}
                                      // disableCountryCode
                                    />
                                  </Row>
                                )}
                              />
                              {errors.mobileNumber && touched.mobileNumber ? (
                                <div className="error-text">{errors.mobileNumber}</div>
                              ) : null}
                              <div className="d-grid gap-2 mt-4">
                                <Button
                                  type="submit"
                                  variant="secondary"
                                  disabled={
                                    !(values.mobileNumber.length - values.mobileLength === 10) ||
                                    loading
                                  }>
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
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string().email('Invalid email').required('Required'),
                          })}
                          onSubmit={(values) => {
                            singInwithEmail(values);
                          }}
                          render={({ values, errors, touched, validateForm }) => (
                            <Form>
                              <h2 className="title-head">Sign in to Unikaksha</h2>
                              <Field
                                name="email"
                                render={({ field, formProps }) => (
                                  <Row className="mb-0">
                                    <FormGroup
                                      controlId="email"
                                      className="form-group-1 mb-3"
                                      as={Col}
                                      md="12">
                                      <FormLabel>Email ID</FormLabel>
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
                              <div className="d-grid gap-2">
                                <Button
                                  type="submit"
                                  className="btn-secondary"
                                  variant="secondary"
                                  disabled={!values.email || loading}>
                                  {loading ? 'Loading...' : 'Log in'}
                                </Button>
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
    </div>
  );
};

export default Login;
