import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import Modal from 'react-bootstrap/Modal';

// Add Location Model
// function AddLocation(props) {
//     return (
//         <Modal
//             className='user-select-none'
//             {...props}
//             size="md"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title id="contained-modal-title-vcenter">
//                     <i class="fa-solid fa-map"></i> Add Location
//                 </Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 Map Hear
//             </Modal.Body>
//         </Modal>
//     );
// }

// CheckOut page code started
const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    padding: '10px'
}

function CheckOut(props) {
    const location = useLocation();
    const shopData = location.state ? location.state.shop : null;
    const products = location.state ? location.state.products : null;
    console.log("shop & products ", shopData, products);
    const [total, setTotal] = useState(0);


    function calculateTotalPrice(price, count, type) {
        const numericPrice = parseInt(price);
        const numericCount = parseInt(count);

        if (!isNaN(numericPrice) && !isNaN(numericCount)) {
            let totalPrice = 0;

            if (type === "g") {
                totalPrice = (numericPrice / 1000) * numericCount;
            } else {
                totalPrice = numericPrice * numericCount;
            }

            return totalPrice;
        } else {
            return 'Price or count is invalid';
        }
    }

    useEffect(() => {
        // Calculate the total price when the component mounts
        let totalPrice = 0;
        products?.forEach((order) => {
            totalPrice += calculateTotalPrice(order.pro.price, order.product_count, order.count_type);
        });
        setTotal(totalPrice);
    }, [products]);

    return (
        <Page>
            <Row>
                <Col xs={12} lg={7}>
                    <div style={BoxShadow} className='mb-4 rounded'>
                        <div>
                            <div className='d-flex flex-column w-100'>
                                <Row className=''>
                                    <Col style={{ minWidth: 'fit-content' }} className="text-center m-3">
                                        <ProIcon src={shopData.seller.profile_image} /><br></br>
                                        <ShopName className='h5 m-2 m-sm-4'>{shopData.seller.shop_name}</ShopName>
                                    </Col>
                                </Row>
                                <Row className='w-100'>
                                    <Col className='d-flex align-items-center justify-content-around'>
                                        <CartDet><b>Total items : </b>{products.length}</CartDet>
                                        <CartDet><b>Total price : </b>₹{total}</CartDet>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div>
                            {products?.map((order, orderIdx) => (
                                <Items key={orderIdx} className='bg-light my-1' style={{ boxShadow: "1px 1px 53px #acaaca,1px 1px 13px #ffffff" }}>

                                    <Row className='w-100 d-flex my-1  align-items-center py-2'>
                                        <Col className='d-flex align-items-center bg-light rounded-circle p-1 justify-content-center' style={{
                                            maxWidth: '35px',
                                            borderRadius: "50px",
                                            background: "#e0e0e0",
                                            boxShadow: "6px 6px 12px #acacac,-6px -6px 12px #ffffff"
                                        }}>{orderIdx + 1}</Col>
                                        <Col className='d-md-flex align-items-center'>
                                            <ItemImage src={order.pro.gpro.prodect_image} />
                                            <ItemText>{order.pro.gpro.product_name}</ItemText>
                                        </Col>
                                        <Col xs={3}>
                                            <ItemText className='m-3'>{order.product_count}{order.count_type}</ItemText>
                                        </Col>
                                        <Col xs={3}>
                                            <ItemText className='m-3'>₹ {calculateTotalPrice(order.pro.price, order.product_count, order.count_type)}</ItemText>
                                        </Col>
                                    </Row>
                                </Items>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={5}>
                    <span>Total</span>
                    <div className='text-center ' style={{ width: '100%', height: '20vh', fontSize: '50px', fontWeight: '500' }}>
                        ₹ {total}
                    </div>
                    <div className='m-auto' style={{ maxWidth: "500px" }}>
                        <Form.Select aria-label="Delivery Location" className='mb-2'>
                            <option hidden>Chose Location</option>
                            <option value="1">Home</option>
                            <option value="2">Office</option>
                            <option onClick={''}>Add New</option>
                        </Form.Select>
                        <Form.Select aria-label="Payment Type">
                            <option hidden>Select Payment Type</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                    <div className='text-center' style={{ width: '100%', fontSize: '50px', fontWeight: '500' }}>
                        <Button variant='success' className='py-2 px-5'> Pay</Button>
                    </div>
                </Col>
            </Row>
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
    margin: 10px;
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
export default CheckOut