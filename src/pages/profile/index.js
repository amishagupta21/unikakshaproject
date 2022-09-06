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

import SideBar from "../sidebar"
import Header from "../header"
import Dropdown from "react-bootstrap/Dropdown"
import { addUserIntroduction, getuserProfile } from "../../redux/actions/UserActions"
import { useDispatch, useSelector } from "react-redux"
import Onesocial from "../../components/profile/socialmedia/Onesocial"
import { Form, Formik } from "formik"
import SchemaList from "./../../Shared-Component-formik/schema/SchemaList"
import FormikController from "./../../Shared-Component-formik/FormikController"

const Profile = () => {
  let test = "helo"
  const dispatch = useDispatch()
  const profileInfo = useSelector((state) => state?.users?.profile)
  console.log("profile Data ::: ", profileInfo)

  const [profileImg, setProfileImg] = useState("")
  const [bannerImg, setbannerImg] = useState("")
  const [isShowIntroductionModal, setIsShowIntroductionModal] = useState(false)
  const [isShowExperienceModal, setIsShowExperienceModal] = useState(false)

  useEffect(() => {
    let id = "A8DYxHJJN3ap9Zj06ZbrqHKTEv73"
    dispatch(getuserProfile(id))
  }, [])

  const IntroductionInitialValues = {
    firstName: "",
    lastName: "",
    profileHeadline: "",
    about: "",
    resume: "",
    bannerPicture: "",
    profilePicture: "",
    linkedin: "",
    instagram: "",
    twitter: ""
  }
  const experienceInitialValues = {
    title: "",
    employmentType: "",
    companyName: "",
    location: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: ""
  }

  let validationSchema = Yup.object({
    firstName: SchemaList[0].required("First name is a required field"),
    lastName: SchemaList[0].required("Last name is a required field"),
    profileHeadline: SchemaList[0].required("Profile headline is a required field"),
    about: SchemaList[0].required("About is a required field"),
  })

  const addIntroduction = async (values) => {
    console.log("Introduction>>>> ::", values)
    setIsShowIntroductionModal(false)
    let ans = {
      uid: "A8DYxHJJN3ap9Zj06ZbrqHKTdsk",
      firstName: values.firstName,
      lastName: values.lastName,
      profileHeadline: values.profileHeadline,
      about: values.about,
      socialLinks: {
        facebook: values.linkedin,
        youtube: values.youtube,
        twitter: values.twitter,
      }
    }
    dispatch(addUserIntroduction(ans));
    profileImg && setProfileImg("")
    bannerImg && setbannerImg("")
  }
  const addExperience = (values) => {
    console.log("Exp values::", values);
  }

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
            <h2 className="profile-heading">MY Profile</h2>
            <button className="btn btn-info" onClick={() => setIsShowIntroductionModal(true)}>Add Introduction</button>
            <Modal
              size="lg"
               className="add-popup"
              show={isShowIntroductionModal}
              onHide={() => setIsShowIntroductionModal(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Add Introduction</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={IntroductionInitialValues}
                  validationSchema={validationSchema}
                  onSubmit={addIntroduction}
                >
                  {(formik) => {
                    return (
                      <Form onSubmit={formik.handleSubmit} className="form" autoComplete="false">
                        <div
                          className="d-flex row me-n7 pe-7"
                          // className="d-flex row scroll-y me-n7 pe-7"
                          id="kt_modal_add_user_scroll"
                          data-kt-scroll="true"
                          data-kt-scroll-activate="{default: false, lg: true}"
                          // data-kt-scroll-max-height="auto"
                          data-kt-scroll-dependencies="#kt_modal_add_user_header"
                          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
                        // data-kt-scroll-offset="300px"
                        >
                          <div className="col-6">
                          <div className="form-group">
                            <FormikController
                              control="input"
                              type="text"
                              label="First Name"
                              labelClassName="required fs-6 mb-2"
                              name="firstName"
                              className="form-control form-control-solid mb-lg-0"
                              maxLength="25"
                              formik={formik}
                              value={formik.values.firstName}
                              onChange={formik.handleChange}
                              error={formik.errors.firstName}
                            />
                            </div>
                            <div className="form-group">
                            <FormikController
                              control="input"
                              type="text"
                              label="Last Name"
                              labelClassName="required fs-6 mb-2"
                              name="lastName"
                              className="form-control form-control-solid mb-lg-0"
                              maxLength="25"
                              formik={formik}
                              value={formik.values.lastName}
                              onChange={formik.handleChange}
                              error={formik.errors.lastName}
                            /></div>
                              <div className="form-group">
                            <FormikController
                              control="input"
                              type="text"
                              label="Profile Headline"
                              labelClassName="required fs-6 mb-2"
                              name="profileHeadline"
                              className="form-control form-control-solid mb-lg-0"
                              maxLength="25"
                              formik={formik}
                              value={formik.values.profileHeadline}
                              onChange={formik.handleChange}
                              error={formik.errors.profileHeadline}
                            /></div>
                            <div className="form-froup form-upload-resume">
                              <label htmlFor="resume" name="resume">
                                <label className="required fs-6 mb-2">Select Resume</label>
                                <br />
                                <span className="uploaded-form">
                                  <input
                                    // hidden
                                    id="resume"
                                    labelClassName="required fs-6 mb-2"
                                    type="file"
                                    // accept="image/*"
                                    className="form-control form-control-solid mb-lg-0"
                                    onClick={() => formik.setFieldTouched("resume", true)}
                                    onChange={(event) => {
                                      formik.setFieldValue("resume", event.target.files[0])
                                    }}
                                  />
                                  <div className="browse-link">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="38" viewBox="0 0 46 38" fill="none">
<path d="M23.321 16.0948C23.2828 16.0445 23.2339 16.0038 23.1781 15.9759C23.1224 15.9479 23.0611 15.9333 22.9991 15.9333C22.937 15.9333 22.8758 15.9479 22.82 15.9759C22.7642 16.0038 22.7153 16.0445 22.6771 16.0948L16.953 23.549C16.9058 23.611 16.8765 23.6855 16.8685 23.7638C16.8604 23.8422 16.874 23.9213 16.9076 23.992C16.9412 24.0628 16.9934 24.1225 17.0584 24.1641C17.1234 24.2058 17.1984 24.2278 17.2749 24.2276H21.0518V36.9792C21.0518 37.2106 21.2358 37.4 21.4607 37.4H24.5272C24.7521 37.4 24.9361 37.2106 24.9361 36.9792V24.2329H28.7232C29.0656 24.2329 29.2547 23.8278 29.0452 23.5543L23.321 16.0948Z" fill="white"/>
<path d="M38.371 11.4289C36.0196 5.1003 30.0283 0.600098 23.0103 0.600098C15.9922 0.600098 10.0009 5.09506 7.64955 11.4236C3.24978 12.6024 0 16.694 0 21.5557C0 27.3446 4.59487 32.0334 10.2627 32.0334H12.3214C12.5473 32.0334 12.7321 31.8448 12.7321 31.6143V28.471C12.7321 28.2405 12.5473 28.0519 12.3214 28.0519H10.2627C8.53259 28.0519 6.90513 27.3499 5.69353 26.0768C4.48705 24.809 3.84531 23.1011 3.90179 21.3304C3.94799 19.9473 4.41004 18.6481 5.24687 17.5531C6.10424 16.4373 7.30558 15.6252 8.6404 15.2637L10.5862 14.7451L11.2998 12.8277C11.7413 11.6332 12.3574 10.5173 13.1326 9.50621C13.8979 8.50405 14.8045 7.62309 15.8228 6.892C17.9328 5.37796 20.4176 4.57641 23.0103 4.57641C25.6029 4.57641 28.0877 5.37796 30.1978 6.892C31.2194 7.62545 32.123 8.50558 32.8879 9.50621C33.6632 10.5173 34.2792 11.6384 34.7208 12.8277L35.4292 14.7399L37.3699 15.2637C40.1525 16.0286 42.0982 18.6114 42.0982 21.5557C42.0982 23.2897 41.4359 24.9243 40.2346 26.1502C39.6455 26.7549 38.9446 27.2343 38.1726 27.5608C37.4007 27.8872 36.5729 28.0541 35.7373 28.0519H33.6786C33.4527 28.0519 33.2679 28.2405 33.2679 28.471V31.6143C33.2679 31.8448 33.4527 32.0334 33.6786 32.0334H35.7373C41.4051 32.0334 46 27.3446 46 21.5557C46 16.6992 42.7605 12.6129 38.371 11.4289Z" fill="white"/>
</svg><i>Upload Resume</i>
                                  </div>
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            {/* <FormikController
                              control="image"
                              label="Profile image"
                               imgIconClassName="h-auto"
                              labelClassName="required fs-6 mb-2"
                              name="profilePicture"
                              // className="form-control form-control-solid mb-lg-0"
                              img={profileImg}
                              setImg={setProfileImg}
                               imgIcon={twit}
                              // editFlag={location?.state?.edit}
                              // editPath={location?.state?.editObj?.profilePicture}
                              formik={formik}
                              value={formik.values.profilePicture}
                              onChange={formik.handleChange}
                              error={formik.errors.profilePicture}
                            /> */}
                             <div className="form-froup form-upload-banner">
                            <FormikController
                              control="image"
                             
                              labelClassName="required fs-6 mb-2"
                              name="bannerPicture"
                              imgIconClassName="h-auto"
                              // className="form-control form-control-solid mb-lg-0"
                              img={bannerImg}
                              imgIcon={banner}
                              setImg={setbannerImg}
                              // editFlag={location?.state?.edit}
                              // editPath={location?.state?.editObj?.bannerPicture}
                              formik={formik}
                              value={formik.values.bannerPicture}
                              onChange={formik.handleChange}
                              error={formik.errors.bannerPicture}
                            /></div>
                             <div className="form-froup  form-social">
                              <FormikController
                                control="input"
                                type="text"
                                label="Social Links"
                                placeholder="Enter Linkdin id"
                                labelClassName="required fs-6 mb-2"
                                name="linkedin"
                                className="form-control form-control-solid mb-lg-0"
                                maxLength="25"
                                
                                formik={formik}
                                value={formik.values.linkedin}
                                onChange={formik.handleChange}
                                error={formik.errors.linkedin}
                              /> <img src={linked}  className="icons-assets"/></div>
                                <div className="form-froup form-social">
                              <FormikController
                                control="input"
                                type="text"
                                placeholder="Enter Instagram id"
                                labelClassName="required fs-6 mb-2"
                                name="instagram"
                                className="form-control form-control-solid mb-lg-0 my-2"
                                maxLength="25"
                                formik={formik}
                                value={formik.values.instagram}
                                onChange={formik.handleChange}
                                error={formik.errors.instagram}
                              /><img src={linked}  className="icons-assets"/></div>
                               <div className="form-froup form-social">
                              <FormikController
                                control="input"
                                type="text"
                                placeholder="Enter Twitter id"
                                labelClassName="required fs-6 mb-2"
                                name="twitter"
                                className="form-control form-control-solid mb-lg-0 my-2"
                                maxLength="25"
                                formik={formik}
                                value={formik.values.twitter}
                                onChange={formik.handleChange}
                                error={formik.errors.twitter}
                              /><img src={linked}  className="icons-assets"/>
                            </div>
                          </div>
                          <div className="col-12">
                            <FormikController
                              control="input"
                              type="text"
                              label="About"
                              placeholder="Tell us about your self"
                              labelClassName="required fs-6 mb-2"
                              name="about"
                              className="form-control form-control-solid mb-lg-4 pb-5 "
                              maxLength="25"
                              formik={formik}
                              value={formik.values.about}
                              onChange={formik.handleChange}
                              error={formik.errors.about}
                            />
                          </div>
                        </div>
                        <Modal.Footer>
                          <button onClick={() => setIsShowIntroductionModal(false)}>Cancel</button>
                          <button type="submit">Save</button>
                        </Modal.Footer>
                      </Form>
                    )
                  }}
                </Formik>
              </Modal.Body>
            </Modal>
            <Modal
              size="lg"
              show={isShowExperienceModal}
              onHide={() => setIsShowExperienceModal(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">Add Experience</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={experienceInitialValues}
                  validationSchema={validationSchema}
                  onSubmit={addExperience}
                >
                  {(formik) => {
                    return (
                      <Form onSubmit={formik.handleSubmit} className="form" autoComplete="false">
                        <div
                          className="d-flex row me-n7 pe-7"
                          // className="d-flex row scroll-y me-n7 pe-7"
                          id="kt_modal_add_user_scroll"
                          data-kt-scroll="true"
                          data-kt-scroll-activate="{default: false, lg: true}"
                          // data-kt-scroll-max-height="auto"
                          data-kt-scroll-dependencies="#kt_modal_add_user_header"
                          data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
                        // data-kt-scroll-offset="300px"
                        >
                          <div className="col-12">
                            <FormikController
                              control="input"
                              type="text"
                              label="Title"
                              labelClassName="required fs-6 mb-2"
                              name="firstName"
                              className="form-control form-control-solid mb-lg-0"
                              maxLength="25"
                              formik={formik}
                              value={formik.values.firstName}
                              onChange={formik.handleChange}
                              error={formik.errors.firstName}
                            />
                          </div>
                        </div>
                        <Modal.Footer>
                          <button onClick={() => setIsShowExperienceModal(false)}>Cancel</button>
                          <button type="submit">Save</button>
                        </Modal.Footer>
                      </Form>
                    )
                  }}
                </Formik>
              </Modal.Body>
            </Modal>
            <div className="profile-box">
              <div className="profile-background">
                <img src={editIcon} />
              </div>
              <div className="profile-page-columns">
                <div className="profile-information-status-left">
                  <div className="profile-info-details">
                    <div className="profile-picture">
                      <img src={ProfilePic} alt="profile picture" />
                    </div>
                    <div className="profile-name">
                      <h3>{profileInfo?.firstName}</h3>
                      <p>{profileInfo?.profileHeadline}</p>
                      <div className="profile-share">
                        <ul>
                          <Onesocial link={profileInfo?.socialLinks?.facebook} img={fb} />
                          <Onesocial link={profileInfo?.socialLinks?.facebook} img={pintest} />
                          <Onesocial link={profileInfo?.socialLinks?.facebook} img={linked} />
                          <Onesocial link={profileInfo?.socialLinks?.youtube} img={youtube} />
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
                        <a href="" className="btn btn-info">
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
                  <div className="current-status">
                    <label>Current Status</label>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Activily looking for Job
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
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
                    <img src={editIcon} />
                  </div>
                </div>
              </div>
            </div>
            <Experience
              info={profileInfo?.workExperience}
              Test={test}
              setIsShowExperienceModal
            />
            <Education info={profileInfo?.education} />
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
                        Web developer-<span>Student</span>{" "}
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
              </div>{" "}
              <div className="see-all">
                <a href="">See All</a>
              </div>
            </div>

            <div className="white-box">
              <h3 className="page-head">Active Connections</h3>

              <div className="white-active-connections mt-4">
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic2} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic3} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic2} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic3} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic2} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic3} className="edit-pc-img" />
                </a>
                <a href="" className="img-conncetion">
                  {" "}
                  <img src={ProfilePic} className="edit-pc-img" />
                </a>
              </div>
              <div className="see-all">
                <a href="">See All</a>
              </div>
            </div>
          </div>
        </div>
      </div> </div>
    </div >
  )
}

export default Profile