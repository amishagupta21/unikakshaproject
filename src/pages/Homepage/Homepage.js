import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import InviteNow from '../../components/InviteNow';
import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { remoteConfig } from '../../firebase/firebaseAuth';
import ApiService from '../../services/ApiService';
import CourseList from './components/CourseList';
import HeroSection from './components/HeroSection';
import Placementpartner from './components/Placementpartner';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/actions/LoaderActions';
import FooterContainer from '../../components/FooterComponent';

const Homepage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [topCourses, setTopCourses] = useState([]);

  const fetchCourseDetails = async (data) => {
    dispatch(setLoading(true));
    data = data['top-courses']?.item;
    let res = await ApiService('home/top-courses', `POST`, { course_variant_ids: data }, true);
    if (res?.data?.code === 200) {
      setTopCourses(res?.data?.data?.result);
      dispatch(setLoading(false));
    }
  };

  const fetchdata = async () => {
    const isFetched = await fetchAndActivate(remoteConfig);
    const temp3 = await getValue(remoteConfig, 'skill_fit_data');
    const responseData = await JSON.parse(temp3._value);
    setData(responseData);
    fetchCourseDetails(responseData);
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
    localStorage.setItem('userData', JSON.stringify(response?.data?.data));
  };

  useEffect(() => {
    setTimeout(() => {
      fetchdata();
    }, 100);
  }, []);

  return (
    <div className="course-list-api">
      <div className="course-list-api-full">
        <HeroSection bannerDetails={data?.banner1_configure && data?.banner1_configure} />
        <div className="container">
          <CourseList courses={topCourses && topCourses} />
          <Placementpartner
            placementPartner={
              data?.placement_partner_configure && data?.placement_partner_configure
            }
          />
          {/* <Invite /> */}
          <Row className="d-flex justify-content-center my-4" lg={2}>
            {/* <InviteNow /> */}
          </Row>
        </div>
      </div>
      <FooterContainer />
    </div>
  );
};

export default Homepage;
