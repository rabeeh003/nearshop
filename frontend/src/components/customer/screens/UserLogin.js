import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import LogGif from '../../../assets/images/login.gif'
import styled from 'styled-components'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';

// otp model

function OtpModel(props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef(otp.map(() => React.createRef()));

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only allow numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '') {
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].current.focus();
      } else {
        // Last input field reached
        // You can trigger OTP verification here
      }
    } else if (index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };
  return (
    <Modal
      backdrop='static'
      className='user-select-none'
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered

    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          OTP
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4" style={{ minWidth: '500px' }}>
              <Card className="card">
                <CardBody className="card-body">
                  <h4>Verify</h4>
                  <p>Your code was sent to you via email</p>
                  <OtpField className="otp-field">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        type="text"
                        value={digit}
                        ref={inputRefs.current[index]}
                        onChange={(e) => handleOtpChange(e, index)}
                      />
                    ))}
                  </OtpField>
                  <VerifyButton className="btn btn-primary" disabled={!otp.every((digit) => digit !== '')}>
                    Verify
                  </VerifyButton>
                  <ResendLink className="resend text-muted mb-0">
                    Didn't receive code? <a href="">Request again</a>
                  </ResendLink>
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>

      </Modal.Body>
    </Modal>
  );
}

function UserLogin() {
  const [show, setShow] = useState(false);


  return (
    <Page>
      <Container>
        <Row style={{ height: "90vh" }}>
          <Col xs={12} className='d-flex flex-column justify-content-center align-items-center' >
            <GifImage src={LogGif} alt='image' />
            <FloatingLabel
              controlId="floatingInput"
              label="Phone Number"
              className="mb-3"
            >
              <Form.Control type="number" maxLength='8' placeholder="" />
            </FloatingLabel>
            <Button onClick={setShow}> Get OTP </Button>
            
          </Col>
        </Row>
      </Container>
      <OtpModel
        show={show}
        onHide={() => setShow(false)}
      />
    </Page>
  )
}

const Page = styled.div`
  width: 60%;
  margin: auto;
  margin-bottom: 20px;
@media screen and (max-width: 578px) {
  width:600px;
}
`

const GifImage = styled.img`
  width: 50%;
`

const Card = styled.div`
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 5px;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
`;

const CardBody = styled.div`
  padding: 20px;
  text-align: center;
`;

const OtpField = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  height: 45px;
  width: 42px;
  border-radius: 6px;
  outline: none;
  font-size: 1.125rem;
  text-align: center;
  border: 1px solid #ddd;
  margin: 3px;

  &:focus {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }
`;

const ResendLink = styled.p`
  font-size: 12px;
`;

const VerifyButton = styled.button`
  background-color: #0e9c42;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
`;




export default UserLogin