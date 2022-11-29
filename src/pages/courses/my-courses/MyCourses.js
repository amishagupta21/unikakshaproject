import React from "react";
import { Button, Card, Nav, Row, Col } from "react-bootstrap";
import './MyCourses.scss';
import { hand, arrowBack, wrappedGift, hourGlass, calendar1 } from "../../../assets/images";
import { ReactComponent as HourGlass } from '../../../assets/images/hour-glass.svg';
import { ReactComponent as ArrowFront } from '../../../assets/images/arrow-back.svg';
import MultiStepBar from '../application/FormProgress';
import Footer from "../../../components/Footer";
import InviteNow from '../../../components/InviteNow';

const Hand = () => {
    return (
        <img className="me-2" src={hand}></img>
    );
};

const MyCourses = () => {

    const [userName, setUserName] = React.useState('John');
    const [formProgress, setFormProgress] = React.useState({ page: 4});
    const [courseDetails, setCourseDetails] = React.useState({
        courseTitle: 'Full Stack Development', rating: '4.5', duration: '4 Months', startsAt: '12th Dec 2022', courseImage: 'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/97ccee93-5d75-43b2-a876-607c41ce070c/contents/Java-Courses-for-Beginners.jpg'
    });

    return (
        <>
            <Row className="d-flex flex-row mx-5 my-5">
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
                        <Card className="p-3">
                            <div className='d-flex flex-row'>
                                <div className="course-image">
                                    <img width={'115px'} height={'90px'} src={courseDetails.courseImage}></img>
                                </div>
                                <div className="ps-3 w-100">
                                    <Card.Title className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <p>{courseDetails.courseTitle}</p>
                                        </div>
                                        <div className='d-flex in-progress'>
                                            <HourGlass />
                                            <p>In Progress</p>
                                        </div>
                                    </Card.Title>
                                    <Card.Subtitle style={{ fontFamily: 'Roboto' }} className="mb-2 text-muted d-flex">
                                        <div style={{ fontSize: '12px', paddingRight: '24px' }}>
                                            <img className='me-2' src={hourGlass} alt="duration" />
                                            <span style={{ fontWeight: '400' }}>Duration, </span><span style={{ fontWeight: '600' }}>6 Months</span>
                                        </div>
                                        <div style={{ fontSize: '12px' }}>
                                            <img className='me-2' src={calendar1} alt="calendar" />
                                            <span style={{ fontWeight: '400' }}>Starts, </span><span style={{ fontWeight: '600' }}>14 Nov 2022</span>
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
                                {/* <Button variant='secondary' type="button" onClick={() => nextPage()}>
                                    Complete Application
                                </Button> */}
                                <div>
                                    <p>Enrollment is rejected</p>
                                    <p>*If there is any refund it will be processed </p>
                                </div>
                            </Card.Footer>
                        </Card>
                    </div>
                </Col>
                {/* <InviteNow /> */}
                <Col lg={3}>
                    <InviteNow />
                </Col>
            </Row>
            <Footer />
        </>
    );
};

export default MyCourses;