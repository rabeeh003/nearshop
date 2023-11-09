import React from 'react'
import styled from 'styled-components';
import { Container, Row,Col } from 'react-bootstrap';
import LineChart from '../includes/chart/LineChart';
import BarChart from '../includes/chart/BarChart';
import AllYearBar from '../includes/chart/AllYearBar'

function Chart() {
  return (
    <Page>
        <Container fluid>
            <span className='h4'>Chart of the Year</span>
            <Row className='d-flex justify-content-center'>
                <Col xs={11} lg={8}>
                    <LineChart/>
                    <BarChart/>
                </Col>
            </Row>
            <span className='h4'>All Years</span>
            <Row className='d-flex justify-content-center'>
                <Col xs={11} lg={8}>
                    <AllYearBar/>
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
export default Chart