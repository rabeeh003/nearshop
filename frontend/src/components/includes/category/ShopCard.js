import React from 'react'
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import styled from 'styled-components';
import icon from 'file:///home/rabeeh/Pictures/superlogo.jpg'

function ShopCard() {
    return (
        <Container fluid className='user-select-none'>
            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "20px" }} className='mt-2'>
                <span className='h5'>Catagory Name</span>
                {/* <span style={{ backgroundColor: "#5cb85d", display: 'flex', alignItems: 'center', padding: "5px", borderRadius: "50%", color: 'white' }}><i class="fa-solid fa-arrow-right"></i></span> */}
            </Col>
            <Row className="g-4">
                {Array.from({ length: 27 }).map((_, idx) => (
                    <Col xs={6} sm={4} md={3} lg={2} xxl={1}  key={idx} className='d-flex justify-content-center'>
                        <OfCard>
                            <CardImage>
                                <Card.Img variant="top" className='object-fit-fill rounded-circle' src={icon} />
                            </CardImage>
                            <div>
                                <Card.Title style={{fontSize:"15px"}}>Shop Name</Card.Title>
                                <Button variant="success" className='mt-1' style={{ width: '100%', fontSize:"12px" }}>Vist</Button>
                            </div>
                        </OfCard>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
const CardImage = styled.div`
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media screen and (max-width: 778px) {
        width: 80px;
        height: 80px;
    }
`
const OfCard = styled.div`
    width: 150px;
    margin:10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export default ShopCard