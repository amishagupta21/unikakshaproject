import React, { useEffect } from 'react';
import { Button, Card, CardGroup, CardImg, Carousel, CarouselItem, Col, Container, Nav, Row } from 'react-bootstrap';
import ApiService from '../../../services/ApiService';
import { useLocation, useParams } from 'react-router-dom';
import { getByDisplayValue } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import './Payments.scss';
import {
    bannerLogoSvg,
    SuccessTick,
    PaymentTick
  } from '../../../assets/images';

  import axios from "axios";
  
const Payments = (params) => {
// console.log(course);

const courseData = params.course;


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

       

        // if (!result) {
        //     alert("Server error. Are you online?");
        //     return;
        // }
        // RAZORPAY_KEY_ID = "rzp_test_xOikuguYnrmtYd"
        // RAZORPAY_KEY_SECRET = "Pngnbv4asYJwI7prz7PS6yl3"
        

        // const { amount = 100, id: "order_id", currency = "INR" };

        //  "id": "order_KoynsHiR7891aP",
        // "entity": "order",
        // "amount": 500,
        // "amount_paid": 0,
        // "amount_due": 500,
        // "currency": "INR",
        // "receipt": "qwsaq1",
        // "offer_id": null,
        // "status": "created",
        // "attempts": 0,
        // "notes": [],
        // "created_at": 1670407266

        const orderId = "order_KptBeukbWqJacQ";

        const options = {
            key: "rzp_test_xOikuguYnrmtYd", // Enter the Key ID generated from the Dashboard
            amount: 500,
            currency: "INR",
            name: "Code Shastra",
            description: "Test Transaction",
            image: { bannerLogoSvg },
            order_id: orderId,
            handler: async function (response) {
                const data = {
                    orderCreationId: orderId,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                // const result = await axios.post("http://localhost:5000/payment/success", data);

                console.log(response);
                console.log(data.razorpayOrderId);
                console.log(data.razorpaySignature);
            },
            prefill: {
                name: "Velmurugan K",
                email: "velmurugan.k@codeshastra.com",
                contact: "8778697740",
            },
            notes: {
                address: "Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const getPaymentSuccess = () => {
      
        // let items = coureseVariantBatches?.map((element, index) => {
            
            return (
                <div className='d-flex align-items-center justify-content-center'>
                <div>
                    <div className='mt-2 mb-4 d-flex align-items-center justify-content-center'>
                    <img src={PaymentTick} className="payment-tick"></img>
                        <img src={SuccessTick}></img>
                        
                    </div>
                    <h3 className='payment-text text-center header mt-2 mb-4 '>Payment Successful!</h3>
                    <div className='content-box' >
                        <p className='text-primary text-center message1'> Transaction details</p>
                        <p className='text-primary text-center message2'>Transaction number : 123456789</p>
                        <p className='text-primary text-center message3'>Transaction Time : 07:00 PM, 17/11/2022</p>
                        <p className='text-primary text-center message1'> Course details</p>
                        <p className='text-primary text-center message2'>Batch name: {courseData?.course_title}</p>
                        <p className='text-primary text-center message3'>Batch type : {courseData?.variant_name}</p>
                        <p className='text-primary text-center message3'>Batch Time : 09:00 AM, 11/12/2022</p>
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

    return (
        <>
             {getPaymentSuccess()}
            <button className="App-link" onClick={displayRazorpay}>
                Pay ₹500
            </button>
        </>
    );
}

export default Payments;