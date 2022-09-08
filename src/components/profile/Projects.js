import React from 'react'
import editIcon from '../../assets/images/edit-gray.svg'
import iconplus from '../../assets/images/icon-plus.svg'
import linked from '../../assets/images/icon-linked-new.png';
import git from '../../assets/images/icon-git.png';

import pintest from '../../assets/images/icon-printest-new.png';

const Projects = () => {
    return (
        <div className=' about-container py-3 '>
            <h5 className='mb-3'>Projects</h5>
            <img  src={iconplus} className="edit-add" />
            <div className='project-list'>
                <ul>
                    <li>
                        <div className="top-information">
                            <h4><span></span>Warty Warthog</h4>
                            <div className='project-share'>
                                <ul className='share-listing'>
                                    <li><a href=""><img src={linked} /></a></li>
                                    <li><a href=""><img src={pintest} /></a></li>
                                    <li><a href=""><img src={git} /></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='top-discription-text'>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal </p>
                        </div>
                        <img src={editIcon} className="edit-icons" />
                    </li>
                    <li>
                        <div className="top-information">
                            <h4><span style={{ background: "#360267" }}></span>Warty Warthog</h4>
                        </div>
                        <div className='top-discription-text'>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal </p>
                        </div>
                        <img src={editIcon} className="edit-icons" />
                    </li>
                </ul>
            </div>
        </div>


    )
}

export default Projects