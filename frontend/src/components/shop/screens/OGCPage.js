import React from 'react'
import LogGif from '../../../assets/images/ogc.gif'
import styled from 'styled-components'
import { useState, useRef } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OGCPage() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef(otp.map(() => React.createRef()));

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

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
        <Page className='container-fluid'>
            <div className="row justify-content-center" style={{ height: "80vh" }}>
                <div className="col-12 col-md-6 col-lg-4" >
                    <Card className="card">
                        <Col xs={12} className='d-flex justify-content-center align-items-center'>
                            <GifImage src={LogGif} alt='image' />
                        </Col>
                        <CardBody className="card-body">
                            <h4>Verify</h4>
                            <p>Your code was sent to your cart page</p>
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
                                <Link to={'/shop/start_shop'} className='text-decoration-none' style={{ color: 'white' }}>
                                    Verify
                                </Link>
                            </VerifyButton>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Page>
    )
}

const Page = styled.div`
  max-width: 90vw;
  height: 60vh;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
const GifImage = styled.img`
  width: 100%;
`

const Card = styled.div`
  background-color: #fff;
  margin-bottom: 5px;
  margin-top: 5px;
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
`;

const CardBody = styled.div`
  padding: 20px, 5px;
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
  background-color: #0dcaf0;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
`;
export default OGCPage