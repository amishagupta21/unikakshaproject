import React, { useEffect } from 'react';
import { Card, Row, Col, InputGroup, FormControl, Button, CardGroup, Form } from 'react-bootstrap';
import './paymentPopups.scss';
import moment from 'moment';
import ApiService from '../../../services/ApiService';
import { useNavigate } from 'react-router-dom';
import Worldline from './WorldLine';

const PaymentPopupAutonomy = ({
  nextPage,
  setOrderData,
  courseId,
  orderData,
  selectedBatch,
  application,
  setopenpayment,
  setSelectedBatch,
  setWorldLineStatus,
  worldLineStatus,
  id,
}) => {
  const [batches, setbatches] = React.useState();
  const [defaultBatch, setDefaultBatch] = React.useState();

  const navigate = useNavigate();
  useEffect(() => {
    fetchVariantBatches();
    // batchSchedule()
  }, []);

  function onChangeBatch(event) {
    const batch = batches.filter((e) => e.id === event.target.value);
    setDefaultBatch(batch[0]?.id);
    setSelectedBatch(batch[0]);
  }

  const fetchVariantBatches = async (courseId) => {
    const res = await ApiService(`courses/${courseId}/batch/list`);
    if (res?.data.code === 200) {
      setbatches(res.data.data.result);

      setDefaultBatch(res.data.data.result[0]?.id);
      setSelectedBatch(res.data.data.result[0]?.id);
    }
  };
  // const batchSchedule = async() => {
  //   const res = await ApiService(`/admin/next-batch`,"GET",{},true);
  //   console.log("res yahinha",res)
  
  // };
  const togglepayment = () => {
    setopenpayment(false);
  };
  const createOrder = async () => {
    let payload = {
      application_id: application?._id,
      amount: 18000,
      currency: 'INR',
      receipt: (Math.random() + 1).toString(36).substring(7),
    };
    let orderDetails = await ApiService('order/create-order', `POST`, payload, true);
    if (orderDetails?.data?.code === 200) {
      setOrderData(orderDetails.data.data);
      setopenpayment(false);
      nextPage();
    }
  };

  const getbatches = () => {
    //  const batchSchedule=async()=>{
    //   const userDetails = await ApiService(`/admin/next-batch`, 'GET', {}, true);
    //   console.log("userDetails", userDetails)
    //  }
    let items = batches.map((element, index) => {
      return (
        <CardGroup key={index}>
          <Col>
            <div className="batch-list">
              <div className="starte-style">
                <input
                  type="radio"
                  name="batch"
                  onChange={onChangeBatch}
                  checked={defaultBatch == element.id}
                  value={element.id}></input>
                <label style={{ marginTop: '5px' }}>Starting from</label>
              </div>
              <div className="mtb-5 start-date">
                <span>{moment(element.start_date).format('Do MMMM dddd')}</span>
              </div>
              <div className="mtb-5 recomend-style">
                {index === 0 && <span style={{ color: '#02A74D' }}>Recomenned for you</span>}
                {index !== 0 && <span style={{ color: '#FF613C' }}>Filling Fast</span>}
              </div>
            </div>
          </Col>
        </CardGroup>
      );
    });
    return items;
  };
  return (
    <>
      {batches && (
        <>
          <div className="modal display-block">
            <section className="modal-main">
              <div className="model-body">
                <div className="modalheader">
                  <span>Please choose batch schedule below</span>
                  <span className="floatRight close-btn" onClick={() => togglepayment()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-x"
                      viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-3">
                  <Row className="nomargin batch-head">Batch Schedule</Row>
                  <Row xs={1} md={3} className="nomargin mt-2">
                    {getbatches()}
                  </Row>
                </div>
              </div>
              <div className="mt-3 coupon-div">
                <div className="model-body pb-2">
                  <Row>
                    <span className="mtb-10">Have a coupon code?</span>
                  </Row>
                  <Row>
                    <InputGroup className="mtb-5">
                      <input type="text" placeholder="Enter Coupon" className="coupon-input" />
                      <Button className="coupon-btn">Apply Now</Button>
                    </InputGroup>
                  </Row>
                  <Row className="congrats-div mtb-5 nomargin">
                    <span className="d-flex justify-content-center align-items-center">
                      Congrats! you have 10% discount on this Apply Now
                    </span>
                  </Row>
                </div>
              </div>
              <div className="mt-3 model-body model-body-register">
                <Row className="mt-2 nomargin amnt-list">
                  <Col md="7 nopadd">Registartion Fee</Col>
                  <Col md="5 nopadd">
                    <span className="floatRight">18,000</span>
                  </Col>
                </Row>
                <Row className="mt-2 nomargin btmborder amnt-list">
                  <Col md="7 nopadd">Coupon discount</Col>
                  <Col md="5 nopadd">
                    <span className="floatRight">0</span>
                  </Col>
                </Row>
                <Row className="mt-2 nomargin total-amnt">
                  <Col md="7 nopadd">Total</Col>
                  <Col md="5 nopadd">
                    <span className="floatRight">18,000</span>
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

                  {/* <Worldline
                    nextPage={nextPage}
                    setWorldLineStatus={setWorldLineStatus}
                    selectedBatch={selectedBatch}
                    orderData={orderData}
                    setopenpayment={setopenpayment}
                    application={application}
                    courseId={courseId}
                    worldLineStatus={worldLineStatus}
                    createOrder={() => createOrder()}
                    id={id}
                  /> */}
                </Row>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default PaymentPopupAutonomy;
