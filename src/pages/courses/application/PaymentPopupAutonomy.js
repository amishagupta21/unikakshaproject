import React, { useEffect } from 'react';
import { Card, Row, Col, InputGroup, FormControl, Button, CardGroup, Form } from 'react-bootstrap';
import './paymentPopups.scss';
import moment from 'moment';
import ApiService from '../../../services/ApiService';
import { useNavigate } from 'react-router-dom';
import Worldline from './WorldLine';
import { calendar1 } from '../../../assets/images';

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
  setPaymentMethod,
  courseTitle,
  scheduleBatchDate,
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

  const togglepayment = () => {
    setopenpayment(false);
  };
  const createOrder = async () => {
    let payload = {
      application_id: application?._id,
      amount: 10000,
      currency: 'INR',
      receipt: (Math.random() + 1).toString(36).substring(7),
    };

    let orderDetails = await ApiService('order/create-order', `POST`, payload, true);
    if (orderDetails?.data?.code === 200) {
      setOrderData(orderDetails.data.data);
      setopenpayment(false);
      setPaymentMethod(true);
      if (application?.course_title === 'Full Stack Web Development') {
        nextPage(3);
      }
    }
  };

  const [selectedMorningCheckboxes, setSelectedMorningCheckboxes] = React.useState([]);
  const [selectedEveningCheckboxes, setSelectedEveningCheckboxes] = React.useState([]);

  const handleMorningCheckboxChange = (index) => {
    const isSelected = selectedMorningCheckboxes.includes(index);
    if (isSelected) {
      setSelectedMorningCheckboxes([]);
    } else {
      setSelectedMorningCheckboxes([index]);
      setSelectedEveningCheckboxes([]);
    }
  };

  const handleEveningCheckboxChange = (index) => {
    const isSelected = selectedEveningCheckboxes.includes(index);
    if (isSelected) {
      setSelectedEveningCheckboxes([]);
    } else {
      setSelectedEveningCheckboxes([index]);
      setSelectedMorningCheckboxes([]);
    }
  };

  const getBatches = () => {
    return scheduleBatchDate.map((element, index) => (
      <Col key={index} sm={3}>
        <Card
          className="batch-card-style"
          style={{
            border: selectedMorningCheckboxes.includes(index) ? '1px solid #222380' : '',
            // color: selectedMorningCheckboxes.includes(index) ? 'white' : '',
          }}>
          <Card.Body className="text-left-align">
            <div className="font-color text-left-align mtb5">
              <input
                type="checkbox"
                onChange={() => handleMorningCheckboxChange(index)}
                checked={selectedMorningCheckboxes.includes(index)}
                style={{
                  display: 'inline-block',
                  backgroundColor: selectedMorningCheckboxes.includes(index) ? '#333' : '',
                  color: selectedMorningCheckboxes.includes(index) ? 'white' : '',
                }}
              />
              <h5
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '15px',
                  color: '#363F5E',
                }}>
                Starts From
              </h5>
            </div>
            <p>
              <span className="text-left-align mtb5 fs-5">{element?.date1}</span>
              <span className="text-left-align mtb5 fs-5">{element?.date2}</span>
              <span className="text-left-align mtb5 fs-5">{element?.date3}</span>
            </p>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  const getEveningBatches = () => {
    return scheduleBatchDate.map((element, index) => (
      <Col key={index} sm={3}>
        <Card
          className="batch-card-style"
          style={{
            border: selectedEveningCheckboxes.includes(index) ? '1px solid #222380' : '',
            // color: selectedEveningCheckboxes.includes(index) ? 'white' : '',
          }}>
          <Card.Body className="text-left-align">
            <div className="font-color text-left-align mtb5">
              <input
                type="checkbox"
                onChange={() => handleEveningCheckboxChange(index)}
                checked={selectedEveningCheckboxes.includes(index)}
                style={{ display: 'inline-block' }}
              />
              <h5
                style={{
                  display: 'inline-block',
                  marginLeft: '10px',
                  fontSize: '15px',
                  color: '#363F5E',
                }}>
                Starts From
              </h5>
            </div>
            <p>
              <span className="text-left-align mtb5 fs-5">{element?.date1}</span>
              <span className="text-left-align mtb5 fs-5">{element?.date2}</span>
              <span className="text-left-align mtb5 fs-5">{element?.date3}</span>
            </p>
          </Card.Body>
        </Card>
      </Col>
    ));
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
                  <Row className="nomargin batch-head">Morning Batch Schedule</Row>
                  <Row xs={1} md={3} className="nomargin mt-2">
                    {getBatches()}
                  </Row>
                </div>
                <div className="mt-3">
                  <Row className="nomargin batch-head">Evening Batch Schedule</Row>
                  <Row xs={1} md={3} className="nomargin mt-2">
                    {getEveningBatches()}
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
                    <span className="floatRight">10,000</span>
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
                    <span className="floatRight">10,000</span>
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
                    onClick={() => createOrder()}
                    disabled={
                      !selectedMorningCheckboxes.length && !selectedEveningCheckboxes.length
                    }>
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
