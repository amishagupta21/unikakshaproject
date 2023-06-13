/* eslint no-use-before-define: 0 */  // --> OFF
import React from 'react';
import { Carousel } from 'react-bootstrap';
import Loginbanner from '../../../assets/images/img-home-banner.png';


const HeroSection = ({ bannerDetails }) =>  (
  // console.log(bannerDetails)
    <div className="hero-banner">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="hero-banner-left-apart">
              <img src={Loginbanner} />
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
                        Batch starting <span className="orange">
                          2023-07-13
                          {/* {banner?.start_date} */}
                          </span>
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

export default HeroSection;
