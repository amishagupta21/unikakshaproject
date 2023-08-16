import React, { useEffect,useState } from 'react';
import { Button } from 'react-bootstrap';
import { badge, cancelRe, engineeringTeam, working } from '../../../assets/images';
import PaymentPopup from './PaymentPopup';
import ApiService from '../../../services/ApiService';
import './ApplicationStatus.scss';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/actions/LoaderActions';
import Payment from '../../../components/Payment';

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

const ApplicationStatus = ({
  nextPage,
  application,
  setOrderData,
  courseId,
  selectedBatch,
  orderData,
  setSelectedBatch,
  setWorldLineStatus,
  worldLineStatus,
  nextPageNumber,
  courseTitle,
  id,
}) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  const [statusContent, setStatusContent] = useState({});
  const [openpayment, setopenpayment] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  useEffect(() => {
    dispatch(setLoading(true));

    fetchApplicationDetails();
  }, []);

  const fetchApplicationDetails = async () => {
    const payload = {
      uid: user?.uid,
      course_id: courseId,
    };
    let applicationDetails = await ApiService(
      '/student/application/detail-by-user-course',
      `POST`,
      payload,
      true
    );

    // if (applicationDetails?.data?.data.application) {
    const applicationData = applicationDetails?.data?.data?.application;
    // setApplication(applicationDetails?.data?.data.application);
    const { m_applicationstatus: appStatus, application_stage } = applicationData;
    if (application_stage === 'payment_status') {
      setIsPaymentOpen(false);
    }
    let app_status = '';
    // const appStatus = 'Application Approved';
    if (
      appStatus === 'Complete' ||
      appStatus==="Assessment Link Sent"||
      appStatus === 'Application Approved' ||
      appStatus === 'Assessment Passed' ||
      appStatus === 'Application In Review' ||
      appStatus === 'Payment Successfull'
    ) {
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
  // const {imgContent } = statusContent;

  const openModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  return (
    <>
      
      {isModalOpen||courseTitle === 'Industry Ready Program'||courseTitle==='Job Ready Program' ? <Payment
        nextPage={nextPage}
        setOrderData={setOrderData}
        application={application}
        courseId={courseId}
        id={id}
        selectedBatch={selectedBatch}
        orderData={orderData}
        setWorldLineStatus={setWorldLineStatus}
        setopenpayment={setopenpayment}
        worldLineStatus={worldLineStatus}
        setSelectedBatch={setSelectedBatch}
        isPaymentOpen={isPaymentOpen}
        openPayment={openPayment}
      />:
      <>
      <div className="d-flex align-items-center justify-content-center">
      <div>
        <div className="d-flex align-items-center justify-content-center">
          {status === 'approved' && <img src={badge} className="me-3"></img>}
          <h3 className="text-primary text-center header mt-2 mb-4 sml-head">
            {statusContent?.header}
          </h3>
        </div>
        <div className="mt-2 mb-4 d-flex align-items-center justify-content-center">
          <img src={statusContent?.imgContent} className="img-fluid"></img>
        </div>
        <div className={`my-2 content-box ${status}`}>
          <p className="text-primary text-center message1">{statusContent?.message1}</p>
          <p className="text-primary text-center message2">{statusContent?.message2}</p>
          <p className="text-primary text-center message3">{statusContent?.message3}</p>
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
            onClick={() => {
              openModal();
            }}
          >
            Next
          </Button>
        </div>
      )}
    </>
    }
      
      
    </>
  );
};

export default ApplicationStatus;
