import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import locgif from '../../../../assets/images/location.gif';
function BaseHome() {
    return (
        <Container>
            <Row>
                <Col style={{height:"300px"}} className='d-flex align-items-center mt-4' md='6' xs='12'>
                    <div>
                        <h1 className='py-2 '>Select your location !</h1>
                        <p>Unlock a world of convenience by utilizing your device's location to unveil the nearest shops and exclusive offers tailored just for you. Experience the joy of discovering hidden gems in your area while enjoying the best deals. Embrace the power of technology to enhance your shopping journey and make every purchase a delightful experience.</p>
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