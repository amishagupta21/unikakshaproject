import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Logo from "../../assets/images/logo.svg";
import Loginbanner from "../../assets/images/login-banner.svg";
import back from "../../assets/images/back-arrow.svg";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import FormCheck from 'react-bootstrap/FormCheck';
import { Form, Field, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import SocialLogin from "../../utils-componets/SocialLogin";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  return (
    <section className="auth_layout login_screen">
      <div className="left_box">
        <img src={Loginbanner} />
      </div>
      <div className="right_box">
        <div className="right_box_container">
          <div className="back-action">
            <div className="back-arrow">
              <a onClick={() => {
                navigate('/')
              }
              }>
                <img src={back} />
              </a>
            </div>
            <a href="#" className="logo">
              <img src={Logo} />
            </a>
          </div>
          <div className="auth_form">
            <h3>Create an Account or Register </h3>
            <Formik
              initialValues={{
                email: '',
                rememberMe: false
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Invalid email')
                  .required('Required'),
              })}
              onSubmit={(values) => {
                if (values.email) {
                  navigate("/setpassword", {
                    state: {
                      email: values.email,
                    }
                  })
                }
              }}
              render={({ handleChange, handleSubmit, handleBlur, values, errors, touched, validateForm }) => (
                <Form>
                  <h2 className="title-head">Sign in to Unikaksha</h2>
                  <Row className="mb-0 mt-4">
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
                            <FormControl placeholder="Enter Email ID" type={'text'} value={field.value} onChange={field.onChange} />
                          </FormGroup>
                        </Row>
                      )}
                    />
                    {errors.email && touched.email ? (<div className="error-text">{errors.email}</div>) : null}
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
                    <div className="button d-flex clearfix">
                      <Button
                        type="submit"
                        variant="info"
                        className="btn-lg  justify-content-center mb-3"
                      >
                        Create Account
                      </Button>
                    </div>
                  </Row>
                </Form>

              )}
            />
            <div className="sign-up-social mb-3">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Signup;
