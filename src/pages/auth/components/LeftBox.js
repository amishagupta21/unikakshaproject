import React from 'react';
import Loginbanner from '../../../assets/images/login/banner01.png';
import Loginbannernew from '../../../assets/images/login/banner02.png';
import Loginbannernewlast from '../../../assets/images/login/banner03.png';

import { Carousel } from 'react-bootstrap';

const LeftBox = () => (


  <div className="left_box 12">
		<Carousel>
      <Carousel.Item>
		<img src={Loginbanner}/>
    <h3>Learn On-The-Go</h3>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img src={Loginbannernew}/>
      <h3>Track your learning progress<br/>
in real-time</h3>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img src={Loginbannernewlast}/>
      <h3>Get access to an array of<br/>
 free & paid upskilling courses in<br/>
 just one click</h3>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
      </div>
  );

export default LeftBox;