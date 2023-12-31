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

const Invite = () => {
  return (
    <div className="invite-container">
      <div className="invite-container-outer">
        <h3>Invite your friends</h3>
        <p>Enroll for as many techfit courses as you like for FREE</p>
        <a className="text-decoration-none" href="">
          <span className="px-2">INVITE NOW</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="16"
            viewBox="0 0 23 16"
            fill="none">
            <path
              d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9L1 7ZM22.7071 8.70711C23.0976 8.31658 23.0976 7.68342 22.7071 7.29289L16.3431 0.928932C15.9526 0.538408 15.3195 0.538408 14.9289 0.928932C14.5384 1.31946 14.5384 1.95262 14.9289 2.34315L20.5858 8L14.9289 13.6569C14.5384 14.0474 14.5384 14.6805 14.9289 15.0711C15.3195 15.4616 15.9526 15.4616 16.3431 15.0711L22.7071 8.70711ZM1 9L22 9V7L1 7L1 9Z"
              fill="#3BAACF"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Invite;
