import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import GoogleMapReact from 'google-map-react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

// shop creation
function CreateShop() {
    const [banerImageURL, setBanerImageURL] = useState('')
    const [profileImageURL, setProfileImageURL] = useState('');
    const navigate = useNavigate()
    // location model
    const [userLocation, setUserLocation] = useState({
        lat: 10.850516,
        lng: 76.271080
    });
    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    const defaultProps = {
        center: {
            lat: userLocation.lat,
            lng: userLocation.lng
        },
        zoom: 30
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        lat: latitude,
                        lng: longitude,
                    }));
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        }
        else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // form data
    const [formData, setFormData] = useState({
        "shop_name": "",
        "shop_id": "",
        "shop_phone": "",
        "shop_label": "",
        "shop_place": "",
        "shop_mail": "",
        "lat": "",
        "lng": "",
        "banner_image": null,
        "profile_image": null,
        "shop_owner": null
    });

    useEffect(() => {
        const ownerKey = localStorage.getItem('ownerKey');

        if (ownerKey) {
            try {
                const ownerKeyObj = JSON.parse(ownerKey);
                const ownerMail = ownerKeyObj.mail;
                setFormData(prevFormData => ({
                    ...prevFormData,
                    shop_owner: ownerMail
                }));
                console.log(ownerMail); // Check the extracted ID
            } catch (error) {
                console.error('Error parsing ownerKey:', error);
            }
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event, fileType) => {
        const file = event.target.files[0];
        setFormData({ ...formData, [fileType]: file });
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (fileType === 'banner_image') {
                    setBanerImageURL(reader.result);
                } else if (fileType === 'profile_image') {
                    setProfileImageURL(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                formDataToSend.append(key, value);
            }
        });

        try {
            console.log(formDataToSend);
            await axios.post('http://127.0.0.1:8000/api/shop_register/', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/owner')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Page>
            <Container>
                <Row>
                    <Col>
                        <Link to={'/owner'}>
                            <Button>back to home</Button>
                        </Link>
                    </Col>
                </Row>
                <form style={{}} className='d-flex justify-content-center align-items-center'>
                    <Row style={{ maxWidth: '900px' }} className='d-flex justify-content-center align-items-center'>
                        <Col xs={12} md={6}>
                            <BannerImg>
                                <Img src={banerImageURL || ''} />
                            </BannerImg>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Banner Image</Form.Label>
                                <Form.Control type="file" accept="image/*" name="banner_image" onChange={(e) => handleFileChange(e, 'banner_image')} required />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <ProfileImg>
                                <ProImg src={profileImageURL || ''} />
                            </ProfileImg>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Profile</Form.Label>
                                <Form.Control type="file" accept="image/*" name="profile_image" onChange={(e) => handleFileChange(e, 'profile_image')} required />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Shop Name"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" name="shop_name" onChange={(e) => handleInputChange(e, 'shop_name')} required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Label"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" name="shop_label" onChange={(e) => handleInputChange(e, 'shop_label')} required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Place"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" name="shop_place" onChange={(e) => handleInputChange(e, 'shop_place')} required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email ( shop )"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="email" name="shop_mail" onChange={(e) => handleInputChange(e, 'shop_mail')} required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Phone ( shop )"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="number" name="shop_phone" onChange={(e) => handleInputChange(e, 'shop_phone')} required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Shop Id ( shop_name_123 )"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" name="shop_id" onChange={(e) => handleInputChange(e, 'shop_id')} required />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} >
                            <Button className='btn btn-primary' onClick={handleShow}>
                                Add location
                            </Button>
                        </Col>
                        {/* <Link to={"/shop/otp_verification"} className='text-center'> */}
                        <Button type='submit' style={{ width: '50%' }} onClick={handleSubmit} variant='primary' > Create </Button>
                        {/* </Link> */}
                        <div style={{ height: "90px" }}></div>
                    </Row>
                </form>
            </Container>
            <Modal
                className='user-select-none'
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <i class="fa-solid fa-map"></i> Add Location
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <button className='btn btn-primary my-3' onClick={getUserLocation}>Get User Location</button>
                    {/* {userLocation && (
                    <div>
                        <h2>User Location</h2>
                        <p>Latitude: {userLocation.latitude}</p>
                        <p>Longitude: {userLocation.longitude}</p>
                    </div>
                )} */}
                    {userLocation && (
                        <div style={{ height: '400px', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyAQWZD9fJVKSDmHmGGi7gYgk9homdj_DAc" }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                            >
                                <AnyReactComponent
                                    lat={userLocation.lat}
                                    lng={userLocation.lng}
                                    text="loading.."
                                />
                            </GoogleMapReact>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </Page>
    )
}

const Page = styled.div`
  max-width: 90vw;
  height: 70vh;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 100vw;
  }
`
const BannerImg = styled.div`
    width: 100%;
    height: 100px;
    background-color: whitesmoke;
    margin-bottom: 10px;
    border-radius: 10px;
    @media screen and (max-width: 578px) {
        height: 100px;
    }
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const ProfileImg = styled.div`
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 50%;
    background-color: whitesmoke;
    @media screen and (max-width: 578px) {
        width: 100px;
        height: 100px;
    }
`
const ProImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
`

export default CreateShop