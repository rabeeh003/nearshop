import React, { useState } from 'react'
import { Row, Col, Dropdown, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

// Add Location Model
function AddLocation(props) {
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i class="fa-solid fa-map"></i> Add Location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Map Hear
            </Modal.Body>
        </Modal>
    );
}

// CheckOut page code started
const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    padding: '10px'
}

function CheckOut() {
    const [showNoti, setShowNoti] = React.useState(false);
    
    return (
        <Page>
            <Row>
                <Col md={6} xs={12}>
                    <div style={BoxShadow} className='mb-4 rounded'>
                        <div>
                            <div className='d-flex flex-column w-100'>
                                <Row className=''>
                                    <Col style={{ minWidth: 'fit-content' }} className="d-flex align-items-center">
                                        <ProIcon src='' />
                                        <ShopName className='h5 m-2 m-sm-4'>Name</ShopName>
                                    </Col>
                                </Row>
                                <Row className='w-100'>
                                    <Col className='d-flex align-items-center justify-content-around'>
                                        <CartDet><b>Total items : </b>3</CartDet>
                                        <CartDet><b>Total price : </b>$300</CartDet>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div>
                            <Items>
                                <Row className='w-100 d-flex align-items-center'>
                                    <Col xs={2} sm={1} className='d-flex align-items-center justify-content-end' >1</Col>
                                    <Col className='d-sm-block d-md-flex justify-content-between'>
                                        <div>
                                            <ItemImage src='' />
                                            <ItemText>Tomato</ItemText>
                                        </div>
                                        <div className='d-flex w-auto justify-content-around align-items-center'>
                                            <ItemText className='m-3' >$123</ItemText>
                                            <div className='d-flex align-items-center '>
                                                <ItemText>2 kg</ItemText>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Items>
                        </div>
                    </div>
                </Col>
                <Col>
                    <span>Total</span>
                    <div className='text-center ' style={{ width: '100%', height: '20vh', fontSize: '50px', fontWeight: '500' }}>
                        ₹ 150
                    </div>
                    <div className='m-auto' style={{maxWidth:"500px"}}>
                        <Form.Select aria-label="Delivery Location" className='mb-2'>
                            <option hidden>Chose Location</option>
                            <option value="1">Home</option>
                            <option value="2">Office</option>
                            <option onClick={''}>Add New</option>
                        </Form.Select>
                        <Form.Select aria-label="Payment Type">
                            <option hidden>Select Payment Type</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                    <div className='text-center' style={{ width: '100%', fontSize: '50px', fontWeight: '500' }}>
                        <Button variant='success' className='py-2 px-5'> Pay</Button>
                    </div>
                </Col>
            </Row>
        </Page>
    )
}

const Page = styled.div`
    padding: 10px 20px;
    max-width: 90vw;
    margin: auto;
    align-items: center;
    @media screen and (max-width: 578px) {
        max-width: 98vw;
    }
`
const ProIcon = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    @media screen and (max-width: 578px) {
        height: 30px;
        width: 30px;
    }
`
const ShopName = styled.span`
    font-weight: 600;
    @media screen and (max-width: 578px) {
        font-size: 18px;
    }
`
const CartDet = styled.span`
    font-size: 15px;
    @media screen and (max-width: 578px) {
        font-size: 12px;
    }
`
const Items = styled.div`
    background-color: #e6e8e7;
    display: flex;
    align-items: center;
    border-radius: 8px;
    margin: 10px;
`
const ItemImage = styled.img`
    height: 80px;
    width: 80px;
    margin: 10px;
    @media screen and (max-width: 578px) {
        height: 40px;
        width: 40px;
        margin: 5px;
    }
`
const ItemText = styled.span`
    font-size: 20px;
    font-weight: 600;
    @media screen and (max-width: 578px) {
        font-size: 15px;
        font-weight: 500;
    }
`
export default CheckOut