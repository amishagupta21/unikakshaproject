import React from 'react'
import editIcon from '../../assets/images/edit-gray.svg'
import iconplus from '../../assets/images/icon-plus.svg'

const Experience = ({ info, isShowExperienceModal, setIsShowExperienceModal, experienceCurrentInfo, setExperienceCurrentInfo }) => {
    return (
        <div className='py-3 pe-4 about-containesr mt-3'>
            <div className='d-flex justify-content-between'>
                <h5>Experience</h5>
                <img className='edit-add-new' onClick={() => setIsShowExperienceModal(true)} src={iconplus} />
            </div>
            <div className='my-3'>
                {info?.map(exp => (
                    <div className='exp-container my-3'>
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
                        <img onClick={() => {
                            setIsShowExperienceModal(true)
                            setExperienceCurrentInfo(exp)
                        }
                        } src={editIcon} className="icon-edit-info" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Experience