import React from 'react';

const About = ({ description }) => (
    <div className='py-3 d-flex justify-content-between pe-4 about-container'>
        <div>
            <h5>About</h5>
            <p>{description}</p>
        </div>
    </div>
);

export default About;