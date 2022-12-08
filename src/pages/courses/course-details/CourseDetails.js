import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardGroup,
  CardImg,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Nav,
  Row,
} from 'react-bootstrap';
import './CourseDetails.scss';
import ApiService from '../../../services/ApiService';
import { useLocation, useParams } from 'react-router-dom';
import { emptystar, fullstar, tick, calendar1, computer, overview } from '../../../assets/images';
import Rating from 'react-rating';
import parse from 'html-react-parser';
import Placementpartner from '../../Homepage/components/Placementpartner';
import { getByDisplayValue } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {
  const [courseDetails, setCourseDetails] = React.useState();
  const { state } = useLocation();
  const params = useParams();
  const [coureseVariantBatches, setVariantcoureseBatches] = React.useState([]);
  const [eligibilityCriteria, setEligibilityCriteria] = React.useState([]);
  const navigate = useNavigate();

  const fetchCourseDetails = async (params) => {
    const { courseVariantSlug } = params;
    const res = await ApiService(`courses/course_url/${courseVariantSlug}/detail`);
    return res?.data?.data?.course;
  };

  const fetchVariantBatches = async (courseVariantId) => {
    const res = await ApiService(`courses/${courseVariantId}/batch/list`);
    return res?.data?.data?.result;
  };

  const fetchInitialData = async (params) => {
    const courseData = state ? state : await fetchCourseDetails(params);
    const variantBatches = await fetchVariantBatches(courseData.id);
    setCourseDetails(courseData);
    setVariantcoureseBatches(variantBatches);
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
    navigate(`/course/apply?id=${course.id}`, { state: course });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchInitialData(params);
  }, []);



    useEffect(() => {
       
        fetchInitialData(params);
    },[])
    
    const jobs = [
        'Front-end developer',
        'Web programmer',
        'Full Stack Developer',
        'Software Engineer',
        'UI Engineer',
        'Programmer',
        'Backend Developer',
        'UI Developer'
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
        )
    }

    const getCourseOverview = () => {
        const courseOverview = courseDetails?.course_variant_sections?.courseOverview?.value;
        const items = courseOverview?.map((element, index) => {
            return (
                <CardGroup key={index}>
                    <Col>
                        <Card className="cardStyle overview">
                            <Card.Body className="text-left-align">
                                <span className="circle"><img src={overview} alt="Course Overview" className='overview-icon' /></span>
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
      
        let items = coureseVariantBatches?.map((element, index) => {
            
            return (
                <CardGroup key={index}>
                    <Col>
                        <Card className="batch-card-style">
                            <Card.Body className="text-left-align">
                                <h6 className="font-color text-left-align mtb5"> Starts From </h6>
                                <p>
                                <img src={calendar1} alt="Calendar" className='calendar-icon' /><span className="text-left-align mtb5">{ convertDate(element.start_date) }</span>
                                </p>
                                <Button variant="secondary" className={ index == 0 ? "" : "upcoming-btn" } onClick={() => {apply(courseDetails)}}> { index == 0 ? 'Apply Now' : 'Upcoming' } </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </CardGroup>
            );

        });
        return items;
    };

    const getEligibility = () => {
        const Eligibility = courseDetails?.course_variant_sections?.eligibilityCriteria?.value;
        let items = Eligibility?.map((element, index) => {
            return (
                <CardGroup key={index}>
                    <Col>
                        <Card className="eligibility-card-style">
                            <Card.Body className="text-left-align">
                                <Row>
                                    <Col lg={1} md={2} sm={4}>
                                        <span className="Squre"><img src={computer} alt="Computer" className='computer-icon' /></span>
                                    </Col>
                                    <Col lg={11} md={10} sm={8} className='eligibility-content'>
                                       
                                        <span className="font-color">{element.key}</span>
                                       
                                        {parse(element.value)}
                                        
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

    const getPaymentsPlans = () => {

        const paymentPlans = courseDetails?.course_variant_sections?.feesStructure?.value;
        let items = paymentPlans?.map((element, index) => {
            return (
                <CardGroup key={index}>
                    <Col>
                        <Card className="eligibility-card-style">
                            <Card.Body className="text-left-align">
                          
                                <Row>
                                    
                                <Col lg={11} md={10} sm={8} >
                                    <h6 className="font-color text-left-align mtb1 payment-title"> { element.key } </h6>
                                    <span className='payment-content'>{parse(element.value)}</span>
                                       
                                    
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

    const getWhatWillYouLearn = () => {
        const whatWillYouLearn = courseDetails?.course_variant_sections?.whatWillYouLearn?.value;
        let items = whatWillYouLearn?.map((element, index) => {
        return (
            <CardGroup key={index}>
                <Col>
                    <Card className="learn">
                        <Card.Body className="text-left-align">
                            <h6 className="font-color text-left-align mtb5 learn-label"> { element.label } </h6>
                            <p className="text-left-align mtb5">{ element.content }</p>
                            
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
                <Col>
                
                    <Card className="cardStyle partners">
                        <Card.Body className="text-left-align">
                            <h5 className="font-color text-left-align mtb5"> { element } </h5>
                            
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
   
  };

  const getCourseOverview = () => {
    const courseOverview = courseDetails?.course_variant_sections?.courseOverview?.value;
    const items = courseOverview?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <Card className="cardStyle">
              <Card.Body className="text-left-align">
                <span className="circle">
                  <img src={overview} alt="Course Overview" className="overview-icon" />
                </span>
                <h6 className="font-color text-left-align mtb5">{element?.label}</h6>
                <p className="text-left-align mtb5">{element?.content}</p>
              </Card.Body>
            </Card>
          </Col>
        </CardGroup>
      );
    });
    return items;
  };

  const getBatches = () => {
    let items = coureseVariantBatches?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <Card className="batch-card-style">
              <Card.Body className="text-left-align">
                <h6 className="font-color text-left-align mtb5"> Starts From </h6>
                <p>
                  <img src={calendar1} alt="Calendar" className="calendar-icon" />
                  <span className="text-left-align mtb5">{convertDate(element.start_date)}</span>
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
        </CardGroup>
      );
    });
    return items;
  };

  const getEligibility = () => {
    const Eligibility = courseDetails?.course_variant_sections?.eligibilityCriteria?.value;
    let items = Eligibility?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <Card className="eligibility-card-style">
              <Card.Body className="text-left-align">
                <Row>
                  <Col lg={1} md={2} sm={4}>
                    <span className="Squre">
                      <img src={computer} alt="Computer" className="computer-icon" />
                    </span>
                  </Col>
                  <Col lg={11} md={10} sm={8} className="eligibility-content">
                    <span className="font-color">{element.key}</span>

                    {parse(element.value)}
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

  const getPaymentsPlans = () => {
    const paymentPlans = courseDetails?.course_variant_sections?.feesStructure?.value;
    let items = paymentPlans?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <Card className="eligibility-card-style">
              <Card.Body className="text-left-align">
                <Row>
                  <Col lg={11} md={10} sm={8}>
                    <h6 className="font-color text-left-align mtb1 payment-title">
                      {' '}
                      {element.key}{' '}
                    </h6>
                    <span className="payment-content">{parse(element.value)}</span>
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

  const getWhatWillYouLearn = () => {
    const whatWillYouLearn = courseDetails?.course_variant_sections?.whatWillYouLearn?.value;
    let items = whatWillYouLearn?.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <Card className="learn">
              <Card.Body className="text-left-align">
                <h6 className="font-color text-left-align mtb5 learn-label"> {element.label} </h6>
                <p className="text-left-align mtb5">{element.content}</p>
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
          <Col>
            <Card className="cardStyle partners">
              <Card.Body className="text-left-align">
                <h5 className="font-color text-left-align mtb5"> {element} </h5>
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




export default CourseDetails;
