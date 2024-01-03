import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';
import Fuse from 'fuse.js'

function SearchSuggestions({ show, onHide }) {
    const [productName, setProductName] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [shopId, setShopId] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShopId = () => {
            const adminKeyString = localStorage.getItem('adminKey');
            if (adminKeyString) {
                const adminKey = JSON.parse(adminKeyString);
                setShopId(adminKey.id);
                console.log('shopid in search : ', shopId);
            } else {
                console.log('adminKey not found in localStorage');
            }
        };

        fetchShopId();

    }, [shopId]);

    useEffect(() => {
        const fetchShopProducts = async () => {
            try {
                if (shopId) {
                    const response = await axios.get(`http://127.0.0.1:8000/api/s/shopproducts?shop_id=${shopId}`);
                    const day = new Date().toJSON().slice(0, 10);
                    const filteredProducts = response.data.filter(product => {
                        return (
                            product.shop_id === shopId &&
                            (product.offer_price == null && (product.offer_end === null || day >= product.offer_end))
                        );
                    });

                    setAllProducts(filteredProducts);
                    console.log('search product : ', allProducts);
                }
            } catch (error) {
                console.error('Error fetching shop products:', error);
            }
        };

        fetchShopProducts();
    }, [shopId]);

    useEffect(() => {
        if (productName.trim() !== '') {
            const fuse = new Fuse(allProducts, {
                keys: ['gpro.product_name'],
                includeScore: true,
            });

            const result = fuse.search(productName);
            setSuggestedProducts(result.map((res) => res.item));
            console.log("suggestedProducts : ", suggestedProducts);
        } else {
            setSuggestedProducts([]);
        }
    }, [productName, allProducts]);

    const handleProductNameChange = (event) => {
        const value = event.target.value;
        setProductName(value);
    };

    const handleAddProductClick = (product) => {
        console.log("product.id from search model :", product);
        onHide();
        navigate(``, { state: { product: product } });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Search Products</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Search Product"
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                </Form.Group>
                {/* Display suggestions */}
                {suggestedProducts.length > 0 && (
                    <div>
                        {suggestedProducts.map((product) => (
                            <li key={product.id} style={{ listStyle: 'none' }}>
                                <Col>
                                    <OfCard>
                                        <CardImage>
                                            <Card.Img variant="top" style={{ objectFit: 'cover', imageRendering: 'auto', borderRadius: "10px", maxHeight: '90%' }} src={product.gpro.prodect_image} />
                                        </CardImage>
                                        <Card.Body >
                                            <Card.Title style={{ fontSize: '1rpx', textTransform: 'uppercase' }}>{product.gpro.product_name}</Card.Title>
                                            <Card.Text style={{ fontSize: '15px' }}>
                                                Category: <b>{product.cat.category_name}</b>
                                            </Card.Text>
                                            <Button variant="info" onClick={() => handleAddProductClick(product)} style={{ width: '100%', fontSize: '15px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Shop</Button>
                                        </Card.Body>
                                    </OfCard>
                                </Col>
                            </li>

                        ))}
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

const CardImage = styled.div`
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 10px;
    height: 120px;
    width: 120px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 10px;
`
const OfCard = styled.div`
    margin:20px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export default SearchSuggestions;
