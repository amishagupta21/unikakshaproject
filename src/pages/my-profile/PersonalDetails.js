import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { setLoading } from '../../redux/actions/LoaderActions';
import {
  optionsday,
  optionsmonth,
  yearsOptions,
} from '../../utils-componets/static-content/DateMonthContent';

import { isEmpty } from 'lodash';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Nav,
  Row,
  ToggleButton,
  Spinner,
  Alert
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';

import { femaleIcon, maleIcon, profileEditIcon, profilePicture, trashWhite } from '../../assets/images';
import './PersonalDetails.scss';

import EducationalDetails from './EducationalDetails';
import ProfileKYC from './ProfileKYC';
import ProfileStudentEducationDetails from './ProfileStudentEducationDetails';
import WorkDetails from './WorkDetails';
import AccountSettings from './AccountSettings';


import { firebase } from '../../firebase/firebase';
import { setIsAuthenticated } from '../../redux/actions/AuthAction';
import { logout } from '../../firebase/firebaseAuth';
import { openToaster } from '../../redux/actions/ToastAction';
import { toast } from 'react-toastify';
import OtpInput from 'react-otp-input';
import { getAuth, updateProfile } from "firebase/auth";

const PersonalDetails = () => {
  const [mobileState, setMobileNumber] = React.useState({ phone: '', data: '' });
  const [whatsAppState, setWhatsAppNumber] = React.useState({ phone: '', data: '' });
  const [genderValue, setGenderValue] = React.useState('');
  const [isNextLoading, setIsNextLoading] = React.useState(false);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [userData, setUserData] = React.useState();
  // const [userDOBData, setDobData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [EducationalData, setEducationalDetails] = React.useState({});
  const [KYCData, setKYCDetails] = React.useState();
  const [profilePic, setProfilePic] = React.useState();
  const [profilePopup, setProfilePopup] = React.useState(false);
  const [userOccupation, setOccupation] = React.useState([]);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showConfirmModal, setShowConfirmModal] = React.useState(false);

  const [changeMobileNoPopup, setChangeMobileNoPopup] = React.useState(false);
  const [otpPopup, setOTPPopup] = React.useState(false);

  const [changeEmailPopup, setChangeEmailPopup] = React.useState(false);
  const [otpEmailPopup, setEmailOTPPopup] = React.useState(false);
  

  const [mobileNo, setMobileNo] = React.useState();
  const [otpError, setOtpError] = React.useState();
  const [otp, setOtp] = React.useState('');
  const [minutes, setMinutes] = React.useState(2);
  const [seconds, setSeconds] = React.useState(0);
  const [isButtonLoading, setIsButtonLoading] = React.useState();
  const [isResendDisabled, setIsResendDisabled] = React.useState(true);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const configureCaptcha = () => {
    return (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('profile-otp-container', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));
  };

  const configureCaptcha2 = () => {
    return (window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('profile-email-container', {
      size: 'invisible',
      callback: (response) => {},
      defaultCountry: 'IN',
    }));
  };

  const genderOptions = [
    { name: 'Male', value: 'male', icon: maleIcon },
    { name: 'Female', value: 'female', icon: femaleIcon },
  ];

  const copyFromMobileNumber = (value) => {
    if (value.target.checked) {
      setWhatsAppNumber(mobileState.phone);
      formik.setFieldValue('whatsapp_number', mobileState.phone);
    }
  };

  const returnToDashboard = () => {
    navigate('/dashboard');
  };

  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{6})/;

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      full_name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      mobile_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
      whatsapp_number: Yup.string().matches(phoneRegExp, 'Whatsapp number is not valid').required(),
      gender: Yup.string().required(),
      birth_date: Yup.number(),
      birth_month: Yup.number(),
      birth_year: Yup.number().required('Year of birth is requied'),
      guardian_details: Yup.string(),
      occupation: Yup.string().required('Occupation is requied'),
    }),
    validate: (values) => {
      let errors = {};
      if (!values?.mobile_number) {
        errors.mobile_number = '*Mobile number required';
      }
      if (!values?.whatsapp_number) {
        errors.whatsapp_number = '*Whatsapp number required';
      }
      return errors;
    },
    onSubmit: (values) => {
      const { full_name, mobile_number, whatsapp_number, guardian_details, occupation, ...rest } =
        values;
      const personalDetails = {
        full_name: full_name,
        mobile_number: mobile_number,
        mobile_cc: `+${mobileState.data}`,
        whatsapp_number: whatsapp_number,
        whatsapp_cc: `+${whatsAppState.data}`,
        guardian_details: guardian_details,
        occupation: occupation,
        ...rest,
      };
      formPersonalDetailsPayload(personalDetails);
    },
  });

  const formik1 = useFormik({
    initialValues: {
      change_mobile_number: '',

    },
    validationSchema: Yup.object().shape({
     
      change_mobile_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    
    }),
    validate: (values) => {
      let errors = {};
      if (!values?.change_mobile_number) {
        errors.change_mobile_number = '*Mobile number required';
      }
      
    },
    onSubmit: (values) => {
      console.log(values.change_mobile_number);
      const { change_mobile_number, ...rest } = values;
      sendOTP(values.change_mobile_number);
      // const user1 = firebase.auth().currentUser;

      // const a = user1.updateProfile({
      //   phoneNumber: values.change_mobile_number
      
      // }).then((res) => {
      //   console.log(user1);
      // }).catch((error) => {
      //   console.log(error)
      // });

    
      // firebase.auth().currentUser.updatePhoneNumber({ phoneNumber: values.change_mobile_number });
    },
  });

  const formik_change_email = useFormik({
    initialValues: {
      change_email_id: '',

    },
    validationSchema: Yup.object().shape({
     
      change_email_id: Yup.string().email('Invalid email').required('Email is required'),
    
    }),
    validate: (values) => {
      let errors = {};
      if (!values?.change_email_id) {
        errors.change_email_id = '*Mobile number required';
      }
      
    },
    onSubmit: (values) => {
      // console.log(values.change_email_id);
      // const { change_email_id, ...rest } = values;
      updateEmail(values.change_email_id);
      // const user1 = firebase.auth().currentUser;

      // const a = user1.updateProfile({
      //   phoneNumber: values.change_mobile_number
      
      // }).then((res) => {
      //   console.log(user1);
      // }).catch((error) => {
      //   console.log(error)
      // });

    
      // firebase.auth().currentUser.updatePhoneNumber({ phoneNumber: values.change_mobile_number });
    },
  });

  const formPersonalDetailsPayload = async (personalDetails) => {
    dispatch(setLoading(true));
    const payload = {
      uid: user?.uid,
      occupation: userOccupation,
      personal_details: {
        full_name: personalDetails?.full_name,
        email: personalDetails?.email,
        mobile_number: personalDetails?.mobile_number,
        mobile_cc: personalDetails?.mobile_cc,
        whatsapp_number: personalDetails?.whatsapp_number,
        whatsapp_cc: personalDetails?.whatsapp_cc,
        gender: personalDetails?.gender,
        ...(Number(personalDetails.birth_date) && {birth_date: Number(personalDetails.birth_date)}),
        ...(Number(personalDetails.birth_month) && {birth_month: Number(personalDetails.birth_month)}),
        // birth_date: personalDetails?.birth_date,
        // birth_month: personalDetails?.birth_month,
        birth_year: personalDetails?.birth_year,
        guardian_details: personalDetails?.guardian_details,
      },
    };
    const response = await ApiService('student/update-personal-details', `PATCH`, payload, true);
    // setIsNextLoading(false);
    if (response?.data.code === 200) {
      dispatch(
        openToaster({
          show: true,
          header: 'Success!',
          variant: 'info',
          body: 'Personal details updated successfully!',
        })
      );
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    
    dispatch(setLoading(true));

    viewProfilePic('profile_picture');

    window.scrollTo(0, 0);
    fetchInitialData(user?.uid);

    dispatch(setLoading(false));
  }, []);

  const handleWeekdayChange = (event) => {
    setOccupation(event.target.value);
  };

  const fetchInitialData = async (uid) => {
    fetchUserDetails(uid);
  };

  const fetchUserDetails = async (uid) => {
    let personalDetails = {};
    let educationalDetails = {};
    const userDetails = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);

    // setInitialDobData(userDetails?.data?.data?.userProfile?.information_data);
    // setDobData(userDetails?.data?.data?.userProfile?.information_data);  //console.log(user); 
    setOccupation(userDetails?.data?.data?.userProfile?.occupation);
    setKYCDetails(userDetails?.data?.data?.userProfile?.kyc);
    setInitialData(userDetails?.data?.data?.user);
    setUserData(userDetails?.data?.data?.user);
    personalDetails = userDetails?.data?.data?.userProfile?.personal_details ?? personalDetails;
    personalDetails.occupation = userDetails?.data?.data?.userProfile?.occupation;
    educationalDetails.education_details =
      userDetails?.data?.data?.userProfile?.education_details ?? educationalDetails;
    educationalDetails.work_details = userDetails?.data?.data?.userProfile?.work_details ?? [];
    // nextPageNumber(0);

    if (!isEmpty(personalDetails)) {
      setPersonalDetailsInForm(personalDetails);
    }
    if (!isEmpty(educationalDetails)) {
      // console.log(educationalDetails);
      setEducationalDetails(educationalDetails);
    }
  };

  const setPersonalDetailsInForm = (details) => {
    formik.setValues(details);
    setGenderValue(details?.gender);
  };

  const setInitialData = (initData) => {
    formik.setValues({ email: initData?.email});

    // mobile_number: initData?.phone
    // setMobileNumber({ phone: initData?.phone})
  };

  // const setInitialDobData = (initlData) => {
  //   formik.setValues({ birth_date: initlData?.birth_date });
  //   formik.setValues({ birth_month: initlData?.birth_month });
  //   formik.setValues({ birth_year: initlData?.birth_year }); 
  // }

  const uploadFile = (docType) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      if (file.size / 1e6 > 2) {
        dispatch(
          openToaster({
            show: true,
            header: 'Warning!',
            variant: 'warning',
            body: 'File size exceeds the max. allowed size : 2 Mb',
          })
        );
        return;
      } 
      uploadToS3(file, docType);
    };
  };

  const uploadToS3 = (inputFile, docType) => {
    dispatch(setLoading(true));
    if (inputFile) {
      let promise = new Promise(async (resolve, reject) => {
        let payload = {
          file_name: inputFile.name,
          type: inputFile.type,
          document_type: docType,
        };

        const response = await ApiService('/user/upload/profile-picture', `POST`, payload, true);
        if (response.data) {
          uploadUsingSignedUrl(response.data.data.signedUrl, inputFile, docType)
            .then((res) => {
              viewProfilePic('profile_picture');
              window.location.reload();
              resolve(true);
            })
            .catch((error) => {});
        }
      });
    }
  };

  const uploadUsingSignedUrl = async (url, data, docType) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', data.type);
    var file = data;
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      // setLoader(docType, event.loaded, event.total);
    };
    xhr.upload.onload = () => {
      //   if (docType == 'pan_card') {
      //     setPanCard((old) => ({ ...old, placeholder: data.name }));
      //   } else if (docType == 'aadhar_card') {
      //     setAadhaarCard((old) => ({ ...old, placeholder: data.name }));
      //   } else if (docType == 'qualification_certificate') {
      //     setQualificationCertificate((old) => ({ ...old, placeholder: data.name }));
      //   } else if (docType == 'hsc_certificate') {
      //     setHSCCertificate((old) => ({ ...old, placeholder: data.name }));
      //   } else if (docType == 'ssc_certificate') {
      //     setSSCCertificate((old) => ({ ...old, placeholder: data.name }));
      //   }
      return Promise.resolve(true);
    };
    xhr.onerror = () => {};

    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', data.type);
    xhr.send(file);
  };

  const viewProfilePic = async (fileKey) => {
    const result = await ApiService(
      '/user/get-profile-picture',
      `POST`,
      { document_type: fileKey },
      true
    );

    setProfilePic(result?.data?.data?.signedUrl);

    dispatch(setLoading(false));
  };

  const viewProfilePhoto = () => {
    setProfilePopup(true);
  };

  const changeMobileNo = () => {
    setChangeMobileNoPopup(true);
  };

  const changeMobileEmailId = () => {
    setChangeEmailPopup(true)
  };

  

  const togglePopup = () => {
    setProfilePopup(false);
    window.location.reload();
  };

  const logOutHandler = async () => {
    await logout();
    dispatch(setIsAuthenticated(false));
    navigate('/');
  };

  const onDeleteFail = () => {
    dispatch(openToaster({
      show: true,
      header: 'Error!', 
      variant: 'Danger',
      body: 'Unable to delete account. Please try again!'
    }))
  }

  const changeMobile = (event) => {
    setMobileNo(event.target.value);
  }

  

  const sendOTP = async (phoneNumber) => {
    setMobileNo(phoneNumber);
    dispatch(setLoading(true));

    const appVerifier = configureCaptcha();
    firebase
      .auth()
      .signInWithPhoneNumber(`+${phoneNumber}`, appVerifier)
      .then(async (confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success('OTP has been sent to Mobile Number Again', {
          theme: 'colored',
        });
        setChangeMobileNoPopup(false);
        setOTPPopup(true);

        dispatch(setLoading(false));
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
    
          if (seconds === 0) {
            if (minutes === 0) {
              setIsResendDisabled(false);
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: 'colored',
        });
        // setloading(false);
        dispatch(setLoading(false));
      });
  };

  const onSubmitOTP = () => {
    // setloading(true);
    dispatch(setLoading(true));

    window.confirmationResult
      .confirm(otp && otp)
      .then(async (response) => {
        const { firbase_user } = response;
        console.log(response);
        // if (firbase_user) {
          // setloading(false);/

          // const user = firebase.auth().currentUser;

          // const auth = getAuth();
          // updateProfile(auth.currentUser, {
          //   phoneNumber: 
          // })
          setOTPPopup(false);
          dispatch(openToaster({
            show: true,
            header: 'Success!', 
            variant: 'Info',
            body: 'Phone number was updated successfully!'
          }))
          firebase.auth().currentUser.updatePhoneNumber({ phoneNumber: mobileNo });
          // await firbase_user.updatePhoneNumber(mobileNo);
          
          // const isBasicInfoExists = await getUserBasicInfo(user.uid);

          dispatch(setLoading(false));

          // if (isBasicInfoExists) {
          //   const redirectUrl = searchParams.get('redirect');
          //   if (redirectUrl) {
          //     navigate(redirectUrl);
          //   } else {
          //     navigate('/dashboard');
          //   }
          // } else {
          //   navigate('/info');
          // }
        // }
      })
      .catch((error) => {
        // setloading(false);

        console.log(error)
        dispatch(setLoading(false));

        // navigate('/login');
        setOtpError('Invalid Code!');
      });
  };


  const updateEmail = (email) => {

    const user1 = firebase.auth().currentUser;
    console.log(user1);

    firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    // Email verification sent!
    // ...
  });

    return;

    // const user = firebase.auth().currentUser;
    const appVerifier1 = configureCaptcha2();
    // TODO(you): prompt the user to re-provide their sign-in credentials

    
    user1.updateEmail(email).then((res) => {
      firebase.auth().currentUser.sendEmailVerification().then(function(isSent) {
        console.log(isSent);
      })
      .catch(function(error1) {
        console.log(error1);
      });
  
    }).catch((error) => {
      console.log(error);
    });

    dispatch(openToaster({
      show: true,
      header: 'Success!', 
      variant: 'Info',
      body: 'Verification link successfully sent to the new email address!'
    }))
    
    setChangeEmailPopup(false);
    
  }

// user1.updateEmail("velmurugan0819@gmail.com").then((res) => {
//       firebase.auth().currentUser.sendEmailVerification()
//   .then(() => {
//     // Email verification sent!
//     // ...
//   });
//     }).catch((error) => {
//       console.log(error);
//     });
//   }

  const onSubmitEmailOTP = () => {
    // setloading(true);
    dispatch(setLoading(true));

    window.confirmationResult
      .confirm(otp && otp)
      .then(async (response) => {
        const { firbase_user } = response;
        console.log(response);
        // if (firbase_user) {
          // setloading(false);/

          // const user = firebase.auth().currentUser;

          // const auth = getAuth();
          // updateProfile(auth.currentUser, {
          //   phoneNumber: 
          // })
          setOTPPopup(false);
          dispatch(openToaster({
            show: true,
            header: 'Success!', 
            variant: 'Info',
            body: 'Phone number was updated successfully!'
          }))
          firebase.auth().currentUser.updatePhoneNumber({ phoneNumber: mobileNo });
          
          
          // dispatch(setIsAuthenticated(true));
          // localStorage.setItem('user', JSON.stringify(user));
         
          // await firbase_user.updatePhoneNumber(mobileNo);
          
          // const isBasicInfoExists = await getUserBasicInfo(user.uid);

          dispatch(setLoading(false));

          // if (isBasicInfoExists) {
          //   const redirectUrl = searchParams.get('redirect');
          //   if (redirectUrl) {
          //     navigate(redirectUrl);
          //   } else {
          //     navigate('/dashboard');
          //   }
          // } else {
          //   navigate('/info');
          // }
        // }
      })
      .catch((error) => {
        // setloading(false);

        console.log(error)
        dispatch(setLoading(false));

        // navigate('/login');
        setOtpError('Invalid Code!');
      });
  };

  return (
    <>
      <div className="top-dashboard-profiles profile-personal d-flex flex-row mx-auto my-5 profile-personal-form">
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3} className='left-nav'>
                <div className="my-profile-tabs">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Personal Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Educational Details</Nav.Link>
                    </Nav.Item>
                    {userOccupation && userOccupation !== 'STUDENT' && (
                      <Nav.Item>
                        <Nav.Link eventKey="third">Work Details</Nav.Link>
                      </Nav.Item>
                    )}
                    
                      <Nav.Item>
                        <Nav.Link eventKey="fourth"> Documents & KYC</Nav.Link>
                      </Nav.Item>

                      <Nav.Item>
                        <Nav.Link eventKey="fifth"> Account Settings</Nav.Link>
                      </Nav.Item>
                      {/* {userOccupation && userOccupation !== 'STUDENT' && (
                      )} */}
                    <Nav.Item>
                      <Nav.Link onClick={logOutHandler}>Logout</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
                <Button className="delete-link" onClick={() => setShowDeleteModal(true)} variant="link">
                  Delete Account
                </Button>
              </Col>
              <Col sm={9}>
                <div className="tab-content-right">
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div className="course-application-list" id="personal">
                        <h3 className="text-primary">Personal Details </h3>
                        {/* {applicationList?.length > 0 ? ( */}
                        {/* applicationList.map((application, idx) => {
                return ( */}

                        <div className="upload-area">
                          <img
                            src={profilePic ? profilePic : profilePicture}
                            alt="profile"
                            className="profile-avatar"
                            onClick={() => viewProfilePhoto()}
                          />

                          <span className="avatar-name">
                            Profile Picture
                            <img
                              src={profileEditIcon}
                              alt="profile-edit-icon"
                              onClick={() => uploadFile('profile_picture')}
                            /> <span>Allowed File Format : (PNG, JPG, JPEG)</span>
                          </span>
                          {profilePopup && (
                            <>
                              {/* <ProfilePopup profilePhoto={profilePic ? profilePic: profilePicture }/> */}
                              <div className="profile-popup modal display-block">
                                <section className="modal-main">
                                  <div className="model-body">
                                    <div className="modalheader">
                                      <span>Upload Photo</span>
                                      <span
                                        className="floatRight close-btn"
                                        onClick={() => togglePopup()}>
                                        x
                                      </span>
                                    </div>
                                    <div className="mt-3">
                                      <Row className="nomargin batch-head">
                                        <img
                                          src={profilePic ? profilePic : profilePicture}
                                          alt="profile"
                                          className=""
                                          onClick={() => viewProfilePhoto()}
                                        />
                                      </Row>
                                    </div>
                                  </div>
                                  <div className="mt-3 model-body">
                                    <Row className="d-flex justify-content-end">
                                      <div className="col-6  ">
                                        <Button
                                          className="btn "
                                          variant="outline-primary"
                                          type="button"
                                          onClick={() => uploadFile('profile_picture')}>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="19"
                                            height="15"
                                            viewBox="0 0 19 15"
                                            fill="none">
                                            <path
                                              fill-rule="evenodd"
                                              clip-rule="evenodd"
                                              d="M14.694 4.37529H14.7596C15.2759 4.37538 15.7871 4.47732 16.2639 4.67529C16.7407 4.87327 17.1737 5.16337 17.5382 5.52898C18.2754 6.26788 18.6894 7.26903 18.6894 8.31279C18.6894 9.35656 18.2754 10.3577 17.5382 11.0966C17.1737 11.4622 16.7407 11.7523 16.2639 11.9503C15.7871 12.1483 15.2759 12.2502 14.7596 12.2503H12.1412V10.9378H14.7596C15.4355 10.9076 16.0737 10.6178 16.5413 10.1288C17.0089 9.63984 17.2698 8.98935 17.2698 8.31279C17.2698 7.63623 17.0089 6.98574 16.5413 6.49677C16.0737 6.0078 15.4355 5.71803 14.7596 5.68779H13.56L13.3986 4.56298C13.3001 3.85827 12.9743 3.20495 12.4706 2.70227C11.967 2.1996 11.3131 1.87502 10.6082 1.77785C9.90289 1.68151 9.18545 1.81922 8.56594 2.16987C7.94643 2.52053 7.45907 3.06475 7.17864 3.71904L6.74158 4.71917L5.67976 4.4711C5.43706 4.4109 5.18824 4.37875 4.9382 4.37529C4.06933 4.37529 3.23589 4.72048 2.62295 5.33604C2.16616 5.79535 1.85535 6.37945 1.7296 7.0149C1.60386 7.65036 1.66878 8.30881 1.91621 8.90747C2.16364 9.50614 2.58254 10.0183 3.12024 10.3795C3.65793 10.7408 4.29043 10.935 4.9382 10.9378H8.21158V12.2503H4.9382C4.2881 12.2561 3.64422 12.1234 3.04946 11.8608C2.4547 11.5983 1.92272 11.2121 1.48895 10.7278C0.833105 9.99742 0.428311 9.07626 0.33384 8.09919C0.239369 7.12212 0.460184 6.14048 0.963952 5.29798C1.29761 4.7398 1.74607 4.2589 2.27962 3.88714C2.81318 3.51537 3.41964 3.26122 4.05883 3.14154C4.6967 3.02342 5.35427 3.04048 5.98558 3.19535C6.38338 2.2845 7.06697 1.52795 7.93296 1.04014C8.79895 0.552322 9.80024 0.35977 10.7854 0.491604C11.7709 0.624968 12.686 1.07646 13.3915 1.77745C14.097 2.47844 14.5543 3.39061 14.694 4.37529ZM12.5113 9.43235L10.7867 7.70904V14.8438H9.48208V7.75629L7.8047 9.43367L6.87676 8.50442L9.69339 5.68779H10.6226L13.4393 8.50442L12.5113 9.43235Z"
                                              fill="#222380"
                                            />
                                          </svg>{' '}
                                          Upload
                                        </Button>
                                      </div>
                                      <div className="col-6  ">
                                        <Button
                                          className="btn"
                                          variant="outline-secondary"
                                          type="button"
                                          onClick={() => setShowConfirmModal(true)}
                                          // onClick={() => deleteProfilePic('profile_picture')()}
                                          >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="21"
                                            height="22"
                                            viewBox="0 0 21 22"
                                            fill="none">
                                            <path
                                              d="M18.3762 6.38867C18.3587 6.38867 18.3324 6.38867 18.3062 6.38867C13.6774 5.92492 9.05743 5.74992 4.48118 6.21367L2.69618 6.38867C2.32868 6.42367 2.00493 6.16117 1.96993 5.79367C1.93493 5.42617 2.19743 5.11117 2.55618 5.07617L4.34118 4.90117C8.99618 4.42867 13.7124 4.61242 18.4374 5.07617C18.7962 5.11117 19.0587 5.43492 19.0237 5.79367C18.9974 6.13492 18.7087 6.38867 18.3762 6.38867Z"
                                              fill="#FF3838"
                                            />
                                            <path
                                              d="M7.4362 5.50695C7.4012 5.50695 7.3662 5.50695 7.32245 5.4982C6.97245 5.43695 6.72745 5.0957 6.7887 4.7457L6.9812 3.59945C7.1212 2.75945 7.3137 1.5957 9.35245 1.5957H11.6449C13.6924 1.5957 13.8849 2.8032 14.0162 3.6082L14.2087 4.7457C14.2699 5.10445 14.0249 5.4457 13.6749 5.4982C13.3162 5.55945 12.9749 5.31445 12.9224 4.96445L12.7299 3.82695C12.6074 3.0657 12.5812 2.91695 11.6537 2.91695H9.3612C8.4337 2.91695 8.4162 3.03945 8.28495 3.8182L8.0837 4.9557C8.0312 5.27945 7.7512 5.50695 7.4362 5.50695Z"
                                              fill="#FF3838"
                                            />
                                            <path
                                              d="M13.3081 20.4056H7.69061C4.63686 20.4056 4.51436 18.7169 4.41811 17.3519L3.84936 8.54064C3.82311 8.18189 4.10311 7.86689 4.46186 7.84064C4.82936 7.82314 5.13561 8.09439 5.16186 8.45314L5.73061 17.2644C5.82686 18.5944 5.86186 19.0931 7.69061 19.0931H13.3081C15.1456 19.0931 15.1806 18.5944 15.2681 17.2644L15.8369 8.45314C15.8631 8.09439 16.1781 7.82314 16.5369 7.84064C16.8956 7.86689 17.1756 8.17314 17.1494 8.54064L16.5806 17.3519C16.4844 18.7169 16.3619 20.4056 13.3081 20.4056Z"
                                              fill="#FF3838"
                                            />
                                            <path
                                              d="M11.9528 15.5938H9.03906C8.68031 15.5938 8.38281 15.2962 8.38281 14.9375C8.38281 14.5788 8.68031 14.2812 9.03906 14.2812H11.9528C12.3116 14.2812 12.6091 14.5788 12.6091 14.9375C12.6091 15.2962 12.3116 15.5938 11.9528 15.5938Z"
                                              fill="#FF3838"
                                            />
                                            <path
                                              d="M12.6895 12.0957H8.31445C7.9557 12.0957 7.6582 11.7982 7.6582 11.4395C7.6582 11.0807 7.9557 10.7832 8.31445 10.7832H12.6895C13.0482 10.7832 13.3457 11.0807 13.3457 11.4395C13.3457 11.7982 13.0482 12.0957 12.6895 12.0957Z"
                                              fill="#FF3838"
                                            />
                                          </svg>{' '}
                                          Delete
                                        </Button>
                                      </div>
                                    </Row>
                                  </div>
                                </section>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="d-flex flex-row">
                          <div className="course-image">
                            {/* <img
                          width={'115px'}
                          height={'90px'}
                          src={
                            application?.courseDetail?.course_variant_sections?.bannerAsset
                              ?.value[0].url
                          }></img> */}
                          </div>
                          <div className="w-100">
                            <Card.Title className="d-flex justify-content-between align-items-center">
                              {/* <div>
                            <p>course_title</p>
                          </div>
                          <div className="d-flex in-progress">
                           dsdsdsdsad
                          </div> */}
                            </Card.Title>

                            <Card.Body className="application-status">
                              <div className="my-4 course-fully-form">
                                {/* {page === 0 && ( */}
                                <>
                                  <Form onSubmit={formik.handleSubmit}>
                                    <>
                                      <Row className="row-bottom">
                                        <Form.Group as={Col} sm={6} controlId="full_name">
                                          <Form.Label>
                                            Full Name
                                            <span className="text-danger"> *</span>
                                            <span className="text-muted"> (As per PAN)</span>
                                          </Form.Label>
                                          <Form.Control
                                            type="text"
                                            name="full_name"
                                            onChange={formik.handleChange}
                                            className={
                                              formik.touched.full_name && formik.errors.full_name
                                                ? 'is-invalid'
                                                : null
                                            }
                                            onBlur={formik.handleBlur}
                                            // defaultValue={user.displayName}
                                            value={formik.values?.full_name}
                                            placeholder="Enter you full name"
                                          />
                                          {formik.touched.full_name && formik.errors.full_name ? (
                                            <div className="error-message">
                                              {formik.errors.full_name}
                                            </div>
                                          ) : null}
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="email">
                                          <Form.Label>
                                            Email
                                            <span className="text-danger"> *</span>
                                          </Form.Label>
                                          <Form.Control
                                            type="email"
                                            name="email"
                                            // value={userData?.email? userData?.email: formik.values?.email}
                                            onChange={formik.handleChange}
                                            className={
                                              formik.touched.email && formik.errors.email
                                                ? 'is-invalid'
                                                : null
                                            }
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter your Email"
                                            value={formik.values?.email}                                
                                            // disabled={ userData?.email }
                                          />
                                           <span className='change-mobile-no'><a onClick={() => changeMobileEmailId()}>Change Email Id</a></span>
                                          {formik.touched.email && formik.errors.email ? (
                                            <div className="error-message">{formik.errors.email}</div>
                                          ) : null}
                                        </Form.Group>
                                      </Row>

                                      <Row className="row-bottom">
                                        <Form.Group as={Col} sm={6} controlId="mobile_number">
                                          <Form.Label>
                                            Mobile Number<span className="text-danger"> *</span>
                                          </Form.Label>
                                          <PhoneInput
                                            country={'in'}
                                            name="mobile_number"
                                            // value={userData?.phone? userData?.phone:formik.values?.mobile_number}
                                            value={formik.values?.mobile_number}
                                            onChange={(phone, data) => {
                                              formik.setFieldValue('mobile_number', phone);
                                              setMobileNumber({ phone, data });
                                            }}
                                            countryCodeEditable={false}
                                            onBlur={formik.handleBlur('mobile_number')}
                                            placeholder="Enter your Mobile number"
                                            // defaultValue={userData?.phone}
                                            // disabled={ userData?.phone }
                                          />
                                          <span className='change-mobile-no'><a onClick={() => changeMobileNo()}>Change Mobile Number</a></span>
                                          
                                          
                                          
                                          
                                          {formik.touched.mobile_number &&
                                          formik.errors.mobile_number ? (
                                            <div className="error-message">
                                              {formik.errors.mobile_number}
                                            </div>
                                          ) : null}
                                        </Form.Group>

                                        

                                        <Form.Group
                                          as={Col}
                                          sm={6}
                                          controlId="whatsapp_number"
                                          className="no-whatsapp">
                                          <Form.Label>
                                            Whatsapp Number<span className="text-danger"> *</span>
                                          </Form.Label>
                                          <PhoneInput
                                            country={'in'}
                                            value={formik.values?.whatsapp_number}
                                            onChange={(phone, data) => {
                                              setWhatsAppNumber({ phone, data });
                                              formik.setFieldValue('whatsapp_number', phone);
                                            }}
                                            countryCodeEditable={false}
                                            onBlur={formik.handleBlur('whatsapp_number')}
                                            placeholder="Enter your Whatsapp number"
                                          />

                                          {formik.touched.whatsapp_number &&
                                          formik.errors.whatsapp_number ? (
                                            <div className="error-message  mt-3">
                                              {formik.errors.whatsapp_number}
                                            </div>
                                          ) : null}

                                          <Form.Check
                                            style={{ marginTop: '5px' }}
                                            type="checkbox"
                                            onChange={(value) => copyFromMobileNumber(value)}
                                            label="Same as mobile number"
                                            className="my-code-check"
                                          />
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="gender">
                                          <Form.Label>
                                            Gender<span className="text-danger"> *</span>
                                          </Form.Label>
                                          <Row>
                                            <ButtonGroup aria-label="select-button">
                                              {genderOptions.map((gender, idx) => (
                                                <ToggleButton
                                                  className="border border-secondary radio-buttons me-2"
                                                  key={idx}
                                                  style={{ maxWidth: '30%' }}
                                                  id={`gender-${idx}`}
                                                  type="radio"
                                                  variant="outline-primary"
                                                  name="gender"
                                                  onBlur={formik.handleBlur}
                                                  value={gender.value}
                                                  checked={genderValue === gender.value}
                                                  onChange={(e) => {
                                                    setGenderValue(e.currentTarget.value);
                                                    formik.handleChange(e);
                                                  }}>
                                                  <span className="options">
                                                    <img
                                                      src={gender.icon}
                                                      aria-label={gender.value}></img>
                                                    {gender.name}
                                                  </span>
                                                </ToggleButton>
                                              ))}
                                            </ButtonGroup>
                                            {formik.touched.gender && formik.errors.gender ? (
                                              <div className="error-message">
                                                {formik.errors.gender}
                                              </div>
                                            ) : null}
                                          </Row>
                                        </Form.Group>

                                        <Form.Group as={Col} lg={2}>
                                          <Form.Label>Day</Form.Label>
                                          <Form.Select
                                            name="birth_date"
                                            // style={{width: '100px'}}
                                            className={
                                              formik.touched.birth_date && formik.errors.birth_date
                                                ? 'is-invalid'
                                                : null
                                            }
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            // value={userDOBData?.birth_date? userDOBData?.birth_date:formik.values?.birth_date}>
                                            value={formik.values?.birth_date}>
                                            <option value="">Day</option>
                                            {optionsday.map((option, index) => (
                                              <option key={index} value={option.value}>
                                                {option.label}
                                              </option>
                                            ))}
                                            ;
                                          </Form.Select>
                                          {formik.touched.birth_date && formik.errors.birth_date ? (
                                            <div className="error-message">
                                              {formik.errors.birth_date}
                                            </div>
                                          ) : null}
                                        </Form.Group>

                                        <Form.Group as={Col} lg={2}>
                                          <Form.Label>Month</Form.Label>
                                          <Form.Select
                                            name="birth_month"
                                            // style={{width: '170px'}}
                                            className={
                                              formik.touched.birth_month &&
                                              formik.errors.birth_month
                                                ? 'is-invalid'
                                                : null
                                            }
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            // value={userDOBData?.birth_month? userDOBData?.birth_month:formik.values?.birth_month}>
                                            value={formik.values?.birth_month}>
                                            <option value="">Month</option>
                                            {optionsmonth.map((option, index) => (
                                              <option key={index} value={option.value}>
                                                {option.label}
                                              </option>
                                            ))}
                                            ;
                                          </Form.Select>
                                          {formik.touched.birth_month &&
                                          formik.errors.birth_month ? (
                                            <div className="error-message">
                                              {formik.errors.birth_month}
                                            </div>
                                          ) : null}
                                        </Form.Group>

                                        <Form.Group as={Col} lg={2}>
                                          <Form.Label>
                                            Year<span className="text-danger"> *</span>
                                          </Form.Label>
                                          <Form.Select
                                            name="birth_year"
                                            // style={{width: '120px', padding: '10px'}}
                                            className={
                                              formik.touched.birth_year && formik.errors.birth_year
                                                ? 'is-invalid'
                                                : null
                                            }
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            // value={userDOBData?.birth_year? userDOBData?.birth_year:formik.values?.birth_year}>
                                            value={formik.values?.birth_year}>
                                            <option value="">Year</option>
                                            {yearsOptions.map((option, index) => (
                                              <option key={index} value={option.value}>
                                                {option.label}
                                              </option>
                                            ))}
                                            ;
                                          </Form.Select>

                                          {formik.touched.birth_year && formik.errors.birth_year ? (
                                            <div className="error-message">
                                              {formik.errors.birth_year}
                                            </div>
                                          ) : null}
                                        </Form.Group>
                                      </Row>

                                      <Row className="row-bottom">
                                        <Form.Group as={Col} sm={6}>
                                          <Form.Label>Your occupation<span className="text-danger"> *</span></Form.Label>
                                          <div
                                            className="mb-3 occupation-label-group"
                                            onChange={handleWeekdayChange}>
                                            <Form.Check
                                              inline
                                              type="radio"
                                              name="occupation"
                                              value="STUDENT"
                                              checked={userOccupation === 'STUDENT'}
                                              label="I’m a student."
                                              disabled
                                            />
                                            <Form.Check
                                              inline
                                              type="radio"
                                              name="occupation"
                                              checked={userOccupation === 'PROFESSIONAL'}
                                              value="PROFESSIONAL"
                                              label="I'm a working professional."
                                              disabled
                                            />
                                            <Form.Check
                                              inline
                                              type="radio"
                                              name="occupation"
                                              value="UNEMPLOYED"
                                              // defaultChecked={formik.values.occupation}
                                              checked={userOccupation === 'UNEMPLOYED'}
                                              label="Unemployed"
                                              disabled
                                            />
                                          </div>
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="guardian_details">
                                          <Form.Label>Guardian Detail</Form.Label>
                                          <Form.Control
                                            name="guardian_details"
                                            onChange={formik.handleChange}
                                            value={formik.values?.guardian_details}
                                            type="text"
                                            placeholder="Guardian detail"
                                          />
                                        </Form.Group>
                                      </Row>

                                      <Row className="d-flex justify-content-end my-btn-styles row">
                                        <Button
                                          className=" btn btn-outline-secondary"
                                          variant="outline-secondary"
                                          type="button"
                                          onClick={returnToDashboard}>
                                          Cancel
                                        </Button>
                                        <Button
                                          className="btn"
                                          disabled={
                                            !(formik.isValid && formik.dirty) || isNextLoading
                                          }
                                          variant="secondary"
                                          type="submit">
                                          {isNextLoading ? 'Saving.. ' : 'Save'}
                                        </Button>
                                      </Row>
                                    </>
                                  </Form>
                                </>

                                {changeMobileNoPopup && (
                                    <>
                                      <div className="profile-popup modal display-block">
                                        <section className="modal-main">
                                        <Form onSubmit={formik1.handleSubmit}>
                                            <>
                                          <div className="model-body">
                                            <div className="modalheader">
                                              <span>Change Mobile Number</span>
                                              <span
                                                className="floatRight close-btn"
                                                onClick={() => togglePopup()}>
                                                x
                                              </span>
                                            </div>
                                            <div className="mt-3">
                                            <div id="profile-otp-container"></div>
                                            <Form.Group as={Col} sm={12} controlId="mobile_number">
                                              <Form.Label>
                                                Mobile Number<span className="text-danger"> *</span>
                                              </Form.Label>
                                              <PhoneInput
                                                country={'in'}
                                                name="change_mobile_number"
                                                // value={userData?.phone? userData?.phone:formik.values?.mobile_number}
                                                value={formik1.values?.change_mobile_number}
                                                onChange={(phone, data) => {
                                                  formik1.setFieldValue('change_mobile_number', phone);
                                                  setMobileNumber({ phone, data });
                                                }}
                                                countryCodeEditable={false}
                                                onBlur={formik1.handleBlur('change_mobile_number')}
                                                placeholder="Enter your Mobile number"
                                                // defaultValue={userData?.phone}
                                                // disabled={ userData?.phone }
                                              />

                                                {formik1.touched.mobile_number &&
                                                formik1.errors.mobile_number ? (
                                                  <div className="error-message">
                                                    {formik1.errors.mobile_number}
                                                  </div>
                                                ) : null}
                                              </Form.Group>
                                              
                                            </div>
                                          </div>
                                          <div className="mt-3 model-body">
                                            <Row className="d-flex justify-content-end">
                                            <Button
                                            className="btn"
                                            // disabled={
                                            //   !(formik1.isValid && formik1.dirty) || isNextLoading
                                            // }
                                            variant="secondary"
                                            type="submit">
                                            {isNextLoading ? 'Verify.. ' : 'Verify'}
                                            </Button>
                                              
                                            </Row>
                                          </div>
                                          </>
                                            </Form>
                                        </section>
                                      </div>
                                    </>
                                )}
                                {otpPopup && (
                                    <>
                                      <div className="profile-popup modal display-block">
                                        <section className="modal-main">
                                        <Form onSubmit={formik1.handleSubmit}>
                                            <>
                                          <div className="model-body">
                                            <div className="modalheader">
                                              <span>Verify OTP</span>
                                              <span
                                                className="floatRight close-btn"
                                                onClick={() => togglePopup()}>
                                                x
                                              </span>
                                            </div>
                                            <div className="mt-3">
                                            <div id="profile-otp-container"></div>
                                            
                                            </div>
                                          </div>
                                          <div className="mt-3 model-body">
                                          <div className="auth_form otp-form">
                                            <div className="log-in-title login-head">
                                              
                                              Verify OTP
                                            </div>
                                            <div className="d-flex">
                                              <p>
                                                Enter OTP sent to your mobile{' '}
                                                <span style={{ font: 'Poppins', color: '#363F5E' }}>
                                                  +{mobileNo}
                                                </span>
                                                
                                              </p>
                                            </div>
                                            {otpError && (
                                              <Alert key="danger" variant="danger">
                                                {otpError}
                                              </Alert>
                                            )}
                                            <div className="otp-input">
                                              <OtpInput value={otp} onChange={(e) => setOtp(e)} numInputs={6} />
                                            </div>
                                            <div className="d-flex justify-content-between mt-2">
                                              <div>
                                                <span>Didn't receive code?</span>
                                              </div>
                                              <div>
                                                {/* <a
                                                  className="resend-otp"
                                                  style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                                                  onClick={() => !minutes && !seconds && resendOTP(phoneNumber)}>
                                                  Resend OTP */}
                                                <a
                                                  style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                                                  className={isResendDisabled ? 'resend-otp disabled' : 'resend-otp'}
                                                  onClick={() => resendOTP(userSignUpData.phoneNumber)}>
                                                  Resend OTP
                                                </a>
                                                <span>
                                                  {' '}
                                                  in {minutes < 10 ? `0${minutes}` : minutes}:{' '}
                                                  {seconds < 10 ? `0${seconds}` : seconds}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="d-grid gap-2 mt-4">
                                              <Button
                                                type="submit"
                                                variant="secondary"
                                                onClick={onSubmitOTP}
                                                disabled={!(otp.length === 6)}>
                                                Verify
                                                {isButtonLoading && (
                                                  <>
                                                    <Spinner
                                                      as="span"
                                                      animation="border"
                                                      size="sm"
                                                      role="status"
                                                      aria-hidden="true"
                                                    />
                                                    <span className="visually-hidden">Loading...</span>
                                                  </>
                                                )}
                                                {/* disabled={!(otp.length === 6) || loading}>
                                                {loading ? 'Loading...' : 'Verify and Signup'} */}
                                              </Button>
                                            </div>
                                          </div>
                                           
                                          </div>
                                          </>
                                            </Form>
                                        </section>
                                      </div>
                                    </>
                                )}

{changeEmailPopup && (
                                    <>
                                      <div className="profile-popup modal display-block">
                                        <section className="modal-main">
                                        <Form onSubmit={formik_change_email.handleSubmit}>
                                            <>
                                          <div className="model-body">
                                            <div className="modalheader">
                                              <span>Change Email Id</span>
                                              <span
                                                className="floatRight close-btn"
                                                onClick={() => togglePopup()}>
                                                x
                                              </span>
                                            </div>
                                            <div className="mt-3">
                                            <div id="profile-email-container"></div>
                                            <Form.Group as={Col} sm={12} controlId="email">
                                          <Form.Label>
                                            Email
                                            <span className="text-danger"> *</span>
                                          </Form.Label>
                                          <Form.Control
                                            type="email"
                                            name="change_email_id"
                                            // value={userData?.email? userData?.email: formik.values?.email}
                                            onChange={formik_change_email.handleChange}
                                            className={
                                              formik_change_email.touched.change_email_id && formik_change_email.errors.change_email_id
                                                ? 'is-invalid'
                                                : null
                                            }
                                            onBlur={formik_change_email.handleBlur}
                                            placeholder="Enter your Email"
                                            value={formik_change_email.values?.change_email_id}                                
                                            // disabled={ userData?.email }
                                          />
                                           
                                          {formik_change_email.touched.change_email_id && formik_change_email.errors.change_email_id ? (
                                            <div className="error-message">{formik_change_email.errors.change_email_id}</div>
                                          ) : null}
                                        </Form.Group>
                                              
                                            </div>
                                          </div>
                                          <div className="mt-3 model-body">
                                            <Row className="d-flex justify-content-end">
                                            <Button
                                            className="btn"
                                            // disabled={
                                            //   !(formik1.isValid && formik1.dirty) || isNextLoading
                                            // }
                                            variant="secondary"
                                            type="submit">
                                            {isNextLoading ? 'Verify.. ' : 'Verify'}
                                            </Button>
                                              
                                            </Row>
                                          </div>
                                          </>
                                            </Form>
                                        </section>
                                      </div>
                                    </>
                                )}
                                {otpEmailPopup && (
                                    <>
                                      <div className="profile-popup modal display-block">
                                        <section className="modal-main">
                                        <Form onSubmit={formik1.handleSubmit}>
                                            <>
                                          <div className="model-body">
                                            <div className="modalheader">
                                              <span>Verify OTP</span>
                                              <span
                                                className="floatRight close-btn"
                                                onClick={() => togglePopup()}>
                                                x
                                              </span>
                                            </div>
                                            <div className="mt-3">
                                            <div id="profile-otp-container"></div>
                                            
                                            </div>
                                          </div>
                                          <div className="mt-3 model-body">
                                          <div className="auth_form otp-form">
                                            <div className="log-in-title login-head">
                                              
                                              Verify OTP
                                            </div>
                                            <div className="d-flex">
                                              <p>
                                                Enter OTP sent to your mobile{' '}
                                                <span style={{ font: 'Poppins', color: '#363F5E' }}>
                                                  +{mobileNo}
                                                </span>
                                                
                                              </p>
                                            </div>
                                            {otpError && (
                                              <Alert key="danger" variant="danger">
                                                {otpError}
                                              </Alert>
                                            )}
                                            <div className="otp-input">
                                              <OtpInput value={otp} onChange={(e) => setOtp(e)} numInputs={6} />
                                            </div>
                                            <div className="d-flex justify-content-between mt-2">
                                              <div>
                                                <span>Didn't receive code?</span>
                                              </div>
                                              <div>
                                                {/* <a
                                                  className="resend-otp"
                                                  style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                                                  onClick={() => !minutes && !seconds && resendOTP(phoneNumber)}>
                                                  Resend OTP */}
                                                <a
                                                  style={{ cursor: !minutes && !seconds ? 'pointer' : 'not-allowed' }}
                                                  className={isResendDisabled ? 'resend-otp disabled' : 'resend-otp'}
                                                  onClick={() => resendOTP(userSignUpData.phoneNumber)}>
                                                  Resend OTP
                                                </a>
                                                <span>
                                                  {' '}
                                                  in {minutes < 10 ? `0${minutes}` : minutes}:{' '}
                                                  {seconds < 10 ? `0${seconds}` : seconds}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="d-grid gap-2 mt-4">
                                              <Button
                                                type="submit"
                                                variant="secondary"
                                                onClick={onSubmitEmailOTP}
                                                disabled={!(otp.length === 6)}>
                                                Verify
                                                {isButtonLoading && (
                                                  <>
                                                    <Spinner
                                                      as="span"
                                                      animation="border"
                                                      size="sm"
                                                      role="status"
                                                      aria-hidden="true"
                                                    />
                                                    <span className="visually-hidden">Loading...</span>
                                                  </>
                                                )}
                                                {/* disabled={!(otp.length === 6) || loading}>
                                                {loading ? 'Loading...' : 'Verify and Signup'} */}
                                              </Button>
                                            </div>
                                          </div>
                                           
                                          </div>
                                          </>
                                            </Form>
                                        </section>
                                      </div>
                                    </>
                                )}
                                {/* )} */}
                              </div>
                            </Card.Body>
                          </div>
                        </div>
                        <Card.Footer>
                          {/* <Button variant='secondary' type="button" onClick={() => nextPage()}>
                                            Start Learning
                                        </Button> */}
                        </Card.Footer>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <div className="course-application-list" id="educational">
                        <h3 className="text-primary">Educational Details </h3>
                        {userOccupation && userOccupation === 'STUDENT' && (
                          <ProfileStudentEducationDetails educationalInfo={EducationalData} />
                        )}
                        {userOccupation && userOccupation !== 'STUDENT' && (
                          <EducationalDetails educationalInfo={EducationalData} />
                        )}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      {' '}
                      <div className="course-application-list" id="work">
                        <h3 className="text-primary">Work Details </h3>
                        <WorkDetails educationalDetails={EducationalData} />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                      {' '}
                      <div className="course-application-list" id="kyc">
                        <h3 className="text-primary">Documents & KYC Details </h3>
                        <ProfileKYC kycData={KYCData} />
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="fifth">
                      {' '}
                      <div className="course-application-list" id="kyc">
                        {/* <h3 className="text-primary">Acc </h3> */}
                        <AccountSettings/>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Col>
            </Row>
            <DeleteAccountModal onDeleteFail={onDeleteFail} show={showDeleteModal} toggle={setShowDeleteModal} logOutHandler={logOutHandler}/>
            <DeleteProfilePicModal onDeleteFail={onDeleteFail} show={showConfirmModal} toggle={setShowConfirmModal} />
          </Tab.Container>
        </Container>
      </div>
    </>
  );
};

export default PersonalDetails;

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
        dialogClassName="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your account will be deleted permanently you will not be able to access the data.
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

const DeleteProfilePicModal = ({ show, toggle, onDeleteFail }) => {
  const handleClose = () => toggle(false);

  const dispatch = useDispatch();

  const deleteProfilePic = async () => {
    
    dispatch(setLoading(true));

    const result = await ApiService(
      '/user/delete-profile-picture',
      `DELETE`,
      { document_type: 'profile_picture' },
      true
    );

    // setProfilePic(profilePicture);
    dispatch(setLoading(false));
    window.location.reload();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        dialogClassName="delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Delete Profile picture</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete your profile picture?
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
            <Button variant="danger" style={{ width: '120px' }} onClick={deleteProfilePic}>
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

