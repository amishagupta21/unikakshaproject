import { useEffect, useState } from 'react';
import { badge, cancelRe, engineeringTeam, working } from '../../assets/images';
import './ApplicationStatus.scss';

const applicationStatus = {
    review: {
        header: 'Application Under Review!',
        imgContent: engineeringTeam,
        message1: 'Your application is being reviewed by our team.',
        message2: 'The review process usually takes around 72 hours.',
        message3: 'You may get a call from our team members for further assistance.',
    },
    approved: {
        header: 'Application Approved!',
        imgContent: working,
        message1: 'Your application has been approved by our team!',
        message2: 'Next step is to make the payment and complete your KYC.',
        message3: ''
    },
    rejected: {
        header: 'Application Rejected!',
        imgContent: cancelRe,
        message1: 'Your application has been rejected by our team!',
        message2: 'You can apply again after 30 days!',
        message3: ''
    },
}

const ApplicationStatus = () => {

    const [ status, setStatus ] = useState('rejected');
    const [ statusContent, setStatusContent ] = useState({});

    useEffect(() => {
        setStatusContent(applicationStatus[status]);
    }, [])
    
    const { header, imgContent, message1, message2, message3 } = statusContent;

    return (

        <>
            <div className='d-flex align-items-center justify-content-center'>
                <div>
                    <div className='d-flex align-items-center justify-content-center'>
                        {status === 'approved' && (
                            <img src={badge} className='me-3'></img>
                        )}
                        <h3 className='text-primary text-center header mt-2 mb-4'>{header}</h3>
                    </div>
                    <div className='mt-2 mb-4 d-flex align-items-center justify-content-center'>
                        <img src={imgContent}></img>
                    </div>
                    <div className={`my-2 content-box ${status}`} >
                        <p className='text-primary text-center message1'>{message1}</p>
                        <p className='text-primary text-center message2'>{message2}</p>
                        <p className='text-primary text-center message3'>{message3}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplicationStatus;