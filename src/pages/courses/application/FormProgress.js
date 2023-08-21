import React from 'react';
import { Step, Stepper } from 'react-form-stepper';
import './FormProgress.scss';

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

const MultiStepBar = ({
  page,
  onPageNumberClick,
  testResults,
  courseTitle,
  application,
  setPage,
  onPageNumberClick_,
}) => {
  const hasTakenEntranceTest = status.includes(testResults?.applicationStatus);

  console.log(page, onPageNumberClick, '//////////page');

  const onStepperClick = (page) => {
    onPageNumberClick(page);
  };

  const onStepperClick_ = (page) => {
    onPageNumberClick_(page);
  };

  const jobReadyProgramCourse = 'Job Ready Program';
  const fullStackWebDevelopmentCourse = 'Full Stack Web Development';
  const industryReadyProgram = 'Industry Ready Program';

  return (
    <>
      {(courseTitle || application) === fullStackWebDevelopmentCourse && (
        <Stepper activeStep={page}>
          <Step onClick={() => onStepperClick(0)} label="Personal Details" />
          <Step onClick={() => onStepperClick(1)} label="Education & Work Details" />
          <Step onClick={() => onStepperClick(2)} label="Entrance Test" />
          <Step onClick={() => onStepperClick(3)} label="Test Result" />
          <Step onClick={() => onStepperClick(4)} label="Application Status" />

          <Step onClick={() => onStepperClick(5)} label="Payment" />
          <Step onClick={() => onStepperClick(6)} label="KYC & Documents" />
          <Step onClick={() => onStepperClick(7)} label="Enrollment Status" />
        </Stepper>
      )}

      {(courseTitle === jobReadyProgramCourse ||
        application === jobReadyProgramCourse ||
        (courseTitle || application) === industryReadyProgram) && (
        <Stepper activeStep={page}>
          <Step onClick={() => onStepperClick_(0)} label="Personal Details" />
          <Step onClick={() => onStepperClick_(1)} label="Education & Work Details" />
          <Step onClick={() => onStepperClick_(2)} label="Payment" />
          <Step onClick={() => onStepperClick_(3)} label="KYC & Documents" />
          <Step onClick={() => onStepperClick_(4)} label="Enrollment Status" />
        </Stepper>
      )}
    </>
  );
};

export default MultiStepBar;
