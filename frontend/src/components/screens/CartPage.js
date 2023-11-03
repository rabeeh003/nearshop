import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function CartPage() {
    return (
        <Page>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
            {Array.from({ length: 4 }).map((_, idx) => (
                <Accordion.Item eventKey={idx}>
                    <Accordion.Header>
                        <div className='d-flex flex-column w-100'>
                            <Row className=''>
                                <Col style={{ minWidth: 'fit-content' }} className="d-flex align-items-center">
                                    <ProIcon src='' />
                                    <ShopName className='h3'>Name</ShopName>
                                </Col>
                                <Col className='d-flex  justify-content-end m-3'>
                                    <Link to={'/'} className='text-reset text-decoration-none'>
                                        <ActioinBt className='btn btn-primary m-2'>Order Now</ActioinBt>
                                    </Link>
                                    {/* <Link to={'/'} className='btn btn-danger text-reset text-decoration-none m-2'>
                                    <ActioinBt>Cancel</ActioinBt>
                                </Link>
                                <Link to={'/'} className='btn btn-success text-reset text-decoration-none m-2'>
                                    <ActioinBt>Proceed</ActioinBt>
                                </Link>
                                <Link to={'/'} className='btn btn-success text-reset text-decoration-none m-2'>
                                    <ActioinBt>Pay</ActioinBt>
                                </Link>
                                <Link to={'/'} className='btn btn-outline-danger text-reset text-decoration-none m-2'>
                                    <ActioinBt style={{color:'red'}}>Canceld</ActioinBt>
                                </Link>
                                <Link to={'/'} className='btn btn-outline-info text-reset text-decoration-none m-2'>
                                    <ActioinBt style={{color:'blue'}}>OC-8996</ActioinBt>
                                </Link> */}
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
                                            <ItemBtn className="btn fa-solid fa-square-plus"></ItemBtn>
                                            <ItemText>2</ItemText>
                                            <ItemBtn className='btn fa-solid fa-square-minus' ></ItemBtn>
                                        </div>
                                    </div><i class=""></i>
                                </Col>
                                <Col xs={1} className='d-flex align-items-center justify-content-end'>
                                    <ItemBtn className='fa-regular fa-circle-xmark' ></ItemBtn>
                                </Col>
                            </Row>
                        </Items>
                        <Form.Group controlId="messageInput" className='mt-3'>
                            <Form.Control
                                type="text"
                                size="md"
                                placeholder="Type your message..."
                            />
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>
                ))}
            </Accordion>
        </Page>
    )
}

const Page = styled.div`
    padding: 10px 20px;
`
const ProIcon = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 4px;
    @media screen and (max-width: 578px) {
        height: 30px;
        width: 30px;
    }
`
const ShopName = styled.span`
    @media screen and (max-width: 578px) {
        font-size: 18px;
        font-weight: 600;
    }
`
const ActioinBt = styled.span`
    color: white;
    font-weight: 800;
    @media screen and (max-width: 578px) {
        font-size: 10px;
        font-weight: 600;
    }
`
const CartDet = styled.span`
    font-size: 18px;
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

export default CartPage