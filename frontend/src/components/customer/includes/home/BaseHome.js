import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import locgif from '../../../../assets/images/location.gif';
function BaseHome() {
    return (
        <Container>
            <Row>
                <Col className='d-flex align-items-center' md='6' xs='12'>
                    <div>
                        <h1>Where is your location</h1>
                        <p>select your location then list the best offer for you</p>
                        <Button variant='success' className='mt-3'>Add Location</Button>
                    </div>
                </Col>
                <Col>
                    <Image width={"100%"} src={locgif} />
                </Col>
            </Row>
        </Container>
    )
}

export default BaseHome