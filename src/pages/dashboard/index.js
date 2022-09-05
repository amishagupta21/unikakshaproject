import React from 'react'
import editIcon from '../../assets/images/edit-icon.svg'
import ProfilePic from '../../assets/images/profile-picture.png'
import ProfilePic2 from '../../assets/images/profile-picture2.png'
import ProfilePic3 from '../../assets/images/profile-picture3.png'
import mail from '../../assets/images/icon-gmail.png';
import linked from '../../assets/images/icon-linked-new.png';
import network from '../../assets/images/icon-youtube.png';
import fb from '../../assets/images/icon-facebook-new.png';
import profile from '../../assets/images/profile-picture.png';
import pintest from '../../assets/images/icon-printest-new.png';
import pdf from '../../assets/images/icon-pdf.svg';


import twit from '../../assets/images/icon-twitter-new.png';
import { ProgressBar } from 'react-bootstrap';

import About from '../../components/profile/About';
import Education from '../../components/profile/Education';
import Skills from '../../components/profile/Skills';
import Experience from '../../components/profile/Experience';
import Interest from '../../components/profile/Interest';
import Recommendations from '../../components/profile/Recommendations';
import Projects from '../../components/profile/Projects';

import enroll from '../../assets/images/icon-enroll.svg'
import iconplus from '../../assets/images/icon-plus.svg'
import progressicon from '../../assets/images/progress-icon.svg'
import Table from 'react-bootstrap/Table';


import SideBar from '../sidebar';
import Header from '../header';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const Dashboard = () => {
  return (
    <div className="wrapper">

    <div className="sidebar">
    <SideBar />
      </div>
      <div className="main-wrapper">
      <Header />
      <div className="page-wrapper">
        <div className="profile-page">
       
           <div className="row-profile-left">
        
           <div className="dashboard-wrapper">
           <div className="dashboard-box">
           <div className="row">
           <div className="col-sm-3">
        
           <div className="gray-box color-red">
           <div className="progress-info"><i><img src={progressicon}/></i>
         <span>Overall Progress</span> </div>
         <h1>35%</h1>
         
        </div>
         
        </div>
        <div className="col-sm-3">
        
           <div className="gray-box color-green">
           <div className="progress-info"><i><img src={progressicon}/></i>
         <span>Lessons Completed</span> </div>
         <h1>15</h1>
         
        </div>
         
        </div>
        <div className="col-sm-3">
        
           <div className="gray-box color-blue">
           <div className="progress-info"><i><img src={progressicon}/></i>
         <span>Upcoming class</span> </div>
         <h1>62</h1>
         
        </div>
         
        </div>
        <div className="col-sm-3">
        
           <div className="gray-box color-orange">
           <div className="progress-info"><i><img src={progressicon}/></i>
         <span>Gamification Points</span> </div>
         <h1>245</h1>
         
        </div>
         
        </div>
         
         
        </div>
         
         
        </div>
         <div className='table-wrapper mt-5'>
           <h3 className='page-head'>Class you are taking</h3>
         <Table>
      <thead>
        <tr>
          <th>Course Title</th>
          <th>Lesson Completed</th>
          <th>Duration</th>
          <th>Instrutor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><div className='wrap-box'><span style={{background: "#FEE5E4"}}></span><h4>Java full stack</h4></div></td>
          <td><div className='lesson-status'>18/<i>40</i> (48%)</div></td>
          <td>24h 13m 28s</td>
          <td><div className='sucess-status'><i></i> <span>Sashank</span></div></td>
        </tr>
        <tr>
          <td><div className='wrap-box'><span style={{background: "#E6E6FF"}}></span><h4>UX Design Certificate</h4></div></td>
          <td><div className='lesson-status'>7/<i>40</i> (48%)</div></td>
          <td>10h 0m 0s</td>
          <td><div className='disable-status'><i></i> <span>Manoj</span></div></td>
        </tr>
        <tr>
          <td><div className='wrap-box'><span style={{background: "#FFF4E6"}}></span><h4>Project Management</h4></div></td>
          <td><div className='lesson-status'>21/<i>40</i> (97%)</div></td>
          <td>17h 59m 0s</td>
          <td><div className='sucess-status'><i></i> <span>Rakesh</span></div></td>
        </tr>
        
      </tbody>
    </Table>
         </div>

         <div className="white-box">
            <h3 className='page-head'>Recommended for you</h3>
           <div className='dashboard-recommend'>
           <div className='row'>
           <div className='col-sm-4'>
           <div className='recomended-box'>
           <div className='box-grid green'>

</div>
<div className='grid-content'>
  <h4>HTML</h4>
  <h5>Front-end Development</h5>
  <p>30 Lessons | 83 Hours</p>
  <a href="" className='btn btn-info btn-primary  border-radius'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
<path d="M17 10H3C1.89543 10 1 10.8954 1 12V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V12C19 10.8954 18.1046 10 17 10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 10V6C5 4.67392 5.52678 3.40215 6.46447 2.46447C7.40215 1.52678 8.67392 1 10 1C11.3261 1 12.5979 1.52678 13.5355 2.46447C14.4732 3.40215 15 4.67392 15 6V10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Enroll Now</a>
</div>
</div>
</div>
<div className='col-sm-4'>
           <div className='recomended-box'>
           <div className='box-grid blue'>

</div>
<div className='grid-content'>
  <h4>Search Engin</h4>
  <h5>SEO Experts from Zero</h5>
  <p>25 Lessons | 18 Hours</p>
  <a href="" className='btn btn-info btn-primary border-radius btn-disable-color'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
<path d="M17 10H3C1.89543 10 1 10.8954 1 12V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V12C19 10.8954 18.1046 10 17 10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 10V6C5 4.67392 5.52678 3.40215 6.46447 2.46447C7.40215 1.52678 8.67392 1 10 1C11.3261 1 12.5979 1.52678 13.5355 2.46447C14.4732 3.40215 15 4.67392 15 6V10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Enroll Now</a>
</div>
</div>
</div>
<div className='col-sm-4'>
           <div className='recomended-box'>
           <div className='box-grid yellow'>

</div>
<div className='grid-content'>
  <h4>UI Design</h4>
  <h5>Learn Creative Design</h5>
  <p>35 Lessons | 95 Hours</p>
  <a href="" className='btn btn-info btn-primary border-radius btn-disable-color'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
<path d="M17 10H3C1.89543 10 1 10.8954 1 12V19C1 20.1046 1.89543 21 3 21H17C18.1046 21 19 20.1046 19 19V12C19 10.8954 18.1046 10 17 10Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 10V6C5 4.67392 5.52678 3.40215 6.46447 2.46447C7.40215 1.52678 8.67392 1 10 1C11.3261 1 12.5979 1.52678 13.5355 2.46447C14.4732 3.40215 15 4.67392 15 6V10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Enroll Now</a>
</div>
</div>
</div>
</div>
           </div>
           
           
            </div>
         
        </div>
         
          </div>
          <div className="row-profile-right">
          <div className="white-box">
            <h3 className='page-head'>Active Positions</h3>
            <div className='profile-information-container'>
            <div className='profile-information-containerpersonal-information'>
            <img src={ProfilePic}  className=""/>
              </div>
            </div>
            </div>
    
            <div className="white-box">
            <h3 className='page-head'>Latest updates</h3>
            <img src={iconplus}  className="edit-add"/>
            <div className="white-box-list updates mt-4">
              <ul>
                <li>
                  <div className="row">
                    <div className="col-2">
                    <img src={profile}  className="img-fluid"/>
                     </div>
                     <div className="col-10">
    <h4>Heena posted an update</h4>
    <p>4 days ago</p>
    </div>
                     
                  </div>
                </li>
                <li className='active'>
                  <div className="row">
                    <div className="col-2">
                    <img src={profile}  className="img-fluid"/>
                     </div>
                     <div className="col-10">
    <h4>Heena posted an update</h4>
    <p>4 days ago</p>
    </div>
                     
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-2">
                    <img src={profile}  className="img-fluid"/>
                     </div>
                     <div className="col-10">
    <h4>Heena posted an update</h4>
    <p>4 days ago</p>
    </div>
                     
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div className="col-2">
                    <img src={profile}  className="img-fluid"/>
                     </div>
                     <div className="col-10">
    <h4>Heena posted an update</h4>
    <p>4 days ago</p>
    </div>
                     
                  </div>
                </li>
             
              </ul>
            </div> 
            <div className='see-all'>
              <a href="">See All</a>
            </div></div>
    
            <div className="white-box">
            <h3 className='page-head'>Community Groups</h3>
            <img src={iconplus}  className="edit-add"/>
            <div className="white-box-list mt-4">
              <ul>
                <li>
                  <div className="row-box">
                  
                  <div className='col-box'>
                    <span style={{background: "#154F56"}}> </span>
                  </div>
                   
                     <div className="col-box-content">
    <h4>Development Community</h4>
    <p>112K Members</p>
    </div>
                     
                  </div>
                </li>
                <li className='active'>
                  <div className="row-box">
                  
                  <div className='col-box'>
                    <span style={{background: "#360267"}}> </span>
                  </div>
                   
                     <div className="col-box-content">
    <h4>SEO Helpline 24/7</h4>
    <p>78K Members</p>
    </div>
                     
                  </div>
                </li>
                <li>
                  <div className="row-box">
                  
                  <div className='col-box'>
                    <span style={{background: "#021133"}}> </span>
                  </div>
                   
                     <div className="col-box-content">
    <h4>Digital Marketing</h4>
    <p>112K Members</p>
    </div>
                     
                  </div>
                </li>
                <li>
                  <div className="row-box">
                  
                  <div className='col-box'>
                    <span style={{background: "#00339B"}}> </span>
                  </div>
                   
                     <div className="col-box-content">
    <h4>Future scope - AI</h4>
    <p>21K Members</p>
    </div>
                     
                  </div>
                </li>
              </ul>
            </div>   <div className='see-all'>
              <a href="">See All</a>
            </div></div>
    
            <div className="white-box">
            <h3 className='page-head'>Active Connections</h3>
           
            <div className="white-active-connections mt-4">
             <a href="" className='img-conncetion'>  <img src={ProfilePic}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic2}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic3}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic2}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic3}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic2}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic3}  className="edit-pc-img"/></a>
             <a href="" className='img-conncetion'>  <img src={ProfilePic}  className="edit-pc-img"/></a>
           
            </div> 
            <div className='see-all'>
              <a href="">fSee All</a>
            </div>
            
            </div>
            </div>
    
        </div>
        </div>
        
        </div>
        </div>
  )
}

export default Dashboard