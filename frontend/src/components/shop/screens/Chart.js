import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LineChart from '../includes/chart/LineChart';
import BarChart from '../includes/chart/BarChart';
import AllYearBar from '../includes/chart/AllYearBar'
import axios from 'axios';

function Chart() {
  const [shopId, setShopId] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [doAgain, setDoAgain] = useState(null);

  const [deliveryData, setDeliveryData] = useState(null);
  const [billData, setBillData] = useState(null);

  // shopId fetch
  const fetchShopId = () => {
    const adminKeyString = localStorage.getItem('adminKey');
    if (adminKeyString) {
      const adminKey = JSON.parse(adminKeyString);
      setShopId(adminKey.id);
    } else {
      console.log('shopId not found in localStorage');
    }
  };

  // fetch data from API
  const fetchData = (shopId) => {
    axios.get(`http://127.0.0.1:8000/api/s/seller-report/?shop_id=${shopId}`)
      .then((res) => {
        console.log(res.data);
        setDoAgain(1)
        if (res.data.orders) {
          setOrderData(res.data.orders);
        }
        if (res.data.payment_details) {
          setPaymentData(res.data.payment_details);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (shopId === null) {
      fetchShopId();
    } else if (shopId !== null && (orderData === null || paymentData === null)) {
      fetchData(shopId);
    }
  }, [shopId, orderData, paymentData]);

  useEffect(() => {
    if (orderData !== null) {
      const deliveredOrders = orderData.filter(item => item.status === "Delivered");
      const billedOrders = orderData.filter(item => item.status === 'Billed');
      console.log(deliveryData,billData);
      setDeliveryData(deliveredOrders);
      setBillData(billedOrders); 
    }
  },[orderData, doAgain])

  return (
    <Page>
      <Container fluid>
        <Row >
          <Col>
            <span className='h4'>Chart of the Year</span>
          </Col>
          <Col xs={'auto'}>
            <Button variant="info" style={{ maxWidth: "150px" }}>Download Report</Button>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col xs={11} lg={8}>
            <LineChart deliveryData={orderData.filter(item => item.status === "Delivered")} billdata={orderData.filter(item => item.status === 'Billed')} />
            <BarChart />
          </Col>
        </Row>
        <span className='h4'>All Years</span>
        <Row className='d-flex justify-content-center'>
          <Col xs={11} lg={8}>
            <AllYearBar />
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