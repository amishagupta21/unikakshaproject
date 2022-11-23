import { getValue } from 'firebase/remote-config';
import React, { useEffect, useState } from 'react';
import PrimaryNavbar from '../../components/PrimaryNavbar';
import Footer from '../../components/Footer';
import { remoteConfig } from '../../firebase/firebaseAuth';
import CourseList from './components/CourseList';
import { fetchAndActivate } from 'firebase/remote-config';
import ApiService from '../../services/ApiService';
import Placementpartner from './components/Placementpartner';
import { setLoading } from '../../redux/actions/LoaderActions';
import { useDispatch } from 'react-redux';
import Invite from './components/Invite';
import HeroSection from './components/HeroSection';

const Homepage = () => {
  const [data, setData] = useState({});
  const [topCourses, setTopCourses] = useState([]);
  const dispatch = useDispatch();

  const fetchCourseDetails = async (data) => {
    data = data['top-courses']?.item;
    let res = await ApiService('home/top-courses', `POST`, { course_ids: data }, true);
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
      <PrimaryNavbar />
      <HeroSection bannerDetails={data?.banner1_configure && data?.banner1_configure} />
      <div className="container">
        <CourseList courses={topCourses && topCourses} />
        <Placementpartner
          placementPartner={data?.placement_partner_configure && data?.placement_partner_configure}
        />
        <Invite />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
