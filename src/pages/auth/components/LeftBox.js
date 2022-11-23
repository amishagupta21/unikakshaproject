import React from 'react';
import Loginbanner from '../../../assets/images/login/banner.png';
import { Carousel } from 'react-bootstrap';

const LeftBox = () => (


  <div className="left_box 12">
		<Carousel>
      <Carousel.Item>
		<img src={Loginbanner}/>
    <h3>The best learning<br/>
experience.</h3>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img src={Loginbanner}/>
      <h3>The best learning<br/>
experience.</h3>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img src={Loginbanner}/>
      <h3>The best learning<br/>
experience.</h3>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
      </div>
  );

export default LeftBox;