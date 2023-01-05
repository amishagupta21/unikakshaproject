import { AxiosError } from 'axios';
import React from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import ApiService from '../../../services/ApiService';

const AuthModal = ({ show, handleClose, email, sendOTP }) => {
  const [btnLoader, setBtnLoader] = React.useState(false);
  const [mobileNumber, setMobileNumber] = React.useState({ phone: '', data: '' });
  const [addMobileError, setAddMobileError] = React.useState('');

  const onExit = () => {
    setAddMobileError('');
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      phone: `+${mobileNumber.phone}`, 
      email: email
    }
    ApiService('user/update', 'POST', payload, true).then((response) => {
      if(response instanceof AxiosError) {
        if(response.response.status !== 200) {
          setAddMobileError(response.response.data.message);
        }
      } else {
        if(response?.data?.code === 200) {
          onExit();
          sendOTP(payload.phone);
        } else {
          setAddMobileError(response?.data.message);
        }
      }
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <>
      <Modal centered dialogClassName="modal-10w" show={show} onHide={onExit}>
        <>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton={false} style={{ borderBottom: '0px' }}>
              <Modal.Title>Add Mobile Number</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              <p style={{ fontSize: '14px', color: '#8F8799', fontWeight: '400' }}>
                We do not have your mobile number. Please add it to complete the registration.
              </p>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: '14px', color: '#8F8799', fontWeight: '500' }}>
                  Enter mobile number
                </Form.Label>
                <PhoneInput
                  placeholder="Enter mobile number"
                  preferredCountries={['in']}
                  country={'in'}
                  value={''}
                  onChange={(phone, data) => {
                    setMobileNumber({phone, data});
                  }}
                  countryCodeEditable={false}
                />
              </Form.Group>
              {addMobileError && (
              <>
                <p style={{marginTop: '5px', marginBottom: '0px', color: 'red'}}>{addMobileError}</p>
              </>
            )}
            </Modal.Body>
            <Modal.Footer style={{ borderTop: '0px' }}>
              <Button
                variant="secondary"
                style={{ width: '100%' }}
                type="submit"
                disabled={btnLoader}>
                {btnLoader && (
                  <>
                    <Spinner
                      style={{ marginRight: '10px' }}
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </>
                )}
                Link Mobile Number
              </Button>
            </Modal.Footer>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default AuthModal;
