import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function OrderHis() {
    return (
        <Page className='user-select-nones'>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
            {Array.from({ length: 4 }).map((_, idx) => (
                <Accordion.Item eventKey={idx} style={BoxShadow} className='mb-4 rounded'>
                    <CartDet className='p-3'><b>Date : </b>21/12/2323</CartDet>
                    <Accordion.Header>
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
                    </Accordion.Header>
                    <Accordion.Body>
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
                    </Accordion.Body>
                </Accordion.Item>
                ))}
            </Accordion>
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
const ActioinBt = styled.span`
    color: white;
    font-size: 10px;
    font-weight: 600;
    @media screen and (max-width: 578px) {
        font-size: 9px;
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
const ItemBtn = styled.span`
    font-size: 25px;
`

export default OrderHis