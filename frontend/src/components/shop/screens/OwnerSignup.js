import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'
import styled from 'styled-components'
import LogGif from '../../../assets/images/owner.avif'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function ShopSignup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mail, setMail] = useState('');
  const [efs, setEfs] = useState('');

  const [formData, setFormData] = useState({
    "name": '',
    "phone": '',
    "mail": '',
    "password": '',
    "confirmPassword": '',
  });

  useEffect(() => {
    if (location.state?.passedData) {
      console.log("Passed data: ", location.state.passedData);
      setMail(location.state.passedData);
      setFormData((prevData) => ({
        ...prevData,
        mail: location.state.passedData,
      }));
    } else {
      console.log('No data passed in state.');
      navigate('/shop/otp_verification');
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneChange = (phone) => {
    setFormData({
      ...formData,
      phone: "+" + phone,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setEfs('Passwords do not match.');
      return;
    }
    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post('http://127.0.0.1:8000/api/register/', dataToSend);
      console.log(response);
      navigate('/shop/start_shop');
    } catch (error) {
      setEfs(error.message);
      console.error(error);
    }
  };

  return (
    <Page>
      <Container>
        <form style={{ height: '90vh' }} className='d-flex justify-content-center align-items-center'>
          <Row style={{ maxWidth: '900px' }} className='d-flex justify-content-center align-items-center'>
            <Col xs={12} className='d-flex justify-content-center align-items-center'>
              <GifImage src={LogGif} alt='image' />
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Owner Fulll Name"
                className="mb-3 w-100"
              >
                <Form.Control type="text" name='name' onChange={handleChange} value={formData.name} required />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={6}>
                <PhoneInput
                  className='mb-3'
                  inputStyle={{height:"55px", width:'100%', fontSize:'18px'}}
                  country={'in'}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3 w-100"
              >
                <Form.Control type="text" name='mail' value={mail} required disabled />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3 w-100"
              >
                <Form.Control type="password" name='password' onChange={handleChange} value={FormData.password} required />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel
                controlId="floatingInputConfirm"
                label="Confirm Password"
                className="mb-3 w-100"
              >
                <Form.Control
                  type="password"
                  name='confirmPassword'
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                />
              </FloatingLabel>
            </Col>
            {/* Error message for password mismatch */}
            {efs && <Col xs={12} className='text-danger'>{efs}</Col>}
            {/* <Link to={"/shop/otp_verification"} className='text-center'> */}
            <Button type='submit' onClick={handleSubmit} style={{ width: '50%' }} variant='info' > Get OTP </Button>
            {/* </Link> */}
          </Row>
        </form>
      </Container>
    </Page>
  )
}

const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 100vw;
  }
`
const GifImage = styled.img`
  width: 40%;
`
export default ShopSignup