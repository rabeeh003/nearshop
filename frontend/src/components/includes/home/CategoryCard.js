import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import styled from 'styled-components'
import { Card } from 'react-bootstrap';

import c1 from 'file:///home/rabeeh/Pictures/c1.png'
import { Link } from 'react-router-dom';

function CategoryCard() {
    return (
        <Container fluid className='user-select-none'>
            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingBottom: "10px" }}>
                <span className='h5'><b>Category</b></span>
                <Link to='/category' style={{ backgroundColor: "#5cb85d", display: 'flex', alignItems: 'center', padding: "5px", borderRadius: "50%", color: 'white' }}><i class="fa-solid fa-arrow-right"></i></Link>
            </Col>
            <ScrollableRow>
                {Array.from({ length: 7 }).map((_, idx) => (
                    <Col className='d-flex justify-content-center' key={idx}>
                        <Link to='/category' className='text-decoration-none text-reset'>
                            <OfCard >
                                <CardImage>
                                    <Card.Img variant="top" src={c1} />
                                </CardImage>
                                <Card.Body>
                                    <Card.Title className='text-reset'>Grocery</Card.Title>
                                </Card.Body>
                            </OfCard>
                        </Link>
                    </Col>
                ))}
            </ScrollableRow>
        </Container>
    )
}

const CardImage = styled.div`
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const OfCard = styled.div`
    width: 150px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ScrollableRow = styled.div`
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
    padding-left: 10px;
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
export default CategoryCard