import { getValue } from 'firebase/remote-config';
import React, { useEffect, useState } from 'react';
import PrimaryNavbar from '../../components/PrimaryNavbar';
import { remoteConfig } from '../../firebase/firebaseAuth';
import CourseList from './components/CourseList';
import { fetchAndActivate } from 'firebase/remote-config';
import ApiService from '../../services/ApiService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Container } from 'react-bootstrap';
import './style.css';
import Placementpartner from './components/Placementpartner';
import { setLoading } from '../../redux/actions/LoaderActions';
import { useDispatch } from 'react-redux';
import Loginbanner from '../../assets/images/img-home-banner.png';

import { Carousel } from 'react-bootstrap';

const Homepage = () => {
  const [data, setData] = useState({});
  const [topCourses, setTopCourses] = useState({});
  const [placementPartner, setplacementPartner] = useState({});
  const [config, setconfig] = useState({});

  const dispatch = useDispatch();
  const fetchCourseDetails = async (data) => {
    data = data['top-courses']?.item;
    let res = await ApiService('home/top-courses', `POST`, { course_ids: data });
    if (res?.data?.code === 200) {
      setTopCourses(res?.data?.data?.result);
    }
  };

  const fetchdata = async () => {
    const isFetched = await fetchAndActivate(remoteConfig);
    const temp3 = await getValue(remoteConfig, 'skill_fit_data');
    const responseData = await JSON.parse(temp3._value);
    console.log('lllll', responseData);
    setplacementPartner(responseData?.placement_partner_configure);
    setData(responseData);
    fetchCourseDetails(responseData);
  };

  console.log('topCourses final::', topCourses);
  useEffect(() => {
    setTimeout(() => {
      fetchdata();
    }, 1000);
  }, []);

  return (
    <div>
      <PrimaryNavbar />
      <div className="hero-banner">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="hero-banner-left-apart">
                <img src={Loginbanner} />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="home-page-slides">
                <Carousel>
                  <Carousel.Item>
                    <div className="bootcamp-item">
                      <h2>Full-stack development</h2>
                      <h1>Bootcamp</h1>
                      <p>
                        Batch starting <span className="orange">this Saturday</span>
                      </p>
                      <div className="btn-item">
                        <a href="" className="enroll-now">
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="bootcamp-item">
                      <h2>Full-stack development</h2>
                      <h1>Bootcamp</h1>
                      <p>
                        Batch starting <span className="orange">this Saturday</span>
                      </p>
                      <div className="btn-item">
                        <a href="" className="enroll-now">
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="bootcamp-item">
                      <h2>Full-stack development</h2>
                      <h1>Bootcamp</h1>
                      <p>
                        Batch starting <span className="orange">this Saturday</span>
                      </p>
                      <div className="btn-item">
                        <a href="" className="enroll-now">
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <CourseList courses={topCourses && topCourses} />
        <Placementpartner placementPartner={placementPartner && placementPartner} />
      </div>
    </div>
  );
};

export default Homepage;
