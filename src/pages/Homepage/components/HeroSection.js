/* eslint no-use-before-define: 0 */ // --> OFF
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Loginbanner from '../../../assets/images/img-home-banner.png';
import ApiService from '../../../services/ApiService';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ bannerDetails, courses }) => {
  const [batchStartDate, setBatchStartDate] = useState('');
  const [courseData, setcourseData] = React.useState();
  const [occupation, setOccupation] = React.useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBatchStartDate = async () => {
      try {
        const res = await ApiService(`/admin/next-batch/date`, 'GET', {}, true);
        const startDate = res?.data?.data[0]?.start_date;
        setBatchStartDate(startDate);
      } catch (error) {
        console.error('Error fetching batch start date:', error);
      }
    };
    fetchBatchStartDate();
  }, []);
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

  return (
    <div className="hero-banner">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="hero-banner-left-apart">
              <img src={Loginbanner} alt="Login Banner" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="home-page-slides">
              <Carousel>
                {bannerDetails?.item?.map((banner, index) => (
                  <Carousel.Item key={banner?.image + index}>

                    <div className="bootcamp-item">
                      <h2>{banner?.title}</h2>
                      <h1>Bootcamp</h1>
                      <p>
                        Next Morning Batch starting&nbsp;
                        <span className="orange">
                          {batchStartDate}
                        </span>
                      </p>
                      <p>
                        Next Evening Batch starting&nbsp;
                        <span className="orange">
                          {batchStartDate}
                        </span>
                      </p>
                      {courses?.map((course, idx) => {
                        if (course.course_title === "Full Stack Web Development") {
                          return (
                            <div className="btn-item" key={idx}>
                              <a
                                // href={banner.deeplink}
                                target="_blank"
                                className="enroll-now"
                                onClick={() => {
                                  apply(course);
                                }}
                              >
                                Enroll Now
                              </a>
                            </div>
                          );
                        } else {
                          return null; 
                        }
                      })}

                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
