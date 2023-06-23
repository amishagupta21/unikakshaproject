import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Button, ButtonGroup, Card, Col, Form, Row, ToggleButton } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { arrowBack, femaleIcon, maleIcon, verified } from '../../../../assets/images';
import { setLoading } from '../../../../redux/actions/LoaderActions';
import Loader from '../../../../components/util-comonents/Loader';
import ApiService from '../../../../services/ApiService';
import ApplicationStatus from './StudentApplicationStatus';
import './StudentCourseApply.scss';
import EducationDetails from './StudentEducationDetails';
import EnrollmentStatus from './StudentEnrollmentStatus';
import MultiStepBar from './StudentFormProgress';
import Payments from './StudentPayments';
import { isEmpty } from 'lodash';
import {
  yearsOptions,
  optionsmonth,
  optionsday,
} from '../../../.././utils-componets/static-content/DateMonthContent';
import { openToaster } from '../../../../redux/actions/ToastAction';
import FooterContainer from '../../../../components/FooterComponent';

const steps = [
  'personal_details',
  'education_details',
  'application_status',
  'payment',
  'enrollment_status',
];

const StudentCourseApplication = () => {
  const [page, setPage] = React.useState();
  const [stepperTitle, setStepperTitle] = React.useState('');
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
  const [selectedBatch, setSelectedBatch] = React.useState();
  const [userData, setUserData] = React.useState();
  const [birthInfo, setBirthInfo] = React.useState();
  // const [userDOBData, setDobData] = React.useState();

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
    setInitialData(userDetails?.data?.data?.user, birthInfo);
    setUserData(userDetails?.data?.data?.user);

    personalDetails = userDetails?.data?.data?.userProfile?.personal_details ?? personalDetails;
    educationalDetails.education_details =
      userDetails?.data?.data?.userProfile?.education_details ?? educationalDetails;
    educationalDetails.work_details = userDetails?.data?.data?.userProfile?.work_details ?? [];
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

  const fetchCourseDetails = async (params) => {
    const { courseVariantSlug } = params;
    const res = await ApiService(`courses/course_url/${courseVariantSlug}/detail`);
    return res?.data?.data?.course;
  };

  const setInitialData = (initData, birthInfo) => {
    setBirthInfo(birthInfo);
    formik.setValues({
      email: initData?.email,
      mobile_number: initData?.phone,
      full_name: user?.displayName,
      birth_date: birthInfo?.birth_date ? birthInfo?.birth_date : '',
      birth_month: birthInfo?.birth_month ? birthInfo?.birth_month : '',
      birth_year: birthInfo?.birth_year ? birthInfo?.birth_year : '',
    });
    setMobileNumber({ phone: initData?.phone });

    // mobile_number: initData?.phone;
    // setMobileNumber({ phone: initData?.phone})
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
    await fetchApplicationDetails(uid, courseData.id);
    fetchVariantBatches(courseData.id);
    setIsLoading(false);
  };

  const fetchApplicationDetails = async (uid, courseId) => {
    const payload = {
      uid: uid,
      course_id: courseId,
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
      } else if (application_stage === 'application_status') {
        nextPageNumber(2);
      } else if (
        application_stage === 'payment_status' &&
        m_applicationstatus === 'Payment Failed'
      ) {
        nextPageNumber(2);
      } else if (
        application_stage === 'payment_status' &&
        m_applicationstatus === 'Payment Successfull'
      ) {
        nextPageNumber(4);
      }
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    window.scrollTo(0, 0);
    fetchInitialData(user?.uid);
    dispatch(setLoading(false));
  }, []);

  const fetchVariantBatches = async (courseVariantId) => {
    const res = await ApiService(`courses/${courseVariantId}/batch/list`);
    if (res?.data.code === 200) {
      setBatches(res.data.data.result);
    }
  };

  const formPersonalDetailsPayload = async (personalDetails) => {
    delete personalDetails.dob;
    setIsNextLoading(true);
    const payload = {
      uid: user?.uid,
      course_id: courseDetails?.id,
      course_title: courseDetails?.course_title,
      course_duration: courseDetails?.course_variant_sections?.duration,
      course_start_date: new Date(batches[0].start_date).toLocaleDateString(),
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
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      full_name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      mobile_number: Yup.string().required(),
      whatsapp_number: Yup.string().required('Whatsapp number is required'),
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
      } else if (!values?.whatsapp_number) {
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
        setStepperTitle('Application Status');
        break;
      case 3:
        setPage(3);
        setStepperTitle('Payment');
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
    setPage(nextPage);
    nextPageNumber(nextPage);
  };

  const copyFromMobileNumber = (value) => {
    if (value.target.checked) {
      setWhatsAppNumber(mobileState);
      formik.setFieldValue('whatsapp_number', mobileState.phone);
    }
  };

  const genderOptions = [
    { name: 'Male', value: 'male', icon: maleIcon },
    { name: 'Female', value: 'female', icon: femaleIcon },
  ];

  return (
    <>
      {!isLoading ? (
        <div className="my-5  course-application  course-application-ui">
          <div className="container">
            <div className="d-flex mt-5 back-btn">
              <img className="me-2" onClick={() => navigate(-1)} src={arrowBack} alt="back-arrow" />
              <p className="step-header">{stepperTitle}</p>
            </div>
            <MultiStepBar page={page} onPageNumberClick={nextPageNumber} />
            <Card className="view-course border">
              <Card.Body
                style={{ padding: 'unset' }}
                className="d-flex justify-content-between rounded align-items-center">
                <div>
                  <Card.Title
                    style={{ fontWeight: '600', color: '#222380', marginBottom: 'unset' }}>
                    {courseDetails.course_title}
                  </Card.Title>
                </div>
                <div>
                  <Card.Link
                    className="my-card-links"
                    style={{ fontWeight: '500', color: '#EF6B29' }}
                    href={`../${courseDetails.course_url}`}>
                    View Course
                  </Card.Link>
                </div>
              </Card.Body>
            </Card>
            <div className="my-4">
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
                            // defaultValue={user.displayName}
                            value={formik.values?.full_name}
                            placeholder="Full name"
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
                            placeholder="Email"
                            value={formik.values?.email}
                            disabled={userData?.email}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div className="error-message">{formik.errors.email}</div>
                          ) : null}
                          <img className="me-2 verified" src={verified} alt="verified" />
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="mobile_number">
                          <Form.Label>
                            Mobile Number<span className="text-danger">*</span>
                          </Form.Label>
                          <PhoneInput
                            country={'in'}
                            name="mobile_number"
                            value={formik.values?.mobile_number}
                            onChange={(phone, data) => {
                              formik.setFieldValue('mobile_number', phone);
                              setMobileNumber({ phone, data });
                            }}
                            onBlur={formik.handleBlur('mobile_number')}
                            disabled="disabled"
                            // defaultValue={userData?.phone}
                          />
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
                              value={formik.values?.whatsapp_number}
                              onChange={(phone, data) => {
                                setWhatsAppNumber({ phone, data });
                                formik.setFieldValue('whatsapp_number', phone);
                              }}
                              onBlur={formik.handleBlur('whatsapp_number')}
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
                            onChange={(value) => copyFromMobileNumber(value)}
                            label="Same as mobile number"
                          />
                        </Form.Group>

                        <Form.Group as={Col} sm={4} controlId="gender">
                          <Form.Label>
                            Gender<span className="text-danger">*</span>
                          </Form.Label>
                          <Row className="row-form">
                            <ButtonGroup aria-label="select-button">
                              {genderOptions.map((gender, idx) => (
                                <ToggleButton
                                  className="border border-secondary radio-buttons me-2"
                                  key={idx}
                                  style={{ maxWidth: '35%' }}
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

                        <Form.Group as={Col} lg={4}>
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
                                onChange={formik.handleChange}
                                value={formik.values?.birth_date}>
                                {/* defaultValue={userDOBData?.birth_date}> */}
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
                                value={formik.values?.birth_month}>
                                {/* defaultValue={userDOBData?.birth_month}> */}
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
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values?.birth_year}>
                                {/* defaultValue={userDOBData?.birth_year}> */}
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
                            </div>
                          </div>
                        </Form.Group>
                      </Row>

                      <Row className="row-bottom row-top-bottom" md={3}>
                        <Form.Group as={Col} controlId="guardian_details">
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

                      <Row className="d-flex justify-content-end my-btn-styles row-bottom row-top-bottom">
                        <Button
                          className="btn btn-outline-secondary"
                          variant="outline-secondary"
                          type="button"
                          onClick={returnToDashboard}>
                          Cancel
                        </Button>
                        <Button
                          className=""
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
                  user={user}
                  educationalDetails={EducationalDetails}
                  setEducationalDetails={setEducationalDetails}
                />
              )}
              {/* {page === 2 && <EntranceTest nextPage={nextPage} course={courseDetails} user={user} />}
            {page === 3 && (
              <>
                <TestResult
                  nextPage={nextPage}
                  testResult={testResults}
                  application={applicationDetails}
                  userName={user.displayName}
                />
              </>
            )} */}
              {page === 2 && (
                <>
                  <ApplicationStatus
                    nextPage={nextPage}
                    application={applicationDetails}
                    setOrderData={setOrderData}
                    courseId={courseDetails?.id}
                    setSelectedBatch={setSelectedBatch}></ApplicationStatus>
                </>
              )}
              {page === 3 && (
                <>
                  <Payments
                    nextPage={nextPage}
                    course={courseDetails}
                    orderData={orderData}
                    application={applicationDetails}
                    selectedBatch={selectedBatch}></Payments>
                </>
              )}

              {page === 4 && (
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

export default StudentCourseApplication;
