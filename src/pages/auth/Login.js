import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormSelect from 'react-bootstrap/FormSelect';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { useDispatch } from 'react-redux';
import SocialLogin from '../../utils-componets/SocialLogin';
import { firebase } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { setLoading } from '../../redux/actions/LoaderActions';
import AuthNavbar from './components/AuthNavbar';
import './auth.scss';
import LeftBox from './components/LeftBox';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = new Cookies();

  const configureCaptcha = () => {
    return (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));
  };

  const sendOTP = async (phoneNumber) => {
    const appVerifier = configureCaptcha();
    // dispatch(setLoading(true))
    firebase
      .auth()
      .signInWithPhoneNumber(`+${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // dispatch(setLoading(false))
        toast.success('OTP has been Sent to Mobile Number', {
          theme: 'colored',
        });

        navigate('/signin-otp', {
          state: {
            phoneNumber: phoneNumber,
          },
        });
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
        dispatch(setLoading(false));
      });
  };

  return (
    <div>
      <AuthNavbar />
      <section className="auth_layout login_screen">
        <LeftBox />
        <div className="right_box">
          <div className="right_box_container">
            <div className="log-in-title">Log in</div>
            <div href="#" className="resetpassword create-account">
              Don't have account?
              <a href="">
                <Link to="/signup"> Create New</Link>
              </a>
            </div>
            <div href="#" className="signin-text">
              Signin using
            </div>
            <div className="auth_form">
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                  <Col sm={12}>
                    <Nav variant="pills" className="custom-tabs-container">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <Button>Mobile</Button>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <Button>Email</Button>
                        </Nav.Link>
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
                            const { mobileNumber } = values;
                            console.log('moo ::::', mobileNumber);
                            if (values.mobileNumber) {
                              sendOTP(mobileNumber);
                            }
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
                              <div id="sign-in-button"> </div>
                              <Field
                                name="mobileNumber"
                                render={({ field, formProps }) => (
                                  <Row className="mb-0">
                                    <FormLabel>Enter Number</FormLabel>
                                    <PhoneInput
                                      country={'us'}
                                      value={field.value}
                                      onChange={(phone, data) => {
                                        setFieldValue('mobileNumber', phone);
                                        setFieldValue('mobileLength', data.dialCode.length);
                                      }}
                                    />
                                  </Row>
                                )}
                              />
                              {errors.mobileNumber && touched.mobileNumber ? (
                                <div className="error-text">{errors.mobileNumber}</div>
                              ) : null}
                              <div className="d-grid gap-2">
                                {console.log('op==>>', values.mobileLength)}
                                <Button
                                  type="submit"
                                  variant="info"
                                  disabled={
                                    !(values.mobileNumber.length - values.mobileLength === 10)
                                  }>
                                  Log in
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
                            if (values.email) {
                              navigate('/password', {
                                state: {
                                  email: values.email,
                                },
                              });
                            }
                          }}
                          render={({
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            values,
                            errors,
                            touched,
                            validateForm,
                          }) => (
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
                                <Button type="submit" variant="info">
                                  Log in
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
              <SocialLogin />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
