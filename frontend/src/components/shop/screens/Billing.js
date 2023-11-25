import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styled from 'styled-components';

function Billing() {
    return (
        <Page>
            <Container fluid>
                <Row className='bg-gray p-2 d-flex pt-4' style={{ borderRadius: "10px" }}>
                    <Col xs={12} className='d-sm-none d-flex'>
                        <label style={{ width: "50%" }} className='form-control fs-6' ><b>Bill No : </b><br /> super-123234</label>
                        <label style={{ width: "50%" }} className='form-control fs-6' ><b>Date & Time : </b><br />21-11-23,10:11-PM</label>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Costumer Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" />
                        </FloatingLabel>
                    </Col>
                    <Col sm={3} md={2} lg={2} xl={1} className='d-none d-sm-flex '>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Bill No"
                            className="mb-3"
                        >
                            <label style={{ width: "fit-content" }} className='form-control' >super-123234</label>
                        </FloatingLabel>
                    </Col>
                    <Col sm={4} md={3} lg={3} xl={2} className='d-none d-sm-flex d-flex'>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Date & Time"
                            className="mb-3"
                        >
                            <label style={{ width: "fit-content" }} className='form-control' >21-11-23,10:11-PM</label>
                        </FloatingLabel>
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
                    <Col xs={12} className='d-flex pt-2' style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '70%' }}>
                        <HeadTest>1</HeadTest>
                        <HeadTest>Prodect Name</HeadTest>
                        <HeadTest>Count / KG</HeadTest>
                        <HeadTest>Price</HeadTest>
                        <HeadTest><i class="fa-regular fa-circle-xmark me-3"></i></HeadTest>
                    </Col>
                    <Col xs={12} className='d-flex pt-2' style={{  }}>
                        <Col xs={3} sm={3} lg={3} >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Totel"
                            >
                                <label style={{ MinWidth: "100px", maxWidth:'30vw'}} className='form-control' >2000</label>
                            </FloatingLabel>
                        </Col>
                        <Col xs={3} sm={3} lg={4}  >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Discount"
                            >
                                <label style={{ MinWidth: "80px"}} className='form-control' >2</label>
                            </FloatingLabel>
                        </Col>
                        <Col xs={3} sm={3} lg={3}  >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Grand"
                            >
                                <label style={{ MinWidth: "80px" }} className='form-control' >2008</label>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <Button style={{ height: '55px', width: '90%', marginLeft: "5px" }}>Print</Button>
                        </Col>
                    </Col>
                </Row>
                <Row className='bg-gray mt-3 pt-3' style={{ borderRadius: '10px' }}>
                    <Col xs={12} lg={7}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Product Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" />
                        </FloatingLabel>
                    </Col>
                    <Col xs={7} sm={8} lg={3} >
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Count / KG"
                            className="mb-3"
                        >
                            <Form.Control type="number" />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <Button style={{ height: '55px', width: '100%' }}>Add</Button>
                    </Col>
                </Row>
            </Container>
        </Page>
    )
}

const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  margin-bottom: 10px;
  @media screen and (max-width: 578px) {
    height: 100%;
    margin-bottom: 70px;
    max-width: 98vw;
  }
`

const HeadTest = styled.span`
    @media screen and (max-width: 578px) {
        font-size: small;
    }
`

export default Billing