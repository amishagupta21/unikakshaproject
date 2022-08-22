import React from 'react'
import Rectangle from '../../assets/images/reactangle.png'
import editIcon from '../../assets/images/edit-icon.svg'

export const Experience = () => {
    return (
        <div className='py-3 d-flex justify-content-between pe-4 card-bg profile-bg-light experience'>
            <div>
                <h5 className='title'>Experience</h5>
                <div className='d-flex justify-content-between'>
                    <div>
                        <img src={Rectangle} />
                    </div>
                    <div className='ms-4'>
                        <h4 className='mb-0 designation' >Java Developer </h4>
                        <p className='mb-0 company-name' >ABC PVT LTD | intern </p>
                    </div>
                </div>
            </div>
            <div>
                <img src={editIcon} />
            </div>
        </div>
    )
}
