/* eslint no-use-before-define: 0 */  // --> OFF
import React, { useState, useEffect }from 'react';
import { Carousel } from 'react-bootstrap';
import Loginbanner from '../../../assets/images/img-home-banner.png';
import ApiService from '../../../services/ApiService';

const HeroSection = ({ bannerDetails }) => {
  
  const [batchStartDate, setBatchStartDate] = useState('');

  useEffect(() => {
    const fetchBatchStartDate = async () => {
      try {
        const res = await ApiService(`/admin/next-batch/date`, "GET", {}, true);
        const startDate = res?.data?.data[0]?.start_date;
        setBatchStartDate(startDate);
      } catch (error) {
        console.error("Error fetching batch start date:", error);
      }
    };
    fetchBatchStartDate();
  }, []);

  return (
    <div className="hero-banner">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="hero-banner-left-apart">
              <img src={Loginbanner} alt="Login Banner" />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="home-page-slides">
              <Carousel>
                {bannerDetails?.item?.map((banner, index) => (
                  <Carousel.Item key={banner?.image + index}>
                    <div className="bootcamp-item">
                      <h2>{banner?.title}</h2>
                      <h1>Bootcamp</h1>
                      <p>
                         Next Morning Batch starting <span className="orange">{batchStartDate}</span>
                      </p>
                      <p>
                         Next Evening Batch starting <span className="orange">{batchStartDate}</span>
                      </p>
                      <div className="btn-item">
                        <a href={banner.deeplink} target="_blank" className="enroll-now">
                          Enroll Now
                        </a>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
