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
import { Modal } from 'react-bootstrap'
import {  trashWhite } from '../../assets/images';
import './AccountSettings.scss';
  
  import ApiService from '../../services/ApiService';   
  import { firebase } from '../../firebase/firebase';
//   import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import { logout } from '../../firebase/firebaseAuth';
import { openToaster } from '../../redux/actions/ToastAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setLoading } from '../../redux/actions/LoaderActions';



const AccountSettings = () => {

    // const [loading, setloading] = useState();
   
    const location = useLocation();
    const [authError, setAuthError] = React.useState();
    const [userDetails, setUserDetails] = React.useState({});
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
     
    }, []);

    const onDeleteFail = () => {
        dispatch(openToaster({
          show: true,
          header: 'Error!', 
          variant: 'Danger',
          body: 'Unable to delete account. Please try again!'
        }))
      }

      const logOutHandler = async () => {
        await logout();
        dispatch(setIsAuthenticated(false));
        navigate('/');
      };

    const updateUserPassword = (formValues) => {

        dispatch(setLoading(true));

        const user = firebase.auth().currentUser;
        // console.log(user);return;
        const credential = firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email,
        formValues.current_password
        );
        user.reauthenticateWithCredential(credential).then(function() {
            const newPassword = formValues.new_password;

            user.updatePassword(newPassword).then(() => {
                dispatch(
                    openToaster({
                      show: true,
                      header: 'Success!',
                      variant: 'info',
                      body: 'Password was updated successfully!',
                    })
                  );
                  dispatch(setLoading(false));
                  window.location.reload();
            }).catch((error) => {
                console.log(error)
                setAuthError('Current password is invalid, Please enter the correct password.');
            });
            console.log(credential)
          }).catch(function(error) {
            setAuthError('Current password is invalid, Please enter the correct password.');
            console.log(error)
          });
          dispatch(setLoading(false));
        
    }

    return (
        <>
        <div className="account-settings right_box">
            <div className="right_box_container">
                <div className="log-in-title 1">Reset Password</div>
                <p>Note: New Password must be 8 characters long.</p>
                <div className="auth_form">
                <div id="signup-container"> </div>
                {/* {authError && (
                    <Alert key="danger" variant="danger">
                    {authError}
                    </Alert>
                )} */}
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        current_password: '',
                        new_password: '',
                        confirm_password: ''
                    }}
                    validationSchema={Yup.object().shape({
                        current_password: Yup.string().required('Current password is a required field'),
                        new_password: Yup.string()
                            .required('New password is a required field')
                            .min(8, 'Password must be 8 characters long'),
                            
                        confirm_password: Yup.string()
                        .min(8, 'Your password is too short.')
                        .required('Confirm new password is a required field.')
                        .oneOf([Yup.ref('new_password'), null], 'New password & Confirm new password both need to be the same.'),
                    })}
                    onSubmit={(values) => {
                        updateUserPassword(values);
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
                        name="current_password"
                        render={({ field, formProps }) => (
                            <Row className="mb-0">
                            <FormGroup
                                controlId="current_password"
                                className="form-group-1 mb-3"
                                as={Col}
                                md="12">
                                <FormLabel>
                                Current Password<em className="red top">*</em>
                                </FormLabel>
                                <FormControl
                                placeholder="Enter your current password here"
                                type={'password'}
                                value={field.value}
                                onChange={field.onChange}
                                />
                            </FormGroup>
                            </Row>
                        )}
                        />
                        {errors.current_password && touched.current_password ? (
                        <div className="error-text">{errors.current_password}</div>
                        ) : null}
                        <Field
                        name="new_password"
                        render={({ field, formProps }) => (
                            <Row className="mb-0">
                            <FormGroup
                                controlId="new_password"
                                className="form-group-1 mb-3"
                                as={Col}
                                md="12">
                                <FormLabel>
                                New Password<em className="red top">*</em>
                                </FormLabel>
                                <FormControl
                                placeholder="Enter your new password here"
                                type={'password'}
                                value={field.value}
                                onChange={field.onChange}
                                />
                            </FormGroup>
                            </Row>
                        )}
                        />
                        {errors.new_password && touched.new_password ? (
                        <div className="error-text">{errors.new_password}</div>
                        ) : null}

                        <Field
                        name="confirm_password"
                        render={({ field, formProps }) => (
                            <Row className="mb-0">
                            <FormGroup
                                controlId="confirm_password"
                                className="form-group-1 mb-3"
                                as={Col}
                                md="12">
                                <FormLabel>
                                Confirm New Password<em className="red top">*</em>
                                </FormLabel>
                                <FormControl
                                placeholder="Enter your confirm password here"
                                type={'password'}
                                value={field.value}
                                onChange={field.onChange}
                                />
                            </FormGroup>
                            </Row>
                        )}
                        />
                        {errors.confirm_password && touched.confirm_password ? (
                        <div className="error-text">{errors.confirm_password}</div>
                        ) : null}

                        {authError && (
                            <div className="error-text">{authError}</div>
                            
                        )}

                        <div className="d-grid gap-2 mt-3 mb-3">
                        <Button
                            type="submit"
                            disabled={!isValid }
                            style={{ fontWeight: '500' }}
                            variant="secondary">
                            {/* {loading ? 'Loading...' : 'Reset'} */}
                            Reset
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
                        type="submit" className="button-sml"
                        // disabled={!isValid || loading}
                        style={{ fontWeight: '500' }}
                        variant="secondary">
                        {/* {loading ? 'Loading...' : 'Download'} */}
                        Download
                    </Button>
                    </div>
            </div>
            <div className="right_box_container">
                <div className="log-in-title 1">Delete Account</div>
                <span>Your account will be deleted permanently you will not be able to access the data.</span>
                <div className="d-grid gap-2 mt-3 mb-3">
                    {/*<Button
                       // type="submit"
                        // disabled={!isValid || loading}
                        style={{ fontWeight: '500' }}
                        variant="secondary">
                        {/* {loading ? 'Loading...' : 'Delete'} */}
                        {/* Delete */}
                   

                    <Button className="delete-link delete-link-pixel" onClick={() => setShowDeleteModal(true)} variant="secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
<path d="M18.3762 6.38867C18.3587 6.38867 18.3324 6.38867 18.3062 6.38867C13.6774 5.92492 9.05743 5.74992 4.48118 6.21367L2.69618 6.38867C2.32868 6.42367 2.00493 6.16117 1.96993 5.79367C1.93493 5.42617 2.19743 5.11117 2.55618 5.07617L4.34118 4.90117C8.99618 4.42867 13.7124 4.61242 18.4374 5.07617C18.7962 5.11117 19.0587 5.43492 19.0237 5.79367C18.9974 6.13492 18.7087 6.38867 18.3762 6.38867Z" fill="#FF3838"/>
<path d="M7.43717 5.50695C7.40217 5.50695 7.36717 5.50695 7.32342 5.4982C6.97342 5.43695 6.72842 5.0957 6.78967 4.7457L6.98217 3.59945C7.12217 2.75945 7.31467 1.5957 9.35342 1.5957H11.6459C13.6934 1.5957 13.8859 2.8032 14.0172 3.6082L14.2097 4.7457C14.2709 5.10445 14.0259 5.4457 13.6759 5.4982C13.3172 5.55945 12.9759 5.31445 12.9234 4.96445L12.7309 3.82695C12.6084 3.0657 12.5822 2.91695 11.6547 2.91695H9.36217C8.43467 2.91695 8.41717 3.03945 8.28592 3.8182L8.08467 4.9557C8.03217 5.27945 7.75217 5.50695 7.43717 5.50695Z" fill="#FF3838"/>
<path d="M13.3081 20.4056H7.69061C4.63686 20.4056 4.51436 18.7169 4.41811 17.3519L3.84936 8.54064C3.82311 8.18189 4.10311 7.86689 4.46186 7.84064C4.82936 7.82314 5.13561 8.09439 5.16186 8.45314L5.73061 17.2644C5.82686 18.5944 5.86186 19.0931 7.69061 19.0931H13.3081C15.1456 19.0931 15.1806 18.5944 15.2681 17.2644L15.8369 8.45314C15.8631 8.09439 16.1781 7.82314 16.5369 7.84064C16.8956 7.86689 17.1756 8.17314 17.1494 8.54064L16.5806 17.3519C16.4844 18.7169 16.3619 20.4056 13.3081 20.4056Z" fill="#FF3838"/>
<path d="M11.9528 15.5938H9.03906C8.68031 15.5938 8.38281 15.2962 8.38281 14.9375C8.38281 14.5788 8.68031 14.2812 9.03906 14.2812H11.9528C12.3116 14.2812 12.6091 14.5788 12.6091 14.9375C12.6091 15.2962 12.3116 15.5938 11.9528 15.5938Z" fill="#FF3838"/>
<path d="M12.6885 12.0957H8.31348C7.95473 12.0957 7.65723 11.7982 7.65723 11.4395C7.65723 11.0807 7.95473 10.7832 8.31348 10.7832H12.6885C13.0472 10.7832 13.3447 11.0807 13.3447 11.4395C13.3447 11.7982 13.0472 12.0957 12.6885 12.0957Z" fill="#FF3838"/>
</svg>  Delete 
                </Button>
                    </div>
            </div>
            <DeleteAccountModal onDeleteFail={onDeleteFail} show={showDeleteModal} toggle={setShowDeleteModal} logOutHandler={logOutHandler}/>
        </div>
        </>
    )     
}

export default AccountSettings;

const DeleteAccountModal = ({ show, toggle, onDeleteFail, logOutHandler }) => {
    const handleClose = () => toggle(false);
    const dispatch = useDispatch();
  
    const deleteAccount = async () => {
      dispatch(setLoading(true));
      const user = firebase.auth().currentUser;
      const res = await ApiService(`user/uid/${user.uid}/delete`, 'DELETE', {}, true);
      dispatch(setLoading(false));
      handleClose();
      if(res?.data?.code === 200) {
        logOutHandler();
      } else {
        onDeleteFail();
      }
    }
  
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          dialogClassName="delete-modal delete-modal-lg">
          <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="info-content">Your account will be deleted permanently you will not be able to access the data.</p>
          </Modal.Body>
          <Modal.Footer className='justify-content-around'>
              <Button variant="danger" style={{ width: '120px' }} onClick={deleteAccount}>
              <img
                src={trashWhite}
                alt="TrashDelete"
                className="trash-delete"
                
              />{' '}
             
                Delete
              </Button>
              <Button variant="outline-primary" style={{ width: '120px' }} onClick={handleClose}>
                Cancel
              </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };