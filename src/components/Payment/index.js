import React, { useState } from 'react';
import style from './index.css';
import Hybrid from '../../assets/images/images/Hybrid-1.svg';
import ISa from '../../assets/images/images/ISa.svg';

import Pay12 from '../../assets/images/images/Pay12.svg';

import selfIcon from '../../assets/images/images/self-icon10.svg';

import icon1 from '../../assets/images/images/icon/icon-1.svg';
import icon2 from '../../assets/images/images/icon/icon-2.svg';
import icon3 from '../../assets/images/images/icon/icon-3.svg';
import icon4 from '../../assets/images/images/icon/icon-4.svg';
import icon5 from '../../assets/images/images/icon/icon-5.svg';
import icon6 from '../../assets/images/images/icon/icon-6.svg';
import icon7 from '../../assets/images/images/icon/icon-7.svg';
import icon8 from '../../assets/images/images/icon/icon-8.svg';
import icon9 from '../../assets/images/images/icon/icon-9.svg';
import icon10 from '../../assets/images/images/icon/icon-10.svg';
import icon11 from '../../assets/images/images/icon/icon-11.svg';
import icon12 from '../../assets/images/images/icon/icon-12.svg';
import icon13 from '../../assets/images/images/icon/icon-13.svg';
import icon14 from '../../assets/images/images/icon/icon-14.svg';
import icon15 from '../../assets/images/images/icon/icon-15.svg';
import icon16 from '../../assets/images/images/icon/icon-16.svg';
import icon17 from '../../assets/images/images/icon/icon-17.svg';
import icon18 from '../../assets/images/images/icon/icon-18.svg';
import icon19 from '../../assets/images/images/icon/icon-19.svg';
import icon20 from '../../assets/images/images/icon/icon-20.svg';
import icon21 from '../../assets/images/images/icon/icon-21.svg';
import icon22 from '../../assets/images/images/icon/icon-22.svg';
import icon23 from '../../assets/images/images/icon/icon-23.svg';
import icon24 from '../../assets/images/images/icon/icon-24.svg';
import PaymentPopup from '../../pages/courses/application/PaymentPopup';
import PaymentPopupAutonomy from '../../pages/courses/application/PaymentPopupAutonomy';
import PaymentPopupSynergy from '../../pages/courses/application/PaymentPopupSynergy';
import CustomPayment from '../../pages/courses/application/CustomPayment';
import IndustryReadyPaymentProgram from '../../pages/courses/application/IndustryReadyPaymentProgram';
import JobReadyPaymentProgram from '../../pages/courses/application/JobReadyPayment';

const Payment = ({
  nextPage,
  application,
  setOrderData,
  courseId,
  selectedBatch,
  orderData,
  setSelectedBatch,
  setWorldLineStatus,
  worldLineStatus,
  nextPageNumber,
  id,
  setPaymentMethod,
  courseTitle,
}) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isPymentAutonomy, setIsPymentAutonomy] = useState(false);
  const [isPymentSynergy, setIsPymentSynergy] = useState(false);
  const [isPymentIndustryReadyProgram, setPymentIndustryReadyProgram] = useState(false);
  const [isPymentJobReadyProgram, setPymentJobReadyProgram] = useState(false);
  const [customPayment, setCustomPayment] = useState(false);

  const toggleCustomPayment = () => {
    setCustomPayment(!customPayment);
  };

  const openPaymentModalAutonomy = () => {
    setIsPymentAutonomy(!isPymentAutonomy);
  };

  const openPaymentModal = () => {
    setIsPaymentOpen(!isPaymentOpen);
  };
  const openPaymentSynergy = () => {
    setIsPymentSynergy(!isPymentSynergy);
  };
  const openPaymentIndustryReady = () => {
    setPymentIndustryReadyProgram(!isPymentIndustryReadyProgram);
  };
  const openPaymentJobReady = () => {
    setPymentJobReadyProgram(!isPymentJobReadyProgram);
  };
  return (
    <div className="container">
      <div className="row">
        {courseTitle === 'Industry Ready Program' ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mx-auto">
                <div className="pricing-sec organge-sec">
                  <div className="pricing-sec-white">
                    <div className="pricing-heading">
                      <div>
                        <div className="icon">
                          <img src={selfIcon} />
                        </div>
                      </div>
                      <div className="title">Industry Ready Program</div>
                    </div>
                    <div className="title-h">
                      <h2 className="heading-title">
                        Learn at your own pace with our comprehensive self-learning resources
                      </h2>
                    </div>
                    <div className="title-text-sec">
                      <div className="row">
                        <div className="col-md-6">
                          <ul>
                            <li>
                              <span className="font-icon">
                                <img src={icon13} />
                              </span>
                              Practical Simulations
                            </li>
                            <li>
                              <span classNjy2uz6bzawblw4r4hevxll7r5gqpbaftzvi2anmvoh2shhjsvw2aame="font-icon">
                                <img src={icon14} />
                              </span>
                              Expert Mentorship
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon15} />
                              </span>
                              Career Readiness
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon16} />
                              </span>
                              Internship Certification
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon17} />
                              </span>
                              Cloud & Node.js
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul>
                            <li>
                              <span className="font-icon">
                                <img src={icon13} />
                              </span>
                              Hands-On Tech Experience
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon14} />
                              </span>
                              In-Demand Skill Development
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon15} />
                              </span>
                              Collaboration & Networking
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon16} />
                              </span>
                              Paid/Unpaid Internship Options
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon17} />
                              </span>
                              Soft Skills Training
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="text-center"><a href="#" className="show-all">Show All</a></div> */}
                    <div>
                      <h4 className="pay-heading">
                        <span
                          style={{ textDecoration: 'line-through' }}
                          className="left_span strike">
                          ₹20,000
                        </span>
                        <span style={{ color: '#EF6A28' }} className="span_bold">
                          ₹15,000
                        </span>
                        <br></br>
                        (incl of GST & Registration Fees)
                      </h4>
                    </div>
                    <div className="income-btn">
                      <h6></h6>
                    </div>
                    <div className="btn-sec">
                      <a href="#" className="btn-orange" onClick={openPaymentIndustryReady}>
                        Enroll Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : // </div>
        courseTitle === 'Job Ready Program' ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mx-auto">
                <div className="pricing-sec organge-sec">
                  <div className="pricing-sec-white">
                    <div className="pricing-heading">
                      <div>
                        <div className="icon">
                          <img src={selfIcon} />
                        </div>
                      </div>
                      <div className="title">Job Ready Program</div>
                    </div>
                    <div className="title-h">
                      <h2 className="heading-title">
                        Learn at your own pace with our comprehensive self-learning resources
                      </h2>
                    </div>
                    <div className="title-text-sec">
                      <div className="row">
                        <div className="col-md-6">
                          <ul>
                            <li>
                              <span className="font-icon">
                                <img src={icon13} />
                              </span>
                              100% Job Guarantee
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon14} />
                              </span>
                              Realistic Mock Interviews
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon15} />
                              </span>
                              Compelling Resume Building
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon16} />
                              </span>
                              Social/Career Profile Building
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon17} />
                              </span>
                              GitHub Profile Building
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <ul>
                            <li>
                              <span className="font-icon">
                                <img src={icon13} />
                              </span>
                              Freelance Opportunities
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon14} />
                              </span>
                              Expert Mentorship
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon15} />
                              </span>
                              Personalized Career Guidance
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon16} />
                              </span>
                              Personality Development Training
                            </li>
                            <li>
                              <span className="font-icon">
                                <img src={icon17} />
                              </span>
                              Soft Skills Training
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="pay-heading">
                        <span
                          style={{ textDecoration: 'line-through' }}
                          className="left_span strike">
                          ₹10,000
                        </span>
                        <span style={{ color: '#EF6A28' }} className="span_bold">
                          ₹7500
                        </span>
                        <br></br>
                        (incl of GST & Registration Fees)
                      </h4>
                    </div>
                    <div className="income-btn">
                      <h6>
                        <span className="tooltip-prices-new">+ Income Sharing Agreement</span>
                      </h6>
                    </div>
                    <div className="btn-sec">
                      <a href="#" className="btn-orange" onClick={openPaymentJobReady}>
                        Enroll Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="col-lg-4">
              <div className="pricing-sec">
                <div className="pricing-sec-white">
                  <div className="pricing-heading">
                    <div>
                      <div className="icon">
                        <img src={Hybrid} />
                      </div>
                    </div>
                    <div className="title">ASPIRE </div>
                  </div>
                  <div className="title-h">
                    <h2 className="heading-title">
                      Pay-after-Placement option with potential career benefits
                    </h2>
                  </div>
                  <div className="title-text-sec">
                    <ul>
                      <li>
                        <span className="font-icon">
                          <img src={icon1} />
                        </span>
                        100% Live Classes
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon2} />
                        </span>
                        Job Assurance
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon3} />
                        </span>
                        15+ Job Opportunities
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon4} />
                        </span>
                        Scholarships Upto 20%
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon5} />
                        </span>
                        FREE Skillbuilding Courses
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon6} />
                        </span>
                        24*7 Doubt Clearing Sessions
                      </li>
                    </ul>
                  </div>
                  {/* <div className="text-center"><a href="#" className="show-all">Show All</a></div> */}
                  <div>
                    <h4 className="pay-heading">
                      <span style={{ color: '#EF6A28' }} className="left_span">
                        Only Pay{' '}
                      </span>
                      <span style={{ color: '#EF6A28' }} className="span_bold">
                        ₹5,000{' '}
                      </span>
                      <br></br>
                      Registration Fees Now
                    </h4>
                  </div>
                  <p className="small-text">
                    Pay your course fee ONLY when you land a job (Capped at ₹3,00,000)
                  </p>
                  <div className="btn-sec">
                    <a href="#" className="btn-orange" onClick={openPaymentModal}>
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-sec organge-sec">
                <div className="pricing-sec-white">
                  <div className="pricing-heading">
                    <div>
                      <div className="icon">
                        <img src={Pay12} />
                      </div>
                    </div>
                    <div className="title current">SYNERGY </div>
                  </div>
                  <div className="title-h">
                    <h2 className="heading-title">
                      The best of both worlds -flexible learning & career support
                    </h2>
                  </div>
                  <div className="title-text-sec">
                    <ul>
                      <li>
                        <span className="font-icon">
                          <img src={icon13} />
                        </span>
                        Guaranteed Industry Orientation Program with Internship
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon14} />
                        </span>
                        Lifetime Course Access
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon15} />
                        </span>
                        15+ Job Opportunities
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon16} />
                        </span>
                        FREE Skillbuilding Courses
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon17} />
                        </span>
                        Lifetime Career Services
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon18} />
                        </span>
                        Industry Expert Sessions
                      </li>
                    </ul>
                  </div>
                  {/* <div className="text-center"><a href="#" className="show-all">Show All</a></div> */}
                  <div>
                    <h4 className="pay-heading">
                      <span style={{ textDecoration: 'line-through' }} className="left_span strike">
                        ₹75,000
                      </span>
                      <span style={{ color: '#EF6A28' }} className="span_bold">
                        ₹50,000
                      </span>
                      <br></br>
                      (incl of GST & Registration Fees)
                    </h4>
                  </div>
                  <div className="income-btn">
                    <h6>
                      <span className="tooltip-prices-new">+ Income Sharing Agreement</span>
                    </h6>
                  </div>
                  <div className="btn-sec">
                    <a href="#" className="btn-orange" onClick={openPaymentSynergy}>
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-sec lightblue-sec">
                <div className="pricing-sec-white">
                  <div className="pricing-heading">
                    <div>
                      <div className="icon">
                        <img src={selfIcon} />
                      </div>
                    </div>
                    <div className="title">AUTONOMY </div>
                  </div>
                  <div className="title-h">
                    <h2 className="heading-title">
                      Learn at your own pace with our comprehensive self-learning resources
                    </h2>
                  </div>
                  <div className="title-text-sec">
                    <ul>
                      <li>
                        <span className="font-icon">
                          <img src={icon19} />
                        </span>
                        Internship Based on Evaluation
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon20} />
                        </span>
                        Lifetime Course Access
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon21} />
                        </span>
                        24*7 Doubt Clearing Sessions
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon22} />
                        </span>
                        FREE Skillbuilding Courses
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon23} />
                        </span>
                        Regular Assessments
                      </li>
                      <li>
                        <span className="font-icon">
                          <img src={icon24} />
                        </span>
                        Certificate of Training
                      </li>
                    </ul>
                  </div>
                  {/* <div className="text-center"><a href="#" className="show-all">Show All</a></div> */}
                  <div>
                    <h4 className="pay-heading">
                      <span style={{ textDecoration: 'line-through' }} className="left_span strike">
                        ₹15,000
                      </span>
                      <span style={{ color: '#EF6A28' }} className="span_bold">
                        {' '}
                        ₹10,000{' '}
                      </span>
                      <br></br>
                      (incl of GST & Registration Fees)
                    </h4>
                  </div>
                  <div className="income-btn">
                    <h6>
                      <span className="tooltip-prices-new">+ Income Sharing Agreement</span>
                    </h6>
                  </div>
                  <div className="btn-sec">
                    <a href="#" className="btn-orange" onClick={openPaymentModalAutonomy}>
                      Enroll Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="btn-sec">
          <button onClick={toggleCustomPayment} className="btn-orange">
            Custom Payment
          </button>
        </div>
        {customPayment && (
          <CustomPayment
            setOrderData={setOrderData}
            application={application}
            setopenpayment={toggleCustomPayment}
            nextPage={nextPage}
            courseId={courseId}
            setPaymentMethod={setPaymentMethod}
            setCustomPayment={setCustomPayment}
            selectedBatch={selectedBatch}
            orderData={orderData}
            setSelectedBatch={setSelectedBatch}
            id={id}
            courseTitle={courseTitle}
          />
        )}
        {isPaymentOpen && (
          <PaymentPopup
            nextPage={nextPage}
            setOrderData={setOrderData}
            application={application}
            courseId={courseId}
            id={id}
            selectedBatch={selectedBatch}
            orderData={orderData}
            setWorldLineStatus={setWorldLineStatus}
            setopenpayment={openPaymentModal}
            worldLineStatus={worldLineStatus}
            setSelectedBatch={setSelectedBatch}
            setPaymentMethod={setPaymentMethod}
            courseTitle={courseTitle}
          />
        )}
        {isPymentAutonomy && (
          <PaymentPopupAutonomy
            nextPage={nextPage}
            setOrderData={setOrderData}
            application={application}
            courseId={courseId}
            id={id}
            selectedBatch={selectedBatch}
            orderData={orderData}
            setWorldLineStatus={setWorldLineStatus}
            setopenpayment={openPaymentModalAutonomy}
            worldLineStatus={worldLineStatus}
            setSelectedBatch={setSelectedBatch}
            setPaymentMethod={setPaymentMethod}
            courseTitle={courseTitle}
          />
        )}
        {isPymentSynergy && (
          <PaymentPopupSynergy
            nextPage={nextPage}
            setOrderData={setOrderData}
            application={application}
            courseId={courseId}
            id={id}
            selectedBatch={selectedBatch}
            orderData={orderData}
            setWorldLineStatus={setWorldLineStatus}
            setopenpayment={openPaymentSynergy}
            worldLineStatus={worldLineStatus}
            setSelectedBatch={setSelectedBatch}
            setPaymentMethod={setPaymentMethod}
            courseTitle={courseTitle}
          />
        )}
        {isPymentIndustryReadyProgram && (
          <IndustryReadyPaymentProgram
            nextPage={nextPage}
            setOrderData={setOrderData}
            application={application}
            courseId={courseId}
            id={id}
            selectedBatch={selectedBatch}
            orderData={orderData}
            setWorldLineStatus={setWorldLineStatus}
            setopenpayment={openPaymentIndustryReady}
            worldLineStatus={worldLineStatus}
            setSelectedBatch={setSelectedBatch}
            setPaymentMethod={setPaymentMethod}
            courseTitle={courseTitle}
          />
        )}
        {isPymentJobReadyProgram && (
          <JobReadyPaymentProgram
            nextPage={nextPage}
            setOrderData={setOrderData}
            application={application}
            courseId={courseId}
            id={id}
            selectedBatch={selectedBatch}
            orderData={orderData}
            setWorldLineStatus={setWorldLineStatus}
            setopenpayment={openPaymentJobReady}
            worldLineStatus={worldLineStatus}
            setSelectedBatch={setSelectedBatch}
            setPaymentMethod={setPaymentMethod}
            courseTitle={courseTitle}
          />
        )}
      </div>
    </div>
  );
};

export default Payment;
