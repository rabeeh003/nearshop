import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Col } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import filterShops from "../Location/locationFilter";

function ShopCard() {
    const [shops, setShops] = useState([]);
    // currentLocation
    const loc = JSON.parse(localStorage.getItem('currentLocation'));
    const userLat = parseFloat(loc.lat);
    const userLng = parseFloat(loc.long);
    console.log("loc user ", userLat, userLng);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get('https://www.nearbazar.shop/api/shop_register/');
                // const radius = 10; // Replace with your actual radius
                // const response = await axios.get(`https://www.nearbazar.shop/api/shops/?userLat=${userLat}&userLng=${userLng}&radius=${radius}`);
                console.log("All Shop", response.data);
                const filteredShops = filterShops(userLat, userLng, response.data, 10);
                console.log("nearShop", filteredShops);
                setShops(filteredShops);
            } catch (error) {
                console.error('Error fetching shops:', error);
            }
        };

        fetchShops();
    }, []);

    return ( shops?.length <= 0 ? <p className='text-center pt-5'>sorry, currently our service not available for this location. Choose other location.</p> :
        <Container fluid className='user-select-none'>
            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }} className='mt-2'>
                <span className='h5'><b>Near Shops</b></span>
            </Col>
            <ScrollableRow>
                {shops.map((shop) => (
                    <Col xl={2} key={shop.id}>
                        <Link to={`/${shop.shop_id}`} className='nav-link'>
                            <OfCard>
                                <CardImage>
                                    <Card.Img variant='top' className='object-fit-fill rounded-circle' src={shop.profile_image} alt={shop.name} />
                                </CardImage>
                                <Card.Body className='text-center'>
                                    <Card.Title style={{ fontSize: '15px' }}>{shop.shop_name}</Card.Title>
                                    <Button variant='' className='mt-2 btn-outline-success' style={{ width: '80px', fontSize: '12px' }}>Visit</Button>
                                </Card.Body>
                            </OfCard>
                        </Link>
                    </Col>
                ))}
            </ScrollableRow>
        </Container>
    );
}


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
`
const OfCard = styled.div`
    min-width: 100px;
    max-width: 150px;
    margin:0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ScrollableRow = styled.div`
    display: flex;
    overflow-x: auto;
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
export default ShopCard