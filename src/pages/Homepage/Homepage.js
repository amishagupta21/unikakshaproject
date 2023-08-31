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
  // const [industryReadyProgram, setIndustryReadyProgram] = useState();
  // const [jobReadyProgram, setJobReadyProgram] = useState();
  const [allCourseId, setAllCourseId] = useState([]);

  const fetchApi = async () => {
    const res = await ApiService(`admin/get/cvids`);
    setAllCourseId(res?.data?.data);
    if (res?.data?.code === 200) {
      fetchCourseDetails(res?.data?.data);
      // const data = localStorage.setItem('allCourseId', JSON.stringify(res?.data?.data));
    } else {
    }
  };

  const fetchCourseDetails = async (dataId, allCourseId) => {
    dispatch(setLoading(true));

    ///Dev Database course id
    // data = [
    //   '28d97f2a-1ff4-47f1-9606-9fbcef394897',
    //   '5c95b2e8-9e43-498e-901f-cdefa28096c3',
    //   'cfdbeadb-760e-493c-adce-1644727a4c6b',
    //   '22d1f637-bfea-4273-b582-3b226872a0ef',
    //   '7ba7421a-38ce-4fad-86bc-aba8f2f7a586',
    // ];

    // Production Database course id
    // data = [
    //   '9c1a1605-1955-4b8b-b4e9-d39ab7aa21d4',
    //   'cfdbeadb-760e-493c-adce-1644727a4c6b',
    //   'f33f5b40-9dc2-4b86-b487-db445a0d513e',
    // ];
    // /temporary code

    let res = await ApiService('home/top-courses', `POST`, { course_variant_ids: dataId }, true);
    if (res?.data?.code === 200) {
      setTopCourses(res?.data?.data?.result);
      // setIndustryReadyProgram(res?.data?.data?.result[0]);
      // setJobReadyProgram(res?.data?.data?.result[1]);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchdata = async () => {
    const isFetched = await fetchAndActivate(remoteConfig);
    const temp3 = await getValue(remoteConfig, 'skill_fit_data');
    const responseData = await JSON.parse(temp3._value);
    setData(responseData);
    // fetchCourseDetails(responseData);
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
    localStorage.setItem('userData', JSON.stringify(response?.data?.data));
  };

  useEffect(() => {
    setTimeout(() => {
      fetchdata();
    }, 100);
  }, []);
  const userName = localStorage.getItem('user');
  const userObject = JSON.parse(userName);

  if (userObject.displayName) {
    const fullName = userObject.displayName;
  }

  if (userObject.providerData && userObject.providerData[0].phoneNumber) {
    const phoneNumber = userObject.providerData[0].phoneNumber;
  }
  useEffect(() => {
    const userName = localStorage.getItem('user');
    const userObject = JSON.parse(userName);

    let fullname = ''; // Initialize variables
    let phoneNumber = '';

    if (userObject.displayName) {
      fullname = userObject.displayName;
    }

    if (userObject.providerData && userObject.providerData[0].phoneNumber) {
      phoneNumber = userObject.providerData[0].phoneNumber;
    }
    const phoneNumberForMoengage = phoneNumber;
    const userId = localStorage.getItem('userId');
    const handleMoengageEvent = (e) => {
      if (e.detail.name === 'SDK_INITIALIZED') {
        // alert(e.detail.data);
      }
      if (e.detail.name === 'SETTINGS_FETCHED') {
        // alert(e.detail.data);

        // Use the fullname and phoneNumber obtained from above
        const email = userSignUpData?.email; // Replace with actual email

        Moengage.add_unique_user_id(userId);
        Moengage.track_event('Log-in-Event', {
          email: email,
          whatsapp_number: phoneNumberForMoengage,
        });
        Moengage.add_email(email);
        Moengage.add_mobile(phoneNumberForMoengage);
      }
    };

    window.addEventListener('MOE_LIFECYCLE', handleMoengageEvent);

    return () => {
      window.removeEventListener('MOE_LIFECYCLE', handleMoengageEvent);
    };
  }, []);
  return (
    <div className="course-list-api">
      <div className="course-list-api-full">
        <HeroSection bannerDetails={data?.banner1_configure && data?.banner1_configure} />

        <div className="container">
          <CourseList
            courses={topCourses && topCourses}
            // program={industryReadyProgram}
            // jobReady={jobReadyProgram}
          />
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
