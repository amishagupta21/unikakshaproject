import {
    bannerLogoSvg
  } from '../../../assets/images';

  import axios from "axios";
  
const Payments = () => {    
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

        const result = await axios.post("https://api.razorpay.com/v1/orders")
console.log(result);
       

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

        const orderId = "order_KpJGDTLev2EqgU";

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

                console.log(data.razorpayPaymentId);
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
    return (
        <>            
        </>
    );
}

export default Payments;