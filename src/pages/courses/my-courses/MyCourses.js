import React, { useEffect } from "react";
import { Alert, Button, Card, Col } from "react-bootstrap";
import { calendar1, hand, hourGlass } from "../../../assets/images";
import { ReactComponent as HourGlass } from '../../../assets/images/hour-glass.svg';
import InviteNow from '../../../components/InviteNow';
import { firebase } from "../../../firebase/firebase";
import ApiService from '../../../services/ApiService';
import MultiStepBar from '../application/FormProgress';
import './MyCourses.scss';

const Hand = () => {
    return (
        <img className="me-2" src={hand}></img>
    );
};

const steps = ["personal_details",
    "education_details",
    "entrance_test",
    "test_result",
    "application_status",
    "payment",
    "kyc_documents",
    "enrollment_status"
]

const MyCourses = () => {

    const [userName, setUserName] = React.useState(firebase.auth().currentUser.displayName);
    const [applicationList, setApplicationList] = React.useState([]);

    const fetchInitialData = async() => {
        const response = await ApiService('/student/application/list', 'GET', {}, true)
        const { data } = response;
        setApplicationList(data?.data);
    }

    const setStepperStage = (stage) => {
        return steps.indexOf(stage);
    }

    useEffect(() => {
        fetchInitialData();
    }, [])

    return (
        <>  
            <div className="my-courses d-flex flex-row mx-auto my-5">
                <Col className="applied-courses me-4" lg={9}>
                    <div className="mb-5">
                        <p className="welcome-note">
                            <Hand />
                            {`Hey ${userName}!`}
                        </p>
                    </div>
                    <div className='course-application-list'>
                        <h3 className='text-primary'>Course Application</h3>
                        { applicationList?.length > 0 ? applicationList.map((application, idx) => {
                            return (
                                <Card key={idx} className="p-3 my-3">
                                    <div className='d-flex flex-row'>
                                        <div className="course-image">
                                            <img width={'115px'} height={'90px'} src={application?.courseDetail?.course_variant_sections?.bannerAssets.items[0].url}></img>
                                        </div>
                                        <div className="ps-3 w-100">
                                            <Card.Title className='d-flex justify-content-between align-items-center'>
                                                <div>
                                                    <p>{application?.course_title}</p>
                                                </div>
                                                <div className='d-flex in-progress'>
                                                    {application?.application_status === 'pending' && (
                                                        <><HourGlass /><p>In Progress</p></>
                                                    )}
                                                </div>
                                            </Card.Title>
                                            <Card.Subtitle style={{ fontFamily: 'Roboto' }} className="mb-2 text-muted d-flex">
                                                <div style={{ fontSize: '12px', paddingRight: '24px' }}>
                                                    <img className='me-2' src={hourGlass} alt="duration" />
                                                    <span style={{ fontWeight: '400' }}>Duration, </span><span style={{ fontWeight: '600' }}>{application?.course_duration} Months</span>
                                                </div>
                                                <div style={{ fontSize: '12px' }}>
                                                    <img className='me-2' src={calendar1} alt="calendar" />
                                                    <span style={{ fontWeight: '400' }}>Starts, </span><span style={{ fontWeight: '600' }}>{application?.course_start_date}</span>
                                                </div>
                                            </Card.Subtitle>
                                            <Card.Body className='application-status'>
                                                <MultiStepBar page={setStepperStage(application?.application_stage)} />
                                            </Card.Body>
                                        </div>
                                    </div>
                                    <Card.Footer>
                                        {/* <Button variant='secondary' type="button" onClick={() => nextPage()}>
                                            Start Learning
                                        </Button> */}
                                        {application?.application_status === 'pending' && (
                                            <Button variant='secondary' type="button" onClick={() => nextPage()}>
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
                            )
                        }): <Alert className="d-flex justify-content-center">No applications!</Alert>}
                    </div>
                </Col>
                {/* <InviteNow /> */}
                <Col lg={3}>
                    <InviteNow />
                </Col>
            </div>
        </>
    );
};

export default MyCourses;