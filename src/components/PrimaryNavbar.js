import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import Dropdown from 'react-bootstrap/Dropdown';
import BrandLogo from '../assets/images/unikakha-logo.svg';
import Notify from '../assets/images/icon-notify.svg';
import Profileimg from '../assets/images/img-profile-pic.svg';

import '../custom.css';
import '../pages/auth/auth.css';

const PrimaryNavbar = () => (
  <div className='custom-header'>
  <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#home">
        <img src={BrandLogo} alt="Brand Logo" />
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link href="#home">Courses</Nav.Link>
        <Nav.Link href="#features">Event & Content</Nav.Link>
        <Nav.Link href="#features">Refer a Friend</Nav.Link>
        <Nav.Link href="#features"> <img src={Notify} alt="notification" /></Nav.Link>
        <Nav.Link href="#features">
        <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic" className="dropdown-design">
        
      <img src={Profileimg} alt="profile" /><span>John Smith</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">My Courses</Dropdown.Item>
        <Dropdown.Item href="#/action-2">My Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </Nav.Link>
              
      </Nav>
    </Container>
  </Navbar>
  </div>
);

export default PrimaryNavbar;
