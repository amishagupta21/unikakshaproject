import React from 'react'
import Rectangle from '../../assets/images/reactangle.png'
import editIcon from '../../assets/images/edit-icon.svg'
import Badge from 'react-bootstrap/Badge';

const Sklill = () => {
    return (
        <div className='py-3 d-flex justify-content-between pe-4 card-bg profile-bg-blue skills'>
            <div>
                <h5 className='title'>Sklills</h5>
                <div className='d-flex justify-content-between'>
                    <div>
                        <img width={50} src={Rectangle} />
                    </div>
                    <div className='ms-4'>
                        <p className='mb-2'>Development</p>
                        <div>
                            <Badge className='mx-1 p-2' bg="success">Python</Badge>
                            <Badge className='mx-1 p-2' bg="primary">Javascript</Badge>
                            <Badge className='mx-1 p-2' bg="warning">HTML</Badge>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src={editIcon} />
            </div>
        </div>
    )
}

export default Sklill