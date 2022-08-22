import React from 'react'
import Rectangle from '../../assets/images/reactangle.png'
import editIcon from '../../assets/images/edit-icon.svg'

const Education = () => {
    return (
        <div className='py-3 d-flex justify-content-between pe-4 card-bg profile-bg-blue'>
            <div>
                <h5 className='title'>Education</h5>
                <div className='d-flex justify-content-between'>
                    <div>
                        <img src={Rectangle} />
                    </div>
                    <div className='degree-details ms-4'>
                        <h4 className='mb-0' >The Maharaja Sayajirao University of Baroda</h4>
                        <p className='mb-0 text-dark-bold' >Bechlar of Engineering  </p>
                        <p className='mb-0 text-dark-bold' >Commerce, general degree, Business/commerce, General  </p>
                        <h5 className='text-dark-bold'>March 2004 - March 2008</h5>
                    </div>
                </div>
            </div>
            <div>
                <img src={editIcon} />
            </div>
        </div>
    )
}

export default Education