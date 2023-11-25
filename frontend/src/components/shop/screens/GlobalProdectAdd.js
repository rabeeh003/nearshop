import React from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styled from 'styled-components';

function GlobalProdectAdd() {
    return (
        <Page>
            <Container fluid>
                <Row className='bg-gray p-2 ' style={{ borderRadius: "10px" }}>
                    <Col xs={12} sm={4} md={3} className='d-flex flex-column align-items-center justify-content-center'>
                        <ImageFeald>
                            <image src='' />
                        </ImageFeald>
                        <Form.Group controlId="formFileSm" className="mb-3">
                            <Form.Control type="file" size="sm" />
                        </Form.Group>
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
                                <Form.Select aria-label="Default select example">
                                    <option  hidden>Select Category</option>
                                    <option value="grosary">Grosary</option>
                                    <option value="pack">Packets</option>
                                    <option value="meets">Meets</option>
                                    <option value="vegetable">Vegetable</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>

                        <Col xs={12}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Wight Type"
                            >
                                <Form.Select aria-label="Default select example">
                                    <option hidden>Select wight</option>
                                    <option value="kg">KG</option>
                                    <option value="count">COUNT</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>

                    </Col>
                    <Col xs={12}>
                        <FloatingLabel className='my-1' controlId="floatingTextarea2" label="Comments">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col className='my-2'>
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
  @media screen and (max-width: 578px) {
    height: 100%;
    margin-bottom: 80px;
    max-width: 98vw;
  }
`
const ImageFeald = styled.div`
    width: 90%;
    height: 80%;
    background-color: white;
    margin: 10px;
    @media screen and (max-width: 578px){
        width: 200px;
        height: 200px;
    }
`
const HeadTest = styled.span`
    @media screen and (max-width: 578px) {
        font-size: small;
    }
`
export default GlobalProdectAdd