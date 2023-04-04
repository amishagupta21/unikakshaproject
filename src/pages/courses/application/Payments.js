import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { bannerLogoSvg, PaymentFailure, SuccessTick } from '../../../assets/images';
import ApiService from '../../../services/ApiService';
import './Payments.scss';
import { useNavigate } from 'react-router-dom';

const Payments = (params) => {
  const [paymentResponse, setpaymentResponse] = React.useState();
  const [paymentStatus, setpaymentStatus] = React.useState(null);
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [userProfile, setUserProfile] = React.useState();
  const navigate = useNavigate();

  const courseData = params.course;
  const nextPage = params.nextPage;
  const orderData = params.orderData;
  const applicationDetails = params.application;
  const selectedBatch = params.selectedBatch;
  const onPageNumberClick = params.onPageNumberClick;
  const page = params.page;

  useEffect(() => {
    fetchUserDetails(user?.uid);

    if (
      applicationDetails?.application_stage === 'payment_status' &&
      applicationDetails?.m_applicationstatus === 'Payment Successfull'
    ) {
      setpaymentStatus('Success');
    } else if (
      applicationDetails?.application_stage === 'payment_status' &&
      applicationDetails?.m_applicationstatus === 'Payment Failed'
    ) {
      setpaymentStatus('Failed');
    } else if (applicationDetails?.application_stage !== 'payment_status') {
      displayRazorpay();
    } else {
      nextPage();
    }
  }, []);

  const fetchUserDetails = async (uid) => {
    const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);

    setUserProfile(response?.data?.data?.userProfile?.personal_details);
  };

  const getCurrentDateTime = () => {
    let cdate = new Date().toLocaleString();
    return cdate;
  };

  const convertDate = (dateInput) => {
    const date = new Date(dateInput);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  };

  const createPaymant = async (paymentResponse, status) => {
    const payload = {
      uid: applicationDetails?.uid,
      orderItems: [
        {
          application_id: applicationDetails?._id,
          course_variant_id: courseData?.id,
          batch_id: selectedBatch?.id,
          registration_fee: 2500,
          discount_coupon: '',
          discount_amount: 0,
          final_amount: 2500,
          payment_id: paymentResponse.razorpay_payment_id,
          order_id: paymentResponse.razorpay_order_id,
          payment_status: status,
        },
      ],
    };
    // console.log(payload);
    const response = await ApiService('/order/create-payment', `POST`, payload, true);
    if (response?.data.code === 200) {
      nextPage();
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    function loadScript(src) {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    }

    // const result = await axios.post("https://api.razorpay.com/v1/orders")

    const orderId = orderData?.id;

    const options = {
      key: 'rzp_test_Lfev1HWEYekjMI', // Enter the Key ID generated from the Dashboard
      //key: 'rzp_live_xsOESw138cvA75',
      amount: orderData?.amount,
      currency: orderData?.currency,
      name: 'Code Shastra',
      description: 'Test Transaction',
      image: { bannerLogoSvg },
      callback_url:
        'https://razorpay.com/docs/payments/server-integration/go/payment-gateway/build-integration/',
      // order_id: orderId,
      handler: async function (response) {
        if (response.razorpay_payment_id) {
          createPaymant(response, 'Success');
        }
        params?.setApplicationDetails({
          application_stage: 'payment_status',
          m_applicationstatus: 'Payment Successfull',
        });
        setpaymentStatus('Success');
        setpaymentResponse(response);
        const data = {
          // orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        nextPage();
      },
      modal: {
        ondismiss: function () {
          setpaymentStatus('Failed');
          // createPaymant(response, 'Failed');
        },
      },
      prefill: {
        name: userProfile?.full_name,
        email: userProfile?.email,
        contact: userProfile?.mobile_number,
      },
      notes: {
        address: 'Corporate Office',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on('payment.failed', function (response) {
      setpaymentStatus('Failed');
      createPaymant(response, 'Failed');

      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
  }

  const onStepperClick = (page) => {
    onPageNumberClick(page);
  };

  const getPaymentSuccess = () => {
    // let items = coureseVariantBatches?.map((element, index) => {

    return (
      <div className="d-flex align-items-center justify-content-center pay-align">
        <div>
          <div className="mt-2 mb-4 d-flex align-items-center justify-content-center">
            <img src={SuccessTick}></img>
          </div>
          <h3 className="payment-text text-center header mt-2 mb-4 ">Payment Successful!</h3>
          <div className="content-box">
            <p className="text-primary text-center message1"> Transaction details</p>
            <p className="text-primary text-center message2">
              Transaction number : {paymentResponse?.razorpay_payment_id}
            </p>
            <p className="text-primary text-center message3">
              Transaction Time : {getCurrentDateTime()}
            </p>
            <p className="text-primary text-center message1"> Course details</p>
            <p className="text-primary text-center message2">
              Batch name: {courseData?.course_title}
            </p>
            <p className="text-primary text-center message3">
              Batch type : {courseData?.variant_name}
            </p>
            <p className="text-primary text-center message3">
              Batch Time : {convertDate(selectedBatch?.start_date)}
            </p>
          </div>
          <div className="mt-5 d-flex align-items-center justify-content-center footer-content">
            <p>We have sent you the transaction details on your email and whatsapp.</p>
          </div>
          <div className="m-auto mt-3">
            <Button
              size="lg"
              className="btn-center"
              variant="secondary"
              type="button"
              onClick={() => onStepperClick(6)}>
              Next
            </Button>
          </div>
        </div>
      </div>
    );

    // });
    // return items;
  };

  const getPaymentFailure = () => {
    return (
      <div className="d-flex align-items-center justify-content-center payment-failed">
        <div>
          <div className="mt-2 mb-4 d-flex align-items-center justify-content-center">
            <img src={PaymentFailure} className="payment-tick"></img>
          </div>
          <h3 className="payment-failed text-center header mt-2 mb-4 ">Payment Failed!</h3>
          <div className="content-box fail">
            <p className="text-primary text-center fail-content">
              Your transaction has been declined by the bank.
            </p>
            <p className="text-center">
              <Button
                className="mt-2 "
                style={{ padding: '8px 30px' }}
                variant="secondary"
                onClick={displayRazorpay}>
                Retry Payment
              </Button>
            </p>
          </div>
          <div className="mt-5 d-flex align-items-center justify-content-center footer-content">
            <span>
              <p>Any query about payment please feel free connect with us.</p>
              <p>Call us - (+91) 9310575018</p> <p>Mail us - support@unikaksha.com</p>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="payments">
      {paymentStatus == 'Success' ? getPaymentSuccess() : ''}
      {paymentStatus == 'Failed' ? getPaymentFailure() : ''}
    </div>
  );
};

export default Payments;
