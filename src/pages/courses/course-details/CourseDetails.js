import React, { useEffect } from 'react';
import { Button, Card, CardGroup, CardImg, Carousel, CarouselItem, Col, Container, Nav, Row } from 'react-bootstrap';
import './CourseDetails.scss';
import ApiService from '../../../services/ApiService';
import { useLocation, useParams } from 'react-router-dom';
import PrimaryNavBar from '../../../components/PrimaryNavbar';

function CourseDetails() {

    const [courseDetails, setCourseDetails] = React.useState();
    const { state } = useLocation();
    const params = useParams();

    const fetchCourseDetails = async(params) => {
        const { courseId } = params;
        const res = await ApiService(`courses/${courseId}/detail`);
        return res?.data?.data?.course;
    }

    const fetchInitialData = async(params) => {
        const courseData = state ? state : await fetchCourseDetails(params);
        console.log(courseData);
        setCourseDetails(courseData)
    }  

    useEffect(() => {
        fetchInitialData(params);
    },[])

    const Batches = [
        {
            label: '100% Live Classes',
            value: 'sasxaskbsdclkbdshckbaslkdbckdjsbc',
        },
        {
            label: 'Certificate',
            value: 'sasxaskbsdclkbdshckbaslkdbckdjsbc',
        },
        {
            label: 'Course Structure',
            value: 'sasxaskbsdclkbdshckbaslkdbckdjsbc',
        },
    ];
    const Eligibility = [
        {
            label: 'Qualification',
            value: 'sasxaskbsdclkbdshckbaslkdbckdjsbc',
        },
        {
            label: 'Document Required',
            value: 'sasxaskbsdclkbdshckbaslkdbckdjsbc',
        },
        {
            label: 'Age Limit',
            value: 'sasxaskbsdclkbdshckbaslkdbckdjsbc',
        },
        {
            label: 'Skill Requirement',
            value: 'sasxaskbsdclkbdshckbaslkdbckdjsbc',
        },
        {
            label: 'Hardware Required',
            value: 'sasxaskbsdclkbdshckbaslkdbckdjsbc',
        },
    ];

    const jobs = [
        'Front-end developer',
        'Web programmer',
        'Full Stack Developer',
        'Software Engineer',
        'UI Engineer',
        'Programmer',
        'Backend Developer',
    ];

    const getCourseOverview = () => {
        const courseOverview = courseDetails?.course_variant_sections?.courseOverview?.value;
        const items = courseOverview?.map((element, index) => {
            return (
                <CardGroup key={index}>
                    <Col>
                        <Card className="cardStyle">
                            <Card.Body className="text-left-align">
                                <span className="circle"></span>
                                <h6 className="font-color text-left-align mtb5">{element?.label}</h6>
                                <p className="text-left-align mtb5">
                                    {element?.content}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </CardGroup>
            );
        });
        return items;
    };
    const getBatches = () => {
        let items = Batches.map((element, index) => {
            return (
                <CardGroup key={index}>
                    <Col>
                        <Card className="cardStyle">
                            <Card.Body className="text-left-align">
                                <h6 className="font-color text-left-align mtb5">Starts From</h6>
                                <p className="text-left-align mtb5">12th December 2022</p>
                                <Button variant="secondary"> Apply Now </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </CardGroup>
            );
        });
        return items;
    };
    const getEligibility = () => {
        let items = Eligibility.map((element, index) => {
            return (
                <CardGroup key={index}>
                    <Col>
                        <Card className="EligibilitycardStyle">
                            <Card.Body className="text-left-align">
                                <Row>
                                    <Col lg={1} md={2} sm={4}>
                                        <span className="Squre"></span>
                                    </Col>
                                    <Col lg={11} md={10} sm={8}>
                                        <span className="font-color">{element.label}</span>
                                        <div className="mt2">
                                            <p>Valid Pan card and Adhar card</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </CardGroup>
            );
        });
        return items;
    };
    const getJobs = () => {
        let items = jobs.map((element, index) => {
            return (
                <CardGroup key={index}>
                    <Col>
                        <Card className="EligibilitycardStyle">
                            <Card.Body className="text-left-align">{element}</Card.Body>
                        </Card>
                    </Col>
                </CardGroup>
            );
        });
        return items;
    };
    return (
        <>
            <PrimaryNavBar />
            <div className="course-details my-5">
                    <Container fluid={true} className='banner'>
                        <Row className='mx-5 my-4'>
                            <div className='col-sm-8 my-auto'>
                                <h4>{`${courseDetails?.course_title} - ${courseDetails?.variant_name}`}</h4>
                                <div className='d-flex'>
                                    <p className='me-3'>Ratings: {courseDetails?.course_variant_sections?.ratings?.value}</p>
                                    <p>Learners: {courseDetails?.course_variant_sections?.learnersCount?.value}</p>
                                </div>
                                <div className='d-flex my-auto'>
                                    <h6 className='me-1'>Duration: 4 Months | </h6>
                                    <h6>{courseDetails?.course_type}</h6>
                                </div>
                                <div>
                                    {courseDetails?.course_variant_sections?.highlights?.value.map((value, i) => {
                                        return (
                                            <p key={i}>{value.value}</p>
                                        );
                                    })}
                                </div>
                                <Button variant='secondary'>Apply Now</Button>
                            </div>
                            <div className='col-sm-4 carousel-container'>
                                <Carousel touch={true} pause='hover' controls={false}>
                                    {courseDetails?.banner_assets?.items.map((asset, i) => {
                                        if(asset.type === 'image') {
                                            return (
                                                <CarouselItem key={i}>
                                                    <img src={asset.url}></img>
                                                </CarouselItem>
                                            );
                                        }
                                        if(asset.type === 'video') {
                                            return (
                                                <CarouselItem key={i}>
                                                    <video src={asset.url} controls></video>
                                                </CarouselItem>
                                            );
                                        }
                                        if(asset.type === 'youtube') {
                                            return (
                                                <CarouselItem key={i}>
                                                    <iframe src='https://www.youtube.com/embed/JsZlogpkucg' frameBorder="20px" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
                                                </CarouselItem>
                                            );
                                        }
                                    })}
                                </Carousel>
                            </div>
                        </Row>
                    </Container>
                <Container>

                    <Row className="course-body">
                        <Col lg={3} className="side-nave">
                            <div className="sidebar-container mb5">
                                <Nav defaultActiveKey="#overview" className="flex-column list">
                                    <Nav.Link href='#overview'>Overview </Nav.Link>
                                    <Nav.Link href='#about'>About the course</Nav.Link>
                                    <Nav.Link href='#batches'>Batches</Nav.Link>
                                    <Nav.Link href='#eligibility'>Eligibility Criteria</Nav.Link>
                                    {courseDetails?.course_type !== 'PartTime' && (
                                        <Nav.Link href='#jobs'>Jobs Role You Can Get</Nav.Link>
                                    )}
                                    <Nav.Link href='#learnings'>What Will You Learn?</Nav.Link>
                                    <Nav.Link href='#paymode'>Payment Structure</Nav.Link>
                                    <Nav.Link href='#hiring-partners'>Hiring Partners</Nav.Link>
                                </Nav>
                            </div>
                        </Col>
                        <Col lg={9} className="course-content" id='overview'>
                            <h4 className="font-color mb2">Course Overview</h4>
                            <Row xs={1} md={4}>
                                {getCourseOverview()}
                            </Row>
                            <Row className="mtb5" id='about'>
                                <h4 className="font-color">About The Course</h4>
                                <p className="text-left-align plr5 mt2">
                                    {courseDetails?.about_course}
                                </p>
                            </Row>
                            <h4 className="font-color mb2" id='batches'>Batches</h4>
                            <Row xs={1} md={3} className="mtb5">
                                {getBatches()}
                            </Row>
                            <h4 className="font-color mb2" id='eligibility'>Eligiblility Crieteria</h4>
                            <Row xs={1} md={1} className="mtb5">
                                {getEligibility()}
                            </Row>
                            <h4 className="font-color mb2" id=''>What Will You Learn?</h4>
                            
                            {courseDetails?.course_type !== 'PartTime' && (
                                    <>
                                        <h4 className="font-color mb2" id='jobs'>The Best Job Roles You Can Get</h4>
                                        <Row xs={1} md={4} className="mtb5">
                                            {getJobs()}
                                        </Row>
                                    </>
                                )
                            }
                            <h4 className="font-color mb2" id='paymode'>Choose A Payment Plan That Works For You</h4>
                            <Row xs={1} md={4} className="mtb5"></Row>
                        </Col>
                    </Row>

                </Container>
            </div>
        </>
    );
}

export default CourseDetails;
