import React, { useEffect } from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../redux/actions/AuthAction';

const PrimaryNavbar = () => {
  let isAuth =
    useSelector((state) => state?.auth?.isAuthenticated) ||
    JSON.parse(localStorage.getItem('isAuthenticated'));
  const [user, setUser] = React.useState();

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const url = window.location.pathname.split('/').pop();
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [isAuth]);

  const logOutHandler = async () => {
    await logout();
    dispatch(setIsAuthenticated(false));
    navigate('/');
  };

  return (
    <div className="custom-header">
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/dashboard">
            {' '}
            <img src={BrandLogo} alt="Brand Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-customs">
              <Nav.Link href="/dashboard">Courses</Nav.Link>
              <Nav.Link href="#features">Event & Content</Nav.Link>
              <Nav.Link href="#features" className="refer-frd">
                Refer a Friend
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {isAuth === true ? (
            <div className="d-flex profile-sidebar-unikaksha">
              <Nav className="ms-auto">
                <Nav.Link href="#features" className="notification-link">
                  <img src={Notify} alt="notification" />
                </Nav.Link>
                <Nav.Link className="notification-link-dp">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="dropdown-design">
                      <img src={Profileimg} alt="profile" className="profile-avatar" />
                      <span className="avatar-name">{user?.displayName}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="/my-courses" onClick={() => navigate('/my-courses')}>
                        <img src={Course} alt="my-courses" />
                        My Courses
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action">
                        {' '}
                        <img src={Profile} alt="profile" />
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => logOutHandler()}>
                        <img src={Logout} alt="profile" />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav.Link>
              </Nav>
            </div>
          ) : (
            ''
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default PrimaryNavbar;
