import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FormCheck, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form, Field, Formik } from 'formik'
import * as Yup from 'yup';
import Logo from '../../assets/images/logo.svg';
import Loginbanner from '../../assets/images/login-banner.svg';
import back from '../../assets/images/back-arrow.svg';
import eye from '../../assets/images/icon-eye-view.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logInWithEmailAndPassword } from '../../firebase/firebaseAuth';
import { clearEmail } from '../../redux/actions/AuthActions';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const username = useSelector(state => state?.auth?.email)

  return (
    <section className='auth_layout login_screen'>
      <div className='left_box'>
        <img src={Loginbanner} />
      </div>
      <div className='right_box'>
        <div className='right_box_container'>
          <div className='back-action'>
            <div className="back-arrow"><a onClick={() => {
              dispatch(clearEmail())
              navigate('/')
            }}><img src={back} /></a></div>
            <a onClick={() =>
              navigate('/')
            } className='logo'><img src={Logo} /></a>
          </div>
          <div className='auth_form'>
            <h3>Enter your password</h3>
            <p>Please enter your Unikaksha password for <br /><a href="">
              {username && username}</a></p>
            <Formik
              initialValues={{
                password: '',
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .required('Password is required')
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                  ),
              })}
              onSubmit={async (values) => {
                if (values.password) {
                  let response = await logInWithEmailAndPassword(username, values.password)
                  localStorage.setItem("user", JSON.stringify(response.user))
                  if (response) navigate('/home')
                }
              }}
              render={({ handleChange, handleSubmit, handleBlur, values, errors, touched, validateForm }) => (
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
                                type="password"
                                placeholder="Enter Password"
                                value={field.value}
                                onChange={field.onChange}
                              />
                              <i className="password-view">
                                <img src={eye} />
                              </i>
                            </div>
                          </FormGroup>
                        </Row>
                      )}
                    />
                    {errors.password && touched.password ? (<div className="error-text">{errors.password}</div>) : null}
                    <Field
                      name="rememberMe"
                      render={({ field, formProps }) => (
                        <div className="forgot_section">
                          <FormGroup
                            className="custom_checkbox"
                            controlId="rememberMe">
                            <FormCheck
                              type={'checkbox'}
                              value={field.value}
                              onChange={field.onChange}
                              label="Remember me" />
                          </FormGroup>
                          <div href="#" className="resetpassword ">
                            <a href="" path="">
                              <Link to="/forgotpassword">Forgot Password</Link>
                            </a>
                          </div>
                        </div>
                      )}
                    />
                  </Row>
                  <div className='button d-flex clearfix'>
                    <Button type="submit" variant="info" className='btn-lg  justify-content-center'>Login</Button>
                  </div>
                  <div className='or-password'>
                    or
                  </div>
                  <div className='button d-flex clearfix'>
                    <Button
                      variant="info"
                      className='btn-lg justify-content-center btn-border mt-0'>Sign in with a verification Link </Button>
                  </div>
                  <div className='forgotton-link'>
                    <a href="">Forgotten your password ?</a>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login