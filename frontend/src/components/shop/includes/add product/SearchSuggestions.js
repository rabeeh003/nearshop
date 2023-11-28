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
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/p/gpro/');
                setAllProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/p/gcategory/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchData();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (productName.trim() !== '') {
            const fuse = new Fuse(allProducts, {
                keys: ['product_name'],
                includeScore: true,
            });

            const result = fuse.search(productName);
            setSuggestedProducts(result.map((res) => res.item));
        } else {
            setSuggestedProducts([]);
        }
    }, [productName, allProducts]);

    const handleProductNameChange = (event) => {
        const value = event.target.value;
        setProductName(value);
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.category_name : 'none';
    };

    const handleAddProductClick = (product) => {
        onHide();
        navigate(``,{state:{product:product.id}});
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
                            <li key={product.id} style={{listStyle:'none'}}>
                                <Col>
                                    <OfCard>
                                        <CardImage>
                                            <Card.Img variant="top" style={{objectFit:'cover',imageRendering:'auto', borderRadius:"10px", maxHeight:'90%'}} src={product.prodect_image} />
                                        </CardImage>
                                        <Card.Body >
                                            <Card.Title style={{ fontSize: '1rpx', textTransform:'uppercase' }}>{product.product_name}</Card.Title>
                                            <Card.Text style={{ fontSize: '15px' }}>
                                                Category: <b>{getCategoryName(product.category)}</b>
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
