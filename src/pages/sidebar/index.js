import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/images/unikaksha-lms-logo.svg";
import imgcontrol from "../../assets/images/img-accress-control.svg";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import "./sidebar.css";
const SideBar = () => {
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <div className={isActive ? "left-side" : "left-side active"}>
      <Link to="/home" className="logo-admin">
        <img className="logo-admin" width={198} src={logo} />
      </Link>
      <Nav defaultActiveKey="/home" className="navbar-nav">
        <li>
          <Link to="/home" className="nav-link">
            <i className="menu-icons menu-overview"></i> <span>Overview</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">
            <i className="menu-icons menu-profile"></i> <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link to="/live-classes" className="nav-link">
            <i className="menu-icons menu-class"></i> <span>Live Classes</span>
          </Link>
        </li>
        <li>
          <Link to="/courses" className="nav-link">
            <i className="menu-icons menu-course"></i> <span>My Courses</span>
          </Link>
        </li>
        <li>
          <Nav.Link className="nav-link" eventKey="link-6">
            <i className="menu-icons menu-more"></i>
            <span>More</span>
          </Nav.Link>
        </li>
      </Nav>

      <div className="bottom-list">
        <h3>Go Premium</h3>
        <p>
          Explore 500+ courses
          <br />
          with lifetime membership
        </p>
        <a href="" className="btn btn-info btn-primary">
          Get Access
        </a>
        <img src={imgcontrol} />
      </div>
    </div>
  );
};

export default SideBar;
