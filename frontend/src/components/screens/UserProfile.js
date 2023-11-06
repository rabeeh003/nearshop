import React from 'react'
import { Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link, Form } from 'react-router-dom';
import styled from 'styled-components';

import OrderHis from '../includes/Profile/OrderHis';
import LocationsTwoType from '../includes/Profile/LocationsTwoType';

const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function UserProfile() {
    return (
        <Useer>
            <HeadHeight className='Row d-flex'>
                <Col xs={10} style={{ paddingLeft: "10%" }} className='d-flex flex-column justify-content-around'>
                    <span>User Name</span>
                    <span>9080706050</span>
                </Col>
                <Col className='d-flex align-items-center'>
                    <Link to={''} >
                        Edit
                    </Link>
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
// for Order History



export default UserProfile