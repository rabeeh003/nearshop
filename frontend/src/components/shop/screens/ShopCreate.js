import React from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function ShopCreate() {
    return (
        <Page>
            <Container>
                <form style={{}} className='d-flex justify-content-center align-items-center'>
                    <Row style={{ maxWidth: '900px' }} className='d-flex justify-content-center align-items-center'>
                        <Col xs={12} md={6}>
                            <BannerImg>
                                <Img src='' />
                            </BannerImg>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Banner Image</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <ProfileImg>
                                <ProImg src='' />
                            </ProfileImg>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Profile</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Shop Name"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" placeholder="" required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Description"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" placeholder="" required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Location"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" placeholder="" required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Place"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" placeholder="" required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email ( shop )"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="email" placeholder="" required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Phone ( shop )"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="number" placeholder="" required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Shop Id ( shop_name_123 )"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" placeholder="" required />
                            </FloatingLabel>
                        </Col>
                        <Link to={"/shop/otp_verification"} className='text-center'>
                            <Button type='submit' style={{ width: '50%' }} variant='info' > Create </Button>
                        </Link>
                        <div style={{ height: "90px" }}></div>
                    </Row>
                </form>
            </Container>
        </Page>
    )
}

const Page = styled.div`
  max-width: 90vw;
  height: 70vh;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 100vw;
  }
`
const BannerImg = styled.div`
    width: 100%;
    height: 100px;
    background-color: gray;
    margin-bottom: 10px;
    border-radius: 10px;
    @media screen and (max-width: 578px) {
        height: 100px;
    }
`
const Img = styled.img``
const ProfileImg = styled.div`
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 50%;
    background-color: gray;
    @media screen and (max-width: 578px) {
        width: 100px;
        height: 100px;
    }
`
const ProImg = styled.img``

export default ShopCreate