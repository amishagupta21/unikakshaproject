import React, { useState } from 'react'
import style from "./index.css"
import Hybrid from "../../assets/images/images/Hybrid-1.svg"
import ISa from "../../assets/images/images/ISa.svg"

import Pay12 from "../../assets/images/images/Pay12.svg"

import selfIcon from "../../assets/images/images/self-icon10.svg"

import icon1 from "../../assets/images/images/icon/icon-1.svg"
import icon2 from "../../assets/images/images/icon/icon-2.svg"
import icon3 from "../../assets/images/images/icon/icon-3.svg"
import icon4 from "../../assets/images/images/icon/icon-4.svg"
import icon5 from "../../assets/images/images/icon/icon-5.svg"
import icon6 from "../../assets/images/images/icon/icon-6.svg"
import icon7 from "../../assets/images/images/icon/icon-7.svg"
import icon8 from "../../assets/images/images/icon/icon-8.svg"
import icon9 from "../../assets/images/images/icon/icon-9.svg"
import icon10 from "../../assets/images/images/icon/icon-10.svg"
import icon11 from "../../assets/images/images/icon/icon-11.svg"
import icon12 from "../../assets/images/images/icon/icon-12.svg"
import icon13 from "../../assets/images/images/icon/icon-13.svg"
import icon14 from "../../assets/images/images/icon/icon-14.svg"
import icon15 from "../../assets/images/images/icon/icon-15.svg"
import icon16 from "../../assets/images/images/icon/icon-16.svg"
import icon17 from "../../assets/images/images/icon/icon-17.svg"
import icon18 from "../../assets/images/images/icon/icon-18.svg"
import icon19 from "../../assets/images/images/icon/icon-19.svg"
import icon20 from "../../assets/images/images/icon/icon-20.svg"
import icon21 from "../../assets/images/images/icon/icon-21.svg"
import icon22 from "../../assets/images/images/icon/icon-22.svg"
import icon23 from "../../assets/images/images/icon/icon-23.svg"
import icon24 from "../../assets/images/images/icon/icon-24.svg"
import PaymentPopup from '../../pages/courses/application/PaymentPopup'



const Payment = (
    {
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
        setopenpayment,
        openPayment
    }
) => {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
    const openPaymentModal = ()=>{
        setIsPaymentOpen(!isPaymentOpen)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="pricing-sec">
                        <div className="pricing-sec-white">
                            <div className="pricing-heading">
                                <div><div className="icon">
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
                                            <img src={icon2} /></span>
                                        Job Assurance
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon3} /></span>
                                        15+ Job Opportunities
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon4} /></span>
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
                                            <img src={icon6} /></span>
                                        24*7 Doubt Clearing Sessions
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center"><a href="#" className="show-all">Show All</a></div>
                            <div>
                                <h4 className="pay-heading">
                                    <span style={{ color: '#EF6A28' }} className="left_span">Only Pay </span>
                                    <span style={{ color: '#EF6A28' }} className="span_bold">₹5,000 </span><br></br>
                                    Registration Fees Now
                                </h4>
                            </div>
                            <p className="small-text">
                                Pay your course fee ONLY when you land a job (Capped at ₹3,00,000)
                            </p>
                            <div className="btn-sec"><a href="#" className="btn-orange" onClick={openPaymentModal}>Enroll Now</a></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="pricing-sec blue-sec">
                        <div className="pricing-sec-white">
                            <div className="pricing-heading">
                                <div><div className="icon">
                                    <img src={ISa} />
                                </div></div>
                                <div className="title">EDGE </div>
                            </div>
                            <div className="title-h">
                                <h2 className="heading-title">
                                    Upfront payment for a head start on the path to success
                                </h2>
                            </div>
                            <div className="title-text-sec">
                                <ul>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon7} />
                                        </span>
                                        1:1 Mentoring sessions
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon8} /></span>
                                        Guaranteed Industry Orientation Program with Internship
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon9} /></span>
                                        FREE Skillbuilding Courses
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon10} /></span>
                                        Lifetime Career Services
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon11} /></span>
                                        Get Access To Premium Jobs
                                    </li>
                                    <li>
                                        <span className="font-icon"><img src={icon12} /></span>
                                        Dedicated Program Manager
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center"><a href="#" className="show-all">Show All</a></div>
                            <div>
                                <h4 className="pay-heading">
                                    <span style={{ textDecoration: "line-through" }} className="left_span strike">₹1,50,000 </span>
                                    <span style={{ color: "#EF6A28 " }} className="span_bold">₹1,25,000 </span><br></br>
                                    (incl of GST & Registration Fees)
                                </h4>
                            </div>
                            <div className="income-btn">
                                <h6><span className="tooltip-prices-new">+ Income Sharing Agreement</span></h6>
                            </div>
                            <div className="btn-sec"><a href="#" className="btn-orange" onClick={openPaymentModal}>Enroll Now</a></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="pricing-sec organge-sec">
                        <div className="pricing-sec-white">
                            <div className="pricing-heading">
                                <div><div className="icon">
                                    <img src={Pay12} />
                                </div></div>
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
                                            <img src={icon13} /></span>
                                        Guaranteed Industry Orientation Program with Internship
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon14} /></span>
                                        Lifetime Course Access
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon15} /></span>
                                        15+ Job Opportunities
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon16} /></span>
                                        FREE Skillbuilding Courses
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon17} /></span>
                                        Lifetime Career Services
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon18} /></span>
                                        Industry Expert Sessions
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center"><a href="#" className="show-all">Show All</a></div>
                            <div>
                                <h4 className="pay-heading">
                                    <span style={{ textDecoration: "line-through" }} className="left_span strike">
                                        ₹1,25,000
                                    </span>
                                    <span style={{ color: "#EF6A28" }} className="span_bold">₹1,00,000 </span><br></br>
                                    (incl of GST & Registration Fees)
                                </h4>
                            </div>
                            <div className="income-btn">
                                <h6><span className="tooltip-prices-new">+ Income Sharing Agreement</span></h6>
                            </div>
                            <div className="btn-sec"><a href="#" className="btn-orange" onClick={openPaymentModal}>Enroll Now</a></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="pricing-sec lightblue-sec">
                        <div className="pricing-sec-white">
                            <div className="pricing-heading">
                                <div><div className="icon">
                                    <img src={selfIcon} />
                                </div></div>
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
                                            <img src={icon19} /></span>
                                        Internship Based on Evaluation
                                    </li>
                                    <li>
                                        <span className="font-icon">

                                            <img src={icon20} /></span>
                                        Lifetime Course Access
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon21} /></span>
                                        24*7 Doubt Clearing Sessions
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon22} /></span>
                                        FREE Skillbuilding Courses
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon23} /></span>
                                        Regular Assessments
                                    </li>
                                    <li>
                                        <span className="font-icon">
                                            <img src={icon24} /></span>
                                        Certificate of Training
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center"><a href="#" className="show-all">Show All</a></div>
                            <div>
                                <h4 className="pay-heading">
                                    <span style={{ textDecoration: "line-through" }} className="left_span strike">
                                        ₹25,000
                                    </span>
                                    <span style={{ color: '#EF6A28' }} className="span_bold">₹18,000 </span><br></br>
                                    (incl of GST & Registration Fees)
                                </h4>
                            </div>
                            <div className="income-btn">
                                <h6><span className="tooltip-prices-new">+ Income Sharing Agreement</span></h6>
                            </div>
                            <div className="btn-sec"><a href="#" className="btn-orange" onClick={openPaymentModal}>Enroll Now</a></div>
                        </div>
                    </div>
                </div>
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
                    />
                )}
            </div>
        </div>

    )

}

export default Payment
