import React from 'react'
import editIcon from '../../assets/images/edit-icon.svg'

const About = ({ description }) => {
    return (
        <div className='py-3 d-flex justify-content-between pe-4 about-container'>
            <div>
                <h5>About</h5>
                <p>{description}</p>
            </div>
            <div>

            </div>
        </div>
    )
}

export default About