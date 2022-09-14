import React, { useEffect, useState } from "react"
import "./profile.css"
import editIcon from "../../assets/images/edit-icon.svg"
import ProfilePic from "../../assets/images/profile-picture.png"
import ProfilePic2 from "../../assets/images/profile-picture2.png"
import ProfilePic3 from "../../assets/images/profile-picture3.png"
import linked from "../../assets/images/icon-linked-new.png"
import youtube from "../../assets/images/icon-youtube.png"
import fb from "../../assets/images/icon-facebook-new.png"
import profile from "../../assets/images/profile-picture.png"
import pintest from "../../assets/images/icon-printest-new.png"
import pdf from "../../assets/images/icon-pdf.svg"

import twit from "../../assets/images/icon-twitter-new.png"
import banner from "../../assets/images/icon-add-banner.svg"

import { Modal, ProgressBar } from "react-bootstrap"

import About from "../../components/profile/About"
import Education from "../../components/profile/Education"
import Skills from "../../components/profile/Skills"
import Experience from "../../components/profile/Experience"
import Recommendations from "../../components/profile/Recommendations"
import Projects from "../../components/profile/Projects"
import iconplus from "../../assets/images/icon-plus.svg"
import * as Yup from "yup"
import Dropdown from "react-bootstrap/Dropdown"
import { getuserProfile } from "../../redux/actions/UserActions"
import { useDispatch, useSelector } from "react-redux"
import Onesocial from "../../components/profile/socialmedia/Onesocial"
import WorkExperienceModal from "./components/Modals/WorkExperienceModal"
import EducationModal from "./components/Modals/EducationModal"
import GeneralProfileModal from "./components/Modals/GeneralProfileModal"
import CurrentStatus from "../../components/profile/CurrentStatus"


const Profile = () => {
  const dispatch = useDispatch()
  const profileInfo = useSelector((state) => state?.users?.profile)
  console.log("profileInfo", profileInfo);
  const [profileImg, setProfileImg] = useState("")
  const [bannerImg, setbannerImg] = useState("")
  const [isShowIntroductionModal, setIsShowIntroductionModal] = useState(false)
  const [isShowExperienceModal, setIsShowExperienceModal] = useState(false)
  const [isShowEducationModal, setIsShowEducationModal] = useState(false)
  const [currentInfo, setCurrentInfo] = useState({})

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("user"))?.uid
    dispatch(getuserProfile(id))
  }, [])

  return (
    <div className="page-wrapper">
      <div className="profile-page">
        <div className="row-profile-left">
          <h2 className="profile-heading">MY Profile</h2>
          <div className="profile-box">
            <div className="profile-background">
              <img className="edit-icon" onClick={() => setIsShowIntroductionModal(true)} src={editIcon} />
            </div>
            <div className="profile-page-columns">
              <div className="profile-information-status-left">
                <div className="profile-info-details">
                  <div className="profile-picture">
                    <img src={ProfilePic} alt="profile picture" />
                  </div>
                  <div className="profile-name">
                    <h3>{profileInfo?.firstName} {profileInfo?.lastName}</h3>
                    <p>{profileInfo?.profileHeadline}</p>
                    <div className="profile-share">
                      <ul>
                        <Onesocial link={profileInfo?.socialLinks?.twitter} img={fb} />
                        <Onesocial link={profileInfo?.socialLinks?.twitter} img={pintest} />
                        <Onesocial link={profileInfo?.socialLinks?.twitter} img={linked} />
                        <Onesocial link={profileInfo?.socialLinks?.twitter} img={youtube} />
                        <Onesocial link={profileInfo?.socialLinks?.twitter} img={twit} />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile-information-status-right">
                <div className="row">
                  <div className="col-sm-7">
                    <div className="profile-pdf-download">
                      <img src={pdf} /> <span>Raj patel_resume.pdf</span>
                      <a className="btn btn-info">
                        Download
                      </a>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="profile-company">
                      <p className="mb-0 job-title">
                        {profileInfo?.workExperience?.[0]?.companyName}
                      </p>
                      <p className="job-type">{profileInfo?.workExperience?.[0]?.title}</p>
                      <p className="city ">
                        <strong>{profileInfo?.workExperience?.[0]?.location}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-page-columns mt-3">
              <div className="profile-information-status-left">
                <CurrentStatus />
              </div>
              <div className="profile-information-status-right">
                <div className="profile-box-column">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="box-color" style={{ background: "#C8DEFF" }}></div>
                    </div>
                    <div className="col-sm-4">
                      <div className="box-color" style={{ background: "#DEF3C1" }}></div>
                    </div>
                    <div className="col-sm-4">
                      <div className="box-color" style={{ background: "#FBD0C1" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <About description={profileInfo?.about} />
            <div className="py-3 d-flex justify-content-between pe-4 card-bg profile-bg-blue">
              <div className="complete-profile">
                <h5 className="lg-title">Complete Your Profile</h5>
                <ProgressBar>
                  <ProgressBar variant="success" now={35} key={1} />
                  <ProgressBar variant="warning" now={20} key={2} />
                  <ProgressBar variant="danger" now={10} key={3} />
                </ProgressBar>
                <p className="text-center">65%</p>
                <div className="edit-pro">
                  <img className="edit-icon" src={editIcon} />
                </div>
              </div>
            </div>
          </div>
          <Experience
            info={profileInfo?.workExperience}
            currentInfo={currentInfo}
            setCurrentInfo={setCurrentInfo}
            isShowExperienceModal={isShowExperienceModal}
            setIsShowExperienceModal={setIsShowExperienceModal}
          />
          <Education
            info={profileInfo?.education}
            isShowEducationModal={isShowEducationModal}
            setIsShowEducationModal={setIsShowEducationModal}
          />
          <Projects />
          <Skills />
          <Recommendations />
        </div>
        <div className="row-profile-right">
          <div className="white-box">
            <h3 className="page-head">Active Positions</h3>
            <img src={iconplus} className="edit-add" />
            <ul className="list">
              <li>
                <div className="profile-card-row">
                  <div className="profile-card-left">
                    <div className="color-info"></div>
                    <h6>Front-end developer</h6>
                    <p>ABC PVT LTD (Intership)</p>
                  </div>
                  <div className="profile-card-right">
                    <a href="" className="btn btn-info-colors">
                      Invited
                    </a>
                  </div>
                </div>
              </li>
              <li class="active">
                <div className="profile-card-row orange">
                  <div className="profile-card-left">
                    <div className="color-info"></div>
                    <h6>
                      Web developer-<span>Student</span>
                    </h6>
                    <p>ABC PVT LTD (Intership)</p>
                  </div>
                  <div className="profile-card-right">
                    <a href="" className="btn btn-info-colors">
                      Invited
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="button-custom">
              <a href="" className="btn btn-lg btn-show-all">
                Show All
              </a>
            </div>
          </div>
          <div className="white-box">
            <h3 className="page-head">Latest updates</h3>
            <img src={iconplus} className="edit-add" />
            <div className="white-box-list updates mt-4">
              <ul>
                <li>
                  <div className="row">
                    <div className="col-2">
                      <img src={profile} className="img-fluid" />
                    </div>
                    <div className="col-10">
                      <h4>Heena posted an update</h4>
                      <p>4 days ago</p>
                    </div>
                  </div>
                </li>
                <li className="active">
                  <div className="row">
                    <div className="col-2">
                      <img src={profile} className="img-fluid" />
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
                      <img src={profile} className="img-fluid" />
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
                      <img src={profile} className="img-fluid" />
                    </div>
                    <div className="col-10">
                      <h4>Heena posted an update</h4>
                      <p>4 days ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="see-all">
              <a href="">See All</a>
            </div>
          </div>
          <div className="white-box">
            <h3 className="page-head">Community Groups</h3>
            <img src={iconplus} className="edit-add" />
            <div className="white-box-list mt-4">
              <ul>
                <li>
                  <div className="row-box">
                    <div className="col-box">
                      <span style={{ background: "#154F56" }}> </span>
                    </div>

                    <div className="col-box-content">
                      <h4>Development Community</h4>
                      <p>112K Members</p>
                    </div>
                  </div>
                </li>
                <li className="active">
                  <div className="row-box">
                    <div className="col-box">
                      <span style={{ background: "#360267" }}> </span>
                    </div>

                    <div className="col-box-content">
                      <h4>SEO Helpline 24/7</h4>
                      <p>78K Members</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row-box">
                    <div className="col-box">
                      <span style={{ background: "#021133" }}> </span>
                    </div>
                    <div className="col-box-content">
                      <h4>Digital Marketing</h4>
                      <p>112K Members</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row-box">
                    <div className="col-box">
                      <span style={{ background: "#00339B" }}> </span>
                    </div>
                    <div className="col-box-content">
                      <h4>Future scope - AI</h4>
                      <p>21K Members</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="see-all">
              <a href="">See All</a>
            </div>
          </div>
          <div className="white-box">
            <h3 className="page-head">Active Connections</h3>
            <div className="white-active-connections mt-4">
              <a href="" className="img-conncetion">
                <img src={ProfilePic} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic2} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic3} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic2} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic3} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic2} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic3} className="edit-pc-img" />
              </a>
              <a href="" className="img-conncetion">
                <img src={ProfilePic} className="edit-pc-img" />
              </a>
            </div>
            <div className="see-all">
              <a href="">See All</a>
            </div>
          </div>
        </div>

        {/* modals  */}
        <GeneralProfileModal
          info={profileInfo}
          isShowIntroductionModal={isShowIntroductionModal}
          setIsShowIntroductionModal={setIsShowIntroductionModal} />
        <WorkExperienceModal
          isShowExperienceModal={isShowExperienceModal}
          setIsShowExperienceModal={setIsShowExperienceModal}
          currentInfo={currentInfo}
          setCurrentInfo={setCurrentInfo}
        />
        <EducationModal
          isShowEducationModal={isShowEducationModal}
          setIsShowEducationModal={setIsShowEducationModal}
        />

      </div>
    </div>
  )
}

export default Profile