import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import BrandLogo from '../assets/images/unikakha-logo.svg';
import '../custom.css';
import '../pages/auth/auth.css';

const PrimaryNavbar = () => (
  <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#home">
        <img src={BrandLogo} alt="Brand Logo" />
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link href="#home">Courses</Nav.Link>
        <Nav.Link href="#features">Event & Content</Nav.Link>
        <Nav.Link href="#features">Refer a Friend</Nav.Link>
        <Nav.Link href="#features">John Smith</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default PrimaryNavbar;
