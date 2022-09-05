import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Logo from "../../assets/images/logo.svg";
import * as Yup from 'yup';
import Loginbanner from "../../assets/images/login-banner.svg";
import back from "../../assets/images/back-arrow.svg";
import eye from "../../assets/images/icon-eye-view.svg";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form, Field, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { registerWithEmailAndPassword } from "../../firebase/firebaseAuth";
import { useNavigate } from 'react-router-dom'

const SetPasssword = () => {
  const email = useSelector(state => state?.auth?.email)
  const navigate = useNavigate();
  return (
    <section className="auth_layout login_screen">
      <div className="left_box">
        <img src={Loginbanner} />
      </div>
      <div className="right_box">
        <div className="right_box_container">
          <div className='back-action'>
            <div className="back-arrow"><a onClick={() => navigate('/')}><img src={back} /></a></div>
            <a onClick={() => navigate('/')} className='logo'><img src={Logo} /></a>
          </div>
          <div className="auth_form">
            <h3>Create a new password</h3>
            <p>
              Use a minimum of 6 characters, including uppercase letters, <br />
              lowercase letters and numbers.
            </p>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: ""
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .required('Password is required')
                  .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                  ),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
              })}
              onSubmit={async (values) => {
                if (values.password === values.confirmPassword) {
                  let response = await registerWithEmailAndPassword(email, email, values.password)
                  localStorage.setItem("user", JSON.stringify(response.user))
                  if (response.user) {
                    navigate('/home')
                  }
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
                      name="confirmPassword"
                      render={({ field, formProps }) => (
                        <Row className="mb-0">
                          <FormGroup
                            as={Col}
                            controlId="confirmPassword"
                            className="form-group-1 mb-3"
                            md="12">
                            <FormLabel className="custom-label">Confirm Password</FormLabel>
                            <div className="password-view-container">
                              <FormControl
                                type="password"
                                placeholder="Re-enter Password"
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
                    {errors.confirmPassword && touched.confirmPassword ? (<div className="error-text">{errors.confirmPassword}</div>) : null}
                    <div className="button d-flex clearfix mb-3">
                      <Button
                        type="submit"
                        variant="info"
                        className="btn-lg justify-content-center mt-4 mb-5"
                      >
                        Register
                      </Button>
                    </div>
                  </Row>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetPasssword;