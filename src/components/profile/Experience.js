import React from 'react'
import editIcon from '../../assets/images/edit-gray.svg'
import iconplus from '../../assets/images/icon-plus.svg'

const Experience = ({ info, isShowExperienceModal, setIsShowExperienceModal }) => {
    return (
        <div className='py-3 pe-4 about-container mt-3'>
            <h5>Experience</h5>
            <div className='my-3'>
                <img onClick={() => setIsShowExperienceModal(true)} src={iconplus} className="edit-add" />
                {info?.map(exp => (
                    <div className='exp-container'>
                        <div className='row'>
                            <div className='col-2'>
                                <div className='box-information'>
                                </div>
                            </div>
                            <div className='col-10'>
                                <div className='box-info-exp'>
                                    <h3>{exp?.title} | <span>{exp?.employmentType}</span></h3>
                                    <p>{exp?.companyName}  · {exp?.employmentType}<br />
                                        {exp?.startMonth} {exp?.startYear} - {exp?.endMonth} {exp?.endYear}/Present · 1 yrs 3 mos<br />
                                        {exp?.location}  </p>
                                </div>
                            </div>
                        </div>
                        <img src={editIcon} className="icon-edit-info" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Experience