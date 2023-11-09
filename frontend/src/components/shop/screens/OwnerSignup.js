import React from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'
import styled from 'styled-components'
import LogGif from '../../../assets/images/owner.avif'
import { Link } from 'react-router-dom'

function ShopSignup() {
  return (
    <Page>
      <Container>
        <form style={{ height: '90vh' }} className='d-flex justify-content-center align-items-center'>
          <Row style={{ maxWidth: '900px' }} className='d-flex justify-content-center align-items-center'>
            <Col xs={12} className='d-flex justify-content-center align-items-center'>
              <GifImage src={LogGif} alt='image' />
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Owner Fulll Name"
                className="mb-3 w-100"
              >
                <Form.Control type="text" placeholder="" required />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Phone"
                className="mb-3 w-100"
              >
                <Form.Control type="text" placeholder="" required />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3 w-100"
              >
                <Form.Control type="email" placeholder="" required />
              </FloatingLabel>
            </Col>
            <Col xs={12} md={6}>
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3 w-100"
              >
                <Form.Control type="password" placeholder="" required />
              </FloatingLabel>
            </Col>
            <Link to={"/shop/otp_verification"} className='text-center'>
              <Button type='submit' style={{ width: '50%' }} variant='info' > Get OTP </Button>
            </Link>
          </Row>
        </form>
      </Container>
    </Page>
  )
}

const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 100vw;
  }
`
const GifImage = styled.img`
  width: 40%;
`
export default ShopSignup