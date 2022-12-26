import { useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { undrawFriends } from "../../../../assets/images";
import './StudentEnrollmentStatus.scss';

const staticContents = {
    enrollmentMsg: 'Your enrollment is pending please check after a while!',
    goToDashboard: 'Go to Dashboard',
}

const EnrollmentStatus = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/my-courses');
    }

    return (
        <>
            <div className='d-flex m-auto justify-content-center'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img className='w-50' src={undrawFriends}></img>
                    <p className='enrollment-msg my-4'>{staticContents.enrollmentMsg}</p>
                    <Button size='lg' className='px-5 my-4 justify-content-center' variant='secondary' onClick={goToDashboard} type="button">{staticContents.goToDashboard}</Button>
                </div>
            </div>
        </>
    );
}

export default EnrollmentStatus;