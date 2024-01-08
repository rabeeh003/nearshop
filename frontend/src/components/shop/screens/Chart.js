import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import LineChart from '../includes/chart/LineChart';
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
// import BarChart from '../includes/chart/BarChart';
import AllYearBar from '../includes/chart/AllYearBar'
import axios from 'axios';
import CollapsibleTable from '../includes/chart/DataTable';

function Chart() {
  const [shopId, setShopId] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [doAgain, setDoAgain] = useState(null);

  const [deliveryData, setDeliveryData] = useState(null);
  const [billData, setBillData] = useState(null);
  const [barChartData, setBarChartData] = useState(null)

  // year:
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  // line chart datas:
  const [linedata, setLinedata] = useState([]);

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
    } else if (orderData === null) {
      fetchData(shopId);
    }
    if (orderData !== null && Array.isArray(orderData) && orderData.length > 0) {
      const deliveredOrders = orderData.filter((item) => {
        const orderDate = new Date(item.updated_date);
        return item.status === 'Delivered' && orderDate.getFullYear() === selectedYear;
      });
      const billedOrders = orderData.filter((item) => {
        const orderDate = new Date(item.updated_date);
        return item.status === 'Billed' && orderDate.getFullYear() === selectedYear;
      });
      setDeliveryData(deliveredOrders);
      setBillData(billedOrders);
      console.log("deliveredOrders", deliveredOrders);
      console.log("billedOrders", billedOrders);
    }
  }, [shopId, orderData, selectedYear]);

  useEffect(() => {
    if (deliveryData !== null && billData !== null) {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      const monthlylineData = Array.from({ length: 12 }, () => ({ name: '', Delivered: 0, Billed: 0 }));

      deliveryData.forEach((deliveryItem) => {
        const monthIndex = new Date(deliveryItem.updated_date).getMonth();
        monthlylineData[monthIndex].name = months[monthIndex];
        monthlylineData[monthIndex].Delivered += 1; // Assuming each delivery increases the count by 1
      });

      billData.forEach((billItem) => {
        const monthIndex = new Date(billItem.updated_date).getMonth();
        monthlylineData[monthIndex].name = months[monthIndex];
        monthlylineData[monthIndex].Billed += 1; // Assuming each billing increases the count by 1
      });

      setLinedata(monthlylineData);
    }
  }, [deliveryData, billData, selectedYear]);

  useEffect(() => {
    if (deliveryData !== null && billData !== null) {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      const monthlyBarChartData = Array.from({ length: 12 }, () => ({ name: '', Order: 0, Bill: 0 }));

      deliveryData.forEach((deliveryItem) => {
        const monthIndex = new Date(deliveryItem.updated_date).getMonth();
        monthlyBarChartData[monthIndex].name = months[monthIndex];
        monthlyBarChartData[monthIndex].Order += deliveryItem.total_price;
      });

      billData.forEach((billItem) => {
        const monthIndex = new Date(billItem.updated_date).getMonth();
        monthlyBarChartData[monthIndex].name = months[monthIndex];
        monthlyBarChartData[monthIndex].Bill += billItem.total_price;
      });
      console.log("barchart", monthlyBarChartData);

      setBarChartData(monthlyBarChartData);
    }
  }, [deliveryData, billData]);


  return (
    <Page>
      <Container fluid>
        <Row className='text-center d-flex flex-column justify-content-center align-items-center'>

          {/* <Col xs={'auto'}>
            <Button variant="info" style={{ maxWidth: '150px' }}>
              Download Report
            </Button>
          </Col> */}
          <label htmlFor="year">Select a Year:</label>
          <select style={{ width: '200px' }} className='p-1 text-center' id="year" onChange={handleYearChange} value={selectedYear}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col xs={12} lg={6}>
            <Col>
              <span className="h4">Chart of billing and order</span>
            </Col>
            {orderData && (
              // <LineChart
              //   deliveryData={orderData.filter((item) => item.status === 'Delivered')}
              //   billdata={orderData.filter((item) => item.status === 'Billed')}
              // />
              <ResponsiveContainer maxWidth="500" height={400}>
                <LineChart
                  data={linedata}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Delivered" stroke="rgb(255, 99, 132)" />
                  <Line type="monotone" dataKey="Billed" stroke="green" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Col>
          <Col>
            <Col>
              <span className="h4">Chart of profit</span>
            </Col>
            {barChartData && (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  width={500}
                  height={300}
                  data={barChartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Order" fill="#8884d8" />
                  <Bar dataKey="Bill" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            )}</Col>
        </Row>
        <Row className='d-flex justify-content-center algin-items-center mt-3 p-5 bg-light'>
          <Col lg={9}>
            <h3 className='text-center'>Sales Report</h3>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center algin-items-center pt-5 bg-light' style={{height:"80vh"}}>
          <Col xs={12} lg={9}>
            <CollapsibleTable />
          </Col>
        </Row>
       
      </Container>
    </Page>
  )
}
const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  margin-bottom: 10px;
  @media screen and (max-width: 578px) {
    height: 100%;
    margin-bottom: 70px;
    max-width: 98vw;
  }
`
export default Chart