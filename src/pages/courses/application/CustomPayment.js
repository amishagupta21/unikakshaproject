import React, { useState, useEffect } from 'react'
import { Card, Row, Col, InputGroup, FormControl, Button, CardGroup, Form } from 'react-bootstrap';
import ApiService from '../../../services/ApiService';
import './paymentPopups.scss';

import { calendar1 } from '../../../assets/images';

const CustomPyament = ({ toggleCustomPayment, nextPage, setOrderData, application, courseId }) => {
    const MIN_AMOUNT = 500;

    const [amount, setAmount] = useState();
    const [validationMessage, setValidationMessage] = useState("");
    const [disablePaymentButton, setDisablePaymentButton] = useState(true);

    const handleAmountChange = (event) => {
        const input = event.target.value;

        const onlyNumbers = input.replace(/[^0-9]/g, '');
        const numberValue = parseInt(onlyNumbers);

        setAmount(onlyNumbers);

        if (!onlyNumbers) {
            setValidationMessage('');
            setDisablePaymentButton(true);
            return;
        }

        if (numberValue < MIN_AMOUNT || numberValue > 50000) {
            setValidationMessage('Amount must be between 500 and 50,000.');
            setDisablePaymentButton(true);
        } else {
            setValidationMessage('');
            setDisablePaymentButton(false);
        }
    };
    const createOrder = async () => {
        if (amount < MIN_AMOUNT) {
            setValidationMessage('Amount must be greater than or equal to 500.');
            return;
        }

        let payload = {
            application_id: application?._id,
            amount: parseInt(amount),
            currency: 'INR',
            receipt: (Math.random() + 1).toString(36).substring(7),
        };
        if (courseId === "232c10ed-f4bf-4601-a7ed-14b743ae95d6"||courseId ==="c5ae492d-5d19-4549-8345-2ca8deb67fc2") {
            payload.application_id = courseId;
          }
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
        setBatchDate(batchSchedule)
    };
    const eveningbatchSchedule = async () => {
        const res = await ApiService(`/admin/batch-Schedule/${courseId}`);
        const eveningBatch = res?.data?.data?.result[0]?.course_variant_sections?.overview?.batchShedule[1]?.eveningBatch;
        setEveningBatchDate(eveningBatch)
    };

    useEffect(() => {
        batchSchedule()
        eveningbatchSchedule()
    }, [])
    const getBatches = () => {
        const items = batchDate?.map((element, index) => {
            return (
                <Col key={index} sm={3}>
                    <Card className="batch-card-style">
                        <Card.Body className="text-left-align">
                            <h6 className="font-color text-left-align mtb5"> Starts From </h6>
                            <p>
                                <img src={calendar1} alt="Calendar" className="calendar-icon" />
                                <span className="text-left-align mtb5">{element?.date1}</span>
                                <span className="text-left-align mtb5">{element?.date2}</span>
                                <span className="text-left-align mtb5">{element?.date3}</span>
                            </p>

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
                                <span className="text-left-align mtb5">{element?.date1}</span>
                                <span className="text-left-align mtb5">{element?.date2}</span>
                                <span className="text-left-align mtb5">{element?.date3}</span>
                            </p>


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

                    <div className="mt-3 model-body model-body-register">
                        <Row className="mt-2 nomargin amnt-list">
                            <Col md="7 nopadd">
                                <label>Amount :   </label>
                                <input
                                    placeholder="Enter your amount here"
                                    type="text"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    className="amount-input"
                                />
                                {validationMessage && <p className="text-danger">{validationMessage}</p>}
                            </Col>
                        </Row>
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
                                onClick={createOrder}
                                disabled={disablePaymentButton}
                            >
                                Pay {amount}
                            </Button>
                        </Row>
                    </div>
                </section>
            </div>
        </>
    )
}
export default CustomPyament