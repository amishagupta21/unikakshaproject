import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Form, Row, ToggleButton } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { arrowBack, femaleIcon, maleIcon, verified } from '../../../assets/images';
import { setLoading } from '../../../redux/actions/LoaderActions';
import Loader from '../../../components/util-comonents/Loader';
import ApiService from '../../../services/ApiService';
import ApplicationStatus from './ApplicationStatus';
import './CourseApply.scss';
import EducationDetails from './EducationDetails';
import EnrollmentStatus from './EnrollmentStatus';
import EntranceTest from './EntranceTest';
import MultiStepBar from './FormProgress';
import KYCDocuments from './KYCDocuments';
import Payments from './Payments';
import TestResult from './TestResult';
import { isEmpty } from 'lodash';
import {
  yearsOptions,
  optionsmonth,
  optionsday,
} from '../../.././utils-componets/static-content/DateMonthContent';
import { openToaster } from '../../../redux/actions/ToastAction';
import FooterContainer from '../../../components/FooterComponent';

const steps = [
  'personal_details',
  'education_details',
  'entrance_test',
  'test_result',
  'application_status',
  'payment',
  'kyc_documents',
  'enrollment_status',
];

const CourseApplication = () => {
  const [page, setPage] = React.useState();
  const [stepperTitle, setStepperTitle] = React.useState('');
  const [stepperTitle_, setStepperTitle_] = React.useState('');

  const [mobileState, setMobileNumber] = React.useState({ phone: '', data: '' });
  const [whatsAppState, setWhatsAppNumber] = React.useState({ phone: '', data: '' });
  const [genderValue, setGenderValue] = React.useState('');
  const [courseDetails, setCourseDetails] = React.useState({});
  const [EducationalDetails, setEducationalDetails] = React.useState({});
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [isLoading, setIsLoading] = React.useState(false);
  const [testResults, settestResults] = React.useState('');
  const [orderData, setOrderData] = React.useState();
  const [isNextLoading, setIsNextLoading] = React.useState(false);
  const [applicationDetails, setApplicationDetails] = React.useState();
  const [batches, setBatches] = React.useState([]);
  const [userData, setUserData] = React.useState();
  const [birthInfo, setBirthInfo] = React.useState();
  const [initData, setInitData] = React.useState();
  const [paymentMethod, setPaymentMethod] = React.useState(false);
  const [areDocumentsSubmitted, setAreDocumentsSubmitted] = useState(true);
  const [step, setStep] = useState(0);

  const handleAllDocumentsSubmitted = (state) => {
    setAreDocumentsSubmitted(state);
  };

  // const [userDOBData, setDobData] = React.useState();
  const [selectedBatch, setSelectedBatch] = React.useState();
  const [worldLineStatus, setWorldLineStatus] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const params = useParams();

  const fetchUserDetails = async (uid) => {
    let personalDetails = {};
    let educationalDetails = {};
    const userDetails = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
    // setInitialDobData(userDetails?.data?.data?.userProfile?.information_data);
    // setDobData(userDetails?.data?.data?.userProfile?.information_data);
    const birthInfo = userDetails?.data?.data?.userProfile?.information_data;
    // const details=userDetails?.data?.data?.user;
    setUserData(userDetails?.data?.data?.user);
    setInitialData(userDetails?.data?.data?.user, birthInfo);

    personalDetails = userDetails?.data?.data?.userProfile?.personal_details ?? personalDetails;
    educationalDetails.education_details =
      userDetails?.data?.data?.userProfile?.education_details ?? educationalDetails;
    educationalDetails.work_details = userDetails?.data?.data?.userProfile?.work_details ?? [];
    const getLastActiveStep = localStorage.getItem('activeStep');
    const check = getLastActiveStep !== null ? parseInt(getLastActiveStep) : null;
    // if (check) {
    //   nextPageNumber(check);
    // } else {
    // }
    nextPageNumber(0);

    if (!isEmpty(personalDetails)) {
      setPersonalDetailsInForm(personalDetails);
    }
    if (!isEmpty(educationalDetails)) {
      setEducationalDetails(educationalDetails);
    }
  };

  const setPersonalDetailsInForm = (details) => {
    formik.setValues(details);
    setGenderValue(details?.gender);
  };

  const fetchCourseDetails = async (params, courseDetails) => {
    const queryParams = new URLSearchParams(window.location.search);
    const course_id = queryParams.get('course_id');
    const res = await ApiService(`courses/course_url/${course_id}/detail`);
    return res?.data?.data?.course;
  };

  const setInitialData = (initData, birthInfo, details) => {
    setBirthInfo(birthInfo);
    formik.setValues({
      email: initData?.email,
      mobile_number: initData?.phone,
      whatsapp_number: initData?.phone,
      full_name: user?.displayName,

      // email: details?.email ? details?.email : '',
      // mobile_number: details?.phone ? details?.phone : '',
      // full_name: details?.fullname ? details?.fullname : '',
      birth_date: birthInfo?.birth_date ? birthInfo?.birth_date : '',
      birth_month: birthInfo?.birth_month ? birthInfo?.birth_month : '',
      birth_year: birthInfo?.birth_year ? birthInfo?.birth_year : '',
    });
    // formik.setValues({ mobile_number: initData?.mobile_number});
    // mobile_number: initData?.phone;

    setMobileNumber({ phone: details?.phone });
  };
  // const setInitialDobData = (initlData) => {
  //   formik.setValues({ birth_date: initlData?.birth_date });
  //   formik.setValues({ birth_month: initlData?.birth_month });
  //   formik.setValues({ birth_year: initlData?.birth_year });
  // }

  const fetchInitialData = async (uid) => {
    setIsLoading(true);
    const courseData = state ? state : await fetchCourseDetails(params);
    setCourseDetails(courseData);
    fetchUserDetails(uid);
    if (courseDetails?.course_id) {
      await fetchApplicationDetails(uid, courseData?.id);
    }
    fetchVariantBatches(courseData?.id);
    setIsLoading(false);
  };

  const fetchApplicationDetails = async (uid, courseId) => {
    const payload = {
      uid: uid,
      course_id: courseDetails?.course_id,
    };
    let applicationDetails = await ApiService(
      '/student/application/detail-by-user-course',
      `POST`,
      payload,
      true
    );
    if (applicationDetails?.data?.data.application) {
      const { application_stage, m_applicationstatus, m_totalscore, m_candidatescore } =
        applicationDetails?.data?.data.application;
      const obj = {
        applicationStatus: m_applicationstatus,
        marks: ((m_candidatescore / m_totalscore) * 100).toFixed(2),
      };
      settestResults(obj);
      setApplicationDetails(applicationDetails?.data?.data.application);

      if (application_stage === 'personal_details') {
        nextPageNumber(1);
      } else if (application_stage === 'education_details') {
        nextPageNumber(2);
      }
      // else if (
      //   applicationDetails?.m_applicationstatus === 'Assessment Passed' &&
      //   applicationDetails?.application_stage === 'test_result'
      // ) {
      //   nextPageNumber(4);
      // }
      else if (application_stage === 'test_result') {
        nextPageNumber(4);
      } else if (
        application_stage === 'test_result' ||
        m_applicationstatus === 'Assessment Passed'
      ) {
        nextPageNumber(4);
      } else if (application_stage === 'application_status') {
        nextPageNumber(4);
      } else if (
        application_stage === 'payment_status' ||
        m_applicationstatus === 'Full Payment Received'
      ) {
        if (
          courseDetails?.course_title === 'Industry Ready Program' ||
          courseDetails?.course_title === 'Job Ready Program'
        ) {
          nextPageNumber(3);
        } else {
          nextPageNumber(6);
        }
      }
      // else if (
      //   application_stage === 'payment_status' ||
      //   m_applicationstatus === 'Payment Successfull'
      // ) {
      //   nextPageNumber(6);
      // }
    }
  };

  const createPayment = async (paymentResponse, status) => {
    const payload = {
      uid: applicationDetails?.uid,
      orderItems: [
        {
          application_id: applicationDetails?._id,
          course_id: applicationDetails?.course_id,
          final_amount: 2500,
          payment_id: '',
          order_id: orderData?.id,
          payment_status: 'pending',
        },
      ],
    };
    const response = await ApiService('/student/application/order/upsert', `POST`, payload, true);
    // if (response?.data.code === 200) {
    //   // nextPage();
    // }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    window.scrollTo(0, 0);
    fetchInitialData(user?.uid);
    dispatch(setLoading(false));
  }, [courseDetails?.course_title]);

  const fetchVariantBatches = async (courseVariantId) => {
    const res = await ApiService(`courses/${courseVariantId}/batch/list`);
    if (res?.data.code === 200) {
      setBatches(res.data.data.result);
    }
  };

  const formPersonalDetailsPayload = async (personalDetails) => {
    // delete personalDetails.dob;
    setIsNextLoading(true);
    const payload = {
      uid: user?.uid,
      course_id: courseDetails?.course_id,
      course_title: courseDetails?.course_title,
      course_duration: courseDetails?.duration,
      course_start_date: new Date(courseDetails?.start_date).toLocaleDateString(),
      personal_details: personalDetails,
    };

    const response = await ApiService('/student/personal-details', `POST`, payload, true);

    setIsNextLoading(false);
    if (response?.data.code === 200) {
      dispatch(
        openToaster({
          show: true,
          header: 'Success!',
          variant: 'info',
          body: 'Personal details was saved successfully!',
        })
      );
      nextPage();
    }
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
      const { full_name, mobile_number, whatsapp_number, guardian_details, ...rest } = values;

      const personalDetails = {
        full_name: full_name,
        email: values?.email,
        gender: values?.gender,
        mobile_number: mobile_number,
        mobile_cc: '+91', //`+${mobileState?.data.dialCode}`,
        whatsapp_number: whatsapp_number,
        whatsapp_cc: '+91', //`+${whatsAppState?.data.dialCode}`,
        guardian_details: guardian_details,
        birth_year: values.birth_year,
        ...(Number(values.birth_date) && { birth_date: Number(values.birth_date) }),
        ...(Number(values.birth_month) && { birth_month: Number(values.birth_month) }),
      };
      formPersonalDetailsPayload(personalDetails);
    },
  });

  const nextPageNumber = (pageNumber) => {
    // const getLastActiveStep = localStorage.getItem('activeStep');
    // const check = getLastActiveStep !== null ? parseInt(getLastActiveStep) : null;

    switch (pageNumber) {
      case 0:
        setPage(0);
        setStepperTitle('Personal Details');
        if (
          courseDetails?.course_title === 'Industry Ready Program' ||
          courseDetails?.course_title === 'Job Ready Program'
        ) {
          setStepperTitle_('Personal Details');
        }
        break;
      case 1:
        setPage(1);
        setStepperTitle('Education & Work Details');
        if (
          courseDetails?.course_title === 'Industry Ready Program' ||
          courseDetails?.course_title === 'Job Ready Program'
        ) {
          setStepperTitle_('Education & Work Details');
        }
        break;
      case 2:
        setPage(2);
        setStepperTitle('Entrance Test');
        if (
          courseDetails?.course_title === 'Industry Ready Program' ||
          courseDetails?.course_title === 'Job Ready Program'
        ) {
          setStepperTitle_('Payment');
        }
        break;
      case 3:
        setPage(3);
        setStepperTitle('Test Result');
        if (
          courseDetails?.course_title === 'Industry Ready Program' ||
          courseDetails?.course_title === 'Job Ready Program'
        ) {
          setStepperTitle_('KYC & Documents');
        }
        break;
      case 4:
        setPage(4);
        setStepperTitle('Application Status');
        if (
          courseDetails?.course_title === 'Industry Ready Program' ||
          courseDetails?.course_title === 'Job Ready Program'
        ) {
          setStepperTitle_('Enrollment Status');
        }
        break;
      case 5:
        setPage(5);
        setStepperTitle('Payment');

        break;
      case 6:
        setPage(6);
        setStepperTitle('KYC & Documents');

        break;
      case 7:
        setPage(7);
        setStepperTitle('Enrollment Status');

        break;
      default:
        setPage(0);
    }
    // localStorage.setItem('activeStep', pageNumber);
  };
  const nextPageNumber_ = (pageNumber) => {
    switch (pageNumber) {
      case 0:
        setPage(0);
        setStepperTitle('Personal Details');
        break;
      case 1:
        setPage(1);
        setStepperTitle('Education Details');
        break;

      case 2:
        setPage(2);
        setStepperTitle('Payment');
        break;
      case 3:
        setPage(3);
        setStepperTitle('KYC & Documents');
        break;

      case 4:
        setPage(4);
        setStepperTitle('Enrollment Status');
        break;
      default:
        setPage(0);
    }
  };
  const returnToDashboard = () => {
    navigate('/dashboard');
  };
  const nextPage = () => {
    const nextPage = page + 1;
    nextPageNumber(nextPage);
  };

  const copyFromMobileNumber = (value) => {
    if (value.target.checked) {
      setWhatsAppNumber({ phone: mobileState.phone, data: mobileState.data });
      formik.setFieldValue('whatsapp_number', mobileState.phone);
    }
  };

  const genderOptions = [
    { name: 'Male', value: 'male', icon: maleIcon },
    { name: 'Female', value: 'female', icon: femaleIcon },
  ];
  const handleViewCourseClick = () => {
    if (courseDetails?.course_title === 'Industry Ready Program') {
      window.open('https://www.unikaksha.com/course/industry-ready-program/', '_blank');
      return;
    }
    if (courseDetails?.course_title === 'Job Ready Program') {
      window.open('https://www.unikaksha.com/course/job-ready-program/', '_blank');
      return;
    } else {
      // Navigate to the course URL
      navigate(`/course/${courseDetails?.course_url}`, { state: courseDetails });
    }
  };

  const onStepperClick = (page) => {
    nextPageNumber(page);
  };

  return (
    <>
      {!isLoading ? (
        <div className="my-5  course-application  course-application-uii">
          <div className="container">
            <div className="d-flex mt-5 back-btn">
              <img
                className="me-2"
                // onClick={() => setPage(page - 1)}
                onClick={() => onStepperClick(page - 1)}
                src={arrowBack}
                alt="back-arrow"
              />
              <p className="step-header">
                {courseDetails?.course_title === 'Industry Ready Program' ||
                courseDetails?.course_title === 'Job Ready Program'
                  ? stepperTitle_
                  : stepperTitle}
              </p>
            </div>
            <MultiStepBar
              page={page}
              onPageNumberClick={nextPageNumber}
              onPageNumberClick_={nextPageNumber_}
              setPage={setPage}
              courseTitle={courseDetails?.course_title}
              className="custom-bar"
            />
            <Card className="view-course border">
              <Card.Body
                style={{ padding: 'unset' }}
                className="d-flex justify-content-between rounded align-items-center">
                <div>
                  <Card.Title
                    style={{ fontWeight: '600', color: '#222380', marginBottom: 'unset' }}>
                    {courseDetails?.course_title}
                  </Card.Title>
                  {/* <Card.Subtitle style={{ fontFamily: 'Roboto' }} className="mb-2 text-muted d-flex">
                  <div style={{ fontSize: '12px', paddingRight: '24px' }}>
                    <img className="me-2" src={hourGlass} alt="back-arrow" />
                    <span style={{ fontWeight: '400' }}>Duration, </span>
                    <span style={{ fontWeight: '600' }}>6 Months</span>
                  </div>
                  <div style={{ fontSize: '12px' }}>
                    <img className="me-2" src={calendar1} alt="back-arrow" />
                    <span style={{ fontWeight: '400' }}>Starts, </span>
                    <span style={{ fontWeight: '600' }}>
                      {courseDetails.course_variant_sections?.batches?.value[0][0].value}
                    </span>
                  </div>
                </Card.Subtitle> */}
                </div>
                <div>
                  <Card.Link as="div" className="view-card-course" onClick={handleViewCourseClick}>
                    View Course
                  </Card.Link>
                </div>
              </Card.Body>
            </Card>
            <div className="my-4 course-fully-form">
              {page === 0 && (
                <>
                  <Form onSubmit={formik.handleSubmit}>
                    <>
                      <Row className="row-bottom">
                        <Form.Group as={Col} sm={4} controlId="full_name">
                          <Form.Label>
                            Full Name
                            <span className="text-danger">*</span>
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
                            disabled="disabled"
                            style={{ opacity: 0.5 }}
                            // defaultValue={user.displayName}
                            value={formik.values?.full_name}
                            placeholder="Enter you full name"
                            // disabled="disabled"
                          />

                          {formik.touched.full_name && formik.errors.full_name ? (
                            <div className="error-message">{formik.errors.full_name}</div>
                          ) : null}
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="email">
                          <Form.Label>
                            Email
                            <span className="text-danger">*</span>
                          </Form.Label>

                          <Form.Control
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            className={
                              formik.touched.email && formik.errors.email ? 'is-invalid' : null
                            }
                            onBlur={formik.handleBlur}
                            placeholder="Enter your Email"
                            value={formik.values?.email}
                            // disabled={disabled}
                            disabled="disabled"
                            style={{ opacity: 0.5 }}
                            // disabled={ userData?.email }
                          />

                          {formik.touched.email && formik.errors.email ? (
                            <div className="error-message">{formik.errors.email}</div>
                          ) : null}
                          <img className="me-2 verified" src={verified} alt="verified" />
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          sm={4}
                          controlId="mobile_number"
                          className="phone-input">
                          <Form.Label>
                            Mobile Number<span className="text-danger">*</span>
                          </Form.Label>
                          <div className="whatsapp-number">
                            <PhoneInput
                              placeholder="Enter your Mobile number"
                              country={'in'}
                              name="mobile_number"
                              value={formik.values?.mobile_number}
                              onChange={(phone, data) => {
                                formik.setFieldValue('mobile_number', phone);
                                setMobileNumber({ phone, data });
                              }}
                              // disabled={disabled}
                              style={{ opacity: 0.5 }}
                              // countryCodeEditable={false}
                              // onBlur={formik.handleBlur('mobile_number')}
                              className="disabled-field"
                              disabled="disabled"
                              // defaultValue={userData?.phone}
                              // disabled={ userData?.phone }
                            />
                          </div>
                          {formik.touched.mobile_number && formik.errors.mobile_number ? (
                            <div className="error-message">{formik.errors.mobile_number}</div>
                          ) : null}
                          <img className="me-2 verified" src={verified} alt="verified" />
                        </Form.Group>
                      </Row>
                      <Row className="row-bottom">
                        <Form.Group as={Col} sm={4} controlId="whatsapp_number">
                          <Form.Label>
                            Whatsapp Number<span className="text-danger">*</span>
                          </Form.Label>
                          <div className="whatsapp-number">
                            <PhoneInput
                              country={'in'}
                              name="whatsapp_number"
                              value={formik.values?.whatsapp_number}
                              onChange={(phone, data) => {
                                setWhatsAppNumber({ phone, data });
                                formik.setFieldValue('whatsapp_number', phone);
                              }}
                              countryCodeEditable={false}
                              // disabled={disabled}
                              disabled="disabled"
                              style={{ opacity: 0.5 }}
                              // onBlur={formik.handleBlur('whatsapp_number')}
                              placeholder="Enter your Whatsapp number"
                            />
                          </div>

                          {formik.touched.whatsapp_number && formik.errors.whatsapp_number ? (
                            <div className="error-message  mt-3">
                              {formik.errors.whatsapp_number}
                            </div>
                          ) : null}
                          <Form.Check
                            style={{ paddingLeft: '1.5em !important', marginTop: '5px' }}
                            type="checkbox"
                            checked={true}
                            onChange={(value) => copyFromMobileNumber(value)}
                            label="Same as mobile number"
                          />
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="gender">
                          <Form.Label>
                            Gender<span className="text-danger">*</span>
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
                                    <img src={gender.icon} aria-label={gender.value}></img>
                                    {gender.name}
                                  </span>
                                </ToggleButton>
                              ))}
                            </ButtonGroup>
                            {formik.touched.gender && formik.errors.gender ? (
                              <div className="error-message">{formik.errors.gender}</div>
                            ) : null}
                          </Row>
                        </Form.Group>

                        <Form.Group as={Col} lg={4} controlId="dob">
                          <div className="day-block">
                            <div className="day-form">
                              <Form.Label>Day</Form.Label>
                              <Form.Select
                                name="birth_date"
                                className={
                                  formik.touched.birth_date && formik.errors.birth_date
                                    ? 'is-invalid'
                                    : null
                                }
                                onBlur={formik.handleBlur}
                                disabled="disabled"
                                style={{ opacity: 0.5 }}
                                onChange={formik.handleChange}
                                value={formik.values?.birth_date}>
                                {/* defaultValue={userDOBData?.birth_date}> */}
                                {/* disabled={ userDOBData?.birth_date } */}
                                <option value="">Day</option>
                                {optionsday.map((option, index) => (
                                  <option key={index} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                                ;
                              </Form.Select>
                              {formik.touched.birth_date && formik.errors.birth_date ? (
                                <div className="error-message">{formik.errors.birth_date}</div>
                              ) : null}
                            </div>
                            <div className="day-form">
                              <Form.Label>Month</Form.Label>
                              <Form.Select
                                name="birth_month"
                                className={
                                  formik.touched.birth_month && formik.errors.birth_month
                                    ? 'is-invalid'
                                    : null
                                }
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                style={{ opacity: 0.5 }}
                                disabled="disabled"
                                value={formik.values?.birth_month}>
                                {/* defaultValue={userDOBData?.birth_month}> */}
                                {/* disabled={ userDOBData?.birth_month } */}
                                <option value="">Month</option>
                                {optionsmonth.map((option, index) => (
                                  <option key={index} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                                ;
                              </Form.Select>
                              {formik.touched.birth_month && formik.errors.birth_month ? (
                                <div className="error-message">{formik.errors.birth_month}</div>
                              ) : null}
                            </div>
                            <div className="day-form">
                              <Form.Label>
                                Year<span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Select
                                name="birth_year"
                                disabled="disabled"
                                className={
                                  formik.touched.birth_year && formik.errors.birth_year
                                    ? 'is-invalid'
                                    : null
                                }
                                style={{ opacity: 0.5 }}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values?.birth_year}>
                                {/* defaultValue={userDOBData?.birth_year}> */}
                                {/* disabled={ userDOBData?.birth_year } */}
                                <option value="">Year</option>
                                {yearsOptions.map((option, index) => (
                                  <option key={index} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                                ;
                              </Form.Select>
                              {formik.touched.birth_year && formik.errors.birth_year ? (
                                <div className="error-message">{formik.errors.birth_year}</div>
                              ) : null}
                            </div>{' '}
                          </div>
                        </Form.Group>
                      </Row>

                      <Row className="row-bottom row-top-bottom" md={3}>
                        <Form.Group as={Col} sm={4} controlId="guardian_details">
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
                          className="btn btn-outline-secondary btn "
                          variant="outline-secondary"
                          type="button"
                          onClick={returnToDashboard}>
                          Cancel
                        </Button>
                        <Button
                          className="col-1"
                          disabled={!(formik.isValid && formik.dirty) || isNextLoading}
                          variant="secondary"
                          type="submit">
                          {isNextLoading ? 'Saving.. ' : 'Next'}
                        </Button>
                      </Row>
                    </>
                  </Form>
                </>
              )}
              {page === 1 && (
                <EducationDetails
                  nextPage={nextPage}
                  course={courseDetails}
                  courseTitle={courseDetails?.course_title}
                  courseId={courseDetails?.course_id}
                  applicationDetails={applicationDetails}
                  nextPageNumber={nextPageNumber}
                  nextPageNumber_={nextPageNumber_}
                  user={user}
                  page={page}
                  educationalDetails={EducationalDetails}
                  setEducationalDetails={setEducationalDetails}
                  stepperTitle={stepperTitle}
                  setStepperTitle={setStepperTitle}
                  setPage={setPage}
                  onStepperClick={onStepperClick}
                />
              )}
              {courseDetails?.course_title === 'Full Stack Web Development' && (
                <>
                  {page === 2 && (
                    <EntranceTest
                      nextPage={nextPage}
                      course={courseDetails}
                      user={user}
                      nextPageNumber={nextPageNumber}
                    />
                  )}
                </>
              )}
              {courseDetails?.course_title === 'Full Stack Web Development' && (
                <>
                  {page === 3 && (
                    <TestResult
                      nextPage={nextPage}
                      testResult={testResults}
                      application={applicationDetails}
                      userName={user.displayName}
                    />
                  )}
                </>
              )}

              <>
                {courseDetails?.course_title === 'Job Ready Program' ||
                courseDetails?.course_title === 'Industry Ready Program'
                  ? page === 2 && (
                      <ApplicationStatus
                        nextPage={nextPage}
                        application={applicationDetails}
                        courseTitle={courseDetails?.course_title}
                        selectedBatch={courseDetails?.batchesData?.batch_id}
                        setOrderData={setOrderData}
                        nextPageNumber={nextPageNumber}
                        courseId={courseDetails?.course_id}
                        worldLineStatus={worldLineStatus}
                        setWorldLineStatus={setWorldLineStatus}
                        setSelectedBatch={setSelectedBatch}
                        setPaymentMethod={setPaymentMethod}
                        paymentMethod={paymentMethod}
                        createPayment={createPayment}
                      />
                    )
                  : page === 4 && (
                      <ApplicationStatus
                        nextPage={nextPage}
                        application={applicationDetails}
                        courseTitle={courseDetails?.course_title}
                        selectedBatch={courseDetails?.batchesData?.batch_id}
                        setOrderData={setOrderData}
                        nextPageNumber={nextPageNumber}
                        courseId={courseDetails?.course_id}
                        worldLineStatus={worldLineStatus}
                        setWorldLineStatus={setWorldLineStatus}
                        setSelectedBatch={setSelectedBatch}
                        setPaymentMethod={setPaymentMethod}
                        paymentMethod={paymentMethod}
                        createPayment={createPayment}
                      />
                    )}
              </>

              {courseDetails?.course_title === 'Full Stack Web Development' ? (
                <>
                  {paymentMethod && page === 5 && (
                    <Payments
                      nextPage={nextPage}
                      course={courseDetails}
                      orderData={orderData}
                      courseTitle={courseDetails?.course_title}
                      application={applicationDetails}
                      selectedBatch={courseDetails?.batchesData?.batch_id}
                      page={page}
                      worldLineStatus={worldLineStatus}
                      setWorldLineStatus={setWorldLineStatus}
                      onPageNumberClick={nextPageNumber}
                      setApplicationDetails={setApplicationDetails}></Payments>
                  )}
                </>
              ) : (
                <>
                  {paymentMethod && page === 2 && (
                    <Payments
                      nextPage={nextPage}
                      course={courseDetails}
                      orderData={orderData}
                      courseTitle={courseDetails?.course_title}
                      application={applicationDetails}
                      selectedBatch={courseDetails?.batchesData?.batch_id}
                      page={page}
                      worldLineStatus={worldLineStatus}
                      setWorldLineStatus={setWorldLineStatus}
                      onPageNumberClick={nextPageNumber}
                      setApplicationDetails={setApplicationDetails}></Payments>
                  )}
                </>
              )}
              {courseDetails?.course_title === 'Job Ready Program' ||
              courseDetails?.course_title === 'Industry Ready Program'
                ? page === 3 && (
                    <>
                      <KYCDocuments
                        nextPage={nextPage}
                        onAllDocumentsSubmitted={handleAllDocumentsSubmitted}
                        areDocumentsSubmitted={areDocumentsSubmitted}></KYCDocuments>
                      <Row className="d-flex justify-content-end">
                        <Button
                          className="col-1 me-2 btn btn-outline-secondary"
                          variant="outline-secondary"
                          onClick={() => onStepperClick(2)}
                          type="button">
                          Cancel
                        </Button>
                        <Button
                          className="col-1"
                          variant="secondary"
                          type="button"
                          onClick={() => nextPage(4)}
                          disabled={areDocumentsSubmitted}>
                          Save
                        </Button>
                      </Row>
                    </>
                  )
                : page === 6 && (
                    <>
                      <KYCDocuments
                        nextPage={nextPage}
                        onAllDocumentsSubmitted={handleAllDocumentsSubmitted}
                        areDocumentsSubmitted={areDocumentsSubmitted}></KYCDocuments>
                      <Row className="d-flex justify-content-end">
                        <Button
                          className="col-1 me-2 btn btn-outline-secondary"
                          variant="outline-secondary"
                          onClick={() => onStepperClick(5)}
                          type="button">
                          Cancel
                        </Button>
                        <Button
                          className="col-1"
                          variant="secondary"
                          type="button"
                          onClick={() => nextPage()}
                          disabled={areDocumentsSubmitted}>
                          Save
                        </Button>
                      </Row>
                    </>
                  )}
              {courseDetails?.course_title === 'Job Ready Program' ||
              courseDetails?.course_title === 'Industry Ready Program'
                ? page === 4 && (
                    <>
                      <EnrollmentStatus nextPage={nextPage}></EnrollmentStatus>
                    </>
                  )
                : page === 7 && (
                    <>
                      <EnrollmentStatus nextPage={nextPage}></EnrollmentStatus>
                    </>
                  )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <FooterContainer />
    </>
  );
};
export default CourseApplication;
