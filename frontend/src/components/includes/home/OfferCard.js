import React from 'react'
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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

function OfferCard() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <Container fluid className='user-select-none'>
            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "20px" }}>
                <span className='h5'><b>Offer</b></span>
                {/* <span style={{ backgroundColor: "#5cb85d", display: 'flex', alignItems: 'center', padding: "5px", borderRadius: "50%", color:'white' }}><i class="fa-solid fa-arrow-right"></i></span> */}
            </Col>
            <ScrollableRow>
                {Array.from({ length: 10 }).map((_, idx) => (
                    <Col key={idx}>
                        <OfCard onClick={() => setModalShow(true)}>
                            <CardImage>
                                <Badge style={{ position: 'absolute', bottom: 0, right: 0 }} bg="success">40% Off</Badge>
                                <Badge style={{ position: 'absolute', top: 0, color: 'gray' }} bg=""><i className="fa-solid fa-store"></i> Shop Name</Badge>
                                <Card.Img variant="top" src={Tomato} />
                            </CardImage>
                            <Card.Body >
                                <Card.Title style={{fontSize:'15px'}}>Card Title</Card.Title>
                                <Card.Text style={{fontSize:'15px'}}>
                                    Price: <b>₹ 39</b>
                                </Card.Text>
                                <Button variant="success" style={{ width: '100%', fontSize:'15px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Cart</Button>
                            </Card.Body>
                        </OfCard>
                    </Col>
                ))}
            </ScrollableRow>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    )
}

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
    margin:0 20px;
`
const ScrollableRow = styled.div`
    display: flex;
    overflow-x: auto;
    cursor: pointer;
    white-space: nowrap;
    padding-bottom: 20px;
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
    	background-color: green;
    }
`
export default OfferCard