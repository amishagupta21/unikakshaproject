import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import courseImage from '../../../assets/images/courses/course1-image.png';
import righrMark from '../../../assets/images/courses/icons/right-mark.svg';
import HeartIcon from '../../../assets/images/courses/icons/HeartIcon.svg';
import StarIcon from '../../../assets/images/courses/icons/StarIcon.svg';
import StarFilledIcon from '../../../assets/images/courses/icons/StarIconFill.svg';
import StarHalfFilledIcon from '../../../assets/images/courses/icons/StarIconHalfFill.svg';
import WaitClockIcon from '../../../assets/images/courses/icons/wait-sandclock-icon.svg';
import CalenderIcon from '../../../assets/images/courses/icons/CalenderIcon.svg';

const CourseList = () => {
  return (
    <Row>
      <Col>
        <Card className="my-4" style={{ width: '100%' }}>
          <Card.Img variant="top" src={courseImage} />
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>Full Stack Development</Card.Title>
              <img src={HeartIcon} alt="heart-icon" />
            </div>
            <div className="d-flex align-items-center my-3 ">
              <p className="mb-0">Ratings 4.5/5.0</p>
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
                    Starts, <strong> 6 Nov 2022</strong>
                  </p>
                </div>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">Certificate on Completion</p>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">Pay After Placement</p>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">No Coding Experience Required</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <Button variant="outline-warning">View Details</Button>
              <Button variant="warning">Apply Now</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="my-4" style={{ width: '100%' }}>
          <Card.Img variant="top" src={courseImage} />
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>Full Stack Development</Card.Title>
              <img src={HeartIcon} alt="heart-icon" />
            </div>
            <div className="d-flex align-items-center my-3 ">
              <p className="mb-0">Ratings 4.5/5.0</p>
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
                    Starts, <strong> 6 Nov 2022</strong>
                  </p>
                </div>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">Certificate on Completion</p>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">Pay After Placement</p>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">No Coding Experience Required</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <Button variant="outline-warning">View Details</Button>
              <Button variant="warning">Apply Now</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="my-4" style={{ width: '100%' }}>
          <Card.Img variant="top" src={courseImage} />
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>Full Stack Development</Card.Title>
              <img src={HeartIcon} alt="heart-icon" />
            </div>
            <div className="d-flex align-items-center my-3 ">
              <p className="mb-0">Ratings 4.5/5.0</p>
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
                    Starts, <strong> 6 Nov 2022</strong>
                  </p>
                </div>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">Certificate on Completion</p>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">Pay After Placement</p>
              </div>
              <div className="d-flex mb-1">
                <img src={righrMark} alt="right mark" />
                <p className="ms-2 mb-0">No Coding Experience Required</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <Button variant="outline-warning">View Details</Button>
              <Button variant="warning">Apply Now</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CourseList;
