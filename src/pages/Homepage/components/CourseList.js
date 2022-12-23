import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Rating from 'react-rating';
import { useNavigate } from 'react-router-dom';
import { emptystar, fullstar, tick } from '../../../assets/images';
import righrMark from '../../../assets/images/courses/icons/right-mark.svg';
import WaitClockIcon from '../../../assets/images/courses/icons/wait-sandclock-icon.svg';

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

const CourseList = ({ courses }) => {
  const apply = (course) => {
    navigate(`/course/apply/${course.course_url}`, { state: course });
  };

  const viewDetails = (course) => {
    navigate(`/course/${course.course_url}`, { state: course });
  };

  useEffect(() => {}, []);

  const navigate = useNavigate();

  const getHighlights = (course) => {
    const highlights = course?.course_variant_sections?.highlights?.value;
    const items = highlights?.map((element, index) => {
      return (
        <p key={index} style={{ 'font-size': '14px' }}>
          <img className="me-1" src={tick} /> {element.value}
        </p>
        // <p className="font-color text-left-align mtb5"  style={{ "font-size": '14px' }}>
        //   <img src={WaitClockIcon} alt="Wait-Clock-Icon" /> <span className="ms-2 mb-0">{element.value}</span>
        // </p>
      );
    });
    return items;
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div id = "course_list">
          <h5>Top Techfit Courses</h5>
          <p>These are the top 3 courses provided by UniKaksha</p>
        </div>
        {/* <div>see all</div> */}
      </div>
      <Row>
        {courses?.map((course, idx) => (
          <Col md="4" key={course?.id}>
            <Card className="my-4 card-custom" style={{ width: '100%' }}>
              <Card.Img
                style={{ width: 'fit-content', margin: 'auto', maxHeight: '246px' }}
                variant="top"
                src={course?.course_variant_sections?.bannerAsset?.value[0].url}
              />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center course-title-section">
                  <Card.Title>{course?.course_title}</Card.Title>
                  {/* <img src={HeartIcon} style={{cursor: 'pointer'}} alt="heart-icon" /> */}
                </div>
                <Card.Subtitle
                  style={{ fontSize: '12px', fontStyle: 'italic', fontWeight: 'normal' }}
                  className="mb-2">
                  {course?.variant_subtitle}
                </Card.Subtitle>
                <div className="d-flex align-items-center mb-3 ">
                  <p className="mb-0">Ratings {course?.course_variant_sections?.ratings.value}</p>
                  <div className="d-flex ms-2 mb-1">
                    <RatingComponent rating={course?.course_variant_sections?.ratings} />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex">
                      <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
                      <p style={{ fontSize: '14px' }} className="ms-2 mb-0">
                        Duration, {course?.course_variant_sections?.duration} Months |{' '}
                        {course?.variant_name}
                      </p>
                    </div>
                    <div className="d-flex">
                      {/* <img src={CalenderIcon} alt="Wait-Clock-Icon" /> */}
                      <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
                        {/* Starts, <strong> {course?.sections?.batches?.value[0][0]?.value}</strong> */}
                      </p>
                    </div>
                  </div>
                  {course?.sections?.highlights?.value?.map((heighlight, index) => (
                    <div key={index} className="d-flex mb-1">
                      <img src={righrMark} alt="right mark" />
                      <p className="ms-2 mb-0">{heighlight.value}</p>
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

                <div className=" align-items-center">
                  <div className="">{getHighlights(course)}</div>
                </div>

                <div className="button-group">
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

    // <>
    //   <div className="d-flex justify-content-between">
    //     <div>
    //       <h5>Top Techfit Courses</h5>
    //       <p>This are the top 3 courses provided by UniKaksha</p>
    //     </div>
    //     <div>see all</div>
    //   </div>
    //   <Row>
    //     <Col md="4">
    //       <Card className="my-4 card-custom" style={{ width: '100%' }}>
    //         <Card.Img variant="top" src={courseImage} />
    //         <Card.Body>
    //           <div className="d-flex justify-content-between align-items-center course-title-section">
    //             <Card.Title> course title </Card.Title>
    //             <img src={HeartIcon} alt="heart-icon" />
    //           </div>
    //           <div className="d-flex align-items-center my-3 ">
    //             <p className="mb-0">Ratings 45</p>
    //             <div className="d-flex ms-2">
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarHalfFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarIcon} alt="heart-icon" />
    //             </div>
    //           </div>
    //           <div className="mb-4">
    //             <div className="d-flex justify-content-between mb-3">
    //               <div className="d-flex">
    //                 <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Duration, <strong> 6 Months</strong>
    //                 </p>
    //               </div>
    //               <div className="d-flex">
    //                 <img src={CalenderIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Starts, <strong> 4 Dec</strong>
    //                 </p>
    //               </div>
    //             </div>

    //             <div className="d-flex mb-1">
    //               <img src={righrMark} alt="right mark" />
    //               <p className="ms-2 mb-0">
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, unde?
    //               </p>
    //             </div>
    //             <div className="d-flex mb-1">
    //               <img src={righrMark} alt="right mark" />
    //               <p className="ms-2 mb-0">
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, unde?
    //               </p>
    //             </div>
    //             <div className="d-flex mb-1">
    //               <img src={righrMark} alt="right mark" />
    //               <p className="ms-2 mb-0">
    //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, unde?
    //               </p>
    //             </div>
    //           </div>
    //           <div className="button-group">
    //             <div className="row">
    //               <div className="col-sm-6">
    //                 <Button variant="outline-warning">View Details</Button>
    //               </div>
    //               <div className="col-sm-6">
    //                 <Button variant="warning">Apply Now</Button>
    //               </div>
    //             </div>
    //           </div>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //     <Col md="4">
    //       <Card className="my-4 card-custom" style={{ width: '100%' }}>
    //         <Card.Img variant="top" src={courseImage} />
    //         <Card.Body>
    //           <div className="d-flex justify-content-between align-items-center course-title-section">
    //             <Card.Title> course title </Card.Title>
    //             <img src={HeartIcon} alt="heart-icon" />
    //           </div>
    //           <div className="d-flex align-items-center my-3 ">
    //             <p className="mb-0">Ratings 45</p>
    //             <div className="d-flex ms-2">
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarHalfFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarIcon} alt="heart-icon" />
    //             </div>
    //           </div>
    //           <div className="mb-4">
    //             <div className="d-flex justify-content-between mb-3">
    //               <div className="d-flex">
    //                 <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Duration, <strong> 6 Months</strong>
    //                 </p>
    //               </div>
    //               <div className="d-flex">
    //                 <img src={CalenderIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Starts, <strong>4 Dec</strong>
    //                 </p>
    //               </div>
    //             </div>
    //             <div className="d-flex mb-1">
    //               <img src={righrMark} alt="right mark" />
    //               <p className="ms-2 mb-0">4.2</p>
    //             </div>
    //           </div>
    //           <div className="button-group">
    //             <div className="row">
    //               <div className="col-sm-6">
    //                 <Button variant="outline-warning">View Details</Button>
    //               </div>
    //               <div className="col-sm-6">
    //                 <Button variant="warning">Apply Now</Button>
    //               </div>
    //             </div>
    //           </div>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //     <Col md="4">
    //       <Card className="my-4 card-custom" style={{ width: '100%' }}>
    //         <Card.Img variant="top" src={courseImage} />
    //         <Card.Body>
    //           <div className="d-flex justify-content-between align-items-center course-title-section">
    //             <Card.Title> course title </Card.Title>
    //             <img src={HeartIcon} alt="heart-icon" />
    //           </div>
    //           <div className="d-flex align-items-center my-3 ">
    //             <p className="mb-0">Ratings 45</p>
    //             <div className="d-flex ms-2">
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarHalfFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarIcon} alt="heart-icon" />
    //             </div>
    //           </div>
    //           <div className="mb-4">
    //             <div className="d-flex justify-content-between mb-3">
    //               <div className="d-flex">
    //                 <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Duration, <strong> 6 Months</strong>
    //                 </p>
    //               </div>
    //               <div className="d-flex">
    //                 <img src={CalenderIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Starts, <strong> 4 Dec</strong>
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="button-group">
    //             <div className="row">
    //               <div className="col-sm-6">
    //                 <Button variant="outline-warning">View Details</Button>
    //               </div>
    //               <div className="col-sm-6">
    //                 <Button variant="warning">Apply Now</Button>
    //               </div>
    //             </div>
    //           </div>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //     <Col md="4">
    //       <Card className="my-4 card-custom" style={{ width: '100%' }}>
    //         <Card.Img variant="top" src={courseImage} />
    //         <Card.Body>
    //           <div className="d-flex justify-content-between align-items-center course-title-section">
    //             <Card.Title> course title </Card.Title>
    //             <img src={HeartIcon} alt="heart-icon" />
    //           </div>
    //           <div className="d-flex align-items-center my-3 ">
    //             <p className="mb-0">Ratings 45</p>
    //             <div className="d-flex ms-2">
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarHalfFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarIcon} alt="heart-icon" />
    //             </div>
    //           </div>
    //           <div className="mb-4">
    //             <div className="d-flex justify-content-between mb-3">
    //               <div className="d-flex">
    //                 <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Duration, <strong> 6 Months</strong>
    //                 </p>
    //               </div>
    //               <div className="d-flex">
    //                 <img src={CalenderIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Starts, <strong> 4 Dec</strong>
    //                 </p>
    //               </div>
    //             </div>

    //             <div className="d-flex mb-1">
    //               <img src={righrMark} alt="right mark" />
    //               <p className="ms-2 mb-0">4.2</p>
    //             </div>
    //           </div>
    //           <div className="button-group">
    //             <div className="row">
    //               <div className="col-sm-6">
    //                 <Button variant="outline-warning">View Details</Button>
    //               </div>
    //               <div className="col-sm-6">
    //                 <Button variant="warning">Apply Now</Button>
    //               </div>
    //             </div>
    //           </div>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //     <Col md="4">
    //       <Card className="my-4 card-custom" style={{ width: '100%' }}>
    //         <Card.Img variant="top" src={courseImage} />
    //         <Card.Body>
    //           <div className="d-flex justify-content-between align-items-center course-title-section">
    //             <Card.Title> course title </Card.Title>
    //             <img src={HeartIcon} alt="heart-icon" />
    //           </div>
    //           <div className="d-flex align-items-center my-3 ">
    //             <p className="mb-0">Ratings 45</p>
    //             <div className="d-flex ms-2">
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarHalfFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarIcon} alt="heart-icon" />
    //             </div>
    //           </div>
    //           <div className="mb-4">
    //             <div className="d-flex justify-content-between mb-3">
    //               <div className="d-flex">
    //                 <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Duration, <strong> 6 Months</strong>
    //                 </p>
    //               </div>
    //               <div className="d-flex">
    //                 <img src={CalenderIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Starts, <strong> 4 Dec</strong>
    //                 </p>
    //               </div>
    //             </div>

    //             <div className="d-flex mb-1">
    //               <img src={righrMark} alt="right mark" />
    //               <p className="ms-2 mb-0">4.2</p>
    //             </div>
    //           </div>
    //           <div className="button-group">
    //             <div className="row">
    //               <div className="col-sm-6">
    //                 <Button variant="outline-warning">View Details</Button>
    //               </div>
    //               <div className="col-sm-6">
    //                 <Button variant="warning">Apply Now</Button>
    //               </div>
    //             </div>
    //           </div>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //     <Col md="4">
    //       <Card className="my-4 card-custom" style={{ width: '100%' }}>
    //         <Card.Img variant="top" src={courseImage} />
    //         <Card.Body>
    //           <div className="d-flex justify-content-between align-items-center course-title-section">
    //             <Card.Title> course title </Card.Title>
    //             <img src={HeartIcon} alt="heart-icon" />
    //           </div>
    //           <div className="d-flex align-items-center my-3 ">
    //             <p className="mb-0">Ratings 45</p>
    //             <div className="d-flex ms-2">
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarHalfFilledIcon} alt="heart-icon" />
    //               <img className="me-1" src={StarIcon} alt="heart-icon" />
    //             </div>
    //           </div>
    //           <div className="mb-4">
    //             <div className="d-flex justify-content-between mb-3">
    //               <div className="d-flex">
    //                 <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Duration, <strong> 6 Months</strong>
    //                 </p>
    //               </div>
    //               <div className="d-flex">
    //                 <img src={CalenderIcon} alt="Wait-Clock-Icon" />
    //                 <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
    //                   Starts, <strong> 4 Dec</strong>
    //                 </p>
    //               </div>
    //             </div>

    //             <div className="d-flex mb-1">
    //               <img src={righrMark} alt="right mark" />
    //               <p className="ms-2 mb-0">4.2</p>
    //             </div>
    //           </div>
    //           <div className="button-group">
    //             <div className="row">
    //               <div className="col-sm-6">
    //                 <Button variant="outline-warning">View Details</Button>
    //               </div>
    //               <div className="col-sm-6">
    //                 <Button variant="warning">Apply Now</Button>
    //               </div>
    //             </div>
    //           </div>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>
    // </>
  );
};

export default CourseList;
