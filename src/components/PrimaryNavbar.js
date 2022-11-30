import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Dropdown from 'react-bootstrap/Dropdown';
import BrandLogo from '../assets/images/unikaksha-logo.svg';
import Notify from '../assets/images/icon-notify.svg';
import Profileimg from '../assets/images/img-profile-pic.svg';
import Course from '../assets/images/icon-mycourse.svg';
import Profile from '../assets/images/icon-myprofile.svg';
import Logout from '../assets/images/icon-logout.svg';

import '../custom.css';
import '../pages/auth/auth.scss';
import { logout } from '../firebase/firebaseAuth';
import { useNavigate } from 'react-router-dom';




const PrimaryNavbar = () => {
  const navigate = useNavigate();
  return (

   
    <div className="custom-header">
       <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="#home"> <img src={BrandLogo} alt="Brand Logo" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto nav-customs">
        <Nav.Link href="#home">Courses</Nav.Link>
            <Nav.Link href="#features">Event & Content</Nav.Link>
            <Nav.Link href="#features" className="refer-frd">
              Refer a Friend
            </Nav.Link>
            
           
        </Nav>
        
      </Navbar.Collapse>
      <div className="d-flex profile-sidebar-unikaksha">
			<Nav className="ms-auto">
      <Nav.Link href="#features" className="notification-link">
              <img src={Notify} alt="notification" />
            </Nav.Link>
			 <Nav.Link href="#features" className="notification-link-dp">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="dropdown-design">
                  <img src={Profileimg} alt="profile" className='profile-avatar'/>
                  <span className='avatar-name'>John Smith</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <img src={Course} alt="profile" />
                    My Courses
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    {' '}
                    <img src={Profile} alt="profile" />
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={async () => {
                      logout();
                      navigate('/');
                    }}>
                    <img src={Logout} alt="profile" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
                 </Nav>
                </div>

    </Container>
  </Navbar>
      {/* <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">
            <img src={BrandLogo} alt="Brand Logo" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Courses</Nav.Link>
            <Nav.Link href="#features">Event & Content</Nav.Link>
            <Nav.Link href="#features" className="refer-frd">
              Refer a Friend
            </Nav.Link>
            <Nav.Link href="#features" className="notification-link">
              <img src={Notify} alt="notification" />
            </Nav.Link>
            <Nav.Link href="#features">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="dropdown-design">
                  <img src={Profileimg} alt="profile" />
                  <span>John Smith</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">
                    <img src={Course} alt="profile" />
                    My Courses
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    {' '}
                    <img src={Profile} alt="profile" />
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={async () => {
                      logout();
                      navigate('/');
                    }}>
                    <img src={Logout} alt="profile" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </div>
  );
};

export default PrimaryNavbar;
