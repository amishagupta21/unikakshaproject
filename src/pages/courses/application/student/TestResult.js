import { failedbadge, badge, congrats1 } from '../../../../assets/images';
import { Row, Button } from 'react-bootstrap';
import { remoteConfig } from '../../../../firebase/firebaseAuth';
import { getValue } from 'firebase/remote-config';
import './TestResult.scss';
import { useEffect } from 'react';

const staticContents = {
  successMessage1: 'You have successfully cleared the test with',
  successMessage2: (marks) => `${marks}%`,
  failedMessage1: 'Thank you for applying to the course!',
  failedMessage2: 'Unfortunately you did not meet our application criteria at this point of time.',
  failedMessage3: 'You can apply again after 30 days!',
  failedMessage4: 'Thank you!',
};

const TestResult = ({ nextPage, testResult, userName }) => {
  const { applicationStatus, marks } = testResult;
  return (
    <>
      {!(applicationStatus === 'Assessment Failed') ? (
        <div className="d-flex flex-column m-auto">
          <div className="d-flex justify-content-center">
            <img className="me-2 mw-50" src={congrats1} alt="success" />
          </div>
          <div className="d-flex passed-container border border-secondary border-1 flex-column text-center my-4 justify-content-center ">
            <div className="mt-3">
              <img style={{ margin: 'auto', maxWidth: '10%' }} src={badge} />
              <p className="my-2 text-primary marks-title">
                You have successfully cleared the test with
              </p>
              <p className="my-2 marks">{staticContents.successMessage2(marks)}</p>
              <p className="my-2 text-primary">
                You will get a call from Admission counsellor within next 72 hours{' '}
              </p>
              <p className="text-secondary stay-tuned">Stay Tuned!</p>
            </div>
          </div>
          <div className="mb-4 status text-primary text-center">
            Your application is being reviewed by our team.
          </div>
          <div className="m-auto">
            <Button
              size="lg"
              className="px-5"
              variant="secondary"
              type="button"
              onClick={() => nextPage()}>
              Application Status
            </Button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column m-auto">
          <div className="d-flex justify-content-center">
            <h3 className="text-primary username">{`Hey ${userName}!`}</h3>
          </div>
          <div className="d-flex failed-container border border-secondary border-1 flex-column text-center my-4 justify-content-center ">
            <div className="mt-3">
              <img style={{ margin: 'auto', maxWidth: '10%' }} src={failedbadge} />
              <p className="my-2 text-primary failedMessage1">{staticContents.failedMessage1}</p>
              <p className="my-2 text-primary">{staticContents.failedMessage2}</p>
              <p className="my-2 text-primary">{staticContents.failedMessage3}</p>
              <p className="text-secondary failedMessage4">{staticContents.failedMessage4}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestResult;
