import React from 'react'
import Rectangle from '../../../assets/images/reactangle.png'

const ProjectDetails = () => {
    return (
        <div className='d-flex justify-content-between me-5 my-3'>
            <div>
                <img src={Rectangle} width="50" />
            </div>
            <div className='ms-4'>
                <p className='project-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, ab inventore voluptatem odio vel,
                    quisquam consectetur natus quasi quos quia commodi dolor totam ipsum cumque.
                    <a className='d-block text-end text-decoration-none mt-2'>More</a>
                </p>
            </div>
        </div>
    )
}

export default ProjectDetails