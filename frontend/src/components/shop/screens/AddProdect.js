import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import styled from 'styled-components';
import SearchSuggestions from '../includes/add product/SearchSuggestions';
import axios from 'axios';


function AddProdect() {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();
    const productId = location.state?.product || null;
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [shoppro, setShoppro] = useState([]);
    const reversedShopPro = [...shoppro].reverse();
    const [shopId, setShopId] = useState('')
    const [proError, setProError] = useState('');
    const [addedData, setAddedData] = useState(1)

    const [FormData, setFormData] = useState({
        shop_id: null,
        product_id: null,
        price: null
    });

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
            await axios.post('http://127.0.0.1:8000/api/s/addproduct/', FormData);
            setProError('')
            setAddedData(addedData+1)
        } catch (error) {
            setProError('This product is already added to the shop.');
        }
    };

    useEffect(() => {
        const fetchShopId = () => {
            const adminKeyString = localStorage.getItem('adminKey');
            if (adminKeyString) {
                const adminKey = JSON.parse(adminKeyString);
                setShopId(adminKey.id)
                console.log('shopid : ', shopId);
                const updatedFormData = {
                    ...FormData,
                    shop_id: shopId
                };
                setFormData(updatedFormData);
                console.log("updatedFormData : ", updatedFormData);
            } else {
                console.log('adminKey not found in localStorage');
            }
        }
        const fetchProductDetails = async () => {
            try {
                if (productId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/p/gpro/${productId}`);
                    setProduct(response.data);
                    setProError('')

                    setFormData(prevFormData => ({
                        ...prevFormData,
                        product_id: productId
                    }));

                    const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/p/gcategory');
                    setCategories(categoriesResponse.data);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        const fetchShopProducts = async () => {
            try {
                if (shopId) {
                    const response = await axios.get('http://127.0.0.1:8000/api/s/shopproducts');
                    setShoppro(response.data.filter(product => product.shop_id === shopId));
                    console.log(shoppro);
                }
            } catch (error) {
                console.error('Error fetching shop products:', error);
            }
        };
        fetchShopId();
        fetchShopProducts();
        fetchProductDetails();
    }, [productId,shopId,addedData]);

    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.category_name : '';
    };

    return (
        <Page>
            <Container fluid>
                <Row className='p-2 ' style={{ borderRadius: "10px", backgroundColor: 'whitesmoke' }}>
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
                        <p style={{ color: 'red', fontSize: "13px" }}>{proError}</p>
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
                                <Form.Control name='price' onChange={handleInputChange} type="number" />
                            </FloatingLabel>
                        </Col>
                    </Col>
                    <Col className='my-2'>
                        <Button variant='info' onClick={handleSubmit} style={{ height: '55px', width: '100%' }}>Add</Button>
                    </Col>
                </Row>
                <ScrollableRow className='mt-3 p-3 pt-0' style={{position:'relative', borderRadius: '10px', height: '60vh', backgroundColor: 'whitesmoke' }}>
                    <Col xs={12} className='d-flex pb-2 pt-3' style={{ position:'sticky', top:0, backgroundColor: 'whitesmoke', alignItems: 'flex-start', justifyContent: 'space-between', height: "fit-content", borderBottom: '1px solid black' }}>
                        <HeadTest>No</HeadTest>
                        <HeadTest>Image</HeadTest>
                        <HeadTest>Product Name</HeadTest>
                        <HeadTest>Count / KG</HeadTest>
                        <HeadTest>Price</HeadTest>
                        <HeadTest>Remove</HeadTest>
                    </Col>
                    {shoppro.length > 0 ? (
                        reversedShopPro.map((product, index) => (
                            <Col key={index} xs={12} className='d-flex pt-2' style={{alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <HeadTest>{shoppro.length - index}</HeadTest>
                                <ImgDiv>
                                    <HeadImg src={product.gpro.prodect_image} />
                                </ImgDiv>
                                <HeadTest>{product.gpro.product_name}</HeadTest>
                                <HeadTest>{product.gpro.weight_type}</HeadTest>
                                <HeadTest>{product.price}</HeadTest>
                                <HeadTest><i className="fa-regular fa-circle-xmark me-2"></i></HeadTest>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12} className='d-flex pt-2' style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <p>No products available</p>
                        </Col>
                    )}
                </ScrollableRow>
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
const ImgDiv = styled.div`
    padding: 5px;
    margin: 0;
    background-color: #fff;
    border-radius: 10px;
    width: 80px;
    text-align: center;
`
const HeadImg = styled.img`
    height: 5vh;
`

const ScrollableRow = styled.div`
    overflow-y: auto;
    cursor: pointer;
    white-space: nowrap;
    padding-bottom: 20px;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    transition: scrollbar-color .3s;
    -ms-overflow-style: none;
    &:hover {
        scrollbar-color: black transparent;
    }
    &:not(:hover)::-webkit-scrollbar-thumb {
        background: transparent;
    }
    &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb{
	    border-radius: 10px;
    	background-color: green;
    }
`
export default AddProdect