import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import LogGif from '../../../assets/images/signup.gif'
import { useLocation, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';


const Card = styled.div`
  padding: 30px 40px;
  
  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);
`;

const GifImage = styled.img`
  width: 100%;
`
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
    const location = useLocation();
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [efs, setEfs] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
        await axios.post('http://127.0.0.1:8000/api/signup/', formData)
            .then(responce => {
                console.log(responce)
                navigate('/');
            })
            .catch(error => {
                setEfs=(error.message)
                console.log(error)
            })
    };

    useEffect(() => {
        if (location.state?.passedData) {
            setPhone(location.state.passedData);
            setFormData((prevData) => ({
                ...prevData,
                phone_number: location.state.passedData,
            }));
        } else {
            navigate('/otp_verification');
        }
    }, [location.state, navigate]);

    return (
        <Container fluid>
            <div className="px-1 py-5 mx-auto">
                <Row className="d-flex justify-content-center">
                    <Col className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                        <Card>
                            <h4 className="text-center h4 mb-4">Signup</h4>
                            <form >
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
                                            <FormInput type="text" id="phone_number" name="phone_number" value={phone} disabled placeholder="Enter your Phone" />
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
                                            <Button variant='success' onClick={handleSubmit} type='submit' className='btn'> Create Account </Button>
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