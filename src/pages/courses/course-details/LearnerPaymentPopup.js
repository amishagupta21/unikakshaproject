import React, { useEffect } from 'react';
import { Card, Row, Col, InputGroup, FormControl, Button, CardGroup, Form } from 'react-bootstrap';
// import './paymentPopups.scss';
import moment from 'moment';
import ApiService from '../../../services/ApiService';
import LearnerPayments from './LearnerPayments'
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/actions/LoaderActions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


const LearnerPaymentPopup = ({courseId, courseInfo}) => 
{        
    
    const [ batches, setbatches ] = React.useState();
    const [ defaultBatch, setDefaultBatch ] = React.useState();
    const [ selectedBatch, setSelectedBatch ] = React.useState();
    const [ openPaymentScreen, setOpenPaymentScreen ] = React.useState(false); 
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
    const [userData, setUserData] = React.useState();
    const [applicationData, setApplication] = React.useState();
    const [openpayment, setopenpayment] = React.useState(false);
    // const [orderData, setOrderData] = React.useState();
    
console.log(courseId, courseInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        fetchVariantBatches(courseId);
        fetchUserDetails(user?.uid);
        dispatch(setLoading(false));
        
    },[]) 

    const createOrder = async () => {  

        dispatch(setLoading(true));

        // setopenpayment(false);
        
        const personalDetails = {
            full_name: userData?.full_name,
            mobile_number: userData?.mobile_number,
            mobile_cc: userData?.mobile_cc,
            whatsapp_number: userData?.whatsapp_number,
            whatsapp_cc: userData?.whatsapp_cc,
            email:userData?.email,
            gender:userData?.gender,
            birth_date: '01',
            birth_month: '01',
            birth_year: '1995'
        };

        const applicationPayload = {
            uid: user?.uid,
            course_id: courseInfo?.id,
            course_title: courseInfo?.course_title,
            course_duration: courseInfo?.course_variant_sections?.duration,
            course_start_date: new Date(selectedBatch.start_date).toLocaleDateString(),
            personal_details: personalDetails,
        };
        const response = await ApiService('/student/personal-details', `POST`, applicationPayload, true);
        if(response?.data?.code === 200) {
            
            const cpayload = {
                uid: user?.uid,
                course_variant_id: courseInfo?.id,
            };
            let applicationDetails = await ApiService(
                '/student/application/detail-by-user-course',
                `POST`,
                cpayload,
                true
            );

            // console.log(applicationDetails?.data?.data);
            setApplication(applicationDetails?.data?.data?.application)
        
            let payload = {
                amount: 2500,
                currency: "INR",
                receipt: (Math.random() + 1).toString(36).substring(7)
            }        
            let orderDetails = await ApiService('/order/create-order', `POST`, payload, true);  

            if(orderDetails?.data?.code === 200) {
                // console.log(orderDetails?.data?.data)
                
                
                dispatch(setLoading(false));
                navigate(`/payment`, {
                    state: {
                        batch: selectedBatch,
                        courseInfo: courseInfo,
                        userData: userData,
                        orderData: orderDetails?.data?.data,
                        applicationData: applicationDetails?.data?.data?.application
                    },
                });
                // console.log(openPaymentScreen)
               
            }
        }   
        
    }

    const fetchUserDetails = async (uid) => {
       
        const response = await ApiService(`/user/${uid}/detail`, 'GET', {}, true);
       
        setUserData(response?.data?.data?.userProfile?.personal_details)
     
    };
    

  function onChangeBatch(event) {
    
    const batch = batches.filter((e) => e.id === event.target.value);
    setDefaultBatch(batch[0]?.id);
    setSelectedBatch(batch[0]);
  
  }

  
    const fetchVariantBatches = async(courseVariantId) => {
        const res = await ApiService(`courses/${courseVariantId}/batch/list`);
        
        if(res?.data.code === 200) {
            setbatches(res.data.data.result); 
            
            setDefaultBatch(res.data.data.result[0]?.id);  
            setSelectedBatch(res.data.data.result[0]);
            // console.log()     
        }
    } 
    const togglepayment = () => {
        setopenpayment(false);
    }

        // navigate("/payment", {batch: selectedBatch});
    
    

    
//    console.log(applicationData)

    const getbatches = () => {
        
        let items = batches.map((element, index) => {
          return (
            <CardGroup key={index}>
              <Col>                
                <div className='batch-list'>
                    <div className="starte-style">                    
                    <input type="radio" name="batch" 
                        onChange={onChangeBatch} 
                        checked={defaultBatch == element.id }
                        
                        value={element.id}
                        ></input>
                    <label style={{marginTop : '5px'}}>
                         Starting from
                    </label>
                    </div>
                    <div className='mtb-5 start-date'>
                    <span>
                    {moment(element.start_date).format('Do MMMM dddd')}
                    </span>
                    </div>
                    <div className='mtb-5 recomend-style' >
                    {index === 0 && (
                    <span style={{color:'#02A74D'}}>
                    Recomenned for you
                    </span>
                    )}
                    {index !== 0 && (
                    <span style={{color:'#FF613C'}}>
                    Filling Fast
                    </span>
                    )}
                    </div>
                </div>                                
              </Col>
            </CardGroup>
          )
        })
        return items
    }


    return(
        <>
            {openPaymentScreen && (
                <>
                    <LearnerPayments 
                        
                         course={courseInfo}
                         orderData={orderData}
                         application={applicationData}
                         selectedBatch={selectedBatch}
                    />
                </>
            )}  
        {batches?.length && (
            <>
            
            <div className='modal display-block'>
            <section className="modal-main">
                <div className="model-body">
                <div className='modalheader'>
                    <span>Please choose batch schedule below</span>
                    <span className="floatRight close-btn" onClick={() => togglepayment()}>x</span>
                </div>
                <div className="mt-3">
                    <Row className='nomargin batch-head'>
                        Batch Schedule
                    </Row>  
                    <Row xs={1} md={3} className="nomargin mt-2">
                        {getbatches()}
                    </Row>
                </div>                                
                </div>
                {/* <div className='mt-3 coupon-div'>
                    <div className="model-body pb-2">
                        <Row>
                            <span className='mtb-10'>
                            Have a coupon code?
                            </span>                        
                        </Row>          
                        <Row>
                        <InputGroup className="mtb-5">
                        <input type="text" placeholder='Enter Coupon' className='coupon-input' />
                        <Button className="coupon-btn">Apply Now</Button>
                        </InputGroup>
                        </Row>                                      
                        <Row className="congrats-div mtb-5 nomargin">
                        <span className="d-flex justify-content-center align-items-center">
                            Congrats! you have 10% discount on this Apply Now
                        </span>                            
                        </Row>
                    </div>
                </div>     */}
                <div className="mt-3 model-body">
                    <Row className="mt-2 nomargin amnt-list">
                        <Col md="7 nopadd">
                            Registartion Fee
                        </Col>
                        <Col md="5 nopadd">
                            <span className="floatRight">  
                            2500
                            </span>                            
                        </Col>
                    </Row>        
                    <Row className="mt-2 nomargin btmborder amnt-list">
                        <Col md="7 nopadd">
                            Coupon discount
                        </Col>
                        <Col md="5 nopadd">
                            <span className="floatRight">  
                            0
                            </span>                            
                        </Col>
                    </Row>
                    <Row className="mt-2 nomargin total-amnt">
                        <Col md="7 nopadd">
                            Total
                        </Col>
                        <Col md="5 nopadd">
                            <span className="floatRight">  
                            2500
                            </span>                            
                        </Col>
                    </Row>                    
                </div>
                <div className="mt-3 model-body">
                    <Row className="d-flex justify-content-end">
                    <Button
                        className="col-3 me-2 btn btn-outline-secondary"
                        variant="outline-secondary"
                        type="button"
                        onClick={() => togglepayment()}>
                        Cancel
                    </Button>
                    <Button
                        className="col-3"
                        variant="secondary"
                        type="button"
                        onClick={() => createOrder()}>
                        Next
                    </Button>
                    </Row>
                </div>
            </section>
            </div>  
            </>
        )}        
        </>
    )
}

export default LearnerPaymentPopup;