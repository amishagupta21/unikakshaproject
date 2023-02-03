import React, {useEffect, useState} from "react";
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
// import {
//     Button,
//     ButtonGroup,
//     Card,
//     Col,
//     Container,
//     Modal,
//     Nav,
//     Row,
//     ToggleButton,
//   } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import facebookIcon from '../../assets/images/Facebook-icon.svg';
import googleIcon from '../../assets/images/Google-icon.svg';
import AppleIcon from '../../assets/images/apple-icon.svg';
import './AccountSettings.scss';
  
  import ApiService from '../../services/ApiService';   
  import { firebase } from '../../firebase/firebase';
//   import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import { logout } from '../../firebase/firebaseAuth';
import { openToaster } from '../../redux/actions/ToastAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const AccountSettings = () => {

    const [loading, setloading] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [authError, setAuthError] = React.useState();
    const [userDetails, setUserDetails] = React.useState({});

    useEffect(() => {
     
    }, []);

    return (
        <>
        <div className="account-settings right_box">
            <div className="right_box_container">
                <div className="log-in-title 1">Reset Password</div>
                
                <div className="auth_form">
                <div id="signup-container"> </div>
                {authError && (
                    <Alert key="danger" variant="danger">
                    {authError}
                    </Alert>
                )}
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                    fullName: userDetails ? userDetails.fullName : '',
                    email: userDetails ? userDetails.email : '',
                    mobileNumber: userDetails? userDetails.mobileNumber : '',
                    whatsappoptin: true,
                    }}
                    validationSchema={Yup.object().shape({
                    fullName: Yup.string().required('Current password is a required field'),
                    email: Yup.string()
                        .email('Please enter a valid email')
                        .required('New password is a required field'),
                    mobileNumber: Yup.string()
                        .min(10, 'Too short')
                        .required('Confirm new password is a required field'),
                    })}
                    onSubmit={(values) => {
                    createUser(values);
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
                    isValid,
                    }) => (
                    <Form>
                        <Field
                        name="fullName"
                        render={({ field, formProps }) => (
                            <Row className="mb-0">
                            <FormGroup
                                controlId="fullName"
                                className="form-group-1 mb-3"
                                as={Col}
                                md="12">
                                <FormLabel>
                                Current Password<em className="red top">*</em>
                                </FormLabel>
                                <FormControl
                                placeholder="Enter your current password here"
                                type={'text'}
                                value={field.value}
                                onChange={field.onChange}
                                />
                            </FormGroup>
                            </Row>
                        )}
                        />
                        {errors.fullName && touched.fullName ? (
                        <div className="error-text">{errors.fullName}</div>
                        ) : null}
                        <Field
                        name="email"
                        render={({ field, formProps }) => (
                            <Row className="mb-0">
                            <FormGroup
                                controlId="email"
                                className="form-group-1 mb-3"
                                as={Col}
                                md="12">
                                <FormLabel>
                                New Password<em className="red top">*</em>
                                </FormLabel>
                                <FormControl
                                placeholder="Enter your new password here"
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
                        name="mobileNumber"
                        render={({ field, formProps }) => (
                            <Row className="mb-0">
                            <FormLabel>
                            Confirm New Password<em className="red top">*</em>
                            </FormLabel>
                            
                            <FormControl
                                placeholder="Enter your confirm password here"
                                type={'text'}
                                value={field.value}
                                onChange={field.onChange}
                                />
                            </Row>
                        )}
                        />
                        <br />
                        {errors.mobileNumber && touched.mobileNumber ? (
                        <div className="error-text">{errors.mobileNumber}</div>
                        ) : null}

                        

                        <div className="d-grid gap-2 mt-3 mb-3">
                        <Button
                            type="submit"
                            disabled={!isValid || loading}
                            style={{ fontWeight: '500' }}
                            variant="secondary">
                            {loading ? 'Loading...' : 'Reset'}
                        </Button>
                        </div>
                        
                    
                        
                    </Form>
                    )}
                />
                </div>

                
               
                
            </div>

            <div className="right_box_container">
                <div className="log-in-title 1">Linked Account</div>
                <Row className="my-2">
                    <Col  md={12}>
                    <div
                        className='upload-container uploading' >
                        <div className="uploadbtn-text">
                        <img className="mx-2" src={googleIcon} alt="google" />
                            <span><h6>Google</h6></span> <br />
                            {/* <span><p>john.smith@gmail.com</p></span> */}
                        </div>
                        <div className="upload-btn">
                        
                        </div>
                    </div>
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col  md={12}>
                    <div
                        className='upload-container uploading' >
                        <div className="uploadbtn-text">
                        <img className="mx-2" src={facebookIcon} alt="facebook" />
                            <span><h6>Facebook</h6></span>
                            
                        </div>
                        <div className="upload-btn">
                        
                        </div>
                        
                    </div>
                    </Col>
                    <Col  md={12}>
                    <div>
                        <span><p>Enable one click login for Seamless Login Experience.</p></span></div>
                    </Col>
                </Row>
                <Row className="my-2">
                    <Col  md={12}>
                    <div
                        className='upload-container uploading' >
                        <div className="uploadbtn-text">
                        <img className="mx-2" src={AppleIcon} alt="AppleIcon" />
                            <span><h6>Apple</h6></span>
                            {/* <span><p>Enable one click login for Seamless Login Experience.</p></span> */}
                        </div>
                        <div className="upload-btn">
                        
                        </div>
                    </div>
                    </Col>
                    <Col  md={12}>
                    <div>
                        <span><p>Enable one click login for Seamless Login Experience.</p></span></div>
                    </Col>
                </Row>
                
            </div>


            <div className="right_box_container">
                <div className="log-in-title 1">Download Copy of your data</div>
                <span>You will receive profile information and course related data as a Zip file in the next 24 hours on your registered email address.</span>
                <div className="d-grid gap-2 mt-3 mb-3">
                    <Button
                        type="submit"
                        // disabled={!isValid || loading}
                        style={{ fontWeight: '500' }}
                        variant="secondary">
                        {loading ? 'Loading...' : 'Download'}
                    </Button>
                    </div>
            </div>
            <div className="right_box_container">
                <div className="log-in-title 1">Delete Account</div>
                <span>Your account will be deleted permanently you will not be able to access the data.</span>
                <div className="d-grid gap-2 mt-3 mb-3">
                    <Button
                        type="submit"
                        // disabled={!isValid || loading}
                        style={{ fontWeight: '500' }}
                        variant="secondary">
                        {loading ? 'Loading...' : 'Delete'}
                    </Button>
                    </div>
            </div>
        </div>
        </>
    )     
}

export default AccountSettings;