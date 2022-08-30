import React from 'react'
import editIcon from '../../assets/images/edit-gray.svg'
import iconplus from '../../assets/images/icon-plus.svg'

const Experience = () => {
    return (
        <div className='py-3   pe-4 about-container mt-3'>
            <div>
                <h5>Experience </h5>
                <img src={iconplus}  className="edit-add"/>
              <div className='exp-container'>
                  <div className='row'>
                  <div className='col-2'>
                      <div className='box-information'>

                      </div>
                      
                      </div>
                      <div className='col-10'>
                      <div className='box-info-exp'>
<h3>Java developer | <span>Intern</span></h3>
<p>ABC Pvt Ltd India · Full-time<br/>
Jun 2021 - Present · 1 yrs 3 mos Jun 2015<br/>
Vadodara, Gujarat, India</p>
                      </div>
                      </div>
                  </div>
                  <img src={editIcon}  className="icon-edit-info"/>
              </div>
           
            </div>
          
               
           
        </div>
    )
}

export default Experience