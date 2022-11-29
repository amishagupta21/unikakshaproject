import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import courseImage from '../../../assets/images/courses/course1-image.png';
import righrMark from '../../../assets/images/courses/icons/right-mark.svg';
import HeartIcon from '../../../assets/images/courses/icons/HeartIcon.svg';
import StarIcon from '../../../assets/images/courses/icons/StarIcon.svg';
import StarFilledIcon from '../../../assets/images/courses/icons/StarIconFill.svg';
import StarHalfFilledIcon from '../../../assets/images/courses/icons/StarIconHalfFill.svg';
import WaitClockIcon from '../../../assets/images/courses/icons/wait-sandclock-icon.svg';
import CalenderIcon from '../../../assets/images/courses/icons/CalenderIcon.svg';

const CourseList = ({ courses }) => {
  console.log('courses =>>::', courses[0]?.sections);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h5>Top Techfit Courses</h5>
          <p>This are the top 3 courses provided by UniKaksha</p>
        </div>
        <div>see all</div>
      </div>
      <Row>
        {courses?.map((course) => (
          <Col md="4" key={course?.id}>
            <Card className="my-4 card-custom" style={{ width: '100%' }}>
              <Card.Img variant="top" src={courseImage} />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center course-title-section">
                  <Card.Title>{course?.course_title}</Card.Title>
                  <img src={HeartIcon} alt="heart-icon" />
                </div>
                <div className="d-flex align-items-center my-3 ">
                  <p className="mb-0">Ratings {course?.sections?.ratings?.value}</p>
                  <div className="d-flex ms-2">
                    <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
                    <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
                    <img className="me-1" src={StarFilledIcon} alt="heart-icon" />
                    <img className="me-1" src={StarHalfFilledIcon} alt="heart-icon" />
                    <img className="me-1" src={StarIcon} alt="heart-icon" />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex">
                      <img src={WaitClockIcon} alt="Wait-Clock-Icon" />
                      <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
                        Duration, <strong> 6 Months</strong>
                      </p>
                    </div>
                    <div className="d-flex">
                      <img src={CalenderIcon} alt="Wait-Clock-Icon" />
                      <p style={{ fontSize: '12px' }} className="ms-2 mb-0">
                        Starts, <strong> {course?.sections?.batches?.value[0][0]?.value}</strong>
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
                <div className="button-group">
                  <div className="row">
                    <div className="col-sm-6">
                      <Button variant="outline-warning">View Details</Button>
                    </div>
                    <div className="col-sm-6">
                      <Button variant="warning">Apply Now</Button>
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
