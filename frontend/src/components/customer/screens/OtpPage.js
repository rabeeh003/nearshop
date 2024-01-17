import LogGif from '../../../assets/images/otp_gif.gif'
import React, { useState } from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from '../../../config/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

function OtpPage() {
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState('');
  const [numErr, setNumErr] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      console.log(phone);
      console.log('start');
      const response = await axios.post('https://www.nearbazar.shop/api/signin/', { phone_number: phone });
      console.log('checked');
      if (response.data.exists) {
        // If the phone number is already registered
        setNumErr('This phone number is already registered');
      } else {
        // If the phone number is not registered
        setNumErr('');
  
        // Assuming `auth` is your Firebase auth instance
        const recapcha = new RecaptchaVerifier(auth, "recapcha", {});
        const confirmation = await signInWithPhoneNumber(auth, phone, recapcha);
        setUser(confirmation);
      }
    } catch (err) {
      console.log(err);
      try {
        setNumErr('');
  
        // Assuming `auth` is your Firebase auth instance
        const recapcha = new RecaptchaVerifier(auth, "recapcha", {});
        const confirmation = await signInWithPhoneNumber(auth, phone, recapcha);
        setUser(confirmation);
      } catch (error) {
        setNumErr('somthing when wrong');
      }
    }
  };

  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp)
      console.log(data);
      navigate('/signup', { state: { passedData: phone } });
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <Page className='container-fluid'>
      <div className="row justify-content-center" style={{ height: "80vh" }}>
        <div className="col-12 col-md-6 col-lg-4">
          <Card className="card">
            <Col xs={12} className='d-flex justify-content-center align-items-center'>
              <GifImage src={LogGif} alt='image' />
            </Col>
            <CardBody className="card-body">
              <h4>Verify for Signup</h4>
              <p>Enter Your Number :</p>
              <Col className='d-flex justify-content-center'>
                <PhoneInput
                  className='w-auto'
                  country={'in'}
                  value={phone}
                  onChange={(phone) => setPhone("+" + phone)}
                />
              </Col>
              {numErr && <p style={{ color: 'red', fontSize: '13px' }}>{numErr}</p>}
              <VerifyButton className="btn btn-success" onClick={sendOtp} disabled={!phone}>
                Get OTP
              </VerifyButton>
              <div id='recapcha' className='w-100 d-flex justify-content-center'></div>
              <p>Enter OTP Code</p>
              <Col className='w-100'>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="O T P"
                  style={{ width: "40%" }}
                />
              </Col>

              <VerifyButton onClick={verifyOtp} className="btn btn-success" disabled={!otp}>
                Verify
              </VerifyButton>
              <ResendLink className="resend text-muted mb-0">
                {/* Didn't receive code? <Link to={-1}>Request again</Link> */}
              </ResendLink>
            </CardBody>
            <p className='mt-4 text-center'>I have an account ? <Link to={'/login'} className='ms-2'>Signin</Link></p>
          </Card>
        </div>
      </div>
    </Page>
  );
}

const Page = styled.div`
  max-width: 90vw;
  height: 60vh;

  margin: auto;
  @media screen and (max-width: 578px) {
    height: 100vh;
    margin-bottom: 80px;
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

const Input = styled.input`
  height: 45px;
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
export default OtpPage