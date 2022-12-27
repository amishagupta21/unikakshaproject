import { Step, Stepper } from 'react-form-stepper';
import './StudentFormProgress.scss'

const MultiStepBar = ({ page, onPageNumberClick }) => {
  const onStepperClick = page => {
    onPageNumberClick(page);
  };

  return (
    <>
      <Stepper activeStep={page}>
        <Step onClick={() => onStepperClick(0)} label="Personal Details" />
        <Step onClick={() => onStepperClick(1)} label="Education Details" />
        <Step onClick={() => onStepperClick(4)} label="Application Status" />
        <Step onClick={() => onStepperClick(5)} label="Payment" />
        <Step onClick={() => onStepperClick(7)} label="Enrollment Status" />
      </Stepper>
    </>
  );
};

export default MultiStepBar;
