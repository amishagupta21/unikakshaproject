import React, { useEffect } from 'react';
import { Button, ButtonGroup, Card, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import { arrowBack, calendar1, femaleIcon, hourGlass, maleIcon, workingRemote } from '../../../assets/images';
import './CourseApply.scss';
import TestResult from './TestResult';
import MultiStepBar from './FormProgress';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ApplicationStatus from './ApplicationStatus';
import KYCDocuments from './KYCDocuments';
import EnrollmentStatus from './EnrollmentStatus';
import Footer from '../../../components/Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import EducationDetails from './EducationDetails';
import ApiService from '../../../services/ApiService';

const steps = ["personal_details",
    "education_details",
    "entrance_test",
    "test_result",
    "application_status",
    "payment",
    "kyc_documents",
    "enrollment_status"
]

const CourseApplication = () => {
    const [page, setPage] = React.useState(6);
    const [stepperTitle, setStepperTitle] = React.useState('');
    const [mobileState, setMobileNumber] = React.useState({ phone: '', data: '' });
    const [whatsAppState, setWhatsAppNumber] = React.useState({ phone: '', data: '' });
    const [genderValue, setGenderValue] = React.useState('');
    const [courseDetails, setCourseDetails] = React.useState({});
    const [user, setUser] = React.useState({});

    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0)
        setUser(JSON.parse(localStorage.getItem('user')))
        setCourseDetails(state);
        nextPageNumber(steps.indexOf('personal_details'));
    }, [])

    const formPersonalDetailsPayload = async (personalDetails) => {
        const payload = {
            uid: user?.uid,
            course_id: courseDetails?.id,
            course_title: courseDetails?.course_title,
            course_duration: 4,
            course_start_date: "12th December 2022",
            personal_details: personalDetails
        }
        const response = await ApiService('/student/personal-details', `POST`, payload, true);
        console.log(response)
        if(response?.data.code === 200) {
            nextPage();
        }
    }

    const formik = useFormik({
        initialValues: { fullname: '', email: '' },
        validationSchema: Yup.object().shape({ 
            fullname: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            mobileNumber: Yup.string().required(),
            whatsAppNumber: Yup.string().required(),
            gender: Yup.string(),
            dob: Yup.string().required('Date of birth is requied'),
            guardianDetail: Yup.string(),
        }),
        validate: values => {
            let errors = {};
            if(!values.mobileNumber) {
                errors.mobileNumber = '*Mobile number required';
            } else if(!values.whatsAppNumber) {
                errors.whatsAppNumber = '*Whatsapp number required';
            }
            return errors;
        },
        onSubmit: values => {
            const { fullname, mobileNumber, whatsAppNumber, guardianDetail, ...rest } = values;
            const personalDetails = {
                full_name: fullname,
                mobile_number: `+${mobileNumber}`,
                mobile_cc: `+${mobileState.data.dialCode}`,
                whatsapp_number: `+${whatsAppNumber}`,
                whatsapp_cc: `+${whatsAppState.data.dialCode}`,
                guardian_details: guardianDetail,
                ...rest
            }
            formPersonalDetailsPayload(personalDetails);
        }
    })

    const nextPageNumber = pageNumber => {
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
            case 7: setPage(7);
                setStepperTitle('Enrollment Status');
                break;
            default:
                setPage(0);
        }
    };

    const returnToDashboard = () => {
        navigate('/dashboard')
    }

    const nextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        nextPageNumber(nextPage);
    };

    const copyFromMobileNumber = value => {
        if (value.target.checked) {
            setWhatsAppNumber(mobileState);
            formik.setFieldValue('whatsAppNumber', mobileState.phone);
        }
    };

    const genderOptions = [
        { name: 'Male', value: 'male', icon: maleIcon },
        { name: 'Female', value: 'female', icon: femaleIcon },
    ];

    return (
        <>
            <div className='px-5 my-5 mx-5 course-application'>
                <div className='d-flex mt-5'>
                    <img className='me-2' src={arrowBack} alt="back-arrow" />
                    <p className="step-header">{stepperTitle}</p>
                </div>
                <MultiStepBar page={page} onPageNumberClick={nextPageNumber} />
                <Card className='view-course border'>
                    <Card.Body style={{ padding: 'unset' }} className='d-flex justify-content-between rounded align-items-center'>
                        <div>
                            <Card.Title style={{ fontWeight: '600', color: '#222380' }} className="mb-4">{courseDetails.course_title}</Card.Title>
                            <Card.Subtitle style={{ fontFamily: 'Roboto' }} className="mb-2 text-muted d-flex">
                                <div style={{ fontSize: '12px', paddingRight: '24px' }}>
                                    <img className='me-2' src={hourGlass} alt="back-arrow" />
                                    <span style={{ fontWeight: '400' }}>Duration, </span><span style={{ fontWeight: '600' }}>6 Months</span>
                                </div>
                                <div style={{ fontSize: '12px' }}>
                                    <img className='me-2' src={calendar1} alt="back-arrow" />
                                    <span style={{ fontWeight: '400' }}>Starts, </span><span style={{ fontWeight: '600' }}>{courseDetails.course_variant_sections?.batches?.value[0][0].value}</span>
                                </div>
                            </Card.Subtitle>
                        </div>
                        <div>
                            <Card.Link style={{ fontSize: '18px', fontWeight: '500', color: '#EF6B29' }} href="#">View Course</Card.Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className='my-4'>
                    {page === 0 && (<>
                        <Form onSubmit={formik.handleSubmit}>
                                <>
                                    <Row className="mb-5">
                                        <Form.Group as={Col} controlId="fullname">
                                            <Form.Label>Full Name
                                                <span className="text-danger">*</span>
                                                <span className='text-muted'> (As per PAN)</span>
                                            </Form.Label>
                                            <Form.Control type="text" name='fullname' onChange={formik.handleChange} className={formik.touched.fullname && formik.errors.fullname ? 'is-invalid' : null} onBlur={formik.handleBlur} value={formik.values.fullname} placeholder="Full name" />
                                            {formik.touched.fullname && formik.errors.fullname ? (<div className="error-message">{formik.errors.fullname}</div>) : null}
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="email">
                                            <Form.Label>Email
                                                <span className="text-danger">*</span>
                                            </Form.Label>
                                            <Form.Control type="email" name='email' onChange={formik.handleChange} className={formik.touched.email && formik.errors.email ? 'is-invalid' : null} onBlur={formik.handleBlur} placeholder="Email" />
                                            {formik.touched.email && formik.errors.email ? (<div className="error-message">{formik.errors.email}</div>) : null}
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="mobileNumber">
                                            <Form.Label>Mobile Number<span className="text-danger">*</span></Form.Label>
                                            <PhoneInput
                                                country={'in'}
                                                name='mobileNumber'
                                                value={formik.values.mobileNumber}
                                                onChange={(phone, data) => {
                                                    formik.setFieldValue('mobileNumber', phone);
                                                    setMobileNumber({ phone, data });
                                                }}
                                                onBlur={formik.handleBlur('mobileNumber')}
                                            />
                                            {formik.touched.mobileNumber && formik.errors.mobileNumber ? (<div className="error-message">{formik.errors.mobileNumber}</div>) : null}
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-5">
                                        <Form.Group as={Col} controlId="whatsAppNumber">
                                            <Form.Label>Whatsapp Number<span className="text-danger">*</span></Form.Label>
                                            <PhoneInput
                                                country={'in'}
                                                value={whatsAppState.phone}
                                                onChange={(phone, data) => {
                                                    setWhatsAppNumber({ phone, data });
                                                    formik.setFieldValue('whatsAppNumber', phone);
                                                }}
                                                onBlur={formik.handleBlur('whatsAppNumber')}
                                            />
                                            {formik.touched.whatsAppNumber && formik.errors.whatsAppNumber ? (<div className="error-message  mt-3">{formik.errors.whatsAppNumber}</div>) : null}
                                            <Form.Check style={{ paddingLeft: '1.5em !important' }} type="checkbox" onChange={value => (copyFromMobileNumber(value))} label="Same as mobile number" />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="gender">
                                            <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                                            <Row>
                                                <ButtonGroup aria-label="select-button">
                                                    {genderOptions.map((gender, idx) => (
                                                        <ToggleButton
                                                            className='border border-secondary radio-buttons me-2'
                                                            key={idx}
                                                            style={{ maxWidth: '30%' }}
                                                            id={`gender-${idx}`}
                                                            type="radio"
                                                            variant='outline-primary'
                                                            name="gender"
                                                            onBlur={formik.handleBlur}
                                                            value={gender.value}
                                                            checked={genderValue === gender.value}
                                                            onChange={e => { setGenderValue(e.currentTarget.value); formik.handleChange(e); }}
                                                        >
                                                            <span className='options'><img src={gender.icon} aria-label={gender.value}></img>{gender.name}</span>
                                                        </ToggleButton>
                                                    ))}
                                                </ButtonGroup>
                                                {formik.touched.gender && formik.errors.gender ? (<div className="error-message">{formik.errors.gender}</div>) : null}
                                            </Row>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="dob">
                                            <Form.Label>Date of Birth<span className="text-danger">*</span></Form.Label>
                                            <Form.Control type="date" name='dob' onChange={formik.handleChange} className={formik.touched.dob && formik.errors.dob ? 'is-invalid' : null} onBlur={formik.handleBlur}></Form.Control>
                                            {formik.touched.dob && formik.errors.dob ? (<div className="error-message">{formik.errors.dob}</div>) : null}
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-5" md={3}>
                                        <Form.Group as={Col} controlId="guardianDetail">
                                            <Form.Label>Guardian Detail</Form.Label>
                                            <Form.Control name='guardianDetail' onChange={formik.handleChange} type='text' placeholder='Guardian detail'/>
                                        </Form.Group>
                                    </Row>

                                    <Row className='d-flex justify-content-end'>
                                        <Button
                                            className='col-1 me-2 btn btn-outline-secondary'
                                            variant='outline-secondary'
                                            type="button"
                                            onClick={returnToDashboard}
                                        >
                                            Cancel
                                        </Button>
                                        <Button className='col-1' disabled={!(formik.isValid && formik.dirty)} variant='secondary' type="submit">
                                            Next
                                        </Button>
                                    </Row>
                                </>
                            </Form>
                    </>)}
                    { page === 1 && (
                        <EducationDetails />
                    )}
                    {/* {page === 1 && (<div>
                        <Form>
                            <Row className='d-flex flex-column'>
                                <p className='stepper-sub-header'>Educational Details</p>
                            </Row>
                            <Row className="mb-5">
                                <Form.Group as={Col} md={4} controlId="qualification">
                                    <Form.Label>What is your highest qualification?
                                        <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Select className='form-control' aria-label="highest-qualification" onChange={value => onQualificationChange(value)} placeholder="Please select">
                                        {highestQualificationOption.map((option, index) => (
                                            <option key={index} value={option.value}>{option.label}</option>
                                        ))};
                                    </Form.Select>
                                </Form.Group>
                                {highestQualification && <Form.Group as={Col} md={3} controlId="yesOrNo">
                                    <Form.Label>{yesOrNoLabel}<span className="text-danger">*</span></Form.Label>
                                    <Row>
                                        <ButtonGroup aria-label="select-button">
                                            {yesNo.map((option, idx) => (
                                                <ToggleButton
                                                    className='border border-secondary radio-buttons me-2'
                                                    key={idx}
                                                    style={{ maxWidth: '30%' }}
                                                    id={`option-${idx}`}
                                                    type="radio"
                                                    variant='outline-primary'
                                                    name="yesOrNo"
                                                    value={option.value}
                                                    checked={graduatedYesOrNo === option.value}
                                                    onChange={e => { setGraduatedYesOrNo(e.currentTarget.value); }}
                                                >
                                                    <span className='options'>{option.name}</span>
                                                </ToggleButton>
                                            ))}
                                        </ButtonGroup>
                                    </Row>
                                </Form.Group>}
                            </Row>
                            { highestQualification && (
                                <>
                                    { graduatedYesOrNo === 'no' && highestQualification === '12th/diploma' && (
                                        <Container className='d-flex flex-row justify-content-center'>
                                            <div>
                                                <img style={{ maxWidth: 'max-content' }} src={workingRemote}></img>
                                                <p className='not-eligible-msg'>{staticContents.notEligible}</p>
                                            </div>
                                        </Container>
                                    )}
                                { highestQualification === 'pg' && (
                                    <>
                                        <Row className='d-flex mb-2 justify-content-center align-items-center'>
                                            <span className='sections'>PG Degree Details</span><Col><ColoredLine color='grey'/></Col>
                                        </Row>

                                        <Row className='mb-5'>
                                            <Form.Group as={Col} controlId="pgCollegeName">
                                                <Form.Label>PG college name
                                                    <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="UG college name" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="pgYOC">
                                                <Form.Label>PG year of completion<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="date" name='pgYOC'></Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="pgMarks">
                                                <Form.Label>PG passing marks
                                                    <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="PG passing marks" />
                                            </Form.Group>
                                        </Row>
                                    </>
                                )}
                                { highestQualification === 'ug' && (
                                    <>
                                        <Row className='d-flex mb-2 justify-content-center align-items-center'>
                                            <span className='sections'>UG / Bachelors Degree Details</span><Col><ColoredLine color='grey'/></Col>
                                        </Row>

                                        <Row className='mb-5'>
                                            <Form.Group as={Col} controlId="ugCollegeName">
                                                <Form.Label>UG college name
                                                    <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="UG college name" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="ugYOC">
                                                <Form.Label>UG year of completion<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="date" name='ugYOC'></Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="ugMarks">
                                                <Form.Label>UG passing marks
                                                    <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="UG passing marks" />
                                            </Form.Group>
                                        </Row>
                                    </>
                                )}
                                { graduatedYesOrNo !== 'no' && (highestQualification === '12th/diploma' || highestQualification === 'ug') && (
                                    <>
                                        <Row className='d-flex mb-2 justify-content-center align-items-center'>
                                            <span className='sections'>12th / Diploma Course Details</span><Col><ColoredLine color='grey'/></Col>
                                        </Row>

                                        <Row className='mb-5'>
                                            <Form.Group as={Col} controlId="schoolDiplomaCollegeName">
                                                <Form.Label>12th / Diploma college name
                                                    <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="12th school / diploma college name" />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="schoolYearOfCompletion">
                                                <Form.Label>12th / Diploma year of completion<span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="date" name='schoolYOP'></Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="schoolMarks">
                                                <Form.Label>12th / Diploma passing marks
                                                    <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Form.Control type="text" placeholder="12th or diploma marks" />
                                            </Form.Group>
                                        </Row>
                                    </>
                                )}
                                <Row className='d-flex mb-2 justify-content-center align-items-center'>
                                    <span className='sections'>Additional Course Details</span><Col><ColoredLine color='grey'/></Col>
                                </Row>
                                <Row className='mb-5'>
                                    <Form.Group as={Col} md={4} controlId="enrolledInProgram">
                                        <Row>
                                            <Form.Label>Are you enrolled into any other program
                                                <span className="text-danger">*</span>
                                            </Form.Label>
                                            <ButtonGroup aria-label="select-button">
                                                {yesNo.map((enrollOption, idx) => (
                                                    <ToggleButton
                                                        className='border border-secondary radio-buttons me-2'
                                                        key={idx}
                                                        style={{ maxWidth: '30%' }}
                                                        id={`enrollOption-${idx}`}
                                                        type="radio"
                                                        variant='outline-primary'
                                                        name="enrolledInProgram"
                                                        value={enrollOption.value}
                                                        checked={enrolledInProgram === enrollOption.value}
                                                        onChange={e => { setEnrolledInProgram(e.currentTarget.value); }}
                                                    >
                                                        <span className='options'>{enrollOption.name}</span>
                                                    </ToggleButton>
                                                ))}
                                            </ButtonGroup>
                                        </Row>
                                    </Form.Group>
                                </Row>
                                <Row className='d-flex flex-column'>
                                    <p className='stepper-sub-header'>Work Details</p>
                                </Row>
                                <Row className="mb-5">
                                    <Form.Group as={Col} controlId="currentPosition">
                                        <Form.Label>Your current working position
                                            <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Select className='form-control' aria-label="current-position" onChange={value => onQualificationChange(value)} placeholder="Please select">
                                            <option>Please select</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="experience">
                                        <Form.Label>Total technical experience in years
                                            <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Total technical experience" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="currentOrganization">
                                        <Form.Label>Organization you are working in
                                            <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="Current organization" />
                                    </Form.Group>
                                </Row>
                                </>
                            )}
                        </Form>
                        <Row className='d-flex justify-content-end'>
                            <Button
                                className='col-1 me-2 btn btn-outline-secondary'
                                variant='outline-secondary'
                                type="button"
                            >
                                Cancel
                            </Button>
                            <Button className='col-1' variant='secondary' type="button" onClick={() => nextPage()}>
                                Next
                            </Button>
                        </Row>
                    </div>)} */}
                    {page === 2 && (<>
                        <Container className='d-flex'>
                                <Col className='d-flex justify-content-center'>
                                    <img src={workingRemote}></img>
                                </Col>
                                <Col className='d-flex flex-column justify-content-around mx-5'>
                                    <div className='d-flex justify-content-center'>
                                        <Button variant='outline-secondary'>Take Test</Button>
                                    </div>
                                    <div className="copy-text">
                                        <Form.Control type="text" className="text" value="https://www.skillfit.com/java-test" readOnly />
                                        <Button variant='primary'><i className="bi bi-files"></i></Button>
                                    </div>
                                    <div className='text-center'>
                                        After taking the test please go back to <span className='text-secondary'>&quot;My Course&quot;</span> section to complete the application.
                                    </div>
                                </Col>
                        </Container>
                    </>)}
                    {page === 3 && (
                        <>
                            <TestResult nextPage={nextPage} testResult={{isPassed: true, marks: 80 }}/>
                        </>
                    )}
                    { page === 4 && (
                        <>
                            <ApplicationStatus nextPage={nextPage} ></ApplicationStatus>
                        </>
                    )}
                    { page === 6 && (
                        <>
                            <KYCDocuments nextPage={nextPage} ></KYCDocuments>
                            <Row className='d-flex justify-content-end'>
                                <Button
                                    className='col-1 me-2 btn btn-outline-secondary'
                                    variant='outline-secondary'
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button className='col-1' variant='secondary' type="button" onClick={() => nextPage()}>
                                    Save
                                </Button>
                            </Row>
                        </>
                    )}
                    { page === 7 && (
                        <>
                            <EnrollmentStatus nextPage={nextPage} ></EnrollmentStatus>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CourseApplication;
