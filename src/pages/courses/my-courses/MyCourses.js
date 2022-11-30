import React, { useEffect } from "react";
import { Button, Card, Nav, Row, Col } from "react-bootstrap";
import './MyCourses.scss';
import { hand, arrowBack, wrappedGift, hourGlass, calendar1 } from "../../../assets/images";
import { ReactComponent as HourGlass } from '../../../assets/images/hour-glass.svg';
import { ReactComponent as ArrowFront } from '../../../assets/images/arrow-back.svg';
import MultiStepBar from '../application/FormProgress';
import Footer from "../../../components/Footer";
import InviteNow from '../../../components/InviteNow';
import ApiService from '../../../services/ApiService';

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

    const [userName, setUserName] = React.useState('John');
    const [formProgress, setFormProgress] = React.useState({});
    const [applicationList, setApplicationList] = React.useState();

    const fetchInitialData = async() => {
        const response = await ApiService('/student/application/list', 'GET', {}, true)
        const { data } = response;
        setApplicationList(data?.data);
        formProgressStage(data?.data.application_stage);
    }

    const formProgressStage = (state) => {
        const page = steps.indexOf(stage);
        setFormProgress({ page })
    }

    useEffect(() => {
        fetchInitialData();
    }, [])

    return (
        <>
            <div className="d-flex flex-row mx-5 my-5">
                <Col className="applied-courses me-4" lg={9}>
                    <div className="mb-5">
                        <p className="welcome-note">
                            <Hand />
                            {`Hey ${userName}`}
                        </p>
                        <p>Lörem ipsum ultrarade samyde völ. Sask pseudoment påmyskapet. Ihet rer: för pilingar jiviv.</p>
                    </div>
                    <div className='course-application-list'>
                        <h3 className='text-primary'>Course Application</h3>
                        { applicationList?.map((application, idx) => {
                            return (
                                <Card key={idx} className="p-3 my-3">
                                    <div className='d-flex flex-row'>
                                        <div className="course-image">
                                            <img width={'115px'} height={'90px'} src={application?.courseDetail?.banner_assets.items[0].url}></img>
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
                                                <MultiStepBar page={formProgress.page} />
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
                        })}
                    </div>
                </Col>
                {/* <InviteNow /> */}
                <Col lg={3}>
                    <InviteNow />
                </Col>
            </div>
            <Footer />
        </>
    );
};

export default MyCourses;