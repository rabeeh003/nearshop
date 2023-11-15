import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

import LogGif from '../../../assets/images/signup.gif'
import { Link } from 'react-router-dom';


const Card = styled.div`
  padding: 30px 40px;
  
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
`;

const GifImage = styled.img`
  width: 100%;
`

const FormContainer = styled.form`
  margin: 0;
  padding: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  margin-bottom: 0;
`;

const FormInput = styled.input`
  padding: 8px 15px;
  border-radius: 5px !important;
  margin: 5px 0px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-size: 18px !important;
  font-weight: 300;

  &:focus {
    border: 1px solid #00BCD4;
    outline-width: 0;
    font-weight: 400;
  }
`;

const UserSignup = () => {
    const [formData, setFormData] = useState({
        "full_name": '',
        "phone_number": null,
        "email": '',
        "phone_two": null,
        "address": '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    function handleSubmit(e){
        e.preventDefault()
        console.log(formData)
        axios.post('http://127.0.0.1:8000/api/signup/', {"Customer":formData})
        .then(responce => console.log(responce))
        .catch(error => console.log(error))
    };

    return (
        <Container fluid>
            <div className="px-1 py-5 mx-auto">
                <Row className="d-flex justify-content-center">
                    <Col className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                        <Card>
                            <h4 className="text-center h4 mb-4">Signup</h4>
                            <form onSubmit={handleSubmit} method='post' >
                                <Row className='d-flex w-100'>
                                    <Col xs={12} md={6} className='d-flex justify-content-center align-items-center'>
                                        <GifImage src={LogGif} alt='image' />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Full Name<span className="text-danger"> *</span></FormLabel>
                                            <FormInput type="text" id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Enter your full name" />
                                        </FormGroup>

                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Mail<span className="text-danger"> *</span></FormLabel>
                                            <FormInput type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your mail" />
                                        </FormGroup>
                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Phone number<span className="text-danger"> *</span></FormLabel>
                                            <FormInput type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Enter your Phone" />
                                        </FormGroup>
                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Phone number</FormLabel>
                                            <FormInput type="text" id="phone_two" name="phone_two" value={formData.phone_two} onChange={handleChange} placeholder="Enter your Phone 2" />
                                        </FormGroup>
                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Address<span className="text-danger"> *</span></FormLabel>
                                            <FormInput type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your Address" />
                                        </FormGroup>
                                        <div className="row d-column">
                                            {/* <Link className='text-center'> */}
                                                <Button variant='success' type='submit' className='btn'> Get OTP </Button>
                                            {/* </Link> */}
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default UserSignup;