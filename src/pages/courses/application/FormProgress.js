import { Step, Stepper } from 'react-form-stepper';
import './FormProgress.scss';
import { useState } from 'react';

const status = [
  'Assessment Passed',
  'Assessment Failed',
  'Application In Review',
  'Application Rejected',
  'Application Approved',
  'Payment Failed',
  'Payment Successfull',
  'Enrolment Rejected',
  'Enrolment Approved',
  'Enrolment Pending',
];

const MultiStepBar = ({ page, onPageNumberClick, testResults }) => {
  let hasTakenEntranceTest = true;


  if(status.includes(testResults?.applicationStatus) ){
    // console.log("hello")
     hasTakenEntranceTest = true
  }

  const onStepperClick = (page) => {
    onPageNumberClick(page);
  };

  return (
    <>
      <Stepper activeStep={page}>
        <Step onClick={() => onStepperClick(0)} label="Personal Details" />
        <Step onClick={() => onStepperClick(1)} label="Education & Work Details" />
        {hasTakenEntranceTest ? (
          <Step
            disabled={hasTakenEntranceTest}
            onClick={() => onStepperClick(3)}
            label="Entrance Test"
          />
        ) : (
          <Step onClick={() => onStepperClick(3)} label="Entrance Test" />
        )}

        <Step onClick={() => onStepperClick(3)} label="Test Result" />
        <Step onClick={() => onStepperClick(4)} label="Application Status" />
        <Step onClick={() => onStepperClick(5)} label="Payment" />
        <Step onClick={() => onStepperClick(6)} label="KYC & Documents" />
        <Step onClick={() => onStepperClick(7)} label="Enrollment Status" />
      </Stepper>
    </>
  );
};

export default MultiStepBar;
