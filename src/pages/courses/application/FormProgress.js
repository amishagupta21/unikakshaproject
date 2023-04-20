import { Step, Stepper } from 'react-form-stepper';
import './FormProgress.scss';
import { useState } from 'react';

const MultiStepBar = ({ page, onPageNumberClick,testResults }) => {

  let hasTakenEntranceTest = false;
  // console.log(testResults.applicationStatus)
  if(testResults?.applicationStatus ){
     hasTakenEntranceTest = true
  }

  console.log("here",hasTakenEntranceTest);

  const onStepperClick = (page) => {
    onPageNumberClick(page);
  };

  return (
    <>
      <Stepper activeStep={page}>
        <Step onClick={() => onStepperClick(0)} label="Personal Details" />
        <Step onClick={() => onStepperClick(1)} label="Education & Work Details" />
        <Step disabled={hasTakenEntranceTest} onClick={() => onStepperClick(3)} label="Entrance Test" />
        <Step onClick={() => onStepperClick(3)} label="Test Result" />
        <Step onClick={() => onStepperClick(4)} label="Application Status" />
        <Step onClick={() => onStepperClick(5)} label="Payment" />
        <Step onClick={() => onStepperClick(6)} label="KYC & Documents" />
        <Step onClick={() => onStepperClick(7)} label="Enrollment Status" />
      </Stepper>
    </>
  );
};
// const MultiStepBar = ({ page, onPageNumberClick }) => {
//   const [hasTakenEntranceTest, setHasTakenEntranceTest] = useState(false);

//   const onStepperClick = (page) => {
//     onPageNumberClick(page);
//   };

//   const onEntranceTestClick = () => {
//     setHasTakenEntranceTest(true);
//     onPageNumberClick(3); // Move to the next step after the Entrance Test
//   };

//   return (
//     <>
//       <Stepper activeStep={page}>
//         <Step onClick={() => onStepperClick(0)} label="Personal Details" />
//         <Step onClick={() => onStepperClick(1)} label="Education & Work Details" />
//         <Step onClick={() => onStepperClick(2)} label="Entrance Test" disabled={hasTakenEntranceTest} />
//         <Step onClick={() => onStepperClick(3)} label="Test Result" />
//         <Step onClick={() => onStepperClick(4)} label="Application Status" />
//         <Step onClick={() => onStepperClick(5)} label="Payment" />
//         <Step onClick={() => onStepperClick(6)} label="KYC & Documents" />
//         <Step onClick={() => onStepperClick(7)} label="Enrollment Status" />
//       </Stepper>

//       {!hasTakenEntranceTest && (
//         <button onClick={onEntranceTestClick}>Take Entrance Test</button>
//       )}
//     </>
//   );
// };

export default MultiStepBar;
