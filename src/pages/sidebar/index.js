import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';  
import Nav from 'react-bootstrap/Nav'; 
import logo from "../../assets/images/logo.svg";

import { useEffect, useState } from "react";
import './sidebar.css'
const SideBar = () => {
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);  }; 
  return (        
  
<div  className={isActive ? "left-side" : 'left-side active'} >
          <a href="#" className="logo">
              <img className='logo' width={198} src={logo} />
            
          </a>
         
     
          <Nav defaultActiveKey="/home" className="navbar-nav">
              <li><Nav.Link eventKey="link-1" className='nav-link' href="/home"><i className='fa-solid fa-house'></i> <span>Overview</span></Nav.Link></li>
            
            
              <li><Nav.Link className='nav-link' eventKey="link-3"><i className='fa-solid fa-users'></i><span>My Profile</span></Nav.Link></li>
              <li><Nav.Link className='nav-link' eventKey="link-4"><i className='fa-solid fa-key'></i><span>Live Classes</span></Nav.Link></li>
              <li><Nav.Link className='nav-link' eventKey="link-5"><i className='fa-solid fa-pallet-boxes'></i><span>My Courses</span></Nav.Link></li>
              <li><Nav.Link className='nav-link' eventKey="link-6"><i className='fa-solid fa-circle-play'></i><span>More</span></Nav.Link></li>
             
          </Nav>

              
                 
      </div>
);    
}

export default SideBar