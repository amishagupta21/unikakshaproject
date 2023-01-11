import React, { useEffect } from 'react';
import { Card, Row, Col, InputGroup, FormControl, Button, CardGroup, Form } from 'react-bootstrap';
import './ProfilePopups.scss';
import moment from 'moment';



const ProfilePopup = ({profilePhoto}) => 
{        
    
    

    console.log(profilePhoto);

    useEffect(() => {

    },[]) 

    
    const togglePopup = () => {
        setProfilePopup(false);
    }

  

  
    

    return(
        <>
        
            <div className='profile-popup modal display-block'>
            <section className="modal-main">
                <div className="model-body">
                <div className='modalheader'>
                    <span>Upload Photo</span>
                    <span className="floatRight close-btn" onClick={() => togglePopup()}>x</span>
                </div>
                <div className="mt-3">
                    <Row className='nomargin batch-head'>
                    <img src={ profilePhoto } alt="profile" className="" onClick={() => viewProfilePhoto()} />
                    </Row>  
                    
                </div>                                
                </div>
                <div className="mt-3 model-body">
                    <Row className="d-flex justify-content-end">
                    <Button
                        className="col-3 me-2 btn btn-outline-secondary"
                        variant="outline-secondary"
                        type="button"
                        onClick={() => togglePopup()}>
                        Upload
                    </Button>
                    <Button
                        className="col-3"
                        variant="secondary"
                        type="button"
                        onClick={() => togglePopup()}>
                        Delete
                    </Button>
                    </Row>
                </div>
                  
                
            </section>
            </div>  
            </>
        
    )
}

export default ProfilePopup;