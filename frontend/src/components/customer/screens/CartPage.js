import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function CartPage() {
    const [orders, setOrders] = useState([]);
    const [userPro, setUserPro] = useState([]);
    const [shopProList, setShopProList] = useState([]);
    const [userId, setUserId] = useState();
    // const [currentCount, setCurrentCount] = useState([])
    const [pmworking, plusMinesWorking] = useState()

    useEffect(() => {
        const fetchUserId = () => {
            const userKeyString = localStorage.getItem('userKey');
            if (userKeyString) {
                const userKey = JSON.parse(userKeyString);
                setUserId(userKey.id);
                console.log('user id : ', userKey.id);
            } else {
                console.log('adminKey not found in localStorage');
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersRes = await axios.get("http://127.0.0.1:8000/api/s/orders/");
                const filteredOrders = ordersRes.data.filter(order => order.status === 'Cart' && order.user === userId);
                setOrders(filteredOrders);
                console.log("filtered order :", filteredOrders);

                const orderProductRes = await axios.get("http://127.0.0.1:8000/api/s/orderproduct/");
                const filteredProducts = orderProductRes.data.filter(pro => pro.user === userId);
                setUserPro(filteredProducts);
                console.log("filtered pro :", filteredProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        console.log("pmworking :",pmworking);
        if (userId) {
            fetchData();
        }
    }, [userId, pmworking]);

    useEffect(() => {
        const productsByShop = userPro.reduce((acc, product) => {
            const shopId = product.pro.seller.id;
            if (!acc[shopId]) {
                acc[shopId] = [];
            }
            acc[shopId].push(product);
            return acc;
        }, {});

        const shopProductsList = Object.keys(productsByShop).map(shopId => {
            const shopDetails = orders.find(shop => shop.id === parseInt(shopId)); // Assuming shops contains the shop details

            return {
                shopDetails,
                products: productsByShop[shopId]
            };
        });

        console.log("shop products", shopProductsList);
        setShopProList(shopProductsList);
        console.log("pmworking :",pmworking);
    }, [userPro, orders, pmworking]);

    useEffect(() => {
        console.log("user orders : ", orders);
        console.log("user pro : ", userPro);
        console.log("shop products", shopProList);
    }, [orders, userPro, shopProList]);

    const plusCount = async (productId, currentCount) => {
        try {
            console.log("plus Count : id = ", productId, ' current count = ', currentCount);
            const updatedCount = parseInt(currentCount) + 1;
            const response = await axios.put(`http://127.0.0.1:8000/api/s/orderproduct/${productId}/`, { product_count: updatedCount });
            // Handle success - Update the UI or perform any necessary actions
            console.log('Product count increased:', response.data);
            plusMinesWorking(pmworking + 1)
        } catch (error) {
            // Handle error
            console.error('Error increasing product count:', error);
        }
    };

    const optionChange = async (productId, selectedOption) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/s/orderproduct/${productId}/`, { count_type: selectedOption });
            // Handle success - Update the UI or perform any necessary actions
            console.log('Product count type updated:', response.data);
            // You might want to update the UI or perform actions after the count_type is updated
        } catch (error) {
            // Handle error
            console.error('Error updating product count type:', error);
        }
    };

    const minusCount = async (productId, currentCount) => {
        try {
            if (currentCount > 0) {
                const updatedCount = parseInt(currentCount) - 1;
                const response = await axios.put(`http://127.0.0.1:8000/api/s/orderproduct/${productId}/`, { product_count: updatedCount });
                // Handle success - Update the UI or perform any necessary actions
                console.log('Product count decreased:', response.data);
                plusMinesWorking(pmworking - 1)
            } else {
                // Optionally handle a minimum count scenario
                console.log('Minimum count reached');
            }
        } catch (error) {
            // Handle error
            console.error('Error decreasing product count:', error);
        }
    };

    const updateCount = async (productId, newCount) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/s/orderproduct/${productId}/`, { product_count: newCount });
            // Handle success - Update the UI or perform any necessary actions
            console.log('Product count updated:', response.data);
            // Perform additional actions after successful update, if needed
        } catch (error) {
            // Handle error
            console.error('Error updating product count:', error);
        }
    };
    return (
        <Page className='user-select-nones'>
            {shopProList.length > 0 ? (
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {shopProList.map((shopData, index) => (
                        <Accordion.Item key={index} eventKey={index} style={BoxShadow} className='mb-4 rounded'>
                            <Accordion.Header>
                                {/* Render shop details */}
                                <div className='d-flex flex-column w-100'>
                                    {/* Shop name */}
                                    <Row className=''>
                                        <Col style={{ minWidth: 'fit-content' }} className="d-flex align-items-center">
                                            <ProIcon src={`${shopData.shopDetails?.seller?.profile_image}`} />
                                            <ShopName className='h5 m-2 m-sm-4'>{shopData.shopDetails?.seller?.shop_name}</ShopName>
                                        </Col>
                                        {/* Other actions (Order, Cancel, Proceed, etc.) */}
                                        <Col className='d-flex  justify-content-end m-3 align-items-center'>
                                            <Link to={'order'} className='text-reset text-decoration-none'>
                                                <ActioinBt className='btn btn-primary'>Order</ActioinBt>
                                            </Link>
                                            {/* <Link to={'/'} className='btn btn-danger text-reset text-decoration-none m-2'>
                                            <ActioinBt>Cancel</ActioinBt>
                                        </Link>
                                        <Link to={'/'} className='btn btn-success text-reset text-decoration-none m-2'>
                                            <ActioinBt>Proceed</ActioinBt>
                                        </Link>
                                        <Link to={'/'} className='btn btn-success text-reset text-decoration-none m-2'>
                                            <ActioinBt>Pay</ActioinBt>
                                        </Link>
                                        <Link to={'/'} className='btn btn-outline-danger text-reset text-decoration-none m-2'>
                                            <ActioinBt style={{ color: 'red' }}>Canceld</ActioinBt>
                                        </Link>
                                        <Link to={'/'} className='btn btn-outline-info text-reset text-decoration-none m-2'>
                                            <ActioinBt style={{ color: 'blue' }}>OC-8996</ActioinBt>
                                        </Link> */}
                                        </Col>
                                    </Row>
                                    {/* Total items and price */}
                                    <Row className='w-100'>
                                        <Col className='d-flex align-items-center justify-content-around'>
                                            <CartDet><b>Total items : </b>{shopData.products.length}</CartDet>
                                            {/* Calculate and display total price based on products */}
                                            {/* <CartDet><b>Total price : </b>${calculateTotalPrice(shopData.products)}</CartDet> */}
                                        </Col>
                                    </Row>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                {/* Render products */}
                                <Items className='d-block bg-light'>
                                    {shopData.products.map((product, prodIndex) => (
                                        <Row key={prodIndex} className='w-100 d-flex mb-1 align-items-center border-bottom py-2'>
                                            <Col xs={2} sm={1} className='d-flex align-items-center justify-content-end' >{prodIndex + 1}</Col>
                                            <Col className='d-sm-block d-md-flex justify-content-between'>
                                                <Col className='d-flex align-items-center justify-content-between '>
                                                    <ItemImage src={product.pro.gpro.prodect_image} />
                                                    <ItemText>{product.pro.gpro.product_name}</ItemText>
                                                    <ItemText className='m-3' >₹ 100{product.product_price}</ItemText>
                                                </Col>
                                                <Col className='d-flex w-auto justify-content-around align-items-center'>

                                                    <Form.Select aria-label="Default select example" style={{ width: "16vw" }} onChange={(e) => optionChange(product.id, e.target.value)}>
                                                        {product.count_type === 'count' ? (
                                                            <option value="pack">Pack</option>
                                                        ) : (
                                                            <>
                                                                {product.count_type === 'kg' ? (
                                                                    <>
                                                                        <option value="kg">kg</option>
                                                                        <option value="g">gram</option>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <option value="g">gram</option>
                                                                        <option value="kg">kg</option>
                                                                    </>
                                                                )}

                                                            </>
                                                        )}
                                                    </Form.Select>
                                                    <div className='d-flex align-items-center '>
                                                        <ItemBtn className="btn fa-solid fa-square-plus" onClick={() => plusCount(product.id, product.product_count)}></ItemBtn>
                                                        <Form.Control
                                                        style={{width:"14vw"}}
                                                            type="number"
                                                            value={product.product_count}
                                                            onChange={(e) => updateCount(product.id, e.target.value)}
                                                        />
                                                        <ItemBtn className='btn fa-solid fa-square-minus' onClick={() => minusCount(product.id, product.product_count)}></ItemBtn>
                                                    </div>
                                                </Col><i class=""></i>
                                            </Col>
                                            <Col xs={1} className='d-flex align-items-center justify-content-end'>
                                                <ItemBtn className='btn fa-regular fa-circle-xmark' ></ItemBtn>
                                            </Col>
                                        </Row>
                                    ))}
                                </Items>
                                {/* Add a message input section */}
                                <Form.Group controlId={`messageInput-${index}`} className='mt-3'>
                                    <Form.Control
                                        type="text"
                                        size="md"
                                        placeholder="Type your message..."
                                    />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            ) : (
                <div>Loading...</div>
            )}
        </Page >
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
const ActioinBt = styled.span`
    color: white;
    font-size: 10px;
    font-weight: 600;
    @media screen and (max-width: 578px) {
        font-size: 9px;
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
        height: 30px;
        width: 30px;
        margin: 5px;
    }
`
const ItemText = styled.span`
    font-size: 1.1rem;
    font-weight: 600;
    @media screen and (max-width: 778px) {
        font-size: 1rem;
        font-weight: 500;
    }
`
const ItemBtn = styled.span`
    font-size: 25px;
`

export default CartPage