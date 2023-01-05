import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import { setLoading } from '../../redux/actions/LoaderActions';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { isEmpty } from 'lodash';
import { 
    Alert,
    Button,
    Card,
    CardGroup,
    Carousel,
    CarouselItem,
    Col,
    Container,
    Nav,
    Row,
    ButtonGroup, 
    Form, 
    ToggleButton
} from 'react-bootstrap';

import { arrowBack, femaleIcon, maleIcon } from '../../assets/images';
import './PersonalDetails.scss';

import EducationalDetails from './EducationalDetails';
import WorkDetails from './WorkDetails';
import KYC from './kyc';



const PersonalDetails = () => {

    const [genderValue, setGenderValue] = React.useState('');
    const [isNextLoading, setIsNextLoading] = React.useState(false);
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    const [userData, setUserData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [EducationalData, setEducationalDetails] = React.useState({});
    const [KYCData, setKYCDetails] = React.useState();
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const genderOptions = [
        { name: 'Male', value: 'male', icon: maleIcon },
        { name: 'Female', value: 'female', icon: femaleIcon },
    ];

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
        dob: Yup.date().required('Date of birth is requied'),
        guardian_details: Yup.string(),
        }),
        validate: (values) => {
        let errors = {};
        if (!values?.mobile_number) {
            errors.mobile_number = '*Mobile number required';
        } if (!values?.whatsapp_number) {
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
        }
    });

    const formPersonalDetailsPayload = async (personalDetails) => {
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
          nextPage();
        }
    };

    useEffect(() => {
        dispatch(setLoading(true));
        window.scrollTo(0, 0);
        fetchInitialData(user?.uid);
       
    }, []);

    const fetchInitialData = async (uid) => {

       
       
        fetchUserDetails(uid);
       
        dispatch(setLoading(false));
      };

    const fetchUserDetails = async (uid) => {
        let personalDetails = {};
        let educationalDetails = {};
        const userDetails = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
        // console.log(userDetails);
        setKYCDetails(userDetails?.data?.data?.userProfile?.kyc);
        setInitialData(userDetails?.data?.data?.user);
        setUserData(userDetails?.data?.data?.user);
        personalDetails = userDetails?.data?.data?.userProfile?.personal_details ?? personalDetails;
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
        formik.setValues({ email: initData?.email }); //mobile_number: initData?.phone
        // setMobileNumber({ phone: initData?.phone})
    }
    
    return (
        <>
        <div className="my-courses d-flex flex-row mx-auto my-5">
        <Col lg={3}>
            <Container>
            <Row className="course-body">
                <Col lg={3} className="side-nave">
                <div className="sidebar-container mb5">
                    <Nav defaultActiveKey="#overview" className="flex-column list">
                    <Nav.Link href="#personal">Personal Details </Nav.Link>
                    <Nav.Link href="#educational">Educational Details</Nav.Link>
                    <Nav.Link href="#work">Work Details</Nav.Link>
                    <Nav.Link href="#kyc">Documents & KYC</Nav.Link>
                    {/* <Nav.Link href="#paymode">Payment Structure</Nav.Link> */}
                   
                    </Nav>
                </div>
                </Col>
                
            </Row>
            </Container>
          {/* <InviteNow /> */}
        </Col>
        <Col className="applied-courses me-4" lg={9}>
         
         
          <div className="course-application-list" id="personal">
            <h3 className="text-primary">Personal Details </h3>
            {/* {applicationList?.length > 0 ? ( */}
              {/* applicationList.map((application, idx) => {
                return ( */}
                  <Card key="" className="p-3 my-3">
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
                      <div className="ps-3 w-100">
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
                                            placeholder="Enter you full name"
                                            />
                                            {formik.touched.full_name && formik.errors.full_name ? (
                                            <div className="error-message">{formik.errors.full_name}</div>
                                            ) : null}
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="email">
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
                                            // disabled={ userData?.email }
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                            <div className="error-message">{formik.errors.email}</div>
                                            ) : null}
                                        </Form.Group>
                                        </Row>

                                        <Row className="row-bottom">

                                        <Form.Group as={Col} sm={6} controlId="mobile_number">
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
                                            countryCodeEditable={false}
                                            onBlur={formik.handleBlur('mobile_number')}
                                            placeholder="Enter your Mobile number"
                                            // disabled={ userData?.phone }
                                            />
                                            {formik.touched.mobile_number && formik.errors.mobile_number ? (
                                            <div className="error-message">{formik.errors.mobile_number}</div>
                                            ) : null}
                                        </Form.Group>
                                      
                                        

                                        

                                       
                                        <Form.Group as={Col} sm={6} controlId="whatsapp_number">
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
                                            countryCodeEditable={false}
                                            onBlur={formik.handleBlur('whatsapp_number')}
                                            placeholder="Enter your Whatsapp number"
                                            />

                                            {formik.touched.whatsapp_number && formik.errors.whatsapp_number ? (
                                            <div className="error-message  mt-3">{formik.errors.whatsapp_number}</div>
                                            ) : null}
                                            <Form.Check
                                            style={{ paddingLeft: '1.5em !important', marginTop: '5px' }}
                                            type="checkbox"
                                            onChange={(value) => copyFromMobileNumber(value)}
                                            label="Same as mobile number"
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} sm={6} controlId="gender">
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

                                        <Form.Group as={Col} sm={6} controlId="dob">
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
                                    
                                        <Row className="row-bottom" md={3}>
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

                                        <Row className="d-flex row-align-buttongroups">
                                        <Button
                                            className="col-1 me-2 btn btn-outline-secondary"
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
                  </Card>
               
          </div>

            <div className="course-application-list" id="educational">
                <h3 className="text-primary">Educational Details </h3>
                <EducationalDetails  educationalInfo={EducationalData}/>
            </div>

            <div className="course-application-list" id="work">
                <h3 className="text-primary">Work Details </h3>
                <WorkDetails educationalDetails={EducationalData}/>
            </div>

            <div className="course-application-list" id="kyc">
                <h3 className="text-primary">Documents & KYC Details </h3>
                <KYC kycDetails={KYCData}/>
            </div>
                    
        </Col>
        {/* <InviteNow /> */}
       
      </div>
        </>
    )

}

export default PersonalDetails;