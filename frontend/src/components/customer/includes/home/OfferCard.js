import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import axios from 'axios';

function MyVerticallyCenteredModal(props) {
    const { product } = props;
    return (
        <Modal
            className='user-select-none'
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <img className="me-2" alt='logo' style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: 'cover', border: '1px solid black' }} src={product.seller?.profile_image} />
                <Modal.Title id="contained-modal-title-vcenter">
                    {product.seller?.shop_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PDetiles>
                    <div style={{ width: "45%" }}>
                        <ProImage>
                            {/* <Badge style={{ position: 'absolute', top: 0, right: 0 }} bg="success">40% Off</Badge> */}
                            <Card.Img style={{ objectFit: 'fill' }} variant="top" src={product.gpro?.prodect_image} />
                        </ProImage>

                    </div>
                    <div className='form-outline' style={{ width: "45%" }}>
                        <span className='h4'>{product?.product_name}</span>
                        {product.offer_price ? (
                            <p >
                                Price:<span class="text-decoration-line-through"> ₹ {product?.price} </span><span className='ps-2'> <b>  ₹ {product?.offer_price}</b></span>
                            </p>
                        ) : ("")}

                        <Textarea style={{ fontSize: "12px", width: "100%" }} className='form-control' rows='6'>
                            {product.gpro?.product_description}
                        </Textarea>
                    </div>
                </PDetiles>
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="success" style={{ width: '150px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Cart</Button>
            </Modal.Footer>
        </Modal>
    );
}

const ProImage = styled.div`
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border-radius: 10px;
    width: 90%;
    max-height: 250px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
`

const PDetiles = styled.div`
    display: flex;
`
const Textarea = styled.textarea`
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

function OfferCard() {
    const [modalShow, setModalShow] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/s/shopproducts/`);
                const today = new Date();
                const day = today.toJSON().slice(0, 10);
                console.log("--------Day and Day + 2-------------");
                console.log("Day: " + day, "Day + 2: " + (day + 2));
                const filteredProducts = response.data.filter(product => product.offer_price !== null && day <= product.offer_end && day >= product.offer_start);

                // Map to group products by their name
                const productMap = new Map();
                filteredProducts.forEach(product => {
                    const productName = product.gpro.product_name;
                    if (!productMap.has(productName)) {
                        productMap.set(productName, []);
                    } else { }
                    productMap.get(productName).push(product);
                });

                // Find the best offer for each product
                const bestOffers = [];
                productMap.forEach(products => {
                    const bestOffer = products.reduce((prev, curr) => {
                        const priceDifference = curr.price - curr.offer_price;
                        return priceDifference > (prev ? prev.priceDifference : -Infinity) ? {
                            product: curr,
                            priceDifference: priceDifference
                        } : prev;
                    }, null);
                    if (bestOffer) {
                        bestOffers.push(bestOffer.product);
                    }
                });

                // Sort best offers based on the price difference
                bestOffers.sort((a, b) => b.price - b.offer_price - (a.price - a.offer_price));

                setProducts(bestOffers);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container fluid className='user-select-none'>
            <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "20px" }}>
                <span className='h5'><b>Offer</b></span>
                {/* <span style={{ backgroundColor: "#5cb85d", display: 'flex', alignItems: 'center', padding: "5px", borderRadius: "50%", color:'white' }}><i class="fa-solid fa-arrow-right"></i></span> */}
            </Col>
            <ScrollableRow>
                {products.map((product, idx) => (
                    <Col key={idx}>
                        <OfCard onClick={() => setModalShow(product)}>
                            <CardImage>
                                {/* <Badge style={{ position: 'absolute', bottom: 0, right: 0 }} bg="success">40% Off</Badge> */}
                                <Badge style={{ position: 'absolute', top: 0, color: 'gray' }} bg=""><i className="fa-solid fa-store"></i>{product.seller.shop_name}</Badge>
                                <Card.Img style={{ width: "84px", height: "80px" }} variant="top" src={product.gpro.prodect_image} />
                            </CardImage>
                            <Card.Body className='text-center mt-2'>
                                <Card.Title style={{ fontSize: '15px' }}>{product.gpro.product_name}</Card.Title>
                                <Card.Text style={{ fontSize: '15px' }}>
                                    Price: <span class="text-decoration-line-through">₹ {product.price}</span> <b> ₹ {product.offer_price}</b>
                                </Card.Text>
                                <Button variant="" className='btn-outline-success' style={{ width: "120px", fontSize: '15px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Cart</Button>
                            </Card.Body>
                        </OfCard>
                    </Col>
                ))}
            </ScrollableRow>
            <MyVerticallyCenteredModal
                product={modalShow}
                show={modalShow !== false}
                onHide={() => setModalShow(false)}
            />
        </Container>
    )
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
    margin: auto;
`
const OfCard = styled.div`
    margin:0 20px;
    text-align: center;
`
const ScrollableRow = styled.div`
    display: flex;
    overflow-x: auto;
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
export default OfferCard