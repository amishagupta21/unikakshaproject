import React, { useEffect } from 'react';
import { Card, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { badge, cancelRe, engineeringTeam, working } from '../../../assets/images';
import PaymentPopup from './PaymentPopup';
import ApiService from '../../../services/ApiService';
import './ApplicationStatus.scss';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/actions/LoaderActions';

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
    message3: '',
  },
  rejected: {
    header: 'Application Rejected!',
    imgContent: cancelRe,
    message1: 'Your application has been rejected by our team!',
    message2: 'You can apply again after 30 days!',
    message3: '',
  },
};

const ApplicationStatus = ({ nextPage, application, setOrderData, courseId, setSelectedBatch }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState();
  const [statusContent, setStatusContent] = React.useState({});
  const [openpayment, setopenpayment] = React.useState(false);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    dispatch(setLoading(true));

    fetchApplicationDetails();
  }, []);

  const fetchApplicationDetails = async () => {
    const payload = {
      uid: user?.uid,
      course_variant_id: courseId,
    };

    let applicationDetails = await ApiService(
      '/student/application/detail-by-user-course',
      `POST`,
      payload,
      true
    );
    // if (applicationDetails?.data?.data.application) {
    const applicationData = applicationDetails?.data?.data.application;
    // setApplication(applicationDetails?.data?.data.application);
    const { m_applicationstatus: appStatus } = applicationData;
    let app_status = '';
    if (appStatus === 'Application Approved' || appStatus === 'Application In Review') {
      app_status = 'approved';
      setStatus(app_status);
    }
    if (appStatus === 'Application Rejected') {
      app_status = 'rejected';
      setStatus(app_status);
    }
    if (appStatus === 'Pending') {
      app_status = 'review';
      setStatus(app_status);
    }

    setStatusContent(applicationStatus[app_status]);
    dispatch(setLoading(false));
  };

  const openPayment = () => {
    setopenpayment(true);
  };
  const { header, imgContent, message1, message2, message3 } = statusContent;

  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <div>
          <div className="d-flex align-items-center justify-content-center">
            {status === 'approved' && <img src={badge} className="me-3"></img>}
            <h3 className="text-primary text-center header mt-2 mb-4 sml-head">{header}</h3>
          </div>
          <div className="mt-2 mb-4 d-flex align-items-center justify-content-center">
            <img src={imgContent} className="img-fluid"></img>
          </div>
          <div className={`my-2 content-box ${status}`}>
            <p className="text-primary text-center message1">{message1}</p>
            <p className="text-primary text-center message2">{message2}</p>
            <p className="text-primary text-center message3">{message3}</p>
          </div>
        </div>
      </div>
      {status === 'approved' && (
        <div className="m-auto mt-3">
          <Button
            size="lg"
            className="btn-center"
            variant="secondary"
            type="button"
            onClick={() => openPayment()}>
            Next
          </Button>
        </div>
      )}
      {openpayment && (
        <>
          <PaymentPopup
            nextPage={nextPage}
            setOrderData={setOrderData}
            courseId={courseId}
            setopenpayment={setopenpayment}
            setSelectedBatch={setSelectedBatch}
          />
        </>
      )}
    </>
  );
};

export default ApplicationStatus;
