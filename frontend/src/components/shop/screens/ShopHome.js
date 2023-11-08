import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import styled from 'styled-components'

import sh1 from '../../../assets/images/sh1.png'
import sh2 from '../../../assets/images/sh2.png'
import sh3 from '../../../assets/images/sh3.png'
import sh4 from '../../../assets/images/sh4.png'
import sh5 from '../../../assets/images/sh5.png'
import sh6 from '../../../assets/images/sh6.png'

function ShopHome() {
  return (
    <Page>
      <Container fluid>
        <Row className='m-0'>
          <Col xs={12} sm={6} md={4} className='p-4  d-flex flex-column justify-content-center align-items-center'>
            <ImageDiv>
              <ImgTag src={sh1} />
            </ImageDiv>
            <Name>Chart</Name>
          </Col>
          <Col xs={12} sm={6} md={4} className='p-4  d-flex flex-column justify-content-center align-items-center'>
            <ImageDiv>
              <ImgTag src={sh2} />
            </ImageDiv>
            <Name>Billing</Name>
          </Col>
          <Col xs={12} sm={6} md={4} className='p-4  d-flex flex-column justify-content-center align-items-center'>
            <ImageDiv>
              <ImgTag src={sh3} />
            </ImageDiv>
            <Name>Orders</Name>
          </Col>
          <Col xs={12} sm={6} md={4} className='p-4  d-flex flex-column justify-content-center align-items-center'>
            <ImageDiv>
              <ImgTag src={sh4} />
            </ImageDiv>
            <Name>Add Products</Name>
          </Col>
          <Col xs={12} sm={6} md={4} className='p-4  d-flex flex-column justify-content-center align-items-center'>
            <ImageDiv>
              <ImgTag src={sh5} />
            </ImageDiv>
            <Name>Edit Products</Name>
          </Col>
          <Col xs={12} sm={6} md={4} className='p-4  d-flex flex-column justify-content-center align-items-center'>
            <ImageDiv>
              <ImgTag src={sh6} />
            </ImageDiv>
            <Name>Offer</Name>
          </Col>
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

const ImageDiv = styled.div`
  width: 90%;
  height: 200px;
  max-width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  background: rgb(34,193,195);
  background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(255,255,255,0.36842683850884106) 49%, rgba(45,194,253,0.8754296396292892) 100%);
  @media screen {
   width:100% ;
  }
`
const Name = styled.span`
  font-size:25px;
  font-weight: 600;
  margin-top: 20px;
`
const ImgTag = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export default ShopHome