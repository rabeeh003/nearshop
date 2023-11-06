import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { Card, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';

import Tomato from 'file:///home/rabeeh/Pictures/tomato.png'

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i class="fa-solid fa-store"></i> Shop Name
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PDetiles>
                    <div style={{ width: "45%" }}>
                        <CardImage>
                            <Badge style={{ position: 'absolute', top: 0, right: 0 }} bg="success">40% Off</Badge>
                            <Card.Img variant="top" src={Tomato} />
                        </CardImage>
                        <Button variant="success" style={{ width: '150px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Cart</Button>
                    </div>
                    <div className='form-outline' style={{ width: "45%" }}>
                        <span className='h4'>Tomato</span>
                        <p>
                            Price: <b>₹ 39</b>
                        </p>
                        <Textarea style={{ fontSize: "12px", width: "100%" }} className='form-control' rows='6'>
                            Tomato is a widely cultivated and consumed fruit, often treated as a vegetable in cooking. Known for its vibrant red color, it belongs to the Solanaceae family. Tomatoes are versatile in culinary applications, used in salads, sauces, and countless dishes, offering a sweet and tangy flavor with various health benefits.
                        </Textarea>
                    </div>
                </PDetiles>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

const PDetiles = styled.div`
    display: flex;
`
const Textarea = styled.textarea`
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

function ShopPage() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <Page className='user-select-none'>
            <Container fluid >
                <Row style={{ position: 'relative' }}>
                    <Col xs={12} style={{ widows: '100vw', height: "150px", backgroundColor: '#a1e3b9' }}>
                        <BannerImage src='' alt='ShopName' />
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                        <ProfileImage style={{ position: 'absolute', top: "35%", }} src='' alt='ShopLogo' />
                        <ShopName>Al Salama</ShopName>
                        <ShopDis>Super Market</ShopDis>
                        <ShopLoc>salalah</ShopLoc>
                        <ShopLinks>
                            <i class="fa-solid fa-share-from-square p-3"></i>
                            <i class="fa-solid fa-map-location-dot p-3"></i>
                            <i class="fa-solid fa-comments p-3"></i>
                        </ShopLinks>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <CatTab>
                            <CatText>Offer</CatText>
                            <CatText>Grocery</CatText>
                            <CatText>Veg</CatText>
                            <CatText>Fruites</CatText>
                            <CatText>Backary</CatText>
                            <CatText>Outher</CatText>
                        </CatTab>
                    </Col>
                </Row>
                <Row className="g-4 pt-3" >
                    {Array.from({ length: 27 }).map((_, idx) => (
                        <Col xs={6} sm={4} md={3} lg={2} xxl={2}  key={idx}>
                            <OfCard onClick={() => setModalShow(true)}>
                                <CardImage>
                                    <Badge style={{ position: 'absolute', bottom: 0, right: 0 }} bg="success">40% Off</Badge>
                                    <Badge style={{ position: 'absolute', top: 0, color: 'gray' }} bg=""><i className="fa-solid fa-store"></i> Shop Name</Badge>
                                    <Card.Img variant="top" src={Tomato} />
                                </CardImage>
                                <Card.Body >
                                    <Card.Title style={{ fontSize: '15px' }}>Card Title</Card.Title>
                                    <Card.Text style={{ fontSize: '15px' }}>
                                        Price: <b>₹ 39</b>
                                    </Card.Text>
                                    <Button variant="success" style={{ width: '100%', fontSize: '15px' }}><i className="fa-solid fa-plus pe-2"></i>Add</Button>
                                </Card.Body>
                            </OfCard>
                        </Col>
                    ))}
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
const BannerImage = styled.img``
const ProfileImage = styled.img`
    height: 90px;
    width: 90px;
    background-color: #fff;
    border: 4px solid white;
    border-radius:50%;
`
const ShopName = styled.h4`
    padding-top: 10px;
`
const ShopDis = styled.span``
const ShopLoc = styled.span``
const ShopLinks = styled.div`
    display: flex;
    justify-content: space-between;
    color: #41b56c;
`
const CatTab = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 200;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #a1e3b9;
    border-radius: 30px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    transition: scrollbar-color .3s;
    -ms-overflow-style: none;
    &:hover {
        scrollbar-color: black transparent;
    }
    &:not(:hover)::-webkit-scrollbar-thumb {
        background: transparent;
    }
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb{
	    border-radius: 10px;
    	background-color: #41b56c;
    }
    @media screen and (max-width: 578px) {
        justify-content: flex-start;
    }
`
const CatText = styled.span`
    padding: 20px;
    color: black;
    font-weight: 600;
`

const CardImage = styled.div`
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 10px;
    height: 120px;
    width: 120px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`
const OfCard = styled.div`
    margin:0 10px;
    width: 120px;
`

export default ShopPage