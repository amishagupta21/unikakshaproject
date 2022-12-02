import { fetchAndActivate, getValue } from 'firebase/remote-config';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import InviteNow from '../../components/InviteNow';
import PrimaryNavbar from '../../components/PrimaryNavbar';
import { remoteConfig } from '../../firebase/firebaseAuth';
import ApiService from '../../services/ApiService';
import CourseList from './components/CourseList';
import HeroSection from './components/HeroSection';
import Placementpartner from './components/Placementpartner';

const Homepage = () => {
  const [data, setData] = useState({});
  const [topCourses, setTopCourses] = useState([]);

  const fetchCourseDetails = async (data) => {
    data = data['top-courses']?.item;
    let res = await ApiService('home/top-courses', `POST`, { course_variant_ids: data }, true);
    if (res?.data?.code === 200) {
      setTopCourses(res?.data?.data?.result);
    }
  };

  const fetchdata = async () => {
    const isFetched = await fetchAndActivate(remoteConfig);
    const temp3 = await getValue(remoteConfig, 'skill_fit_data');
    const responseData = await JSON.parse(temp3._value);
    console.log('response fit data', responseData);
    setData(responseData);
    fetchCourseDetails(responseData);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchdata();
    }, 1000);
  }, []);

  return (
    <div>
      <HeroSection bannerDetails={data?.banner1_configure && data?.banner1_configure} />
      <div className="container">
        <CourseList courses={topCourses && topCourses} />
        <Placementpartner
          placementPartner={data?.placement_partner_configure && data?.placement_partner_configure}
        />
        {/* <Invite /> */}
        <Row className='d-flex justify-content-center my-4' lg={2}>
          <InviteNow />
        </Row>
      </div>
    </div>
  );
};

export default Homepage;
