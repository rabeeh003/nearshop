import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styled from 'styled-components';
import SearchSuggestions from '../includes/add product/SearchSuggestions';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


function AddProdect() {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const productId = location.state?.product || null;
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [FormData, setFormData] = useState({
        "shop_id": null,
        "product_id": null,
        "price": null
    })

    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            // Make a POST request to submit the form data
            const response = await axios.post('http://127.0.0.1:8000/api/s/addproduct/', FormData);
            // Handle success or perform further actions
            console.log('Submitted successfully!', response.data);
        } catch (error) {
            // Handle error
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        // const adminKeyString = localStorage.getItem('adminKey');
        // const adminKey = JSON.parse(adminKeyString);
        // const shopId = adminKey.id;
        // if (shopId) {
        //     setFormData({
        //         ...FormData,
        //         shop_id: shopId
        //     });
        // }
        const fetchProductDetails = async () => {
            try {
                if (productId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/p/gpro/${productId}`);
                    setProduct(response.data);
                    setFormData({
                        ...FormData,
                        product_id: productId
                    });

                    const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/p/gcategory');
                    setCategories(categoriesResponse.data);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.category_name : 'Category Not Found';
    };

    return (
        <Page>
            <Container fluid>
                <Row className='bg-gray p-2 ' style={{ borderRadius: "10px" }}>
                    <Col xs={12} sm={4} md={3} className='d-flex align-items-center justify-content-center'>
                        <ImageFeald>
                            {/* <image src={product ? product.prodect_image : ''} /> */}
                            {product && product.prodect_image && (
                                <Image
                                    variant="top"
                                    style={{ objectFit: 'cover', width: "90%", borderRadius: "10px", maxHeight: '90%' }}
                                    src={`http://127.0.0.1:8000${product ? product.prodect_image : ''}`}
                                />
                                // <img variant="top" style={{ objectFit: 'cover', imageRendering: 'auto', borderRadius: "10px", maxHeight: '90%' }} src={product.prodect_image} />
                            )}
                        </ImageFeald>
                    </Col>
                    <Col xs={12} sm={8} md={9} style={{}}>
                        <Col className='my-1'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Product Name"
                            >
                                <Form.Control onClick={handleModalOpen} value={product ? product.product_name : ''} type="text" />
                                <SearchSuggestions show={showModal} onHide={handleModalClose} />
                            </FloatingLabel>
                        </Col>
                        <Col className='my-1'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Category"
                            >
                                <Form.Control type="text" value={getCategoryName(product ? product.category : '')} disabled />
                            </FloatingLabel>
                        </Col>
                    </Col >
                    <Col xs={12} sm={10} className='d-flex my-1'>
                        <Col xs={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Wight Type"
                            >
                                <Form.Control type="text" value={product ? product.weight_type : ''} disabled />
                            </FloatingLabel>
                        </Col>
                        <Col xs={6}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Price"
                            >
                                <Form.Control onChange={handleInputChange} type="number" />
                            </FloatingLabel>
                        </Col>
                    </Col>
                    <Col className='my-2'>
                        <Button onClick={handleSubmit} style={{ height: '55px', width: '100%' }}>Add</Button>
                    </Col>
                </Row>
                <Row className='bg-gray mt-3 p-3' style={{ borderRadius: '10px', height: '60vh' }}>
                    <Col xs={12} className='d-flex pb-2' style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: "fit-content", borderBottom: '1px solid black' }}>
                        <HeadTest>No</HeadTest>
                        <HeadTest>Prodect Name</HeadTest>
                        <HeadTest>Count / KG</HeadTest>
                        <HeadTest>Price</HeadTest>
                        <HeadTest>Remove</HeadTest>
                    </Col>
                    <Col xs={12} className='d-flex pt-2' style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: '100%' }}>
                        <HeadTest>1</HeadTest>
                        <HeadTest>Prodect Name</HeadTest>
                        <HeadTest>Count / KG</HeadTest>
                        <HeadTest>Price</HeadTest>
                        <HeadTest><i class="fa-regular fa-circle-xmark me-3"></i></HeadTest>
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
    height: 100%;
    margin-bottom: 80px;
    max-width: 98vw;
  }
`
const ImageFeald = styled.div`
    width: 150px;
    height: 130px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    margin: 10px;
    @media screen and (max-width: 578px){
        width: 100px;
        height: 100px;
    }
`
const HeadTest = styled.span`
    @media screen and (max-width: 578px) {
        font-size: small;
    }
`
export default AddProdect