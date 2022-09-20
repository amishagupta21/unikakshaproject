import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormCheck from 'react-bootstrap/FormCheck';
import FormSelect from 'react-bootstrap/FormSelect';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Row from 'react-bootstrap/Row';
import Logo from '../../assets/images/logo.svg';
import Loginbanner from '../../assets/images/login-banner.svg';
import back from '../../assets/images/back-arrow.svg';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { useDispatch } from 'react-redux';
import SocialLogin from '../../utils-componets/SocialLogin';
import { firebase } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { setLoading } from '../../redux/actions/LoaderActions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookie = new Cookies();

  const configureCaptcha = () =>
    (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN'
    }));

  const sendOTP = async (phoneNumber, remember) => {
    // dispatch(setLoading(true))
    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(`+91${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // dispatch(setLoading(false))
        toast.success('OTP has been Sent to Mobile Number', {
          theme: 'colored'
        });
        if (remember) {
          cookie.set('mobileNumber', phoneNumber, { path: '/' });
        }
        navigate('/otp', {
          state: {
            phoneNumber: phoneNumber
          }
        });
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored'
        });
        dispatch(setLoading(false));
      });
  };

  return (
    <section className="auth_layout login_screen">
      <div className="left_box">
        <img src={Loginbanner} />
      </div>
      <div className="right_box">
        <div className="right_box_container">
          <div className="back-action">
            <div className="back-arrow">
              <a
                onClick={() => {
                  navigate('/');
                }}>
                <img src={back} />
              </a>
            </div>
            <a href="#" className="logo">
              <img src={Logo} />
            </a>
          </div>
          <div className="auth_form">
            <div href="#" className="resetpassword create-account ">
              Not register yet,{' '}
              <a href="">
                {' '}
                <Link to="/signup">Create an Account</Link>
              </a>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={12}>
                  <Nav variant="pills" className="custom-tabs-container">
                    <Nav.Item>
                      <Nav.Link eventKey="first">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none">
                          <path
                            d="M6.6665 22.6667H5.33317C4.62593 22.6667 3.94765 22.3857 3.44755 21.8856C2.94746 21.3855 2.6665 20.7072 2.6665 20V6.66667C2.6665 5.95942 2.94746 5.28115 3.44755 4.78105C3.94765 4.28095 4.62593 4 5.33317 4H26.6665C27.3737 4 28.052 4.28095 28.5521 4.78105C29.0522 5.28115 29.3332 5.95942 29.3332 6.66667V20C29.3332 20.7072 29.0522 21.3855 28.5521 21.8856C28.052 22.3857 27.3737 22.6667 26.6665 22.6667H25.3332"
                            stroke="#EF6A28"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.0002 20L22.6668 28H9.3335L16.0002 20Z"
                            stroke="#EF6A28"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="27"
                          viewBox="0 0 20 27"
                          fill="none">
                          <path
                            d="M16 1H3.5C2.11929 1 1 2.11929 1 3.5V23.5C1 24.8807 2.11929 26 3.5 26H16C17.3807 26 18.5 24.8807 18.5 23.5V3.5C18.5 2.11929 17.3807 1 16 1Z"
                            stroke="#2D2D2D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.75 21H9.76235"
                            stroke="#2D2D2D"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Formik
                        initialValues={{
                          email: cookie.get('userName') ? cookie.get('userName') : ''
                        }}
                        validationSchema={Yup.object().shape({
                          email: Yup.string().email('Invalid email').required('Required')
                        })}
                        onSubmit={(values) => {
                          if (values.email) {
                            navigate('/password', {
                              state: {
                                email: values.email
                              }
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
                          validateForm
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
                                    <FormLabel>Email ID / Password</FormLabel>
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
                              render={() => (
                                <div className="forgot_section">
                                  <div href="#" className="resetpassword ">
                                    <a href="" path="">
                                      <Link to="/forgotpassword">Forgot Password</Link>
                                    </a>
                                  </div>
                                </div>
                              )}
                            />
                            <div className="button d-flex clearfix">
                              <Button
                                onClick={validateForm}
                                type="submit"
                                variant="info"
                                className="btn-lg justify-content-center ">
                                Login
                              </Button>
                            </div>
                          </Form>
                        )}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Formik
                        initialValues={{
                          mobileNumber: cookie.get('mobileNumber')
                            ? cookie.get('mobileNumber')
                            : '',
                          rememberMe: false
                        }}
                        validationSchema={Yup.object().shape({
                          mobileNumber: Yup.number()
                            .typeError("That doesn't look like a phone number")
                            .positive("A phone number can't start with a minus")
                            .integer("A phone number can't include a decimal point")
                            .min(1000000000, 'min 10 digit required')
                            .required('A phone number is required')
                        })}
                        onSubmit={(values) => {
                          const { mobileNumber, rememberMe } = values;
                          if (values.mobileNumber) {
                            sendOTP(mobileNumber, rememberMe);
                          }
                        }}
                        render={({
                          handleChange,
                          handleSubmit,
                          handleBlur,
                          values,
                          errors,
                          touched,
                          validateForm
                        }) => (
                          <Form>
                            <h2 className="title-head">Sign in to Unikaksha</h2>
                            <Field
                              name="mobileNumber"
                              render={({ field, formProps }) => (
                                <Row className="mb-0">
                                  <div id="sign-in-button"> </div>
                                  <FormGroup
                                    controlId="mobileNumber"
                                    className="form-group-1 mb-3"
                                    as={Col}
                                    md="12">
                                    <FormLabel>Mobile Number</FormLabel>
                                    <div className="user-class-mobile">
                                      <FormSelect id="form-control form-mobile-position">
                                        <option>+91</option>
                                      </FormSelect>
                                      <FormControl
                                        placeholder="Enter Mobile Number"
                                        type={'number'}
                                        value={field.value}
                                        onChange={field.onChange}
                                      />
                                    </div>
                                  </FormGroup>
                                </Row>
                              )}
                            />
                            {errors.mobileNumber && touched.mobileNumber ? (
                              <div className="error-text">{errors.mobileNumber}</div>
                            ) : null}
                            <Field
                              name="rememberMe"
                              render={({ field, formProps }) => (
                                <div className="forgot_section">
                                  <FormGroup className="custom_checkbox" controlId="rememberMe">
                                    <FormCheck
                                      type={'checkbox'}
                                      value={field.value}
                                      onChange={field.onChange}
                                      label="Remember me"
                                    />
                                  </FormGroup>
                                </div>
                              )}
                            />
                            <div className="button d-flex clearfix">
                              <Button
                                type="submit"
                                variant="info"
                                className="btn-lg justify-content-center ">
                                Continue with mobile
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
            <div className="sign-up-social">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
