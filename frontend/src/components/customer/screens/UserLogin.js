import React, { useState } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import LogGif from '../../../assets/images/login.gif'
import styled from 'styled-components'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from '../../../config/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function UserLogin() {

  const [phone, setPhone] = useState('');
  const [user, setUser] = useState(null);
  const [tryser, setTryser] = useState(null);
  const [otp, setOtp] = useState('');
  const [res, setRes] = useState('');
  const [numberError, setNumberError] = useState('');
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate();

  const checkPhone = async () => {
    try {
      const response = await axios.post('https://www.nearbazar.shop/api/signin/', { phone_number: phone });
      console.log(response);
      setTryser(response.data)
      setNumberError('');
      return response.data;
    } catch (error) {
      console.log(error);
      setNumberError('Your entered number is not registered');
      // setNumberError(error.message);
      throw error;
    }
  };

  const sendOtp = async () => {
    try {
      const respo = await checkPhone();
      const recapcha = new RecaptchaVerifier(auth, "recapcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recapcha);
      setUser(confirmation);
      setRes(respo)
    } catch (error) {
      console.log(error);
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const data = await user.confirm(otp)
      console.log(data);
      localStorage.setItem('userKey', JSON.stringify(tryser));
      navigate('/');
    }
    catch (err) {
      console.log(err);
      setOtpError('Entered OTP is not correct')
    }
  };

  return (
    <Page>
      <Container>
        <Form>
          <Row style={{ height: "90vh" }} className='d-flex justify-content-center align-items-center'>
            <Col xs={12} md={6} className='d-flex flex-column justify-content-center align-items-center' >
              <h2>Login</h2>
              <GifImage src={LogGif} alt='image' />
              <PhoneInput
                className='w-auto'
                country={'in'}
                value={phone}
                onChange={(phone) => setPhone("+" + phone)}
              />
              {numberError && <p style={{ color: 'red', fontSize: '13px' }}>{numberError}</p>}
              <Button variant='success' onClick={sendOtp} className='btn my-4' disabled={!phone}> Get OTP </Button>

              <div id='recapcha'></div>
              <p className='mt-4' >Enter OTP Code</p>
              <Col className='w-100 text-center'>
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="O T P"
                  style={{ width: "40%", margin: "0" }}
                />
                {otpError && <p style={{ color: 'red', fontSize: '13px' }}>{otpError}</p>}
              </Col>
              <VerifyButton onClick={(e)=>verifyOtp(e)} className="btn btn-success" disabled={!otp}>
                Verify
              </VerifyButton>
            <p className='mt-4'>Don't have an account ? <Link to={'/signup'} className='ms-2'>Signup</Link></p>

            </Col>
          </Row>
        </Form>
      </Container>
    </Page>
  )
}

const Page = styled.div`
  max-width: 90vw;
  height: 60vh;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
    height: 90vh;
  }
`
const GifImage = styled.img`
  width: 100%;
`
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
`
const VerifyButton = styled.button`
  background-color: #0dcaf0;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
`
export default UserLogin