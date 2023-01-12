import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/actions/LoaderActions';
import Tab from 'react-bootstrap/Tab';

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

import { arrowBack, femaleIcon, maleIcon, profilePicture, profileEditIcon, upload, trash } from '../../assets/images';
import './PersonalDetails.scss';

import EducationalDetails from './EducationalDetails';
import ProfileStudentEducationDetails from './ProfileStudentEducationDetails'
import WorkDetails from './WorkDetails';
import ProfileKYC from './ProfileKYC';
import ProfilePopup from  './ProfilePopup'
import PrimaryNavbar from '../../components/PrimaryNavbar'



const PersonalDetails = () => {

    const [mobileState, setMobileNumber] = React.useState({ phone: '', data: '' });
    const [whatsAppState, setWhatsAppNumber] = React.useState({ phone: '', data: '' });
    const [genderValue, setGenderValue] = React.useState('');
    const [isNextLoading, setIsNextLoading] = React.useState(false);
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    const [userData, setUserData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [EducationalData, setEducationalDetails] = React.useState({});
    const [KYCData, setKYCDetails] = React.useState();
    const [profilePic, setProfilePic] = React.useState();
    const [ profilePopup, setProfilePopup ] = React.useState(false);  
    const [occupation, setOccupation] = React.useState([]);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

   

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
    
      dispatch(setLoading(true));
        const payload = {
            uid: user?.uid,
            "personal_details": {
              full_name: personalDetails?.full_name,
              email: personalDetails?.email,
              mobile_number: personalDetails?.mobile_number,
              mobile_cc: personalDetails?.mobile_cc,
              whatsapp_number: personalDetails?.whatsapp_number,
              whatsapp_cc: personalDetails?.whatsapp_cc,
              gender: personalDetails?.gender,
              dob: personalDetails?.dob,
              guardian_details: personalDetails?.guardian_details
            }

        };
        const response = await ApiService('student/update-personal-details', `PATCH`, payload, true);
        // setIsNextLoading(false);
        // if (response?.data.code === 200) {
        //   nextPage();
        // }
        dispatch(setLoading(false));
    };

    useEffect(() => {

        dispatch(setLoading(true));

        viewProfilePic('profile_picture');

        window.scrollTo(0, 0);
        fetchInitialData(user?.uid);
       
    }, []);

    
   

    const fetchInitialData = async (uid) => {

        fetchUserDetails(uid);
       
       
      };

    const fetchUserDetails = async (uid) => {
        let personalDetails = {};
        let educationalDetails = {};
        const userDetails = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
       
        setOccupation(userDetails?.data?.data?.userProfile?.occupation)
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
                    viewProfilePic('profile_picture')
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
      }
      const togglePopup = () => {
        setProfilePopup(false);
    }

     
    
    return (
        <>


<div className="top-dashboard-profiles profile-personal d-flex flex-row mx-auto my-5 profile-personal-form">
        <Container>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <div className="my-profile-tabs">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Personal Details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Educational Details</Nav.Link>
                    </Nav.Item>
                    { occupation && occupation !== 'STUDENT' && (
                    <Nav.Item>
                      <Nav.Link eventKey="third">Work Details</Nav.Link>
                    </Nav.Item>
                    )}
                    { occupation && occupation !== 'STUDENT' && (
                    <Nav.Item>
                      <Nav.Link eventKey="fourth"> Documents & KYC</Nav.Link>
                    </Nav.Item>
                     )}
                  </Nav>
                </div>
              </Col>
              <Col sm={9}>
                <div className='tab-content-right'>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                  <div className="course-application-list" id="personal">
            <h3 className="text-primary">Personal Details </h3>
            {/* {applicationList?.length > 0 ? ( */}
              {/* applicationList.map((application, idx) => {
                return ( */}

                 <div className="upload-area">

                   <img src={profilePic ? profilePic: profilePicture } alt="profile" className="profile-avatar" onClick={() => viewProfilePhoto()} />
                   
                    <span className="avatar-name">
                      Profile Picture
                    <img src={profileEditIcon} alt="profile-edit-icon" onClick={() => uploadFile('profile_picture')} />
                    </span>
                    {profilePopup && (
                      <>
                          {/* <ProfilePopup profilePhoto={profilePic ? profilePic: profilePicture }/> */}
                          <div className='profile-popup modal display-block'>
                            <section className="modal-main">
                                <div className="model-body">
                                <div className='modalheader'>
                                    <span>Upload Photo</span>
                                    <span className="floatRight close-btn" onClick={() => togglePopup()}>x</span>
                                </div>
                                <div className="mt-3">
                                    <Row className='nomargin batch-head'>
                                    <img src={ profilePic ? profilePic: profilePicture } alt="profile" className="" onClick={() => viewProfilePhoto()} />
                                    </Row>  
                                    
                                </div>                                
                                </div>
                                <div className="mt-3 model-body">
                                    <Row className="d-flex justify-content-end">
                                    <Button
                                        className="col-3 me-2 btn btn-outline-secondary"
                                        variant="outline-secondary"
                                        type="button"
                                        onClick={() => uploadFile('profile_picture')}>
                                        <img src={upload}></img> Upload
                                    </Button>

                                    <Button
                                        className="col-3"
                                        variant="secondary"
                                        type="button"
                                        onClick={() => togglePopup()}>
                                        <img src={trash}></img> Delete
                                    </Button>
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
                                      
                                        

                                        

                                       
                                        <Form.Group as={Col} sm={6} controlId="whatsapp_number" class="no-whatsapp">
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
                                            style={{  marginTop: '5px' }}
                                            type="checkbox"
                                            onChange={(value) => copyFromMobileNumber(value)}
                                            label="Same as mobile number" className="my-code-check"
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
                                    
                                        <Row className="row-bottom" >

                                        <Form.Group as={Col} sm={6}>
                                            <Form.Label>Your occupation*</Form.Label>
                                            <div className="mb-3 occupation-label-group">
                                              <Form.Check inline 
                                              label="Student." 
                                              name="occupation"
                                              value="STUDENT"
                                              type="radio" />
                                              <Form.Check
                                                inline
                                                label="Working professional."
                                                name="occupation"
                                                value="STUDENT"
                                                type="radio"
                                              />
                                              <Form.Check
                                                inline
                                                label="I'm currently not working"
                                                name="group1"
                                                type="radio"
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
                                            disabled={!(formik.isValid && formik.dirty) || isNextLoading}
                                            variant="secondary"
                                            type="submit">
                                            {isNextLoading ? 'Saving.. ' : 'Save'}
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
               
               
          </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">   
                  <div className="course-application-list" id="educational">
                <h3 className="text-primary">Educational Details </h3>
                { occupation && occupation === 'STUDENT' && (
                <ProfileStudentEducationDetails  educationalInfo={EducationalData}/>
                )}
                { occupation && occupation !== 'STUDENT' && (
                  <EducationalDetails  educationalInfo={EducationalData}/>
                )}
            </div>         
</Tab.Pane>
                  <Tab.Pane eventKey="third"> <div className="course-application-list" id="work">
                <h3 className="text-primary">Work Details </h3>
                <WorkDetails educationalDetails={EducationalData}/>
            </div></Tab.Pane>
                  <Tab.Pane eventKey="fourth"> <div className="course-application-list" id="kyc">
                <h3 className="text-primary">Documents & KYC Details </h3>
                <ProfileKYC kycData={KYCData}/>
            </div></Tab.Pane>
                </Tab.Content>
                </div>
              </Col>
            </Row>
         
          </Tab.Container>
        </Container>
      </div>
    
        </>
    )

}

export default PersonalDetails;