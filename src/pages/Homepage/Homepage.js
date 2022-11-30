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
    data = ["0c273fd2-e37d-41b7-93ee-776f1dad26ae",
    "332e33f5-5be3-4904-bdf2-bae027f8ca55",
    "3cafc07b-b2c4-4840-a7cc-4d9c5271f9de",
    "56357f50-a1cf-4b7a-908d-40a734cebe6e",
    "647b710e-89a9-4ead-ac8a-85b04bf33735",
    "6ed4f507-aa53-414b-b7e0-492e4959b5a8",
    "6f7eee32-5384-44b1-976a-f201fd262560",
    "8f4387c6-37d7-4524-9ebc-a8630c5a88ea",
    "97567557-9dad-49c8-a824-f2cdb7cc9369",
    "adb17a06-f706-4799-8a0a-9ab0de2637d4",
    "bbae69a8-10c2-4e9e-861e-8eff9c1aabe0",
    "c0ea2207-fa9b-4c5c-aeba-90f836072d14",
    "db11ce3e-4612-4d56-a1f7-82661ab8cb09",
    "de3f0508-4682-481d-85c5-51a353b54d35",
    "df812c5e-21c9-46c9-9492-12a4fb282e75",
    "e599c7b0-e1f8-4904-83d7-399617a829a0",
    "f2f1ea8d-0a39-4e38-bdf5-595a97a44e91",
    "f3ed0688-a69f-4e65-9ad8-1e5631031a6c"]
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
      <PrimaryNavbar />
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
      <Footer />
    </div>
  );
};

export default Homepage;
