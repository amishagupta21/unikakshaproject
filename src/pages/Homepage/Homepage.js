import { getValue } from 'firebase/remote-config';
import React, { useEffect } from 'react';
import PrimaryNavbar from '../../components/PrimaryNavbar';
import Footer from '../../components/Footer';
import { remoteConfig } from '../../firebase/firebaseAuth';
import CourseList from './components/CourseList';
import Invite from './components/Invite';
import Loginbanner from '../../assets/images/img-home-banner.png';
import Logopartner from '../../assets/images/img-partner.png';




import { Carousel } from 'react-bootstrap';




const Homepage = () => {
  useEffect(async () => {
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
    remoteConfig.defaultConfig = {
      general_remote_config: JSON.stringify({ _value: '' }),
      course_detail_remote_config: JSON.stringify({ _value: '' }),
    };

    const val = await getValue(remoteConfig, 'general_remote_config');
    console.log('🚀 ~ file: firebaseAuth.js ~ line 31 ~ val', JSON.parse(val._value));

    const val1 = await getValue(remoteConfig, 'course_detail_remote_config');
    console.log('🚀 ~ file: firebaseAuth.js ~ line 35 ~ val1', JSON.parse(val1._value));
  }, []);

  return (
    <div>
      <PrimaryNavbar />
      <div className="hero-banner">
      <div className='container'>
      <div className='row'>
      <div className='col-sm-6'>
      <div className='hero-banner-left-apart'>
      <img src={Loginbanner}/>
        </div></div>
        <div className='col-sm-6'>
        <div className="home-page-slides">
		<Carousel>
      <Carousel.Item>
		<div className='bootcamp-item'>
      <h2>Full-stack development</h2>
      <h1>Bootcamp</h1>
      <p>Batch starting <span classname="orange">this Saturday</span></p>
      <div className='btn-item'>
        <a href="" className='enroll-now'>Enroll Now</a>
      </div>
    </div>

      </Carousel.Item>
      <Carousel.Item>
      <div className='bootcamp-item'>
      <h2>Full-stack development</h2>
      <h1>Bootcamp</h1>
      <p>Batch starting <span classname="orange">this Saturday</span></p>
      <div className='btn-item'>
        <a href="" className='enroll-now'>Enroll Now</a>
      </div>
    </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='bootcamp-item'>
      <h2>Full-stack development</h2>
      <h1>Bootcamp</h1>
      <p>Batch starting <span classname="orange">this Saturday</span></p>
      <div className='btn-item'>
        <a href="" className='enroll-now'>Enroll Now</a>
      </div>
    </div>
      </Carousel.Item>
    </Carousel>
      </div>
        </div> </div>
        </div>
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
        <div className='partner-list'>
          <h5>Our Placement Partners</h5>
        
            <ul>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
              <li> <img src={Logopartner}/></li>
            </ul>
           
        </div>
        <Invite />
       
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
