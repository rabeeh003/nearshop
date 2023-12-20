import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import axios from 'axios';


const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function OrderHis(props) {
    const [orderHistory, setOrderHistory] = useState([]);
    const [productOrderHistory, setProductOrderHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/s/orders/");
                const userOrder = res.data.filter(order => order.user === props.userId && order.status === "Delivered");
                setOrderHistory(userOrder);
                try {
                    const responce = await axios.get('http://127.0.0.1:8000/api/s/orderproduct/');
                    const orderProduct = responce.data.filter(product => userOrder.some(orderObj => orderObj.id === product.order));
                    console.log("ordered product :", orderProduct);
                    setProductOrderHistory(orderProduct)
                } catch (error) {
                    console.error("Error fetching order history product:", error);
                }
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };

        fetchData();
        console.log("orderHistory", orderHistory);
    }, [props.userId]);
    return (
        <Page className='user-select-nones'>
            {orderHistory.length > 0 ? (
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                {orderHistory.map((order, idx) => {
                    const thisOrderProducts = productOrderHistory.filter(pro => pro.order === order.id)
                    console.log("thisOrderProducts", thisOrderProducts);
                    function calculateTotalPrice(price, count, type) {
                        const numericPrice = parseInt(price);
                        const numericCount = parseInt(count);

                        if (!isNaN(numericPrice) && !isNaN(numericCount)) {
                            if (type === "g") {
                                const prr = (numericPrice / 1000) * numericCount;
                                return prr
                            } else {
                                const pr = numericPrice * numericCount;
                                return pr
                            }

                        } else {
                            return 'Price or count is invalid';
                        }
                    }
                    return (
                        <Accordion.Item eventKey={idx} style={BoxShadow} className='mb-4 rounded'>
                            <CartDet className='p-3'><b>Date : </b>{order.updated_date}</CartDet>
                            <Accordion.Header>
                                <div className='d-flex flex-column w-100'>
                                    <Row className=''>
                                        <Col style={{ minWidth: 'fit-content' }} className="d-flex align-items-center">
                                            <ProIcon src={order.seller.profile_image} />
                                            <ShopName className='h5 m-2 m-sm-4'>{order.seller.shop_name}</ShopName>
                                        </Col>
                                    </Row>
                                    <Row className='w-100'>
                                        <Col className='d-flex align-items-center justify-content-around'>
                                            <CartDet><b>Total items : </b>{thisOrderProducts.length}</CartDet>
                                            <CartDet><b>Total price : </b>$300</CartDet>
                                        </Col>
                                    </Row>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                {thisOrderProducts?.map((product, productIdx) => (
                                    <Items key={productIdx} className='bg-light my-1' style={{ boxShadow: "1px 1px 53px #acaaca,1px 1px 13px #ffffff" }}>

                                        <Row className='w-100 d-flex my-1  align-items-center py-2 position-relative'>
                                            <span className='d-flex align-items-center bg-light rounded-circle p-1 justify-content-center ' style={{
                                                maxWidth: '35px',
                                                borderRadius: "50px",
                                                background: "#e0e0e0",
                                                boxShadow: "6px 6px 12px #acacac,-6px -6px 12px #ffffff"
                                            }}>{productIdx + 1}</span>
                                            <Row className='d-flex align-items-center justify-content-around'>
                                                <Col xs={10} sm={8} md={6} className='d-flex align-items-center justify-content-around'>
                                                    <Col className='d-md-flex align-items-center'>
                                                        <ItemImage src={product.pro.gpro.prodect_image} />
                                                        <ItemText>{product.pro.gpro.product_name}</ItemText>
                                                    </Col>
                                                    <Col xs={3}>
                                                        <ItemText className='m-3'>₹ {calculateTotalPrice(product.pro.price, product.product_count, product.count_type)}</ItemText>
                                                    </Col>
                                                </Col>
                                                <Col xs={2} sm={2}>
                                                    <ItemText className='m-3'>{product.product_count}{product.count_type}</ItemText>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </Items>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
            ):("not fond")}
        </Page>
    )
}

const Page = styled.div`
    padding: 10px 20px;
    max-width: 90vw;
    margin: auto;
    align-items: center;
    @media screen and (max-width: 578px) {
        max-width: 98vw;
    }
`
const ProIcon = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    @media screen and (max-width: 578px) {
        height: 30px;
        width: 30px;
    }
`
const ShopName = styled.span`
    font-weight: 600;
    @media screen and (max-width: 578px) {
        font-size: 18px;
    }
`

const CartDet = styled.span`
    font-size: 15px;
    @media screen and (max-width: 578px) {
        font-size: 12px;
    }
`
const Items = styled.div`
    background-color: #e6e8e7;
    display: flex;
    align-items: center;
    border-radius: 8px;
`
const ItemImage = styled.img`
    height: 80px;
    width: 80px;
    margin: 10px;
    @media screen and (max-width: 578px) {
        height: 40px;
        width: 40px;
        margin: 5px;
    }
`
const ItemText = styled.span`
    font-size: 20px;
    font-weight: 600;
    @media screen and (max-width: 578px) {
        font-size: 15px;
        font-weight: 500;
    }
`

export default OrderHis