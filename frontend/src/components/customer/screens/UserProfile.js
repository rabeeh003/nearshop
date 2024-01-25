import React, { useEffect } from 'react'
import { Col, Image, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import dateFormat from "dateformat";
import Avathar from '../../../assets/images/userAvathar.gif'
import OrderHis from '../includes/Profile/OrderHis';
import LocationsTwoType from '../includes/Profile/LocationsTwoType';
import axios from 'axios';

const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function UserProfile() {
    const [show, setShow] = useState(false);
    const [allPayment, setPayment] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [editData, setEditData] = useState({
        "full_name": "",
        "phone_number": "",
        "email": "",
        "phone_two": null,
        "address": "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value
        });
    };

    const [signUpData, setSignUpData] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchShopId = () => {
            const adminKeyString = localStorage.getItem('userKey');
            if (adminKeyString) {
                const userKey = JSON.parse(adminKeyString);
                console.log('user id : ', userKey.id);
                setUserId(userKey.id);
            } else {
                console.log('adminKey not found in localStorage');
            }
        };

        fetchShopId();
    }, []);

    useEffect(() => {
        const fetchthem = async () => {
            try {
                if (userId !== null) {
                    const response = await axios.get(`https://www.nearbazar.shop/api/customer/${userId}/`);
                    setSignUpData(response.data);
                    setEditData({
                        ...editData,
                        full_name: response.data.full_name,
                        phone_number: response.data.phone_number,
                        phone_two: response.data.phone_two,
                        email: response.data.email,
                        address: response.data.address
                    });
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchthem();
    }, [userId, setEditData]);

    
    const updateUser = async () => {
        try {
            const response = await axios.put(`https://www.nearbazar.shop/api/customer/${userId}/`, editData);
            console.log('User data updated:', response.data);
            handleClose()
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };
    // fetch payment data
    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const paymentData = await axios.get("https://www.nearbazar.shop/api/s/payments/");
                console.log("paymentData", paymentData);
                const filterPayment = paymentData.data.filter(pay => pay.user === userId);
                console.log("filterPayment", filterPayment.data);
                setPayment(filterPayment);
            } catch (error) {
                console.log("Error fetching payment data", error);
            }
        };

        fetchPaymentData();
    }, [userId]);

    return (
        <Useer>
            <HeadHeight className='Row d-flex p-3'>
                <Col className='d-flex align-items-center justify-content-center'>
                    <Image src={Avathar} width={"40px"} alt='user' />
                </Col>
                <Col xs={9} style={{ paddingLeft: "10%" }} className='d-flex flex-column justify-content-around'>
                    <span className='b-500'>{signUpData.full_name}</span>
                    <span>{signUpData.phone_number}</span>
                </Col>
                <Col className='d-flex align-items-center'>
                    <span onClick={handleShow} >
                        Edit
                    </span>
                </Col>
            </HeadHeight>
            <Accordion >
                <Accordion.Item className='mb-4' eventKey="0" style={BoxShadow}>
                    <Accordion.Header>
                        <i style={{ fontSize: '25px' }} class="fa-solid fa-map-location-dot m-3 text-success"></i>
                        Locations
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListDiv >
                            <LocationsTwoType userId={userId} />
                        </ListDiv>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className='mb-4' style={BoxShadow}>
                    <Accordion.Header>
                        <i style={{ fontSize: '25px' }} class="fa-solid fa-file-invoice-dollar p-3 text-success"></i>
                        Payment History
                    </Accordion.Header>
                    <Accordion.Body className='p-0 m-0'>
                        {allPayment.map((payment, idx) => (
                            <ListDiv key={idx} className='border bottom-1' >
                                <ListItem>
                                    <span className='me-2'>{idx + 1}</span>
                                    <span>{dateFormat(payment.date_time)}</span>
                                    <span>{payment.method}</span>
                                    <span>{payment.price}</span>
                                </ListItem>
                            </ListDiv>
                        ))}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className='mb-4' style={BoxShadow}>
                    <Accordion.Header>
                        <i style={{ fontSize: '25px' }} class="fa-solid fa-bag-shopping m-3 text-success"></i>
                        Purchase History
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListDiv >
                            <OrderHis userId={userId} />
                        </ListDiv>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* Model code hear */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control name='full_name' value={editData.full_name} onChange={handleInputChange} />
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Number
                            </Form.Label>
                            <Col sm="10" className='d-flex align-items-center'>
                                {/* <Form.Control
                                    type="text"
                                    value={editData.phone_number}
                                    aria-label="Disabled input example"
                                    readOnly
                                /> */}
                                <span>{editData.phone_number}</span>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    value={parseInt(editData.phone_two)}
                                    name='phone_two'
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    value={editData.email}
                                    name='email'
                                    onChange={handleInputChange}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} value={editData.address} name='address' onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={updateUser}>Save</Button>
                </Modal.Footer>
            </Modal>
        </Useer>
    );
}

const Useer = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`

const HeadHeight = styled.div`
    height: 100px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 10px;
    margin: 30px 0;
`
const ListDiv = styled.div`
    list-style: none;
    width: 100%;
`
const ListItem = styled.li`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`

export default UserProfile