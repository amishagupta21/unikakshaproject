import React from 'react'
import editIcon from '../../assets/images/edit-gray.svg'
import iconplus from '../../assets/images/icon-plus.svg'

const Education = ({ info, isShowExperienceModal, setIsShowEducationModal, educationCurrentInfo, setEducationCurrentInfo }) => {
    console.log("Eductaopn info:::", info);
    return (
        <div className='py-3 mt-3 pe-4 about-container gray'>
            <div>
                <h5>Education </h5>
                <div className='my-3'>
                    <img onClick={() => setIsShowEducationModal(true)} src={iconplus} className="edit-add" />
                    {info?.map(education => (
                        <div className='exp-container exp-edu'>
                            <div className='row'>
                                <div className='col-2'>
                                    <div className='box-information blue'>
                                    </div>
                                </div>
                                <div className='col-10'>
                                    <div className='box-info-exp'>
                                        <h3>{education?.school}</h3>
                                        <p>{education?.degree?.name}, {education?.fieldOfStudy?.name}</p>
                                        <h4> {education?.startMonth} {education?.startYear} - {education?.endMonth} {education?.endYear} </h4>
                                    </div>
                                </div>
                            </div>
                            <img src={editIcon} className="icon-edit-info" />
                        </div>
                    ))}
                </div>

            </div>



        </div>
    )
}

export default Education