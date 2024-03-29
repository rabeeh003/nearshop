import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Modal, Dropdown } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddressLocationPicker from '../../../assets/map/AddressAndLocation';
import axios from 'axios';


function AddLocation(props) {
    const { onHide, oldData = null } = props;
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='bg-success' style={{ color: 'white' }} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i class="fa-solid fa-map"></i> Add Location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddressLocationPicker onHide={onHide} oldData={oldData} />
            </Modal.Body>
        </Modal>
    );
}


// CheckOut page code started
const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
    padding: '10px'
}

function CheckOut(props) {
    const [addLocation, setAddLocation] = React.useState(false);
    const [changing, setChanging] = React.useState(false);
    const [editLocationId, setEditLocationId] = useState(null);

    const location = useLocation();
    const shopData = location.state ? location.state.shop : null;
    const products = location.state ? location.state.products : null;
    console.log("shop & products ", shopData, products);
    console.log("props ", props);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate()


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
        const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
        setTotal(roundedTotalPrice);
    }, [products]);



    const handleAddLocation = () => {
        console.log('lets start : hi');
        setAddLocation(true);
        console.log('set add locatin is true');
    };

    const [listLocation, setListLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({ "location_name": 'Select address' });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('https://www.nearbazar.shop/api/u/location/');
                const filterRes = response.data.filter(loc => loc.customer_id === shopData.user)
                setListLocation(filterRes);
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, [changing]);

    const handleLocationSelection = (locationName) => {
        setSelectedLocation(locationName);
    };

    const [methord, setMethord] = useState('')

    const [paymentData, setPayment] = useState({
        "method": null,
        "price": null,
        "payment_status": "Pending",
        "user": null,
        "shop": null,
        "order": null,
        "payment_id": null
    })

    useEffect(() => {
        setPayment({
            ...paymentData,
            "price": total,
            "user": shopData.user,
            "shop": shopData.shop,
            "order": shopData.id,
            "method": methord,
        })
    }, [total, shopData, selectedLocation, methord])

    const submitData = async (e) => {
        e.preventDefault();
        console.log("_________________________");
        console.log("----start--transation----");
        if (
            methord !== "Cash on Delivery" &&
            methord !== "" &&
            selectedLocation !== ''
        ) {
            console.log("start Payment. method", methord);
            try {
                const response = await new Promise((resolve, reject) => {
                    const options = {
                        key: "rzp_test_WpAPez4PS87jin",
                        key_secret: "niYhwwTtxw2jwlPsGjSx6OYm",
                        amount: paymentData.price * 100,
                        currency: "INR",
                        name: "Near Shop",
                        description: "for testing purpose",
                        handler: function (response) {
                            setPayment({
                                ...paymentData,
                                "payment_id": response.razorpay_payment_id
                            });
                            resolve(response);
                        },
                        prefill: {
                            name: shopData.userData.full_name,
                            email: shopData.userData.email,
                            contact: shopData.userData.phone_number
                        },
                        notes: {
                            address: "Razorpay Corporate office"
                        },
                        theme: {
                            color: "#198754"
                        }
                    };
                    const pay = new window.Razorpay(options);

                    pay.on('payment.failed', function (response) {
                        reject(response.error);
                    });

                    pay.open();
                });

                setPayment({
                    ...paymentData,
                    "payment_id": response.razorpay_payment_id
                });
            } catch (error) {
                console.error("Payment error:", error);
                // Handle the error as needed
            }
        }
        try {
            console.log("paymentData : ", paymentData);
            console.log("location : ", selectedLocation.id);


            await axios.post("https://www.nearbazar.shop/api/s/payments/", paymentData);
            await axios.put(`https://www.nearbazar.shop/api/s/orders/${shopData.id}/`, { "status": "Paid", "location": selectedLocation.id, "total_price": total });
            navigate("/cart")
        } catch (error) {
            console.log("error : ", error);
        }
    };
    return (
        <Page>
            <Row className='d-flex align-items-center' >
                <Col xs={12} lg={7}  >
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
                        <div className='overflow-auto' style={{ maxHeight: '70vh', height: '100%' }}>
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
                <Col xs={12} lg={5} className=''>
                    <span>Total</span>
                    <div className='text-center ' style={{ width: '100%', height: '20vh', fontSize: '50px', fontWeight: '500' }}>
                        ₹ {total}
                    </div>
                    <div className='m-auto' style={{ maxWidth: "500px" }}>
                        <Dropdown style={{ width: "100%" }} className='my-2' id="dropdown-menu-align-responsive-1">
                            <Dropdown.Toggle variant="" id="dropdown-location" className='w-100 d-flex align-items-center justify-content-between border border-1'>
                                {selectedLocation.location_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='w-100'>
                                {listLocation ? (
                                    listLocation.map((location, index) => (
                                        <Dropdown.Item
                                            className='d-flex justify-content-between align-items-center'
                                            key={index}
                                            onClick={() => handleLocationSelection(location)}
                                        >
                                            {location.location_name}
                                            <span onClick={() => setEditLocationId(location.id)}>
                                                <i className="fa-solid fa-edit pe-2 text-secondary"></i>
                                            </span>
                                        </Dropdown.Item>
                                    ))
                                ) : (
                                    <Dropdown.Item disabled>No locations available</Dropdown.Item>
                                )}
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleAddLocation}>
                                    <i className="fa-solid fa-plus pe-2"></i>Add New
                                </Dropdown.Item>
                                {editLocationId !== null ? (
                                    <AddLocation
                                        show={true}
                                        oldData={listLocation.find(location => location.id === editLocationId)}
                                        onHide={() => {
                                            setEditLocationId(null)
                                            setChanging(2)
                                        }}
                                    />
                                ) : (
                                    <AddLocation
                                        show={addLocation}
                                        oldData={null}
                                        onHide={() => {
                                            setAddLocation(false)
                                            setChanging(1)
                                        }}
                                    />
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Select name='method' onChange={e => setMethord(e.target.value)} aria-label="Payment Type">
                            <option hidden>Select Payment Type</option>
                            <option value="Razorpay">Razorpay</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </Form.Select>
                    </div>
                    <div className='text-center' style={{ width: '100%', fontSize: '50px', fontWeight: '500' }}>
                        <Button variant='success' onClick={submitData} className='py-2 px-5'> Pay</Button>
                    </div>
                </Col>
            </Row>
        </Page>
    )
}

const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-height: 100%;
    margin-bottom: 90px;
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