import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import LogGif from '../../assets/images/signup.gif'


const Card = styled.div`
  padding: 30px 40px;
  margin-top: 60px;
  margin-bottom: 60px;
  border: none !important;
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
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <Container fluid>
            <div className="px-1 py-5 mx-auto">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                        <Card>
                            <h4 className="text-center h4 mb-4">Signup</h4>
                            <FormContainer onSubmit={handleSubmit}>
                                <Row className='d-flex w-100'>
                                    <Col xs={12} md={6} className='d-flex justify-content-center align-items-center'>
                                        <GifImage src={LogGif} alt='image' />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Full Name<span className="text-danger"> *</span></FormLabel>
                                            <FormInput type="text" id="fname" name="fname" placeholder="Enter your full name" />
                                        </FormGroup>

                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Mail<span className="text-danger"> *</span></FormLabel>
                                            <FormInput type="text" id="email" name="email" placeholder="Enter your mail" />
                                        </FormGroup>
                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Phone number<span className="text-danger"> *</span></FormLabel>
                                            <FormInput type="text" id="mob" name="mob" placeholder="Enter your Phone" />
                                        </FormGroup>
                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Phone number</FormLabel>
                                            <FormInput type="text" id="mob" name="mob" placeholder="Enter your Phone 2" />
                                        </FormGroup>
                                        <FormGroup >
                                            <FormLabel className="form-control-label px-3">Address<span className="text-danger"> *</span></FormLabel>
                                            <FormInput type="text" id="ans" name="ans" placeholder="Enter your Address" />
                                        </FormGroup>
                                        <div className="row d-column">
                                            <Button type='submit' className='btn'> Get OTP </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </FormContainer>
                        </Card>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UserSignup;