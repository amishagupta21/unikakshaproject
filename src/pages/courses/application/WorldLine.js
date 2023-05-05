import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { bannerLogoSvg, PaymentFailure, SuccessTick } from '../../../assets/images';
import ApiService from '../../../services/ApiService';

const Worldline = (params) => {
  const { application, selectedBatch, id, worldLineStatus, courseId, setopenpayment } = params;

  let orderData;
  const createOrder = async () => {
    let payload = {
      application_id: application?._id,
      amount: 5,
      currency: 'INR',
      receipt: (Math.random() + 1).toString(36).substring(7),
    };
    let orderDetails = await ApiService('/order/create-order', `POST`, payload, true);
    if (orderDetails?.data?.code === 200) {
      return orderDetails?.data?.data;
    }
  };
  const handlePayment = async () => {
    orderData = await createOrder();
    params.nextPage();
  };

  async function worldLineApi(identifier) {
    const payload = {
      uid: application?.uid,
      orderItems: [
        {
          application_id: application?._id,
          course_id: courseId,
          batch_id: selectedBatch,
          registration_fee: 5,
          discount_coupon: '',
          discount_amount: 0,
          final_amount: 5,
          payment_id: identifier,
          order_id: orderData?.id,
          payment_status: 'Success',
        },
      ],
    };

    let orderDetails = await ApiService('/order/create-payment', `POST`, payload, true);
    params.nextPage();
  }

  $(document).ready(function () {
    function handleResponse(res) {
      if (
        typeof res != 'undefined' &&
        typeof res.paymentMethod != 'undefined' &&
        typeof res.paymentMethod.paymentTransaction != 'undefined' &&
        typeof res.paymentMethod.paymentTransaction.statusCode != 'undefined' &&
        res.paymentMethod.paymentTransaction.statusCode == '0300'
      ) {
        params.setWorldLineStatus('Success');
        worldLineApi(res?.paymentMethod?.paymentTransaction?.identifier);
        params.nextPage();
      } else if (
        typeof res != 'undefined' &&
        typeof res.paymentMethod != 'undefined' &&
        typeof res.paymentMethod.paymentTransaction != 'undefined' &&
        typeof res.paymentMethod.paymentTransaction.statusCode != 'undefined' &&
        res.paymentMethod.paymentTransaction.statusCode == '0398'
      ) {
        // initiated block
        // nextPage();
      } else {
        // error block
        params.setWorldLineStatus('Failed');
      }
    }

    $(document)
      .off('click', '#btnSubmit')
      .on(
        'click',
        '#btnSubmit',

        function addDropdown(e) {
          e.preventDefault();
          var configJson = {
            tarCall: false,
            features: {
              showPGResponseMsg: true,
              enableAbortResponse: true,
              enableExpressPay: true,
              enableNewWindowFlow: true, //for hybrid applications please disable this by passing false
            },

            //merchantid|txnId|totalamount|accountNo|consumerId|consumerMobileNo|consumerEmailId |debitStartDate|debitEndDate|maxAmount|amountType|frequency|cardNumber| expMonth|expYear|cvvCode|SALT

            // T858715|14822975810|10||||9876543210|test@test.com|||||||||2661547291EDVTPU

            // T858715|14822975811|5|||9876543210|test@test.com||||||||||2661547291EDVTPU

            consumerData: {
              deviceId: 'WEBSH2', //possible values 'WEBSH1' or 'WEBSH2'
              token:
                '0c87a0baaa43eca709ed1d06e0d92aece949a93e4034c2e106e1cba3cd95f24d15993a598e45e40c9a7f906d926fa3ff4db62d8e4cd55ef90368475c474029fb',
              //returnUrl:
              // 'https://www.tekprocess.co.in/MerchantIntegrationClient/MerchantResponsePage.jsp', //merchant response page URL
              returnUrl: '',
              responseHandler: handleResponse,
              paymentMode: 'all',
              merchantLogoUrl:
                'https://www.paynimo.com/CompanyDocs/company-logo-vertical-light.png', //provided merchant logo will be displayed
              merchantId: 'T858715',
              currency: 'INR',
              //consumerId: 'c964634',
              consumerMobileNo: '9876543210',
              consumerEmailId: 'test@test.com',
              txnId: '14822975811', //Unique merchant transaction ID
              items: [
                {
                  itemId: 'FIRST',
                  amount: '5',
                  comAmt: '0',
                },
              ],
              customStyle: {
                PRIMARY_COLOR_CODE: '#45beaa', //merchant primary color code
                SECONDARY_COLOR_CODE: '#FFFFFF', //provide merchant's suitable color code
                BUTTON_COLOR_CODE_1: '#2d8c8c', //merchant's button background color code
                BUTTON_COLOR_CODE_2: '#FFFFFF', //provide merchant's suitable color code for button text
              },
            },
          };

          $.pnCheckout(configJson);
          if (configJson.features.enableNewWindowFlow) {
            pnCheckoutShared.openNewWindow();
          }
        }
      );
  });

  return (
    <>
      <Button
        className="col-3"
        variant="secondary"
        type="button"
        id="btnSubmit"
        onClick={handlePayment}>
        Next
      </Button>
    </>
  );
};

export default Worldline;
