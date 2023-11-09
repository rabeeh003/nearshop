import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import LogGif from '../../../assets/images/login.gif'
import styled from 'styled-components'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';

function UserLogin() {
  return (
    <Page>
      <Container>
        <Form>
          <Row style={{ height: "90vh" }} className='d-flex justify-content-center align-items-center'>
            <Col xs={12} md={6} className='d-flex flex-column justify-content-center align-items-center' >
              <GifImage src={LogGif} alt='image' />
              <FloatingLabel
                controlId="floatingInput"
                label="Phone"
                className="mb-3 w-100"
              >
                <Form.Control type="number" placeholder="" max='10' required />
              </FloatingLabel>
              <Link to={'/otp_verification'} className='text-center'>
                <Button variant='success' type='submit' className='btn'> Get OTP </Button>
              </Link>

            </Col>
          </Row>
        </Form>
      </Container>
    </Page>
  )
}

const Page = styled.div`
  max-width: 90vw;
  height: 60vh;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
const GifImage = styled.img`
  width: 100%;
`

export default UserLogin