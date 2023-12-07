import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { Card, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from "axios"
import Tomato from 'file:///home/rabeeh/Pictures/tomato.png'
import { useParams } from 'react-router-dom';


// Reviews about shop

function ReviewModel(props) {
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i class="fa-solid fa-comments"></i> Reviews
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Rev>
                    <RevHead>
                        <span>Customer name</span>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                    </RevHead>
                    <RevBody>
                        <Textarea style={{ fontSize: "12px", width: "100%" }} className='form-control' rows='3'>
                            Tomato is a widely cultivated and consumed fruit, often treated as a vegetable in cooking. Known for its vibrant red color, it belongs to the Solanaceae family. Tomatoes are versatile in culinary applications, used in salads, sauces, and countless dishes, offering a sweet and tangy flavor with various health benefits.
                        </Textarea>
                    </RevBody>
                </Rev>
                {/* <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ minHeight: '50px' }}
                    />
                </FloatingLabel> */}
            </Modal.Body>
        </Modal>
    );
}

const Rev = styled.div`
    padding: 10px 5px;
    background: #dbdbdb;
    border-radius: 20px;
    margin-bottom:10px;
`
const RevHead = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 5px;
`
const RevBody = styled.div``


// location Model start

function LocationModel(props) {
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i class="fa-solid fa-location"></i> Location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

// Product details Model

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i class="fa-solid fa-store"></i> Shop Name
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PDetiles>
                    <div style={{ width: "45%" }}>
                        <CardImage>
                            <Badge style={{ position: 'absolute', top: 0, right: 0 }} bg="success">40% Off</Badge>
                            <Card.Img variant="top" src={Tomato} />
                        </CardImage>
                        <Button variant="success" style={{ width: '150px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Cart</Button>
                    </div>
                    <div className='form-outline' style={{ width: "45%" }}>
                        <span className='h4'>Tomato</span>
                        <p>
                            Price: <b>₹ 39</b>
                        </p>
                        <Textarea style={{ fontSize: "12px", width: "100%" }} className='form-control' rows='6'>
                            Tomato is a widely cultivated and consumed fruit, often treated as a vegetable in cooking. Known for its vibrant red color, it belongs to the Solanaceae family. Tomatoes are versatile in culinary applications, used in salads, sauces, and countless dishes, offering a sweet and tangy flavor with various health benefits.
                        </Textarea>
                    </div>
                </PDetiles>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

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

// Shop page code start

function ShopPage() {
    const [modalShow, setModalShow] = useState(false);
    const [locShow, setLocShow] = useState(false);
    const [reviewShow, setReview] = useState(false);

    const copyToClipboard = () => {
        const copyText = 'Hello, world!';

        navigator.clipboard.writeText(copyText).then(() => {
            alert('Copied to clipboard: ' + copyText);
        }).catch((error) => {
            console.error('Failed to copy: ', error);
        });
    };

    const [allData, setAllData] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allCategories, setAllCategories] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const categoriesOrder = [
        "offer",
        'grocery',
        'vegetable',
        'fruits',
        'packes',
        'bakery',
        'drinks',
    ];

    useEffect(() => {
        const url = window.location.pathname;
        const parts = url.split('/');
        const shopId = parts[parts.length - 1];

        axios.get(`http://127.0.0.1:8000/api/s/shop/${shopId}/`)
            .then(response => {
                console.log("Shop Data:", response.data);
                setAllData(response.data);
                // setFilteredProducts(response.data.shop_products || []);
            })
            .catch(error => {
                console.error('Error fetching shop data:', error);
            });

        axios.get('http://127.0.0.1:8000/api/p/gcategory/')
            .then(response => {
                console.log("Categories:", response.data);
                const categoriesDict = {};
                response.data.forEach(category => {
                    categoriesDict[category.category_name] = [];
                });
                setAllCategories({ ...categoriesDict, offer: [] });
                console.log("categoriesDict : ", categoriesDict);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        console.log("start");
        if (allData && allData.seller_products) {
            console.log("okkey");
            const updatedCategories = { ...allCategories }; // Copy the existing categories

            allData.seller_products.forEach(product => {
                const categoryName = product.cat.category_name;

                // Check if the category exists and if the product is not already added
                if (!updatedCategories[categoryName]) {
                    updatedCategories[categoryName] = [product];
                } else if (
                    !updatedCategories[categoryName].some(
                        existingProduct => existingProduct.id === product.id
                    )
                ) {
                    updatedCategories[categoryName].push(product);
                }
            });

            // Filter products for 'offer' category based on offer_price not equal to zero
            const offerProducts = allData.seller_products.filter(product => product.offer_price >= 1);

            // Add or update 'offer' category
            if (!updatedCategories['offer']) {
                updatedCategories['offer'] = offerProducts;
            } else {
                offerProducts.forEach(offerProduct => {
                    if (
                        !updatedCategories['offer'].some(
                            existingProduct => existingProduct.id === offerProduct.id
                        )
                    ) {
                        updatedCategories['offer'].push(offerProduct);
                    }
                });
            }

            setAllCategories(updatedCategories);
        }
    }, [allData, allCategories]);
    
    const handleCategorySelect = categoryName => {
        setSelectedCategory(categoryName);
        setFilteredProducts(allCategories[categoryName] || []);
    };
    
    return (
        <Page className='user-select-none'>
            <Container fluid >
                <Row style={{ position: 'relative' }}>
                    <Col xs={12} style={{}}>
                        <BannerDiv>
                            <BannerImage src={allData ? allData.banner_image : ""} alt={allData ? allData.profile_image : ""} />
                        </BannerDiv>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
                        <ProfileImage style={{ position: 'absolute', top: "35%", }} src={allData ? allData.profile_image : ""} alt='ShopLogo' />
                        <ShopName>{allData ? allData.shop_name : ""}</ShopName>
                        <ShopDis>{allData ? allData.shop_label : ""}</ShopDis>
                        <ShopLoc>{allData ? allData.shop_place : ""}</ShopLoc>
                        <ShopLinks>
                            <i class="fa-solid fa-share-from-square p-3" onClick={copyToClipboard}></i>
                            <i class="fa-solid fa-map-location-dot p-3" onClick={setLocShow}></i>
                            <i class="fa-solid fa-comments p-3" onClick={setReview}></i>
                        </ShopLinks>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <CatTab>
                            {categoriesOrder.map(categoryName => {
                                const categoryProducts = allCategories[categoryName];
                                if (categoryProducts && categoryProducts.length !== 0) {
                                    return (
                                        <CatText key={categoryName} onClick={() => handleCategorySelect(categoryName)}>
                                            {categoryName}
                                        </CatText>
                                    );
                                }
                                return null;
                            })}
                        </CatTab>
                    </Col>
                </Row>
                <Row className="g-4 pt-3" >
                    {filteredProducts.map(product => (
                        <Col xs={6} sm={4} md={3} lg={2} xxl={2} key={""} className='d-flex' style={{ justifyContent: 'center' }}>
                            <OfCard onClick={() => setModalShow(product)}>
                                <CardImage>
                                    {/* <Badge style={{ position: 'absolute', bottom: 0, right: 0 }} bg="success">40% Off</Badge> */}
                                    {/* <Badge style={{ position: 'absolute', top: 0, color: 'gray' }} bg=""><i className="fa-solid fa-store"></i>{product.seller.shop_name}</Badge> */}
                                    <Card.Img style={{ width: "84px", height: "80px" }} variant="top" src={`http://127.0.0.1:8000${product.gpro.prodect_image}`} />
                                </CardImage>
                                <Card.Body className='text-center mt-2'>
                                    <Card.Title style={{ fontSize: '15px' }}>{product.gpro.product_name}</Card.Title>
                                    <Card.Text style={{ fontSize: '15px' }}>
                                        {product.offer_price ? (
                                            <span>
                                                Price: <span className="text-decoration-line-through">₹ {product.price}</span> <b> ₹ {product.offer_price}</b>
                                            </span>
                                        ) : (
                                            <span>Price: ₹ {product.price}</span>
                                        )}

                                    </Card.Text>
                                    <Button variant="" className='btn-outline-success' style={{ fontSize: '15px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Cart</Button>
                                </Card.Body>
                            </OfCard>
                        </Col>
                    ))}
                </Row>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <LocationModel
                    show={locShow}
                    onHide={() => setLocShow(false)}
                />
                <ReviewModel
                    show={reviewShow}
                    onHide={() => setReview(false)}
                />
            </Container>
        </Page>
    )
}

const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`

const BannerDiv = styled.div`
    width: 100%;
    height: 20vh;
`
const BannerImage = styled.img`
    height: 100%;
    border-radius: 20px;
    image-rendering: auto;
    object-fit: cover;
    width: 100%;
`
const ProfileImage = styled.img`
    height: 110px;
    width: 110px;
    object-fit: cover;
    background-color: #fff;
    border: 4px solid green;
    padding: 2px;
    border-radius:50%;
`
const ShopName = styled.h4`
    padding-top: 10px;
    margin-top: 15px;
`
const ShopDis = styled.span``
const ShopLoc = styled.span``
const ShopLinks = styled.div`
    display: flex;
    justify-content: space-between;
    color: #41b56c;
`
const CatTab = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 200;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #a1e3b9;
    border-radius: 30px;
    overflow-x: auto;
    white-space: nowrap;
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
    	background-color: #41b56c;
    }
    @media screen and (max-width: 578px) {
        justify-content: flex-start;
    }
`
const CatText = styled.span`
    padding: 20px;
    color: black;
    font-weight: 600;
`

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

export default ShopPage;