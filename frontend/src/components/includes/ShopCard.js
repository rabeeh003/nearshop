import React from 'react'
import { Card, Button, Container, Col } from 'react-bootstrap';
import styled from 'styled-components';

import icon from 'file:///home/rabeeh/Pictures/superlogo.jpg'

function ShopCard() {
    return (
        <Container fluid className='user-select-none'>
            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "20px" }} className='mt-2'>
                <span className='h3'>Near Shops</span>
                {/* <span style={{ backgroundColor: "#5cb85d", display: 'flex', alignItems: 'center', padding: "5px", borderRadius: "50%", color: 'white' }}><i class="fa-solid fa-arrow-right"></i></span> */}
            </Col>
            <ScrollableRow>
                {Array.from({ length: 10 }).map((_, idx) => (
                    <Col key={idx}>
                        <OfCard>
                            <CardImage>
                                <Card.Img variant="top" className='object-fit-fill rounded-circle' src={icon} />
                            </CardImage>
                            <Card.Body>
                                <Card.Title>Shop Name</Card.Title>
                                <Button variant="success" className='mt-2' style={{ width: '100%' }}>Vist</Button>
                            </Card.Body>
                        </OfCard>
                    </Col>
                ))}
            </ScrollableRow>
        </Container>
    )
}
const CardImage = styled.div`
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 50%;
    height: 150px;
    width: 150px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`
const OfCard = styled.div`
    width: 150px;
    margin:0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ScrollableRow = styled.div`
    display: flex;
    overflow-x: auto;
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
export default ShopCard