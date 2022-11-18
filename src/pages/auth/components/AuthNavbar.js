import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import BrandLogo from '../../../assets/images/brand-logo.svg';
import '../auth.scss';

const AuthNavbar = () => (
	<Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">
			<img src={BrandLogo} alt="Brand Logo" />
		  </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#home">Courses</Nav.Link>
            <Nav.Link href="#features">Event & Content</Nav.Link>
          </Nav>
        </Container>
      </Navbar>);

export default AuthNavbar;