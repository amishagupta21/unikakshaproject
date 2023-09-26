import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Rating from 'react-rating';
import { useNavigate } from 'react-router-dom';
import { emptystar, fullstar } from '../../../assets/images';
import righrMark from '../../../assets/images/courses/icons/right-mark.svg';
import tick from '../../../assets/images/ttick.svg';

import rate from '../../../assets/images/rating-star.svg';
import liverecord from '../../../assets/images/live-streaming-bx.svg';

import WaitClockIcon from '../../../assets/images/courses/icons/wait-sandclock-icon.svg';
import './CourseList.scss';
import ApiService from '../../../services/ApiService';
import LearnerPaymentPopup from '../../courses/course-details/LearnerPaymentPopup';

const RatingComponent = ({ rating }) => {
  const ratingInDecimal = rating?.value.split('/')[0];
  return (
    <Rating
      initialRating={ratingInDecimal}
      readonly
      emptySymbol={<img src={emptystar} className="icon" />}
      fullSymbol={<img src={fullstar} className="icon" />}
    />
  );
};

const CourseList = ({ courses, program }) => {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [occupation, setOccupation] = React.useState([]);
  const [openpayment, setopenpayment] = React.useState(false);
  const [courseData, setcourseData] = React.useState();

  const fetchUserDetails = async (uid) => {
    const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
    setOccupation(response?.data?.data?.userProfile?.occupation);
  };

  const apply = (course) => {
    setcourseData(course);

    if (occupation === 'STUDENT') {
      if (course?.target_audience === '{Learners}') {
        setopenpayment(true);
      } else {
        navigate(`/course/apply/student/${course.course_url}?course_id=${course?.course_id}`, {
          state: course,
        });
      }
    } else {
      if (course?.target_audience === '{Learners}') {
        setopenpayment(true);
      } else {
        navigate(`/course/apply/${course.course_url}?course_id=${course?.course_id}`, {
          state: course,
        });
      }
    }
  };

  const viewDetails = (course) => {
    
    if (course?.course_title === 'Industry Ready Program') {
      const url = 'https://www.unikaksha.com/course/industry-ready-program/';
      window.open(url, '_blank');
      return;
    }
    if (course?.course_title === 'Job Ready Program') {
      const url = 'https://www.unikaksha.com/course/job-ready-program/';
      window.open(url, '_blank');
      return;
    } else {
      localStorage.setItem("_state",JSON.stringify(course))
      navigate(`/course/${course?.course_url}`, {state:course});
    }
  };

  useEffect(() => {
    fetchUserDetails(user?.uid);
  }, [occupation]);

  const navigate = useNavigate();

  const getHighlights = (course) => {
    const highlights = course?.course_variant_sections?.highlights?.value;
    const items = highlights?.map((element, index) => {
      return (
        <p key={index} style={{ fontSize: '13px' }}>
          <img className="me-1" src={tick} /> {element.value}
        </p>
      );
    });
    return items;
  };

  const getPaymentMode = (course) => {
    return <span className="bannerlabel_span">{course?.tags}</span>;
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        {openpayment && (
          <>
            <LearnerPaymentPopup
              courseId={courseData?.id}
              courseInfo={courseData}
              setopenpayment={setopenpayment}
            />
          </>
        )}

        <div id="course_list">
          <h5>Top Techfit Courses</h5>
          <p>These are the top 3 courses provided by UniKaksha</p>
        </div>
        {/* <div>see all</div> */}
      </div>
      <Row>
        {courses?.map((course, idx) => (
          <Col md="4" key={course?.id}>
            <Card className="my-4 card-custom card-expore" style={{ width: '100%' }}>
              <Card className="bannerlable">{getPaymentMode(course)}</Card>
              <Card.Img
                style={{ width: 'fit-content', margin: 'auto', maxHeight: '246px' }}
                variant="top"
                src={course?.course_variant_sections?.bannerContentDesktop?.value[0].url}
              />
              <Card.Body className="body-course">
                <div className="d-flex justify-content-between align-items-center course-title-section">
                  <Card.Title>{course?.course_title}</Card.Title>
                  {/* <img src={HeartIcon} style={{cursor: 'pointer'}} alt="heart-icon" /> */}
                </div>
                <Card.Subtitle style={{ fontSize: '12px' }} className="mb-2">
                  {course?.variant_subtitle}
                </Card.Subtitle>
                <div className="d-flex align-items-center mb-3 rating-sml">
                  <img src={rate} alt="right mark" />
                  <p className="mb-0">{course?.rating}</p>
                  {/* <div className="d-flex ms-2 mb-1">
                    <RatingComponent rating={course?.course_variant_sections?.ratings} />
                  </div> */}
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-3 rate-container">
                    {/* <div className="d-flex record-time">
                      <img src={ liverecord} alt="Wait-Clock-Icon" />
                      <p  className="ms-2 mb-0 live-screen">
                      LIVE Classes
                      </p>
                    </div> */}
                    {/* <div className="d-flex">
                    <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
                      <p className="ms-2 mb-0 tags-course">
                      <span className="course-variant"> {(course.variant_name).trim() !=='' ? `${course.variant_name}`: ''}</span> {course.duration}  Months {' '}

                      <p className="mb-0">  {course?.course_type}</p>
                        
                      </p>

                    </div> */}
                  </div>
                  {course?.card_configuration?.highlights?.value?.map((heighlight, index) => (
                    <div key={index} className="d-flex mb-1">
                      <img src={righrMark} alt="right mark" />
                      <p className="ms-2 mb-0">{heighlight.title}</p>
                    </div>
                  ))}
                  {/* <div className="d-flex mb-1">
                  <img src={righrMark} alt="right mark" />
                  <p className="ms-2 mb-0">Pay After Placement</p>
                </div>
                <div className="d-flex mb-1">
                  <img src={righrMark} alt="right mark" />
                  <p className="ms-2 mb-0">No Coding Experience Required</p>
                </div> */}
                </div>

                {/* <div className=" align-items-center">
                  <div className="highlight-list">{getHighlights(course)}</div>
                </div> */}

                <div className="button-group button-group-c">
                  <div className="row">
                    <div className="col-sm-6">
                      <Button
                        variant="outline-warning"
                        onClick={() => {
                          viewDetails(course);
                        }}>
                        View Details
                      </Button>
                    </div>
                    <div className="col-sm-6">
                      <Button
                        variant="warning"
                        onClick={() => {
                          apply(course);
                        }}>
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CourseList;
