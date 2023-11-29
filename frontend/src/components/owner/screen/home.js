import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OwnerHome() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [shops, setShops] = useState([]);
    const [ownerKey, setOwnerKey] = useState('');
    const [selectedShop, setSelectedShop] = useState(null);
    const [currentShop, setCurrentShop] = useState({
        "shop_name": "",
        "shop_id": "",
        "shop_phone": "",
        "shop_label": "",
        "shop_place": "",
        // shop_mail: "",
        // lat: "",
        // lng: "",
        // banner_image: null,
        // profile_image: null,
    });

    const handleEdit = (shop) => {
        setSelectedShop(shop);
        setCurrentShop(shop); // Set the current shop data for editing
        handleShow(); // Show the modal
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentShop((prevShop) => ({
            ...prevShop,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const updatedData = {};
            Object.keys(currentShop).forEach((key) => {
                if (currentShop[key] !== selectedShop[key]) {
                    updatedData[key] = currentShop[key];
                }
            });
            if (Object.keys(updatedData).length > 0) {
                await axios.put(`http://127.0.0.1:8000/api/shop_update/${selectedShop.id}/`, updatedData);

                const updatedShops = shops.map((s) => (s.id === selectedShop.id ? { ...s, ...updatedData } : s));
                setShops(updatedShops);
                handleClose();
            } else {
                handleClose();
            }
        } catch (error) {
            console.error('Error updating shop data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ownerKey = localStorage.getItem('ownerKey');
                if (ownerKey) {
                    const ownerKeyObj = JSON.parse(ownerKey);
                    const ownerMail = ownerKeyObj.mail;
                    setOwnerKey(ownerMail);
                    const response = await axios.get('http://127.0.0.1:8000/api/shop_register/');
                    const filteredShops = response.data.filter(shop => shop.shop_owner === ownerMail);
                    setShops(filteredShops);
                }
            } catch (error) {
                console.error('Error fetching or filtering shops data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <Useer className='container'>
            <Row>
                <Col>
                    <Link to={'createshop'}>
                        <Button>Create Shop</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                {shops.map(shop => (
                    <HeadHeight key={shop.id} className='Row d-flex p-3'>
                        <Col xs={'auto'}>
                            <ShopLogo src={shop.profile_image} />
                        </Col>
                        <Col style={{ paddingLeft: '10%' }} className='d-flex flex-column justify-content-around'>
                            <span>Shop: {shop.shop_name}</span>
                            <span>Phone: {shop.shop_phone}</span>
                            <span>Email: {shop.shop_mail}</span>
                        </Col>
                        <Col xs={'auto'} className='d-flex align-items-center'>
                            <span
                                onClick={() => handleEdit(shop)}
                                style={{ backgroundColor: 'gray', borderRadius: '30px', color: 'white' }}
                                className='px-3 py-1'
                            >
                                Edit
                            </span>
                        </Col>
                    </HeadHeight>
                ))}
            </Row>
            {/* Edit Model code hear */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentShop && (
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Col xs={12} className='py-3'>
                                    <Form.Label column sm="2">
                                        Name
                                    </Form.Label>
                                    <Form.Control name="shop_name" value={currentShop.shop_name} onChange={handleChange} />
                                </Col>
                                <Col xs={12} className='py-3'>
                                    <Form.Label column sm="2">
                                        ShopId
                                    </Form.Label>
                                    <Form.Control name="shop_id" value={currentShop.shop_id} onChange={handleChange} />
                                </Col>
                                <Col xs={12} className='py-3'>
                                    <Form.Label column sm="2">
                                        Label
                                    </Form.Label>
                                    <Form.Control
                                        type="text" name="shop_label" value={currentShop.shop_label} onChange={handleChange}
                                    />
                                </Col>
                                <Col className='py-3'>
                                    <Form.Label column sm="2">
                                        Place
                                    </Form.Label>
                                    <Form.Control
                                        type="text" name="shop_place" value={currentShop.shop_place} onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Phone
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text" name="shop_phone"
                                        value={currentShop.shop_phone} onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                            {/* <Button className=''> Location change </Button> */}
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} >Save</Button>
                </Modal.Footer>
            </Modal>
        </Useer>
    );
}

const Useer = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
const HeadHeight = styled.div`
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 10px;
    margin: 30px 0;
`
const ShopLogo = styled.img`
   width: 100px;
    height: 100px;
    background-color: whitesmoke;
    object-fit: cover;
    border-radius: 50%;
    @media screen and (max-width: 578px){
        width: 100px;
        height: 100px;
    }
    
`

export default OwnerHome