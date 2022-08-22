import React from 'react'

import Rectangle from '../../../assets/images/reactangle.png'
import editIcon from '../../../assets/images/edit-icon.svg'
import ProjectDetails from './ProjectDetails'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Projects = () => {
    return (
        <div className='py-3 d-flex justify-content-between pe-4 card-bg profile-bg-light'>
            <div>
                <h5 className='title'>Projects</h5>
                <div className='d-flex justify-content-between'>
                    <Row>
                        <Col>
                            <ProjectDetails />
                        </Col>
                        <Col>
                            <ProjectDetails />
                        </Col>
                    </Row>

                </div>
            </div>
            <div>
                <img src={editIcon} />
            </div>
        </div>
    )
}

export default Projects