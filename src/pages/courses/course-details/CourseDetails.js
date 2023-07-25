import parse from 'html-react-parser';
import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardGroup,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Nav,
  Row,
} from 'react-bootstrap';
import Rating from 'react-rating';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  calendar1,
  computer,
  emptystar,
  facebook,
  fullstar,
  linkedin,
  microsoft,
  netflix,
  overview,
  slack,
  tick,
  xbo,
} from '../../../assets/images';
import FooterContainer from '../../../components/FooterComponent';
import ApiService from '../../../services/ApiService';
import './CourseDetails.scss';
import Faqs from './Faqs';
import LearnerPaymentPopup from './LearnerPaymentPopup';
import Payment from '../../../components/Payment';

function CourseDetails() {
  const [courseDetails, setCourseDetails] = React.useState();
  // const [courseDetailsfaq, setCourseDetailsfaq] = React.useState();
  const [courseFaq, setCourseFaq] = React.useState();
  const { state } = useLocation();
  const params = useParams();
  const [courseVariantBatches, setVariantCourseBatches] = React.useState([]);
  const [courseVariantBatchesfaq, setVariantCourseBatchesfaq] = React.useState([]);
  const [batchDate, setBatchDate] = React.useState([]);
  const [eveningbatchDate, eveningsetBatchDate] = React.useState([]);
  const [eligibilityCriteria, setEligibilityCriteria] = React.useState([]);
  const [openpayment, setopenpayment] = React.useState(false);
  const [promoBanner, setPromoBanner] = React.useState();

  const navigate = useNavigate();

  const fetchCourseDetails = async (params) => {
    const { courseVariantSlug } = params;
    const res = await ApiService(`courses/course_url/${courseVariantSlug}/detail`);
    return res?.data?.data?.course;
  };


  const fetchVariantBatches = async (course_id) => {
    const res = await ApiService(`courses/${course_id}/batch/list`);

    return res?.data?.data?.result;
  };
  const fetchVariantBatchesfaq = async (course_id) => {
    const res = await ApiService(`courses/${course_id}/faq/list`);
    return res?.data?.data;
  };
  const batchSchedule = async (course_id) => {
    const res = await ApiService(`/admin/batch-Schedule/${course_id}`);
    // console.log("res",JSON.stringify(res?.data?.data?.result))
    return res?.data?.data?.result[0].course_variant_sections.overview.batchShedule[0]?.morningBatch;
  };

  const eveningbatchSchedule = async (course_id) => {
    const res = await ApiService(`/admin/batch-Schedule/${course_id}`);
    // console.log("res1",JSON.stringify(res?.data?.data?.result[0]?.course_variant_sections.overview.batchShedule[1]?.eveningBatch))
    return res?.data?.data?.result[0].course_variant_sections.overview.batchShedule[1]?.eveningBatch;
  };

  const fetchInitialData = async (params) => {
    const courseData = state ? state : await fetchCourseDetails(params);
    console.log("course",(courseData))
    courseData?.course_variant_sections?.bannerAsset?.value?.filter((e) => {
      if (e.type === 'background-image') {
        setPromoBanner(e);
      }
    });
    const variantBatches = await fetchVariantBatches(courseData.course_id);
    setCourseDetails(courseData);
    setVariantCourseBatches(variantBatches);
    const variantBatchesfaq = await fetchVariantBatchesfaq(courseData?.course_id);
    setCourseDetails(courseData);
    setVariantCourseBatchesfaq(variantBatchesfaq);
    const fetchBatches = await batchSchedule(courseData?.course_id);
    // setCourseDetails(courseData);
    setBatchDate(fetchBatches);

    const eveningfetchBatches = await eveningbatchSchedule(courseData?.course_id);
    eveningsetBatchDate(eveningfetchBatches);


  };

  const convertDate = (dateInput) => {
    const date = new Date(dateInput);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  };

  const apply = (course) => {
    if (course?.target_audience === '{Learners}') {
      setopenpayment(true);
    } else {
      // setopenpayment(true);
      navigate(`/course/apply/${course.course_url}`, { state: course });
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0);
    fetchInitialData(params);
  }, []);

  const jobs = [
    'Frontend developer',
    'Web programmer',
    'Full Stack Developer',
    'Software Engineer',
    'UI Engineer',
    'Programmer',
    'Backend Developer',
  ];

  const RatingComponent = () => {
    const ratingInDecimal = courseDetails?.course_variant_sections?.ratings?.value.split('/')[0];
    return (
      <Rating
        initialRating={ratingInDecimal}
        readonly
        emptySymbol={<img src={emptystar} className="icon" />}
        fullSymbol={<img src={fullstar} className="icon" />}
      />
    );
  };

  const getCourseOverview = () => {
    const courseOverview = courseDetails?.course_detail_page?.overview?.value;
    const items = courseOverview?.map((element, index) => {
      return (
        <Col key={index} sm={3}>
          <Card className="cardStyle overview">
            <Card.Body className="text-left-align">
              <span className="circle">
                <img src={element?.icon} alt="Course Overview" className="overview-icon" />
              </span>
              <h6 className="font-color text-left-align mtb5">{element?.title}</h6>
              <p className="text-left-align mtb5">{element?.description}</p>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return items;
  };

  const getBatches = () => {
    const items = batchDate?.map((element, index) => {
      return (
        <Col key={index} sm={3}>
          <Card className="batch-card-style">
            <Card.Body className="text-left-align">
              <h6 className="font-color text-left-align mtb5"> Starts From </h6>
              <p>
                <img src={calendar1} alt="Calendar" className="calendar-icon" />
                {/* <span className="text-left-align mtb5">{convertDate(element.start_date)}</span> */}
                <span className="text-left-align mtb5">{element?.date1}</span>
                <span className="text-left-align mtb5">{element?.date2}</span>
                <span className="text-left-align mtb5">{element?.date3}</span>
              </p>

              <Button
                variant="secondary"
                className={index == 0 ? '' : 'upcoming-btn'}
                onClick={() => {
                  apply(courseDetails);
                }}>
                {' '}
                {index == 0 ? 'Apply Now' : 'Upcoming'}{' '}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return items;
  };
  const eveningGetBatches = () => {
    const items = eveningbatchDate?.map((element, index) => {
      return (
        <Col key={index} sm={3}>
          <Card className="batch-card-style">
            <Card.Body className="text-left-align">
              <h6 className="font-color text-left-align mtb5"> Starts From </h6>
              <p>
                <img src={calendar1} alt="Calendar" className="calendar-icon" />
                {/* <span className="text-left-align mtb5">{convertDate(element.start_date)}</span> */}
                <span className="text-left-align mtb5">{element?.date1}</span>
                <span className="text-left-align mtb5">{element?.date2}</span>
                <span className="text-left-align mtb5">{element?.date3}</span>
              </p>

              <Button
                variant="secondary"
                className={index == 0 ? '' : 'upcoming-btn'}
                onClick={() => {
                  apply(courseDetails);
                }}>
                {' '}
                {index == 0 ? 'Apply Now' : 'Upcoming'}{' '}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return items;
  };


  const getEligibility = () => {
    const Eligibility = courseDetails?.course_detail_page?.eligibilityCriteria?.value;
    let items = Eligibility?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col sm={12}>
            <Card className="eligibility-card-style">
              <div className="text-left-align eligibility-card-style-container">
                <div className="eligibilityCriteria-media">
                  <span className="Squre">
                    <img src={element.icon} alt="Computer" className="computer-icon" />
                  </span>
                </div>
                <div className="eligibility-content">
                  <span className="font-color">{element.title}</span>

                  {parse(element.description)}
                </div>
              </div>
            </Card>
          </Col>
        </CardGroup>
      );
    });
    return items;
  };

  const getPaymentsPlans = () => {
    const paymentPlans = courseDetails?.course_variant_sections?.feesStructure?.value;
    let items = paymentPlans?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <Card className="eligibility-card-style payment-card">
              <Card.Body className="text-left-align">
                <Row>
                  <Col lg={12}>
                    <h6 className="font-color text-left-align mtb1 payment-title">
                      {' '}
                      {element.title}{' '}
                    </h6>
                    <span className="payment-content">{parse(element.description)}</span>
                  </Col>
                  <Button
                    className="pay_apply_btn"
                    style={{ padding: '8px 15px' }}
                    variant="secondary"
                    onClick={() => {
                      apply(courseDetails);
                    }}>
                    Apply Now
                  </Button>
                  <Button
                    className="pay_apply_btn"
                    style={{ padding: '8px 15px' }}
                    variant="secondary"
                    href={element.curriculum_brochure_url}>
                    Download Full Curriculum
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </CardGroup>
      );
    });
    return items;
  };

  const getWhatWillYouLearn = () => {
    const whatWillYouLearn = courseDetails?.course_variant_sections?.whatWillYouLearn?.value;
    let items = whatWillYouLearn?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <Card className="learn">
              <Card.Body className="text-left-align">
                <h6 className="font-color text-left-align mtb5 learn-label"> {element.title} </h6>
                <p className="text-left-align mtb5">{element.description}</p>
              </Card.Body>
            </Card>
          </Col>
        </CardGroup>
      );
    });
    return items;
  };

  const getHiringPartners = () => {
    const hiringPartners = courseDetails?.course_variant_sections?.placementPartner?.value;
    let items = hiringPartners?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <div className=" partners">
            <Card.Body className="text-left-align">
              <h5 className="font-color text-left-align ">
                {element == 'microsoft.com' && (
                  <img src={microsoft} alt="microsoft" className="microsoft-icon" />
                )}
                {element == 'facebook.com' && (
                  <img src={facebook} alt="facebook" className="facebook-icon" />
                )}
                {element == 'slack.com' && <img src={slack} alt="slack" className="slack-icon" />}
                {element == 'xboxone.com' && (
                  <img src={xbo} alt="xboxone" className="xboxone-icon" />
                )}
                {element == 'netflix.com' && (
                  <img src={netflix} alt="Netflix" className="netflix-icon" />
                )}
                {element == 'likedin.com' && (
                  <img src={linkedin} alt="Linkedin" className="likedin-icon" />
                )}
              </h5>
            </Card.Body>
          </div>
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
              <Card.Body className="text-center">{element}</Card.Body>
            </Card>
          </Col>
        </CardGroup>
      );
    });
    return items;
  };

  return (
    <>
      <div className="course-details my-5">
        {openpayment && (
          <>
            <LearnerPaymentPopup courseId={courseDetails?.id} courseInfo={courseDetails} setopenpayment={setopenpayment} />
          </>
        )}
        {promoBanner ? (
          <Container fluid={true} className="promo-banner">
            <a target={'_blank'} href={promoBanner.register_url}>
              <img
                src={promoBanner.url}
                width={'100%'}
              />
            </a>
          </Container>
        ) : (
          <Container fluid={true} className="banner">
            <div className="container mx-auto my-4">
              <div className="details my-auto">
                <h4>{`${courseDetails?.course_title} `}</h4>
                {/* - ${courseDetails?.variant_name} */}
                <div className="d-flex ratings my-2">
                  <p className="me-3">
                    <span>Ratings:</span> {courseDetails?.rating}
                  </p>
                  <RatingComponent />
                  <p className="ms-3">
                    <span>Learners:</span>{' '}
                    {courseDetails?.learner_count}
                  </p>

                </div>

                <div className="d-flex">
                  <h6 className="me-1">
                    <span>Duration: </span> 
                    {courseDetails?.duration}
                    {/* {courseVariantBatches[0]?.duration}  */}
                      Months |{' '}
                  </h6>
                  <h6>{courseDetails?.variant_name}</h6>
                </div>
                <div className="hightlights my-2">
                  {courseDetails?.course_variant_sections?.highlights?.value.map((value, i) => {
                    return (
                      <p key={i}>
                        <img className="me-1" src={tick} /> {value.title}
                      </p>
                    );
                  })}
                </div>
                <Button
                  className="mt-2"
                  style={{ padding: '8px 30px' }}
                  variant="secondary"
                  onClick={() => {
                    apply(courseDetails);
                  }}>
                  Apply Now
                </Button>
              </div>
              <div className="carousel-container">
                <Carousel indicators={false} touch={true} pause="hover" controls={false}>
                  {courseDetails?.card_configuration?.bannerContentDesktop?.value.map((asset, i) => {
                    // if(asset.type === 'image') {
                    //     return (
                    //         <CarouselItem key={i}>
                    //             <img src={asset.url}></img>
                    //         </CarouselItem>
                    //     );
                    // }
                    if (asset.type === 'video') {
                      return (
                        <CarouselItem key={i}>
                          <video src={asset.url} controls></video>
                        </CarouselItem>
                      );
                    }

                    if (asset.type === 'youtube') {
                      return (
                        <CarouselItem key={i}>
                          <iframe
                            src={`https://www.youtube.com/embed/I3OmgJmUhek`}
                            frameBorder="20px"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen={true}></iframe>
                        </CarouselItem>
                      );
                    }
                  })}
                </Carousel>
              </div>
            </div>
          </Container>
        )}
        <Container>
          <Row className="course-body">
            <Col lg={3} className="side-nave">
              <div className="sidebar-container mb5">
                <Nav defaultActiveKey="#overview" className="flex-column list">
                  <Nav.Link href="#overview">Overview </Nav.Link>
                  <Nav.Link href="#about">About the course</Nav.Link>
                  <Nav.Link href="#batches">Batches</Nav.Link>
                  <Nav.Link href="#eligibility">Eligibility Criteria</Nav.Link>
                  <Nav.Link href="#paymode">Payment Structure</Nav.Link>
                  {courseDetails?.course_type !== 'PartTime' && (
                    <Nav.Link href="#jobs">Jobs Role You Can Get</Nav.Link>
                  )}

                  {courseDetails?.course_variant_sections?.whatWillYouLearn?.value &&
                    courseDetails?.course_type == 'PartTime' && (
                      <Nav.Link href="#learnings">What Will You Learn?</Nav.Link>
                    )}
                  <Nav.Link href="#hiring-partners">Hiring Partners</Nav.Link>
                </Nav>
              </div>
            </Col>
            <Col lg={9} className="course-content  course-content-over" id="overview">
              <h4 className="font-color mb2">Course Overview</h4>
              <Row xs={1} md={4}>
                {getCourseOverview()}
              </Row>
              <Row className="mtb5" id="about">
                <h4 className="font-color">About The Course</h4>
                <p className="text-left-align  mt2">{courseDetails?.about_course}</p>
              </Row>
              <h4 className="font-color mb2" id="batches">
                Morning Batches
              </h4>
              <Row xs={1} md={3} className="mtb5">
                {getBatches()}
              </Row>
              <h4 className="font-color mb2" id="batches">
                Evening Batches
              </h4>
              <Row xs={1} md={3} className="mtb5">
                {eveningGetBatches()}
              </Row>
              <h4 className="font-color mb2" id="eligibility">
                Eligiblility Criteria
              </h4>
              <Row xs={1} md={1} className="mtb5 ">
                {getEligibility()}
              </Row>

              {courseDetails?.course_variant_sections?.whatWillYouLearn?.value &&
                courseDetails?.course_type == 'PartTime' && (
                  <>
                    <h4 className="font-color mb2" id="jobs">
                      The Best Job Roles You Can Get
                    </h4>
                    <Row xs={1} md={4} className="mtb5">
                      {getJobs()}
                    </Row>
                  </>
                )}

              <h4 className="font-color mb2" id="paymode">
                Choose A Payment Plan That Works For You
              </h4>
              <Row xs={1} md={1} className="mtb5 eligible-group-chat">
                {/* {getPaymentsPlans()} */}
                <Payment />
              </Row>

              {courseDetails?.course_type == 'PartTime' &&
                courseDetails?.course_variant_sections?.whatWillYouLearn.label && (
                  <>
                    <h4 className="font-color mb2" id="learnings">
                      What Will You Learn?
                    </h4>
                    <h6 className="learn-sub-title">
                      {courseDetails?.course_variant_sections?.whatWillYouLearn?.label}
                    </h6>
                    <Row xs={1} md={2} className="mtb1">
                      {getWhatWillYouLearn()}
                    </Row>
                  </>
                )}

              <h4 className="font-color mb2" id="hiring-partners">
                Meet Our Hiring Partners
              </h4>
              <Row xs={2} md={5} className="mtb5">
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/google.svg'
                  }
                  alt="google"
                  className="google-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/shopify.svg'
                  }
                  alt="shopify"
                  className="shopify-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/adobe.svg'
                  }
                  alt="adobe"
                  className="adobe-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/slack.svg'
                  }
                  alt="slack"
                  className="slack-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/mallchimp.svg'
                  }
                  alt="mallchimp"
                  className="mallchimp-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/microsoft.svg'
                  }
                  alt="microsoft"
                  className="microsoft-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/zoom.svg'
                  }
                  alt="zoom"
                  className="zoom-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/hubspot.svg'
                  }
                  alt="hubspot"
                  className="hubspot-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/dropbox.svg'
                  }
                  alt="dropbox"
                  className="dropbox-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/lastpass.svg'
                  }
                  alt="lastpass"
                  className="lastpass-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/aws.svg'
                  }
                  alt="aws"
                  className="aws-icon hiring_partner_icon"
                />
                <img
                  src={
                    'https://unikaksha-course-contents.s3.ap-south-1.amazonaws.com/hiring_partners/ringcentral.svg'
                  }
                  alt="rincentral"
                  className="ringcentral-icon hiring_partner_icon"
                />
              </Row>

              <h4 className="font-color mb2" id="eligibility">
                FAQs
              </h4>
              <Row xs={1} md={1} className="mtb5 faqs">
                {courseVariantBatchesfaq &&
                  <Faqs courseVariantBatchesfaq={courseVariantBatchesfaq} />}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterContainer />
    </>
  );
}

export default CourseDetails;
