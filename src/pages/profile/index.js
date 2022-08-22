import React from 'react'
import './profile.css'
import editIcon from '../../assets/images/edit-icon.svg'
import ProfilePic from '../../assets/images/profile-picture.png'
import mail from '../../assets/images/icon-gmail.png';
import linked from '../../assets/images/icon-linked.png';
import network from '../../assets/images/icon-network.png';
import fb from '../../assets/images/icon-facebook.png';
import twit from '../../assets/images/icon-twit.png';
import { ProgressBar } from 'react-bootstrap';
import Education from '../../components/profile/Education';
import { Experience } from '../../components/profile/Experience';
import Sklill from '../../components/profile/Sklill';
import About from '../../components/profile/About';
import Projects from '../../components/profile/project/Projects';

const Profile = () => {
  return (
    <div className="profile-page">
      <h2 className='profile-heading'>MY Profile</h2>
      <div>
        <div className="profile-background">
          <img src={editIcon} />
        </div>
        <div className='profile-info'>
          <div className='profile-info-details'>
            <div className='profile-picture'>
              <img src={ProfilePic} alt="profile picture" />
            </div>
            <div className='profile-name ms-3'>
              <h3>Raj Patel</h3>
              <p>Java Full stack developer</p>
              <div className='sign-up-social'>
                <ul>
                  <li><a href=""><img src={fb} /></a></li>
                  <li><a href=""><img src={mail} /></a></li>
                  <li><a href=""><img src={linked} /></a></li>
                  <li><a href=""><img src={network} /></a></li>
                  <li><a href=""><img src={twit} /></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className='profile-followers'>
            <div>
              <h3>1300</h3>
              <p>Followers</p>
            </div>
            <div>
              <h3>500+</h3>
              <p>Connections</p>
            </div>
            <div>
              <h3>16</h3>
              <p>Following</p>
            </div>
          </div>
          <div className='profile-company'>
            <div>
              <p className='mb-0'>ABC pvt limited </p>
              <p className='text-end job-type '>Internship</p>
            </div>
            <p className='city text-end'>Vadodara, <strong>Gujarat</strong></p>
          </div>
        </div>
      </div>
      {/* profile complete  */}
      <div className='py-3 d-flex justify-content-between pe-4 card-bg profile-bg-blue'>
        <div className='w-100'>
          <h5>Complete Your Profile</h5>
          <ProgressBar>
            <ProgressBar variant="success" now={35} key={1} />
            <ProgressBar variant="warning" now={20} key={2} />
            <ProgressBar variant="danger" now={10} key={3} />
          </ProgressBar>
          <p className='text-center'>65%</p>
        </div>
        <div>
          <img src={editIcon} />
        </div>
      </div>
      <About />
      <Education />
      <Experience />
      <Sklill />
      <Projects />
    </div>
  )
}

export default Profile