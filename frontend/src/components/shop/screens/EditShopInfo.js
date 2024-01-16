import React, { useEffect } from 'react'
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function EditShopInfo() {
    const [shopId, setShopId] = useState(null);
    const [shopData, setShopData] = useState(null)
    const [formData, setFormData] = useState({
        "shop_phone": '',
        "banner_image": null,
        "profile_image": null,
    });
    const [banerImageURL, setBanerImageURL] = useState(null)
    const [profileImageURL, setProfileImageURL] = useState(null);

    //  shop data fetch
    const fetchShopData = async (shopId) => {
        try {
            const response = await axios.get(`http://www.nearbazar.shop/api/getOneShop/${shopId}/`); // Replace '1' with the shop ID you want to retrieve
            setShopData(response.data);
            setFormData({
                ...formData,
                "shop_phone": response.data.shop_phone,
            })
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching shop data:', error);
        }
    };

    // fetch shop id
    const fetchShopId = () => {
        const adminKeyString = localStorage.getItem('adminKey');
        if (adminKeyString) {
            const adminKey = JSON.parse(adminKeyString);
            setShopId(adminKey.id);
            console.log("shopId", adminKey.id);
            fetchShopData(adminKey.id);
        } else {
            console.log('shopId not found in localStorage');
        }

    };

    // handle change inputs and files

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

    // update data
    
    const handileSibmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'shop_phone') {
                if (value !== shopData.shop_phone){
                    formDataToSend.append(key, value);
                }
            }
            else if (value !== null){
                formDataToSend.append(key, value);
            }
        });
        if (formDataToSend !== null) {
            try {
                console.log("updateData",formDataToSend );
                await axios.put(`http://www.nearbazar.shop/api/shop_update/${shopData.id}/`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then(response => console.log(response.data))
                    .catch(error => console.log(error))
            }
            catch (error) { console.log(error) }
        }
    }

    useEffect(() => {
        if (shopId === null)
            fetchShopId();
    })

    return (
        <Page>
            <Container>
                <form onSubmit={handileSibmit} style={{}} className='d-flex justify-content-center align-items-center'>
                    <Row style={{ maxWidth: '900px' }} className='d-flex justify-content-center align-items-center'>
                        <Col xs={12} md={6}>
                            <BannerImg>
                                <Img width={"100%"} style={{ objectFit: "cover" }} src={banerImageURL || shopData?.banner_image || ''} alt='banner image' />
                            </BannerImg>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Banner Image</Form.Label>
                                <Form.Control type="file" accept="image/*" name="banner_image" onChange={(e) => handleFileChange(e, 'banner_image')} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <ProfileImg>
                                <ProImg src={profileImageURL || shopData?.profile_image || ''} />
                            </ProfileImg>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Profile</Form.Label>
                                <Form.Control type="file" accept="image/*" name="profile_image" onChange={(e) => handleFileChange(e, 'profile_image')} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Shop Name"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" value={shopData?.shop_name} disabled className='bg-white' />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Description"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" value={shopData?.shop_label} disabled className='bg-white' />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="place"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" value={shopData?.shop_place} disabled className='bg-white' />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email ( shop )"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="email" value={shopData?.shop_mail} disabled className='bg-white' />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Phone ( shop )"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="number" name="shop_phone" value={formData.shop_phone} onChange={(e) => handleInputChange(e, 'shop_phone')} />
                            </FloatingLabel>
                        </Col>
                        <Col xs={12} md={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Shop Id"
                                className="mb-3 w-100"
                            >
                                <Form.Control type="text" value={shopData?.shop_id} disabled className='bg-white' />
                            </FloatingLabel>
                        </Col>
                        {/* <Link to={"/shop/otp_verification"} className='text-center'> */}
                        <Button type='submit' style={{ width: '50%' }} variant='info'> Update </Button>
                        {/* </Link> */}
                        <div style={{ height: "90px" }}></div>
                    </Row>
                </form>
            </Container>
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

export default EditShopInfo