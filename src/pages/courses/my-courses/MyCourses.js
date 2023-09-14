import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Row } from 'react-bootstrap';
import { calendar1, hand, hourGlass } from '../../../assets/images';
import { ReactComponent as HourGlass } from '../../../assets/images/hour-glass.svg';
import InviteNow from '../../../components/InviteNow';
import { firebase } from '../../../firebase/firebase';
import ApiService from '../../../services/ApiService';
import MultiStepBar from '../application/FormProgress';
import StudentMultiStepBar from '../application/student/StudentFormProgress';
import './MyCourses.scss';
import { useNavigate } from 'react-router-dom';
import FooterContainer from '../../../components/FooterComponent';
import { courseStepper } from '../../../utils-componets/static-content/utils';

const Hand = () => {
  return <img className="me-2" src={hand}></img>;
};

const MyCourses = () => {
  // const [userName, setUserName] = React.useState(firebase.auth()?.currentUser?.displayName);
  const [userName, setUserName] = React.useState('');

  const [applicationList, setApplicationList] = React.useState([]);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [occupation, setOccupation] = React.useState([]);
  const [page, setPage] = React.useState();
  const [stepperTitle, setStepperTitle] = React.useState('');
  const [stepper, setStepper] = useState(0);
  const [testResults, settestResults] = React.useState('');
  const status = [
    'Assessment Passed',
    'Assessment Failed',
    'Application In Review',
    'Application Rejected',
    'Application Approved',
    'Payment Failed',
    'Payment Successfull',
    'Enrolment Rejected',
    'Enrolment Approved',
    'Enrolment Pending',
  ];
  const navigate = useNavigate();

  console.log(firebase.auth()?.currentUser?.displayName, '////////userName');

  const fetchInitialData = async (uid) => {
    const response = await ApiService(`/student/application/list?uid=${uid}`, 'GET', {}, true);
    const { data } = response;
    const stepper = data?.data?.[0]?.application_stage;
    courseStepper[stepper] && setStepper(courseStepper[stepper]);
    setApplicationList(data?.data);
  };

  const setStepperStage = (stage) => {
    setPage(pageNumber || 0);
    setStepperTitle(stepperName || '');
  };

  const fetchUserDetails = async (uid) => {
    const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
    console.log(response, '///////response');
    setOccupation(response?.data?.data?.userProfile?.occupation);
    setUserName(response?.data?.data?.user?.fullName);

    if (occupation === 'STUDENT') {
      steps = [
        'personal_details',
        'education_details',
        'application_status',
        'payment',

        'enrollment_status',
      ];
    }

    // setOccupation(response?.data?.data?.userProfile?.occupation);
  };

  useEffect(() => {
    fetchUserDetails(user?.uid);

    fetchInitialData(user?.uid);

    // const fetchApplicationDetails = async (uid, courseId) => {

    //   const payload = {
    //     uid: uid,
    //     course_variant_id: courseId,
    //   };

    //   let applicationDetails = await ApiService(
    //     '/student/application/detail-by-user-course',
    //     `POST`,
    //     payload,
    //     true
    //   );
    //   const { application_stage, m_applicationstatus, m_totalscore, m_candidatescore } =
    //     applicationDetails?.data?.data.application;
    //   const obj = {
    //     applicationStatus: 'Application Approved',
    //     marks: (m_candidatescore / m_totalscore) * 100,
    //   };
    //   settestResults(obj);

    //   console.log(occupation);
    //   if (application_stage === 'personal_details') {
    //     nextPageNumber(1);
    //   } else if (application_stage === 'education_details') {
    //     nextPageNumber(2);
    //   } else if (application_stage === 'test_result') {
    //     nextPageNumber(3);
    //   }
    // };
  }, [occupation]);

  return (
    <>
      <div className="my-courses d-flex flex-row mx-auto my-5 my-courses-apllied-uni">
        <Row className="w-100">
          <Col className="applied-courses" lg={9}>
            <div className="mb-5">
              <p className="welcome-note">
                <Hand />
                {`Hey ${userName}!`}
              </p>
            </div>
            <div className="course-application-list">
              <h3 className="text-primary">Course Application</h3>
              {applicationList?.length > 0 ? (
                applicationList.map((application, idx) => {
                  var inputString = application?.course_title;
                  var words = inputString.split(' ');
                  var courseTitle = words.join('-').toLowerCase();

                  return (
                    <Card key={idx} className="p-3 my-3">
                      <div className="d-flex flex-row">
                        <div className="course-image">
                          <img
                            width={'115px'}
                            height={'90px'}
                            src={
                              application?.courseDetail?.course_variant_sections
                                ?.bannerContentDesktop?.value[0].url
                            }></img>
                        </div>
                        <div className="ps-3 w-100">
                          <Card.Title className="d-flex justify-content-between align-items-center">
                            <div>
                              <p>{application?.course_title}</p>
                            </div>
                            <div className="d-flex in-progress">
                              {application?.application_status === 'pending' && (
                                <>
                                  <svg
                                    width="19"
                                    height="18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M9.425 1.248a.624.624 0 1 1 0-1.248 8.997 8.997 0 1 1-7.812 4.531l-.582.222A.76.76 0 0 1 .49 3.332l1.98-.75c.072-.03.15-.049.229-.055a.75.75 0 0 1 .845.529l.621 2.026a.759.759 0 0 1-1.451.44l-.078-.274a7.757 7.757 0 1 0 6.79-4Zm-3.27 11.355c-.327 0-.592-.22-.592-.492 0-.27.265-.491.592-.491h.568a3.72 3.72 0 0 1 .815-1.914c.222-.277.488-.516.787-.709a3.376 3.376 0 0 1-.787-.718 3.72 3.72 0 0 1-.815-1.912h-.568c-.327 0-.592-.22-.592-.493s.265-.492.592-.492h6.524c.327 0 .6.22.6.492 0 .271-.265.493-.6.493h-.57a3.72 3.72 0 0 1-.812 1.912c-.224.28-.49.522-.789.718.3.195.566.437.789.717.447.547.73 1.211.813 1.913h.57c.326 0 .6.22.6.492 0 .271-.266.492-.6.492l-6.525-.008Zm5.24-1.024a3.022 3.022 0 0 0-.646-1.43c-.386-.48-.881-.807-1.331-.807-.45 0-.943.327-1.33.807a3.023 3.023 0 0 0-.648 1.43h3.956ZM10.75 7.83c.338-.412.56-.906.647-1.432H7.439c.086.526.31 1.02.647 1.432.387.48.88.806 1.33.806.45 0 .945-.326 1.332-.806h.002Z"
                                      fill="#8F8799"></path>
                                  </svg>
                                  <p>In Progress</p>
                                </>
                              )}
                            </div>
                          </Card.Title>

                          <Card.Body className="application-status application-status-course">
                            {occupation !== 'STUDENT' && (
                              <MultiStepBar
                                page={stepper}
                                application={application?.course_title}
                                // applicationPage={application?.application_stage}
                              />
                            )}
                            {occupation === 'STUDENT' && (
                              <MultiStepBar
                                page={stepper}
                                application={application?.course_title}
                              />
                              // <StudentMultiStepBar
                              //   page={setStepperStage(application?.application_stage)}
                              // />
                            )}
                          </Card.Body>
                        </div>
                      </div>
                      <Card.Footer>
                        {application?.application_stage !== 'enrollment_status' &&
                          occupation !== 'STUDENT' && (
                            <Button
                              variant="secondary"
                              type="button"
                              onClick={() => {
                                navigate(
                                  `/course/apply/${courseTitle}?course_id=${application?.course_id}`
                                );
                              }}>
                              Complete Application
                            </Button>
                          )}

                        {application?.application_stage !== 'enrollment_status' &&
                          occupation === 'STUDENT' && (
                            <Button
                              variant="secondary"
                              type="button"
                              onClick={() => {
                                navigate(
                                  `/course/apply/${courseTitle}?course_id=${application?.course_id}`
                                );
                              }}>
                              Complete Application
                            </Button>
                          )}

                        {application?.application_status === 'rejected' && (
                          <div>
                            <p>Enrollment is rejected</p>
                            <p>*If there is any refund it will be processed </p>
                          </div>
                        )}
                      </Card.Footer>
                    </Card>
                  );
                })
              ) : (
                <Alert className="d-flex justify-content-center">No applications!</Alert>
              )}
            </div>
          </Col>
          {/* <InviteNow /> */}
          <Col lg={3}>
            <InviteNow />
          </Col>
        </Row>
      </div>
      <FooterContainer />
    </>
  );
};

export default MyCourses;
