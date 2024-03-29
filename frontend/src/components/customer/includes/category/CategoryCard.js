import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import styled from 'styled-components'
import { Card } from 'react-bootstrap';

import axios from 'axios';
import { Link } from 'react-router-dom';

function CategoryCard() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://www.nearbazar.shop/api/p/gcategory/');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    return (
        <Container fluid className='user-select-none'>
            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingBottom: "10px" }}>
                <span className='h5'>Category</span>
            </Col>
            <ScrollableRow >
                {categories.map((category, idx) => (
                    <Col className='d-flex justify-content-center' key={idx}>
                        <Link to={`/category/${category.category_name}`} className='text-decoration-none text-reset'>
                            <OfCard >
                                <CardImage>
                                    <Card.Img style={{ borderRadius: '20px' }} variant="top" src={category.category_image} />
                                </CardImage>
                                <Card.Body>
                                    <Card.Title style={{ fontSize: "16px", fontWeight: 600 }}>{category.category_name}</Card.Title>
                                </Card.Body>
                            </OfCard>
                        </Link>
                    </Col>
                ))}
            </ScrollableRow>
        </Container>
    )
}

const CardImage = styled.div`
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 778px) {
        height: 70px;
        width: 70px;
    }
`
const OfCard = styled.div`
    min-width: 100px;
    max-width: 150px;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ScrollableRow = styled.div`
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
    padding-left: 10px;
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
export default CategoryCard