import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import LogGif from '../../../assets/images/shoplogin.gif'
import styled from 'styled-components'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';

function ShopLogin() {
    return (
        <Page>
            <Container>
                <Form>
                    <Row style={{ height: "90vh" }} className='d-flex justify-content-center align-items-center'>
                        <Col xs={12} md={6} className='d-flex flex-column justify-content-center align-items-center' >
                            <GifImage src={LogGif} alt='image' />
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Gmail"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="email" placeholder="" required />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Password"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="password" placeholder="" required />
                            </FloatingLabel>
                            <Button type='submit' variant='info' > Login </Button>
                            <p className='mt-4'>Don't have an account?<Link to={'/shop/signup'} className='ms-2'>Signup</Link></p>

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

export default ShopLogin