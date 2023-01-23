import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {
    bannerLogoSvg, PaymentFailure, SuccessTick
} from '../../../assets/images';
import ApiService from '../../../services/ApiService';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/actions/LoaderActions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import './Payments.scss';

  
const LearnerPayments = (params) => {

    const [paymentResponse, setpaymentResponse] = React.useState();
    const [paymentStatus, setpaymentStatus] = React.useState();
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    // const [userProfile, setUserProfile ] = React.useState();
    
    
    // const [applicationData, setApplication] = React.useState();
    const [ openpayment, setopenpayment ] = React.useState(true);  
    
    // const navigate = useNavigate();
    
    const location = useLocation();

    const dispatch = useDispatch();

    // console.log(location.state.courseInfo);

    const courseData = location.state.courseInfo;
    const selectedBatch = location.state.batch
    const userData = location.state.userData;
    const orderData = location.state.orderData;
    const applicationData = location.state.applicationData;
console.log(applicationData);

    // const courseData = params.course;
    
    // const orderData = params.orderData;
    // const applicationDetails = params.application;
    // const selectedBatch = params.selectedBatch;

    // console.log(applicationDetails);

    useEffect(() => {

        dispatch(setLoading(true));
        
        displayRazorpay();

        dispatch(setLoading(false));

    }, []);

    // const fetchUserDetails = async (uid) => {
       
    //     const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
       
    //     setUserData(response?.data?.data?.userProfile?.personal_details)
    //     console.log(userData)
    //     createOrder();
    // };

    

    const getCurrentDateTime = () => {
        let cdate = new Date().toLocaleString()
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
            uid: applicationData?.uid,
            "orderItems": [
                {
                    application_id: applicationData?._id,
                    course_variant_id: courseData?.id,
                    batch_id: selectedBatch?.id,
                    registration_fee: 15000,
                    discount_coupon: "",
                    discount_amount: 0,
                    final_amount: 15000,
                    payment_id: paymentResponse.razorpay_payment_id,
                    order_id: paymentResponse.razorpay_order_id,
                    payment_status: status
                }
            ]
        
         
        };
        // console.log(payload);
        const response = await ApiService('/order/create-payment', `POST`, payload, true);
        if (response?.data.code === 200) {
            // nextPage();
        }
    };

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
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
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // const result = await axios.post("https://api.razorpay.com/v1/orders")

        const orderId = orderData?.id;

        const options = {
            key: "rzp_test_xOikuguYnrmtYd", // Enter the Key ID generated from the Dashboard
            amount: 15000,
            currency: orderData?.currency,
            name: "Code Shastra",
            description: "Test Transaction",
            image: { bannerLogoSvg },
            order_id: orderId,
            handler: async function (response) {
                
                if ( response.razorpay_payment_id ) {
                    createPaymant(response, 'Success');
                } 
                
                setpaymentStatus('Success');
                setpaymentResponse(response);
                const data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                }

                // nextPage();
            },
            "modal": {
                "ondismiss": function() {
                    setpaymentStatus('Failed');
                    // createPaymant(response, 'Failed');
                }
            },
            prefill: {
                name: userData?.full_name,
                email: userData?.email,
                contact: userData?.mobile_number,
            },
            notes: {
                address: "Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
      
        paymentObject.on('payment.failed', function (response) 
        {
            
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
        paymentObject.open();
    }

    const getPaymentSuccess = () => {
      
        // let items = coureseVariantBatches?.map((element, index) => {
            
        return (
            <div className='d-flex align-items-center justify-content-center'>
            <div>
                <div className='mt-2 mb-4 d-flex align-items-center justify-content-center'>
                    <img src={SuccessTick}></img>
                </div>
                <h3 className='payment-text text-center header mt-2 mb-4 '>Payment Successful!</h3>
                <div className='content-box' >
                    <p className='text-primary text-center message1'> Transaction details</p>
                    <p className='text-primary text-center message2'>Transaction number : { paymentResponse?.razorpay_payment_id }</p>
                    <p className='text-primary text-center message3'>Transaction Time : {getCurrentDateTime()}</p>
                    <p className='text-primary text-center message1'> Course details</p>
                    <p className='text-primary text-center message2'>Batch name: {courseData?.course_title}</p>
                    <p className='text-primary text-center message3'>Batch type : {courseData?.variant_name}</p>
                    <p className='text-primary text-center message3'>Batch Time : { convertDate(selectedBatch?.start_date)}</p>
                </div>
                <div className='mt-5 d-flex align-items-center justify-content-center footer-content'>
                    <p>We have sent you the transaction details on your email and whatsapp.</p>
                </div> 
            </div>
            </div>
        );

        // });
        // return items;
    };

    const getPaymentFailure = () => {
        return (
            <div className='d-flex align-items-center justify-content-center'>
                <div>
                    <div className='mt-2 mb-4 d-flex align-items-center justify-content-center'>
                    <img src={PaymentFailure} className="payment-tick"></img>
                        
                    </div>
                    <h3 className='payment-failed text-center header mt-2 mb-4 '>Payment Failed!</h3>
                    <div className='content-box fail' >
                      
                        <p className='text-primary text-center fail-content'>Your transaction has been declined by the bank.</p>
                        <p className='text-center'>
                        <Button className='mt-2 ' style={{padding: '8px 30px'}} variant='secondary' onClick={displayRazorpay}>Retry Payment</Button>
                        </p>
                    </div>
                    <div className='mt-5 d-flex align-items-center justify-content-center footer-content'>
                        <span>
                        <p>Any query about payment please feel free connect with us.</p>
                       
                        <p>Call us - (+91) 93105 75018</p> <p>Mail us - support@unikaksha.com</p>
                        </span>
                        
                    </div> 
                   
                </div>
            </div>
        );
    }

    const getPaymentCancelled = () => {
        return (
            <div className='d-flex align-items-center justify-content-center'>
                <div>
                    <div className='mt-2 mb-4 d-flex align-items-center justify-content-center'>
                    <img src={PaymentFailure} className="payment-tick"></img>
                        
                    </div>
                    <h3 className='payment-failed text-center header mt-2 mb-4 '>Payment Cancelled!</h3>
                    <div className='content-box fail' >
                      
                        <p className='text-primary text-center fail-content'>Your transaction has been cancelled. Please retry the payment.</p>
                        <p className='text-center'>
                        <Button className='mt-2 ' style={{padding: '8px 30px'}} variant='secondary' onClick={displayRazorpay}>Retry Payment</Button>
                        </p>
                    </div>
                    <div className='mt-5 d-flex align-items-center justify-content-center footer-content'>
                        <span>
                        <p>Any query about payment please feel free connect with us.</p>
                       
                        <p>Call us - (+91) 93105 75018</p> <p>Mail us - support@unikaksha.com</p>
                        </span>
                        
                    </div> 
                   
                </div>
            </div>
        );
    }
   
    return (
        
        <div className='payments'>
             {/* { paymentStatus == 'Cancelled' ? getPaymentCancelled() : "" } */}
             { paymentStatus == 'Success' ? getPaymentSuccess() : "" }
             { paymentStatus == 'Failed' ? getPaymentFailure() : "" }
        </div>
    );
}

export default LearnerPayments;