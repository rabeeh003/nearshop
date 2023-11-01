import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import styled from 'styled-components'
import { Card } from 'react-bootstrap';

import c1 from 'file:///home/rabeeh/Pictures/c1.png'

function Category() {
    return (
        <Container fluid>
            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingBottom: "10px" }}>
                <span className='h3'>Category</span>
                <span style={{ backgroundColor: "#5cb85d", display: 'flex', alignItems: 'center', padding: "5px", borderRadius: "50%", color:'white' }}><i class="fa-solid fa-arrow-right"></i></span>
            </Col>
            <ScrollableRow>
                {Array.from({ length: 7 }).map((_, idx) => (
                    <Col className='d-flex justify-content-center' key={idx}>
                        <OfCard >
                            <CardImage>
                                <Card.Img variant="top" src={c1} />
                            </CardImage>
                            <Card.Body>
                                <Card.Title>Grocery</Card.Title>
                            </Card.Body>
                        </OfCard>
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
  justify-content: space-around;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;
  padding-left: 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`
export default Category