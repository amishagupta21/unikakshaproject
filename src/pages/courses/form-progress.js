import { Step, Stepper } from 'react-form-stepper';
import './form-progress.scss'

const MultiStepBar = ({ page, onPageNumberClick }) => {
  const onStepperClick = page => {
    onPageNumberClick(page);
  };

  return (
    <>
      <Stepper activeStep={page} style={{ margin: '10px 0 10px 0' }}>
        <Step onClick={() => onStepperClick(0)} label="Personal Details" />
        <Step onClick={() => onStepperClick(1)} label="Education & Work Details" />
        <Step onClick={() => onStepperClick(2)} label="Entrance Test" />
        <Step onClick={() => onStepperClick(3)} label="Test Result" />
        <Step onClick={() => onStepperClick(4)} label="Application Status" />
        <Step onClick={() => onStepperClick(5)} label="Payment" />
        <Step onClick={() => onStepperClick(6)} label="KYC & Documents" />
      </Stepper>
    </>
  );
};

export default MultiStepBar;
