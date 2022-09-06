import React, { useState, useEffect } from 'react'
import './header.css'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import editIcon from '../../assets/images/edit-icon.svg'
import ProfilePic from '../../assets/images/profile-picture.png'
import mail from '../../assets/images/icon-gmail.png';
import linked from '../../assets/images/icon-linked.png';
import network from '../../assets/images/icon-network.png';
import fb from '../../assets/images/icon-facebook.png';
import twit from '../../assets/images/icon-twit.png';
import dashboard from '../../assets/images/icon-dashboard.png';
import activity from '../../assets/images/icon-activity.png';
import courses from '../../assets/images/icon-courses.png';
import networknew from '../../assets/images/icon-network-new.png';
import group from '../../assets/images/icon-groups.png';
import morenew from '../../assets/images/icon-more-new.png';

import search from '../../assets/images/icon-search.svg';
import notification from '../../assets/images/icon-bell.svg';
import { Navigate, useNavigate } from 'react-router-dom';
import { logout } from '../../firebase/firebaseAuth';


const Header = () => {
  const [check, setCheck] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (check) {
      document.body.classList.add('active')
    }
    else {
      document.body.classList.remove('active')
    }
  }, [check]);
  return (
    <div className='d-flex  justify-content-between flex-lg-grow-1 header'>
      <button onClick={() => setCheck(prev => !prev)} className="menu-bar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </button>
      <div className='menu menu-header menu-rounded menu-column  align-items-stretch fw-semibold '>
        <ul>
          <li><a href=""><i className='icons-header-menu'><img src={dashboard} /></i><span>Dashboard</span> </a></li>
          <li><a href=""><i className='icons-header-menu'><img src={activity} /></i><span>Activity </span></a></li>
          <li><a href=""><i className='icons-header-menu'><img src={courses} /></i><span>Courses </span></a></li>
          <li><a href=""><i className='icons-header-menu'><img src={networknew} /></i><span>Network </span></a></li>
          <li><a href=""><i className='icons-header-menu'><img src={group} /></i><span>Groups</span></a></li>
          <li><a href=""><i className='icons-header-menu'><img src={morenew} /></i><span>More </span></a></li>
        </ul>
      </div>
      <div className='app-navbar flex-shrink-0'>
        <div className='app-navbar-item align-items-center ms-1 ms-lg-3'>
          <i className='search-icon'><img src={search} /></i>
        </div>
        <div className='app-navbar-item align-items-center ms-1 ms-lg-3'>
          <i className='notify-icon'><img src={notification} /></i>
        </div>
        <div className='app-navbar-item app-navbar-profile align-items-center ms-1 ms-lg-3'>
          <img src={ProfilePic} />
          {/* <div className='profile-box-des'>
            <h4>Raj Patel</h4>
            <span>#10203</span>
          </div> */}
          <Dropdown className='profile-control'>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              Raj patel
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={
                () => {
                  logout()
                  navigate("/")
                }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div >
    </div >
  )
}

export default Header;
