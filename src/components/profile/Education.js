import React from 'react'
import editIcon from '../../assets/images/edit-gray.svg'
import iconplus from '../../assets/images/icon-plus.svg'

const Education = () => {
    return (
        <div className='py-3  mt-3 pe-4 about-container gray'>
        <div>
            <h5>Education </h5>
            <img src={iconplus}  className="edit-add"/>
          <div className='exp-container exp-edu'>
              <div className='row'>
              <div className='col-2'>
                  <div className='box-information blue'>

                  </div>
                  
                  </div>
                  <div className='col-10'>
                  <div className='box-info-exp'>
<h3>The Maharaja Sayajirao University of Baroda</h3>
<p>Bachelor's degree, Business/<br/>
Commerce, General Bachelor's degree, Business/Commerce, General</p>
<h4>Mar 2004 - Mar 2008</h4>
                  </div>
                  </div>
              </div>
              <img src={editIcon}  className="icon-edit-info"/>
          </div>
       
        </div>
      
           
       
    </div>
    )
}

export default Education