import { getValue } from 'firebase/remote-config';
import React, { useEffect } from 'react';
import { Alert, Button, Col, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { workingRemote } from '../../../assets/images';
import { remoteConfig } from '../../../firebase/firebaseAuth';
import ApiService from '../../../services/ApiService';

const EntranceTest = ({ course, user }) => {
  const [testUrl, setTestUrl] = React.useState();

  const fetchInitialData = async () => {
    const payload = {
      uid: user?.uid,
      course_variant_id: course?.id,
    };
    let applicationDetails = await ApiService(
      '/student/application/detail-by-user-course',
      `POST`,
      payload,
      true
    );
    const { m_testurl } = applicationDetails?.data?.data.application;
    setTestUrl(m_testurl);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <>
      <Container className="d-flex">
        <Col className="d-flex justify-content-center">
          <img src={workingRemote}></img>
        </Col>
        <Col className="d-flex flex-column justify-content-around mx-5">
          {testUrl ? (
            <>
              <div className="d-flex justify-content-center">
                <Button onClick={() => window.open(testUrl)} variant="outline-secondary">
                  Take Test
                </Button>
              </div>
              <div className="copy-text">
                <Form.Control type="text" className="text" value={testUrl} readOnly />
                <Button
                  variant="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(testUrl);
                  }}>
                  <i className="bi bi-files"></i>
                </Button>
              </div>
              <div className="text-center">
                After taking the test please go back to{' '}
                <span className="text-secondary">&quot;My Course&quot;</span> section to complete
                the application.
              </div>
            </>
          ) : (
            <Alert className="d-flex justify-content-center">Loading test data!</Alert>
          )}
        </Col>
      </Container>
    </>
  );
};

export default EntranceTest;
