import React from 'react';
import { Button, ButtonGroup, Card, Col, Container, Form, Row, ToggleButton } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import { arrowBack, calendar1, femaleIcon, hourGlass, maleIcon, workingRemote } from '../../assets/images';
import './courseapply.scss';
import TestResult from './TestResult';
import MultiStepBar from './form-progress';
import { Formik } from 'formik';
import * as Yup from 'yup';

const highestQualificationOption = [
    { value: '', label: 'Please select' },
    { value: '12th/diploma', label: '12th / Diploma Graduate', yesNoLabel: '12th / Diploma graduated?' },
    { value: 'ug', label: 'UG / Bachelors degree Completed', yesNoLabel: 'UG / Bachelors degree completed?' },
    { value: 'pg', label: 'PG Graduated', yesNoLabel: 'PG Completed?' },
];

const staticContents = {
    notEligible: `Sorry, You're not eligible at the moment!`,
};

// eslint-disable-next-line react/prop-types
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color, backgroundColor: color, height: 2,
        }}
    />
);

const CourseApplication = () => {
    const [page, setPage] = React.useState(0);
    const [stepperTitle, setStepperTitle] = React.useState('Personal Details');
    const [mobileNumber, setMobileNumber] = React.useState({ phone: '', data: '' });
    const [whatsAppNumber, setWhatsAppNumber] = React.useState({ phone: '', data: '' });
    const [genderValue, setGenderValue] = React.useState('');
    const [graduatedYesOrNo, setGraduatedYesOrNo] = React.useState('nil');
    const [yesOrNoLabel, setYesOrNoLabel] = React.useState('');
    const [highestQualification, setHighestQualification] = React.useState('');
    const [enrolledInProgram, setEnrolledInProgram] = React.useState('');

    const initialValues1 = { fullname: '', email: '', phone: '', blog: '' };
    const validationSchema = Yup.object().shape({ 
        fullname: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobileNumber: Yup.string().required('Phone number is required'),
        gender: Yup.string().required('Gender is required'),
        dob: Yup.string().required('Date of birth is requied'),
        guardianDetail: Yup.string(),
    });

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
            default:
                setPage(1);
        }
    };

    const nextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        nextPageNumber(nextPage);
    };

    const onQualificationChange = value => {
        const option = highestQualificationOption.filter(e => e.value === value.target.value);
        setYesOrNoLabel(option[0].yesNoLabel);
        setHighestQualification(option[0].value);
    };

    const copyFromMobileNumber = value => {
        if (value.target.checked) {
            setWhatsAppNumber(mobileNumber);
        }
    };

    const genderOptions = [
        { name: 'Male', value: 'male', icon: maleIcon },
        { name: 'Female', value: 'female', icon: femaleIcon },
    ];

    const yesNo = [
        { name: 'Yes', value: 'yes' },
        { name: 'No', value: 'no' },
    ];

    return (
        <div className='px-5 my-5 mx-5'>
            <div className='d-flex mt-5'>
                <img className='me-2' src={arrowBack} alt="back-arrow" />
                <p className="step-header">{stepperTitle}</p>
            </div>
            <MultiStepBar page={page} onPageNumberClick={nextPageNumber} />
            <Card className='view-course border'>
                <Card.Body style={{ padding: 'unset' }} className='d-flex justify-content-between rounded align-items-center'>
                    <div>
                        <Card.Title style={{ fontWeight: '600', color: '#222380' }} className="mb-4">Full Stack Development</Card.Title>
                        <Card.Subtitle style={{ fontFamily: 'Poppins' }} className="mb-2 text-muted d-flex">
                            <div style={{ fontSize: '12px', paddingRight: '24px' }}>
                                <img className='me-2' src={hourGlass} alt="back-arrow" />
                                <span style={{ fontWeight: '400' }}>Duration, </span><span style={{ fontWeight: '600' }}>6 Months</span>
                            </div>
                            <div style={{ fontSize: '12px' }}>
                                <img className='me-2' src={calendar1} alt="back-arrow" />
                                <span style={{ fontWeight: '400' }}>Starts, </span><span style={{ fontWeight: '600' }}>14 Nov 2022</span>
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
                    <Formik
                        initialValues={initialValues1}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                  
                            setTimeout(() => {
                              alert(JSON.stringify(values, null, 2));
                              resetForm();
                              setSubmitting(false);
                            }, 500);
                        }}
                    >
                        {( { errors, touched, handleChange, handleBlur }) => (
                            <>
                                <Row className="mb-5">
                                    <Form.Group as={Col} controlId="fullname">
                                        <Form.Label>Full Name
                                            <span className="text-danger">*</span>
                                            <span className='text-muted'> (As per PAN)</span>
                                        </Form.Label>
                                        <Form.Control type="text" name='fullname' onChange={handleChange} className={touched.fullname && errors.fullname ? 'is-invalid' : null} onBlur={handleBlur} placeholder="Full name" />
                                        {touched.fullname && errors.fullname ? (<div className="error-message">{errors.fullname}</div>) : null}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Email
                                            <span className="text-danger">*</span>
                                        </Form.Label>
                                        <Form.Control type="email" name='email' onChange={handleChange} className={touched.email && errors.email ? 'is-invalid' : null} onBlur={handleBlur} placeholder="Email" />
                                        {touched.email && errors.email ? (<div className="error-message">{errors.email}</div>) : null}
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="mobileNumber">
                                        <Form.Label>Mobile Number<span className="text-danger">*</span></Form.Label>
                                        <PhoneInput
                                            country={'in'}
                                            name='mobileNumber'
                                            value={''}
                                            onChange={(phone, data) => {
                                                setMobileNumber({ phone, data });
                                            }}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-5">
                                    <Form.Group as={Col} controlId="whatsAppNumber">
                                        <Form.Label>Whatsapp Number<span className="text-danger">*</span></Form.Label>
                                        <PhoneInput
                                            country={'in'}
                                            value={whatsAppNumber.phone}
                                            onChange={(phone, data) => {
                                                setWhatsAppNumber({ phone, data });
                                            }}
                                        />
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
                                                        onBlur={handleBlur}
                                                        value={gender.value}
                                                        checked={genderValue === gender.value}
                                                        onChange={e => { setGenderValue(e.currentTarget.value); handleChange; }}
                                                    >
                                                        <span className='options'><img src={gender.icon} aria-label={gender.value}></img>{gender.name}</span>
                                                    </ToggleButton>
                                                ))}
                                            </ButtonGroup>
                                            {touched.gender && errors.gender ? (<div className="error-message">{errors.gender}</div>) : null}
                                        </Row>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="dob">
                                        <Form.Label>Date of Birth<span className="text-danger">*</span></Form.Label>
                                        <Form.Control type="date" name='dob' onChange={handleChange} className={touched.email && errors.email ? 'is-invalid' : null} onBlur={handleBlur}></Form.Control>
                                        {touched.dob && errors.dob ? (<div className="error-message">{errors.dob}</div>) : null}
                                    </Form.Group>
                                </Row>

                                <Row className="mb-5" md={3}>
                                    <Form.Group as={Col} controlId="guardianDetail">
                                        <Form.Label>Guardian Detail</Form.Label>
                                        <Form.Control type='text' placeholder='Guardian detail'/>
                                    </Form.Group>
                                </Row>
                            </>
                        )}
                    </Formik>
                </>)}
                {page === 1 && (<div>
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
                                            <p className='not-eligible-msg'>{staticContents['notEligible']}</p>
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
                </div>)}
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
                        <TestResult testResult={{isPassed: false, marks: 80 }}/>
                    </>
                )}
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
            </div>
        </div>
    );
};

export default CourseApplication;
