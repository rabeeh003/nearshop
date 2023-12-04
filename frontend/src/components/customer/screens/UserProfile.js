import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import OrderHis from '../includes/Profile/OrderHis';
import LocationsTwoType from '../includes/Profile/LocationsTwoType';
import axios from 'axios';

const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function UserProfile() {
    const [show, setShow] = useState(false);

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
    const [userId, setUserId] = useState();

    useEffect(() => {
        const fetchShopId = () => {
            const adminKeyString = localStorage.getItem('userKey');
            if (adminKeyString) {
                const userKey = JSON.parse(adminKeyString);
                setUserId(userKey.id);
                console.log('user id : ', userId);
            } else {
                console.log('adminKey not found in localStorage');
            }
        };

        fetchShopId();

    }, [userId]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/customer/${userId}/`);
                setSignUpData(response.data);
                setEditData({
                    ...editData,
                    full_name: response.data.full_name,
                    phone_number: response.data.phone_number,
                    phone_two:response.data.phone_two,
                    email: response.data.email,
                    address: response.data.address
                });
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (userId) {
            fetchData();
        }
    }, [userId]);
    const updateUser = async () => {
        try {
          const response = await axios.put(`http://127.0.0.1:8000/api/customer/${userId}/`, editData);
          console.log('User data updated:', response.data);
          handleClose()
        } catch (error) {
          console.error('Error updating user data:', error);
        }
      };
    return (
        <Useer>
            <HeadHeight className='Row d-flex p-3'>
                <Col xs={10} style={{ paddingLeft: "10%" }} className='d-flex flex-column justify-content-around'>
                    <span>Name  : {signUpData.full_name}</span>
                    <span>Phone : {signUpData.phone_number}</span>
                    <span>Email : {signUpData.email}</span>
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

                        <i style={{ fontSize: '25px' }} class="fa-solid fa-map-location-dot m-3"></i>
                        Locations
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListDiv >
                            <LocationsTwoType />
                        </ListDiv>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className='mb-4' style={BoxShadow}>
                    <Accordion.Header>
                        <i style={{ fontSize: '25px' }} class="fa-solid fa-file-invoice-dollar p-3"></i>
                        Payment History
                    </Accordion.Header>
                    <Accordion.Body className='p-0 m-0'>
                        <ListDiv className='p-0 m-0' >
                            <ListItem>
                                <span><span>1</span> date & time</span>
                                <span>Type</span>
                                <span>Price</span>
                            </ListItem>
                            <ListItem>
                                <span><span>1</span> date & time</span>
                                <span>Type</span>
                                <span>Price</span>
                            </ListItem>
                            <ListItem>
                                <span><span>1</span> date & time</span>
                                <span>Type</span>
                                <span>Price</span>
                            </ListItem>
                            <ListItem>
                                <span><span>1</span> date & time</span>
                                <span>Type</span>
                                <span>Price</span>
                            </ListItem>
                        </ListDiv>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className='mb-4' style={BoxShadow}>
                    <Accordion.Header>
                        <i style={{ fontSize: '25px' }} class="fa-solid fa-bag-shopping m-3"></i>
                        Purchase History
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListDiv >
                            <OrderHis />
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
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    value={editData.phone_number}
                                    aria-label="Disabled input example"
                                    readOnly
                                />
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