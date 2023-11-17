import React from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styled from 'styled-components';

function AddProdect() {
    return (
        <Page>
            <Container fluid>
                <Row className='bg-gray p-2 ' style={{ borderRadius: "10px" }}>
                    <Col xs={12} sm={4} md={3} className='d-flex align-items-center justify-content-center'>
                        <ImageFeald>
                            <image src='' />
                        </ImageFeald>
                    </Col>
                    <Col xs={12} sm={8} md={9} style={{}}>
                        <Col className='my-1'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Product Name"
                            >
                                <Form.Control type="text" />
                            </FloatingLabel>
                        </Col>
                        <Col className='my-1'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Category"
                            >
                                <Form.Control type="text" defaultValue='feed' disabled />
                            </FloatingLabel>
                        </Col>
                    </Col >
                    <Col xs={12} sm={10} className='d-flex my-1'>
                        <Col xs={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Wight Type"
                            >
                                <Form.Control type="text" defaultValue='KG' disabled />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Price"
                            >
                                <Form.Control type="number" />
                            </FloatingLabel>
                        </Col>
                    </Col>
                    <Col className='my-2'>
                        <Button style={{ height: '55px', width: '100%' }}>Add</Button>
                    </Col>
                </Row>
                <Row className='bg-gray mt-3 p-3' style={{ borderRadius: '10px', height: '60vh' }}>
                    <Col xs={12} className='d-flex pb-2' style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: "fit-content", borderBottom: '1px solid black' }}>
                        <HeadTest>No</HeadTest>
                        <HeadTest>Prodect Name</HeadTest>
                        <HeadTest>Count / KG</HeadTest>
                        <HeadTest>Price</HeadTest>
                        <HeadTest>Remove</HeadTest>
                    </Col>
                    <Col xs={12} className='d-flex pt-2' style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '100%' }}>
                        <HeadTest>1</HeadTest>
                        <HeadTest>Prodect Name</HeadTest>
                        <HeadTest>Count / KG</HeadTest>
                        <HeadTest>Price</HeadTest>
                        <HeadTest><i class="fa-regular fa-circle-xmark me-3"></i></HeadTest>
                    </Col>
                </Row>
            </Container>
        </Page>
    )
}

const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
const ImageFeald = styled.div`
    width: 100px;
    height: 100px;
    background-color: white;
    margin: 10px;
    @media screen and (max-width: 578px){
        width: 100px;
        height: 100px;
    }
`
const HeadTest = styled.span`
    @media screen and (max-width: 578px) {
        font-size: small;
    }
`
export default AddProdect