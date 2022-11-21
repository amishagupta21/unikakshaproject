import { getValue } from 'firebase/remote-config';
import React, { useEffect } from 'react';
import PrimaryNavbar from '../../components/PrimaryNavbar';
import { remoteConfig } from '../../firebase/firebaseAuth';
import CourseList from './components/CourseList';

const Homepage = () => {
  useEffect(() => {
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
    remoteConfig.defaultConfig = {
      general_remote_config: JSON.stringify({ _value: '' }),
      course_detail_remote_config: JSON.stringify({ _value: '' }),
    };

    const val = getValue(remoteConfig, 'general_remote_config');
    console.log('🚀 ~ file: firebaseAuth.js ~ line 31 ~ val', JSON.parse(val._value));

    const val1 = getValue(remoteConfig, 'course_detail_remote_config');
    console.log('🚀 ~ file: firebaseAuth.js ~ line 35 ~ val1', JSON.parse(val1._value));
  }, []);

  return (
    <div>
      <PrimaryNavbar />
      <div className="container">
        <h2>Hero page design</h2>
      </div>

      <div className="container">
        <div className="d-flex justify-content-between">
          <div>
            <h6>Top Techfit Courses</h6>
            <p>This are the top 3 courses provided by SkillFit</p>
          </div>
          <div>see all</div>
        </div>
        <CourseList />
        <CourseList />
      </div>
    </div>
  );
};

export default Homepage;
