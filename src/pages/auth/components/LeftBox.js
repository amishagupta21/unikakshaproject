import React from 'react';
import Loginbanner from '../../../assets/images/log-in-banner1.svg';
import { Carousel } from 'react-bootstrap';

const LeftBox = () => {
  return (


  <div className="left_box">
		<Carousel>
      <Carousel.Item>
		<img src={Loginbanner}/>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
      <img src={Loginbanner}/>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
      </div>
  )
}

export default LeftBox