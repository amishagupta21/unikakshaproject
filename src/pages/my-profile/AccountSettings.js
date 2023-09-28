import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
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
import facebookIcon from '../../assets/images/ico-io-fb.svg';
import googleIcon from '../../assets/images/icon-io-g.svg';
import AppleIcon from '../../assets/images/apple-icon.svg';
import { Modal } from 'react-bootstrap';
import { trashWhite } from '../../assets/images';
import './AccountSettings.scss';

import ApiService from '../../services/ApiService';
import { firebase } from '../../firebase/firebase';
import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import { logout } from '../../firebase/firebaseAuth';
import { openToaster } from '../../redux/actions/ToastAction';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setLoading } from '../../redux/actions/LoaderActions';
import DeleteModel from '../../components/DeleteModel';

const AccountSettings = () => {
  // const [loading, setloading] = useState();

  const location = useLocation();
  const [authError, setAuthError] = React.useState();
  const [userDetails, setUserDetails] = React.useState({});
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [confirmNewShowPassword, setConfirmNewShowPassword] = useState(false);

  useEffect(() => {}, []);

  const onDeleteFail = () => {
    dispatch(
      openToaster({
        show: true,
        header: 'Error!',
        variant: 'Danger',
        body: 'Unable to delete account. Please try again!',
      })
    );
  };

  const logOutHandler = async () => {
    await logout();
    dispatch(setIsAuthenticated(false));
    navigate('/');
    window.location.reload();
  };

  const [deletePop, setDeletePop] = React.useState(false);
  const deletepopup = () => {
    setDeletePop(!deletePop);
  };
  const cancelHandler = () => {
    setDeletePop(!deletePop);
  };

  const cancelIconHandler = () => {
    setDeletePop(!deletePop);
  };
  const handleClose = () => toggle(false);

  const deleteHandler = async () => {
    dispatch(setLoading(true));
    const user = firebase.auth().currentUser;
    const res = await ApiService(`user/uid/${user.uid}/delete`, 'DELETE', {}, true);
    // console.log(res)
    dispatch(setLoading(false));
    if (res?.data?.code === 200) {
      await logOutHandler();
      handleClose();
    } else {
      onDeleteFail();
    }
    setDeletePop(!deletePop);
  };

  const updateUserPassword = (formValues) => {
    dispatch(setLoading(true));
    const user = firebase.auth().currentUser;
    // console.log(user);return;
    const credential = firebase.auth.EmailAuthProvider.credential(
      firebase.auth().currentUser.email,
      formValues.current_password
    );
    user
      .reauthenticateWithCredential(credential)
      .then(function () {
        const newPassword = formValues.new_password;

        user
          .updatePassword(newPassword)
          .then(() => {
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
          })
          .catch((error) => {
            console.log(error);
            setAuthError('Current password is invalid, Please enter the correct password.');
          });
        console.log(credential);
      })
      .catch(function (error) {
        setAuthError('Current password is invalid, Please enter the correct password.');
        console.log(error);
      });
    dispatch(setLoading(false));
  };

  return (
    <>
      <div className="account-settings right_box right_box_accounts">
        <div className="right_box_container">
          <div className="log-in-title 1 mb-5">Reset Password</div>
          {/* <p>Note: New Password must be 8 characters long.</p> */}
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
                confirm_password: '',
              }}
              validationSchema={Yup.object().shape({
                current_password: Yup.string().required('Current password is a required field'),
                new_password: Yup.string()
                  .required('New password is a required field')
                  .min(8, 'Password must be 8 characters long'),

                confirm_password: Yup.string()
                  .min(8, 'Your password is too short.')
                  .required('Confirm new password is a required field.')
                  .oneOf(
                    [Yup.ref('new_password'), null],
                    'New password & Confirm new password both need to be the same.'
                  ),
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
                      <Row className="mb-2">
                        <FormGroup
                          controlId="current_password"
                          className="form-group-1 mb-3"
                          as={Col}
                          md="12">
                          <FormLabel>
                            Current Password<em className="red top">*</em>
                          </FormLabel>
                          <div className="position-relative">
                            <FormControl
                              placeholder="Enter your current password here"
                              type={showPassword ? 'text' : 'password'}
                              // type={'password'}
                              value={field.value}
                              onChange={field.onChange}
                            />
                            <Button
                              variant="outline-secondary"
                              className="password-toggle"
                              onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                <i className="bi bi-eye-slash-fill"></i>
                              ) : (
                                <i className="bi bi-eye-fill"></i>
                              )}
                            </Button>
                          </div>
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
                      <Row className="mb-2">
                        <FormGroup
                          controlId="new_password"
                          className="form-group-1 mb-3"
                          as={Col}
                          md="12">
                          <FormLabel>
                            New Password<em className="red top">*</em>
                          </FormLabel>
                          <div className="position-relative">
                            <FormControl
                              placeholder="Enter your new password here"
                              type={confirmShowPassword ? 'text' : 'password'}
                              // type={'password'}
                              value={field.value}
                              onChange={field.onChange}
                            />
                            <Button
                              variant="outline-secondary"
                              className="password2-toggle"
                              onClick={() => setConfirmShowPassword(!confirmShowPassword)}>
                              {confirmShowPassword ? (
                                <i className="bi bi-eye-slash-fill"></i>
                              ) : (
                                <i className="bi bi-eye-fill"></i>
                              )}
                            </Button>
                          </div>
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
                      <Row className="mb-2">
                        <FormGroup
                          controlId="confirm_password"
                          className="form-group-1 mb-3"
                          as={Col}
                          md="12">
                          <FormLabel>
                            Confirm New Password<em className="red top">*</em>
                          </FormLabel>
                          <div className="position-relative">
                            <FormControl
                              placeholder="Enter your confirm password here"
                              type={confirmNewShowPassword ? 'text' : 'password'}
                              // type={'password'}
                              value={field.value}
                              onChange={field.onChange}
                            />
                            <Button
                              variant="outline-secondary"
                              className="password3-toggle"
                              onClick={() => setConfirmNewShowPassword(!confirmNewShowPassword)}>
                              {confirmNewShowPassword ? (
                                <i className="bi bi-eye-slash-fill"></i>
                              ) : (
                                <i className="bi bi-eye-fill"></i>
                              )}
                            </Button>
                          </div>
                        </FormGroup>
                      </Row>
                    )}
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <div className="error-text">{errors.confirm_password}</div>
                  ) : null}

                  {authError && <div className="error-text">{authError}</div>}

                  <div className="d-grid gap-2 mt-3 mb-3">
                    <Button
                      type="submit"
                      disabled={!isValid}
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

        <div className="right_box_container mt-5 linked-right">
          <div className="log-in-title link-my">Linked Account - (Coming Soon)</div>
          <Row className="my-2">
            <Col md={12}>
              <div className="upload-container uploading">
                <div className="uploadbtn-text">
                  <img className="mx-2" src={googleIcon} alt="google" />
                  <span>
                    <h6>Google</h6>
                  </span>
                  {/* <span><p>john.smith@gmail.com</p></span> */}
                </div>
                <div className="upload-btn"></div>
              </div>
            </Col>
          </Row>
          <Row className="my-2">
            <Col md={12}>
              <div className="upload-container uploading">
                <div className="uploadbtn-text">
                  <img className="mx-2" src={facebookIcon} alt="facebook" />
                  <div className="sc-login-find">
                    <h6>Facebook</h6>
                    <span>Enable one click login for Seamless Login Experience.</span>
                  </div>
                </div>
                <div className="upload-btn"></div>
              </div>
            </Col>
          </Row>
          <Row className="my-2">
            <Col md={12}>
              <div className="upload-container uploading">
                <div className="uploadbtn-text">
                  <img className="mx-2" src={AppleIcon} alt="AppleIcon" />
                  <div className="sc-login-find">
                    <h6>Apple</h6>
                    <span>Enable one click login for Seamless Login Experience.</span>
                  </div>
                  {/* <span><p>Enable one click login for Seamless Login Experience.</p></span> */}
                </div>
                <div className="upload-btn"></div>
              </div>
            </Col>
          </Row>
        </div>

        {/* <div className="right_box_container mt-4">
                <div className="log-in-title 1">Download Copy of your data</div>
                <span>You will receive profile information and course related data as a Zip file in the next 24 hours on your registered email address.</span>
                <div className="d-grid gap-2 mt-3 mb-3">
                    <Button
                        type="submit" className="button-sml"
                        // disabled={!isValid || loading}
                        style={{ fontWeight: '500' }}
                        variant="secondary">
                        {/* {loading ? 'Loading...' : 'Download'} */}
        {/* Download */}
        {/* </Button>
                    </div>
            </div> */}
        <div className="right_box_container">
          <div className="log-in-title link-my">Delete Account</div>
          <span>
            Your account will be deleted permanently you will not be able to access the data.{' '}
          </span>
          <div className="d-grid gap-2 mt-3 mb-3">
            <Button
              onClick={() => {
                deletepopup();
              }}
              type="submit"
              // disabled={!isValid || loading}
              style={{ fontWeight: '500' }}
              variant="secondary">
              {/* {loading ? 'Loading...' : 'Delete'} */}
              Delete
            </Button>
            {deletePop ? (
              <DeleteModel
                cancelHandler={cancelHandler}
                deleteHandler={deleteHandler}
                cancelIconHandler={cancelIconHandler}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

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
    if (res?.data?.code === 200) {
      logOutHandler();
    } else {
      onDeleteFail();
    }
  };

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
          <p className="info-content">
            Your account will be deleted permanently you will not be able to access the data.
          </p>
        </Modal.Body>
        <Modal.Footer className="justify-content-around">
          <Button variant="danger" style={{ width: '120px' }} onClick={deleteAccount}>
            <img src={trashWhite} alt="TrashDelete" className="trash-delete" /> Delete
          </Button>
          <Button variant="outline-primary" style={{ width: '120px' }} onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
