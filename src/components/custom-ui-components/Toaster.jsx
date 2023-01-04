import { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { openToaster } from '../../redux/actions/ToastAction';

const Toaster = ({ header, variant, body, show }) => {
    const [showToast, setShow] = useState(show);

    const dispatch = useDispatch();

    useEffect(() => {
        setShow(show);
        console.log(header, variant, body, show, showToast)
    },[show])

    const closeToaster = () => {
        setShow(false);
        dispatch(openToaster({
            show: false,
            header: 'Warning!', 
            variant: 'warning',
            body: 'File size exceeds the max. allowed size : 2 Mb'
        }))
    }

    return (
        <>
            <ToastContainer position="top-end">
                <Toast
                    onClose={() => closeToaster(false)}
                    autohide={true}
                    show={showToast}
                    delay={3000}
                    className="d-inline-block m-1"
                    bg={variant.toLowerCase()}
                >
                    <Toast.Header>
                        <strong className="me-auto">{header}</strong>
                    </Toast.Header>
                    <Toast.Body className={variant === 'Dark' && 'text-white'}>
                        {body}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
};

export default Toaster;