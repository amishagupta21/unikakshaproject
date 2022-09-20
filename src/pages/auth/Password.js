import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/images/logo.svg';
import Loginbanner from '../../assets/images/login-banner.svg';
import back from '../../assets/images/back-arrow.svg';
import eye from '../../assets/images/icon-eye-view.svg';
import eyeIconVisible from '../../assets/images/icon-eye-visible.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logInWithEmailAndPassword } from '../../firebase/firebaseAuth';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { setLoading } from '../../redux/actions/LoaderActions';

const Password = () => {
  const cookie = new Cookies();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const email = location?.state?.email;

  const [eyeVisible, setEyeVisible] = useState(false);

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
            <a onClick={() => navigate('/')} className="logo">
              <img src={Logo} />
            </a>
          </div>
          <div className="auth_form">
            <h3>Enter your password</h3>
            <p>
              Please enter your Unikaksha password for <br />
              <a href="">{email && email}</a>
            </p>
            <Formik
              initialValues={{
                password: '',
                rememberMe: false
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .required('Password is required')
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
                  )
              })}
              onSubmit={async (values) => {
                if (values.password && email) {
                  dispatch(setLoading(true));
                  let response = await logInWithEmailAndPassword(email, values.password);
                  dispatch(setLoading(false));
                  if (response?.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    console.log('ddd');
                    if (values.rememberMe) {
                      console.log('inside');
                      cookie.set('userName', email, { path: '/' });
                    }
                    toast.success('Log in Succesfull', {
                      theme: 'colored'
                    });
                    navigate('/home');
                  }
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
                  <Row className="mb-0">
                    <Field
                      name="password"
                      render={({ field, formProps }) => (
                        <Row className="mb-0">
                          <FormGroup
                            as={Col}
                            controlId="password"
                            className="form-group-1 mb-3"
                            md="12">
                            <FormLabel className="custom-label">Password</FormLabel>
                            <div className="password-view-container">
                              <FormControl
                                type={eyeVisible ? 'text' : 'password'}
                                placeholder="Enter Password"
                                value={field.value}
                                onChange={field.onChange}
                              />
                              <i className="password-view">
                                <img
                                  onClick={() => setEyeVisible(!eyeVisible)}
                                  src={eyeVisible ? eyeIconVisible : eye}
                                />
                              </i>
                            </div>
                          </FormGroup>
                        </Row>
                      )}
                    />
                    {errors.password && touched.password ? (
                      <div className="error-text">{errors.password}</div>
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
                          <div href="#" className="resetpassword ">
                            <a path="">
                              <Link to="/forgotpassword">Forgot Password</Link>
                            </a>
                          </div>
                        </div>
                      )}
                    />
                  </Row>
                  <div className="button d-flex clearfix">
                    <Button type="submit" variant="info" className="btn-lg  justify-content-center">
                      Login
                    </Button>
                  </div>
                  <div className="or-password">or</div>
                  <div className="button d-flex clearfix">
                    <Button
                      variant="info"
                      className="btn-lg justify-content-center btn-border mt-0">
                      Sign in with a verification Link{' '}
                    </Button>
                  </div>
                  <div className="forgotton-link">
                    <a>
                      <Link to="/forgotpassword">Forgotten your password ?</Link>
                    </a>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Password;
