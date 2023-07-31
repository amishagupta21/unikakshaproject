import React, { useState,useEffect } from 'react'
import { Card, Row, Col, InputGroup, FormControl, Button, CardGroup, Form } from 'react-bootstrap';
import ApiService from '../../../services/ApiService';
import { calendar1 } from '../../../assets/images';

const CustomPyament = ({toggleCustomPayment,nextPage,setOrderData,application,courseId}) => {

    const [amount, setAmount] = useState(0); // Set the initial value to 2500 or any other default value

    const handleAmountChange = (event) => setAmount(event.target.value);
    
    
    const createOrder = async () => {
        let payload = {
          application_id: application?._id,
          amount: parseInt(amount),
          currency: 'INR',
          receipt: (Math.random() + 1).toString(36).substring(7),
        };
        let orderDetails = await ApiService('order/create-order', `POST`, payload, true);
        if (orderDetails?.data?.code === 200) {
            setOrderData(orderDetails.data.data);
            nextPage(6);
            toggleCustomPayment();
        }
      };
      const [batchDate, setBatchDate] = React.useState([]);
      const [eveningBatchDate, setEveningBatchDate] = React.useState([]);
    
      const batchSchedule = async () => {
        const res = await ApiService(`/admin/batch-Schedule/${courseId}`);
        const batchSchedule = res?.data?.data?.result[0].course_variant_sections.overview.batchShedule[0]?.morningBatch;
        // console.log("schedule",res?.data?.data?.result[0].course_variant_sections.overview.batchShedule[0]?.morningBatch)
        setBatchDate(batchSchedule)
      };
      const eveningbatchSchedule = async () => {
        const res = await ApiService(`/admin/batch-Schedule/${courseId}`);
        const eveningBatch=res?.data?.data?.result[0]?.course_variant_sections?.overview?.batchShedule[1]?.eveningBatch;
        setEveningBatchDate(eveningBatch)
      };
    
      useEffect(()=>{
        batchSchedule()
        eveningbatchSchedule()
      },[])
      const getBatches = () => {
        const items = batchDate?.map((element, index) => {
          return (
            <Col key={index} sm={3}>
              <Card className="batch-card-style">
                <Card.Body className="text-left-align">
                  <h6 className="font-color text-left-align mtb5"> Starts From </h6>
                  <p>
                    <img src={calendar1} alt="Calendar" className="calendar-icon" />
                    {/* <span className="text-left-align mtb5">{convertDate(element.start_date)}</span> */}
                    <span className="text-left-align mtb5">{element?.date1}</span>
                    <span className="text-left-align mtb5">{element?.date2}</span>
                    <span className="text-left-align mtb5">{element?.date3}</span>
                  </p>
    
                  {/* <Button
                    variant="secondary"
                    className={index == 0 ? '' : 'upcoming-btn'}
                    onClick={() => {
                      apply(courseDetails);
                    }}>
                    {' '}
                    {index == 0 ? 'Apply Now' : 'Upcoming'}{' '}
                  </Button> */}
                </Card.Body>
              </Card>
            </Col>
          );
        });
        return items;
      };
      const getEveningBatches = () => {
        const items = eveningBatchDate?.map((element, index) => {
          return (
            <Col key={index} sm={3}>
              <Card className="batch-card-style">
                <Card.Body className="text-left-align">
                  <h6 className="font-color text-left-align mtb5"> Starts From </h6>
                  <p>
                    <img src={calendar1} alt="Calendar" className="calendar-icon" />
                    {/* <span className="text-left-align mtb5">{convertDate(element.start_date)}</span> */}
                    <span className="text-left-align mtb5">{element?.date1}</span>
                    <span className="text-left-align mtb5">{element?.date2}</span>
                    <span className="text-left-align mtb5">{element?.date3}</span>
                  </p>
    
                  {/* <Button
                    variant="secondary"
                    className={index == 0 ? '' : 'upcoming-btn'}
                    onClick={() => {
                      apply(courseDetails);
                    }}>
                    {' '}
                    {index == 0 ? 'Apply Now' : 'Upcoming'}{' '}
                  </Button> */}
                </Card.Body>
              </Card>
            </Col>
          );
        });
        return items;
      };
    return (
        <>
            <div className="modal display-block">
                <section className="modal-main">
                    <div className="model-body">
                        <div className="modalheader">
                            <span>Please choose batch schedule below</span>
                            <span className="floatRight close-btn" onClick={toggleCustomPayment}>
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
                    {/* <div className="mt-3 coupon-div">
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
                    </div> */}
                    <div className="mt-3 model-body model-body-register">
                        <Row className="mt-2 nomargin amnt-list">
                            <Col md="7 nopadd">
                                <label>Amount</label>
                                <input
                                placeholder='Enter your amount here '
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    className="amount-input"
                                />
                            </Col>

                        </Row>
                        {/* <Row className="mt-2 nomargin btmborder amnt-list">
            <Col md="7 nopadd">Coupon discount</Col>
            <Col md="5 nopadd">
              <span className="floatRight">0</span>
            </Col>
          </Row>
          <Row className="mt-2 nomargin total-amnt">
            <Col md="7 nopadd">Total</Col>
            <Col md="5 nopadd">
              <span className="floatRight">2500</span>
            </Col>
          </Row> */}
                    </div>
                    <div className="mt-3 model-body">
                        <Row className="d-flex justify-content-end">
                            <Button
                                className="col-3 me-2 btn btn-outline-secondary"
                                variant="outline-secondary"
                                type="button"
                                onClick={toggleCustomPayment}
                                >
                                Cancel
                            </Button>
                            <Button
                                className="col-3"
                                variant="secondary"
                                type="button"
                                onClick={createOrder}>
                                <Col md="5 nopadd">
                                    <span className="floatRight">Pay {amount}</span>
                                </Col>
                            </Button>


                        </Row>
                    </div>
                </section>
            </div>
        </>
    )
}
export default CustomPyament