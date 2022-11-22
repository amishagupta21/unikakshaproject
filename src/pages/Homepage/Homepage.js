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
      <div className="container">
        <h2>Hero page design</h2>
      </div>
      <div className="container">
        <CourseList courses={topCourses && topCourses} />
        <Placementpartner placementPartner={placementPartner && placementPartner} />
      </div>
    </div>
  );
};

export default Homepage;
