import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CategoryCard from '../includes/category/CategoryCard'
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import icon from 'file:///home/rabeeh/Pictures/superlogo.jpg'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Category() {
    const { categoryName } = useParams('grocery');
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchShopDetails = async (shopId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/shopsall/${shopId}`);
            return response.data; // Assuming the response contains shop details
        } catch (error) {
            console.error(`Error fetching shop details for shop ID ${shopId}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const fetchShopsByCategory = async () => {
            try {
                const productsResponse = await axios.get('http://127.0.0.1:8000/api/s/shopproducts/');
                const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/p/gcategory/');

                const filteredCategory = categoriesResponse.data.find(cat => cat.category_name === categoryName);

                if (filteredCategory) {
                    const categoryId = filteredCategory.id;
                    const productsInCategory = productsResponse.data.filter(product => product.cat.id === categoryId);

                    // Get unique shop IDs for the products in the category
                    const uniqueShopIds = Array.from(new Set(productsInCategory.map(product => product.shop_id)));

                    // Fetch shop details for each unique shop ID
                    const shopsByCategory = await Promise.all(
                        uniqueShopIds.map(async (shopId) => {
                            const shopDetails = await fetchShopDetails(shopId);
                            return shopDetails;
                        })
                    );

                    setShops(shopsByCategory.filter(shop => shop !== null)); // Filter out any null values
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching shops by category:', error);
            }
        };

        fetchShopsByCategory();
    }, [categoryName]);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Cato>
            <CategoryCard />
            <Container fluid className='user-select-none'>
                <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "20px" }} className='mt-2'>
                    <span className='h5' >{categoryName}</span>
                    {/* <span style={{ backgroundColor: "#5cb85d", display: 'flex', alignItems: 'center', padding: "5px", borderRadius: "50%", color: 'white' }}><i class="fa-solid fa-arrow-right"></i></span> */}
                </Col>
                <Row className="g-4">
                {shops.map(shop => (
                        <Col xs={6} sm={4} md={3} lg={2} xxl={1} key={shop.id} className='d-flex justify-content-center'>
                            <OfCard>
                                <CardImage>
                                    <Card.Img variant="top" className='object-fit-fill rounded-circle' src={shop.profile_image} />
                                </CardImage>
                                <div>
                                    <Card.Title style={{ fontSize: "15px", textAlign:'center' }}>{shop.shop_name}</Card.Title>
                                    <Button variant="success" className='mt-1' style={{ width: '100%', fontSize: "12px" }}>Vist</Button>
                                </div>
                            </OfCard>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Cato>
    )
}

const Cato = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`

const CardImage = styled.div`
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @media screen and (max-width: 778px) {
        width: 80px;
        height: 80px;
    }
`
const OfCard = styled.div`
    width: 150px;
    margin:10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export default Category