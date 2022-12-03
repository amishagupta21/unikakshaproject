import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Row,
  ToggleButton
} from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  arrowBack,
  calendar1,
  femaleIcon,
  hourGlass,
  maleIcon,
  workingRemote
} from '../../../assets/images';
import Footer from '../../../components/Footer';
import PrimaryNavbar from '../../../components/PrimaryNavbar';
import { setLoading } from '../../../redux/actions/LoaderActions';
import ApiService from '../../../services/ApiService';
import ApplicationStatus from './ApplicationStatus';
import './CourseApply.scss';
import EducationDetails from './EducationDetails';
import EnrollmentStatus from './EnrollmentStatus';
import MultiStepBar from './FormProgress';
import KYCDocuments from './KYCDocuments';
import TestResult from './TestResult';

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
  // const [personalDetails, setPersonalDetails] = React.useState();
  // const [educationDetails, setEducationDetails] = React.useState();
  const [page, setPage] = React.useState();
  const [stepperTitle, setStepperTitle] = React.useState('');
  const [mobileState, setMobileNumber] = React.useState({ phone: '', data: '' });
  const [whatsAppState, setWhatsAppNumber] = React.useState({ phone: '', data: '' });
  const [genderValue, setGenderValue] = React.useState('');
  const [courseDetails, setCourseDetails] = React.useState({});
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const fetchUserDetails = async () => {
    setIsLoading(true);
    const localUser = await JSON.parse(localStorage.getItem('user'));
    setUser(localUser);
    const userProfile = await ApiService(`/user/${localUser?.uid}/detail`, 'GET', {}, true);
    const { education_details, personal_details } = userProfile?.data?.data?.userProfile;
    // setPersonalDetails(personal_details);
    // setEducationDetails(education_details);
    nextPageNumber(0);
    setPersonalDetailsInForm(personal_details);
    setIsLoading(false);
  };

  const setPersonalDetailsInForm = (details) => {
    formik.setValues(details);
    setGenderValue(details.gender);
  };

  const fetchInitialData = () => {
    setCourseDetails(state);
    fetchUserDetails();
  };

  useEffect(() => {
    dispatch(setLoading(true));
    window.scrollTo(0, 0);
    fetchInitialData();
    dispatch(setLoading(false));
  }, []);

  const formPersonalDetailsPayload = async (personalDetails) => {
    const payload = {
      uid: user?.uid,
      course_id: courseDetails?.id,
      course_title: courseDetails?.course_title,
      course_duration: 4,
      course_start_date: '12th December 2022',
      personal_details: personalDetails,
    };
    const response = await ApiService('/student/personal-details', `POST`, payload, true);
    if (response?.data.code === 200) {
      nextPage();
    }
  };

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      full_name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      mobile_number: Yup.string().required(),
      whatsapp_number: Yup.string().required(),
      gender: Yup.string().required(),
      dob: Yup.date().required('Date of birth is requied'),
      guardian_details: Yup.string(),
    }),
    validate: (values) => {
      let errors = {};
      if (!values.mobile_number) {
        errors.mobile_number = '*Mobile number required';
      } else if (!values.whatsapp_number) {
        errors.whatsapp_number = '*Whatsapp number required';
      }
      return errors;
    },
    onSubmit: (values) => {
      const { full_name, mobile_number, whatsapp_number, guardian_details, ...rest } = values;
      const personalDetails = {
        full_name: full_name,
        mobile_number: mobile_number,
        mobile_cc: `+${mobileState.data.dialCode}`,
        whatsapp_number: whatsapp_number,
        whatsapp_cc: `+${whatsAppState.data.dialCode}`,
        guardian_details: guardian_details,
        ...rest,
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
        setStepperTitle('Education & Work Details');
        break;
      case 2:
        setPage(2);
        setStepperTitle('Entrance Test');
        break;
      case 3:
        setPage(3);
        setStepperTitle('Test Result');
        break;
      case 4:
        setPage(4);
        setStepperTitle('Application Status');
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
      <PrimaryNavbar />
      {!isLoading && (
        <div className="px-5 my-5 mx-5 course-application">
          <div className="d-flex mt-5">
            <img className="me-2" src={arrowBack} alt="back-arrow" />
            <p className="step-header">{stepperTitle}</p>
          </div>
          <MultiStepBar page={page} onPageNumberClick={nextPageNumber} />
          <Card className="view-course border">
            <Card.Body
              style={{ padding: 'unset' }}
              className="d-flex justify-content-between rounded align-items-center">
              <div>
                <Card.Title style={{ fontWeight: '600', color: '#222380' }} className="mb-4">
                  {courseDetails.course_title}
                </Card.Title>
                <Card.Subtitle style={{ fontFamily: 'Roboto' }} className="mb-2 text-muted d-flex">
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
                </Card.Subtitle>
              </div>
              <div>
                <Card.Link
                  style={{ fontSize: '18px', fontWeight: '500', color: '#EF6B29' }}
                  href="#">
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
                    <Row className="mb-5">
                      <Form.Group as={Col} controlId="full_name">
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
                          value={formik.values?.full_name}
                          placeholder="Full name"
                        />
                        {formik.touched.full_name && formik.errors.full_name ? (
                          <div className="error-message">{formik.errors.full_name}</div>
                        ) : null}
                      </Form.Group>

                      <Form.Group as={Col} controlId="email">
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
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <div className="error-message">{formik.errors.email}</div>
                        ) : null}
                      </Form.Group>

                      <Form.Group as={Col} controlId="mobile_number">
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
                        />
                        {formik.touched.mobile_number && formik.errors.mobile_number ? (
                          <div className="error-message">{formik.errors.mobile_number}</div>
                        ) : null}
                      </Form.Group>
                    </Row>

                    <Row className="mb-5">
                      <Form.Group as={Col} controlId="whatsapp_number">
                        <Form.Label>
                          Whatsapp Number<span className="text-danger">*</span>
                        </Form.Label>
                        <PhoneInput
                          country={'in'}
                          value={formik.values?.whatsapp_number}
                          onChange={(phone, data) => {
                            setWhatsAppNumber({ phone, data });
                            formik.setFieldValue('whatsapp_number', phone);
                          }}
                          onBlur={formik.handleBlur('whatsapp_number')}
                        />
                        {formik.touched.whatsapp_number && formik.errors.whatsapp_number ? (
                          <div className="error-message  mt-3">{formik.errors.whatsapp_number}</div>
                        ) : null}
                        <Form.Check
                          style={{ paddingLeft: '1.5em !important' }}
                          type="checkbox"
                          onChange={(value) => copyFromMobileNumber(value)}
                          label="Same as mobile number"
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="gender">
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

                      <Form.Group as={Col} controlId="dob">
                        <Form.Label>
                          Date of Birth<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="dob"
                          onChange={formik.handleChange}
                          value={formik.values?.dob}
                          className={formik.touched.dob && formik.errors.dob ? 'is-invalid' : null}
                          onBlur={formik.handleBlur}></Form.Control>
                        {formik.touched.dob && formik.errors.dob ? (
                          <div className="error-message">{formik.errors.dob}</div>
                        ) : null}
                      </Form.Group>
                    </Row>

                    <Row className="mb-5" md={3}>
                      <Form.Group as={Col} controlId="guardian_details">
                        <Form.Label>Guardian Detail</Form.Label>
                        <Form.Control
                          name="guardian_details"
                          onChange={formik.handleChange}
                          type="text"
                          placeholder="Guardian detail"
                        />
                      </Form.Group>
                    </Row>

                    <Row className="d-flex justify-content-end">
                      <Button
                        className="col-1 me-2 btn btn-outline-secondary"
                        variant="outline-secondary"
                        type="button"
                        onClick={returnToDashboard}>
                        Cancel
                      </Button>
                      <Button
                        className="col-1"
                        disabled={!(formik.isValid && formik.dirty)}
                        variant="secondary"
                        type="submit">
                        Next
                      </Button>
                    </Row>
                  </>
                </Form>
              </>
            )}
            {page === 1 && <EducationDetails nextPage={nextPage} />}
            {page === 2 && (
              <>
                <Container className="d-flex">
                  <Col className="d-flex justify-content-center">
                    <img src={workingRemote}></img>
                  </Col>
                  <Col className="d-flex flex-column justify-content-around mx-5">
                    <div className="d-flex justify-content-center">
                      <Button variant="outline-secondary">Take Test</Button>
                    </div>
                    <div className="copy-text">
                      <Form.Control
                        type="text"
                        className="text"
                        value="https://www.skillfit.com/java-test"
                        readOnly
                      />
                      <Button variant="primary">
                        <i className="bi bi-files"></i>
                      </Button>
                    </div>
                    <div className="text-center">
                      After taking the test please go back to{' '}
                      <span className="text-secondary">&quot;My Course&quot;</span> section to
                      complete the application.
                    </div>
                  </Col>
                </Container>
              </>
            )}
            {page === 3 && (
              <>
                <TestResult nextPage={nextPage} testResult={{ isPassed: true, marks: 80 }} />
              </>
            )}
            {page === 4 && (
              <>
                <ApplicationStatus nextPage={nextPage}></ApplicationStatus>
              </>
            )}
            {page === 6 && (
              <>
                <KYCDocuments nextPage={nextPage}></KYCDocuments>
                <Row className="d-flex justify-content-end">
                  <Button
                    className="col-1 me-2 btn btn-outline-secondary"
                    variant="outline-secondary"
                    type="button">
                    Cancel
                  </Button>
                  <Button
                    className="col-1"
                    variant="secondary"
                    type="button"
                    onClick={() => nextPage()}>
                    Save
                  </Button>
                </Row>
              </>
            )}
            {page === 7 && (
              <>
                <EnrollmentStatus nextPage={nextPage}></EnrollmentStatus>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default CourseApplication;
