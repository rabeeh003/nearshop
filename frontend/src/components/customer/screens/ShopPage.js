import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { Card, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFont from './NotFont';

// import { ToastContainer, toast } from 'react-toastify';



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
    const { product } = props.show;
    const { addToCart, onHide } = props;
    { console.log("sel pro : ", product); }
    return (
        <Modal
            className='user-select-none'
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <span className='h3 p-0 m-0'>{product ? product.gpro.product_name : ''}</span>
            </Modal.Header>
            <Modal.Body>
                {product ? (
                    <PDetiles>
                        <div style={{ width: "45%" }}>
                            <ProImage>
                                <Card.Img style={{ objectFit: 'fill' }} variant="top" src={product.gpro.prodect_image} alt={product.gpro.product_name}  />
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
                ) : ("")}
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="success" onClick={() => {
                    addToCart(product)
                    onHide()
                }} style={{ width: '150px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Cart</Button>
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

// Shop page code start

function ShopPage() {
    const [modalShow, setModalShow] = useState(false);
    const [locShow, setLocShow] = useState(false);
    const [reviewShow, setReview] = useState(false);
    const [userId, setUserId] = useState()

    let today = new Date();
    today = today.toJSON().slice(0, 10);

    useEffect(() => {
        const fetchUserId = () => {
            const userKeyString = localStorage.getItem('userKey');
            if (userKeyString) {
                const userKey = JSON.parse(userKeyString);
                setUserId(userKey.id);
                console.log('user id : ', userId);
            } else {
                console.log('adminKey not found in localStorage');
            }
        };

        fetchUserId()
    }, [modalShow]);

    const notify = () => {
        toast("Link copied")
        copyToClipboard()
    }

    const copyToClipboard = () => {
        const copyText = `https://nearshop.online/${allData.shop_id}`;

        navigator.clipboard.writeText(copyText).then(() => {
            // alert('Copied to clipboard: ' + copyText);


        }).catch((error) => {
            console.error('Failed to copy: ', error);
        });
    };

    const [allData, setAllData] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allCategories, setAllCategories] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('');
    const [catDone, setCatDone] = useState(1)
    const categoriesOrder = [
        "offer",
        'grocery',
        'Vegetables',
        'Fruits',
        'Groceries',
        "Packed",
        "Backes",
    ];

    useEffect(() => {
        const url = window.location.pathname;
        const parts = url.split('/');
        const shopId = parts[parts.length - 1];

        axios.get(`https://www.nearbazar.shop/api/s/shop/${shopId}/`)
            .then(response => {
                console.log("Shop Data:", response.data);
                setAllData(response.data);
                // setFilteredProducts(response.data.shop_products || []);
            })
            .catch(error => {
                console.error('Error fetching shop data:', error);
            });

        axios.get('https://www.nearbazar.shop/api/p/gcategory/')
            .then(response => {
                console.log("Categories:", response.data);
                const categoriesDict = {};
                response.data.forEach(category => {
                    categoriesDict[category.category_name] = [];
                });
                setAllCategories({ ...categoriesDict, offer: [] });
                console.log("get categoriesDict : ", categoriesDict);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    useEffect(() => {
        console.log("checking start");
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

            const offerProducts = allData.seller_products.filter(product =>
                product.offer_price !== null &&
                new Date(today) >= new Date(product.offer_start) &&
                new Date(today) <= new Date(product.offer_end)
            );

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
            console.log("updated catagory ( filter ) :", allCategories);
            if (allCategories !== 0 && allCategories !== 0) {
                const defaultCategory = categoriesOrder.find(category => allCategories[category]?.length > 0);
                if (defaultCategory) {
                    setSelectedCategory(defaultCategory);
                    setFilteredProducts(allCategories[defaultCategory] || []);
                }
                setCatDone(catDone + 1)
                console.log("defualt selectedCategory : ", selectedCategory);
            }

        }
    }, [allData]);

    const [orderId, setOrderId] = useState()
    const [oData, setOData] = useState({
        "name": "online",
        "status": "Cart",
        "shop": '',
        "user": userId,
    })

    const [oPData, setOPData] = useState({
        "user": '',
        "shop": '',
        "order": '',
        "product": '',
        "product_count": '',
        "count_type": '',
    })

    const addToCart = async (product) => {
        if (product) {
            console.log("_____add to cart start_____");
            console.log("passed data : ", product);
            console.log("user id  : ", userId, ", shop id :", product.seller.id);
            const updateOrderData = {
                ...oData,
                "shop": product.seller.id,
                "user": userId,
            };
            setOData(updateOrderData);

            if (updateOrderData.user !== '' && updateOrderData.shop !== '') {
                try {
                    console.log("---- check and create order ----");
                    const response = await axios.get("https://www.nearbazar.shop/api/s/orders/");
                    const existingData = response.data?.filter(item => item.user === userId) || [];
                    console.log("existing data : ", existingData);

                    const matchingIndex = existingData.findIndex(item => {
                        return item.shop === updateOrderData.shop && item.status === 'Cart';
                    });

                    if (matchingIndex !== -1) {
                        console.log("maching index : ", existingData[matchingIndex])
                        setOrderId(existingData[matchingIndex].id)
                        console.log("order id : ", orderId);

                    } else {
                        console.log("ready to push : ", updateOrderData);
                        await axios.post("https://www.nearbazar.shop/api/s/orders/", updateOrderData).then(res => {
                            console.log("res : ", res.data);
                            setOrderId(res.data.id)
                            console.log("order id : ", orderId);
                        })
                    }
                    console.log("order created");
                    console.log("order id : ", orderId);
                    console.log("----- product adding -----");
                    const updateOrderProductData = {
                        ...oPData,
                        "shop": product.seller.id,
                        "user": userId,
                        "order": orderId,
                        "product": product.id,
                        "product_count": 1,
                        "count_type": product.gpro.weight_type
                    };
                    setOPData(updateOrderProductData);
                    console.log("updated opd : ", updateOrderProductData);
                    const oProductD = await axios.get("https://www.nearbazar.shop/api/s/orderproduct/")
                    console.log("get the oProductD for check :", oProductD)
                    console.log("user id", userId);
                    const filterdOPD = oProductD.data.filter(item =>
                        item.user === userId &&
                        item.shop === updateOrderProductData.shop &&
                        item.product === updateOrderProductData.product &&
                        item.orderdata.status === "Cart"
                    ) || "";
                    console.log("affter filtering products data : ", filterdOPD);

                    if (filterdOPD.length === 0) {
                        console.log("just print products : ", updateOrderProductData);
                        console.log("just print products : ", oPData);
                        await axios.post("https://www.nearbazar.shop/api/s/orderproduct/", updateOrderProductData)
                            .then(res => {
                                console.log("submitted, res :", res.data);
                            })
                            .catch(err => console.log(err));
                    }

                } catch (error) {
                    // Handle errors here
                    alert('Something went wrong');
                }
            } else {
                alert('Something is missing'); // Handle the case where user or shop is empty
            }
        }
    }

    const handleCategorySelect = categoryName => {
        setSelectedCategory(categoryName);
        setFilteredProducts(allCategories[categoryName] || []);
        console.log("onclick selectedCategory : ", selectedCategory);
    };

    const loginRequard = () => toast.warn('Login is required !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
    });


    return (
        <>
            {allData !== null ? (


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
                                    <i class="fa-solid fa-share-from-square p-3" onClick={notify}></i>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="light"
                                    />
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
                            {filteredProducts.map((product, idx) => (
                                <Col xs={6} sm={4} md={3} lg={2} xxl={2} key={idx} className='d-flex' style={{ justifyContent: 'center' }}>
                                    <OfCard >
                                        <div onClick={() => setModalShow({ product })}>
                                            <CardImage>
                                                {/* <Badge style={{ position: 'absolute', bottom: 0, right: 0 }} bg="success">40% Off</Badge> */}
                                                {/* <Badge style={{ position: 'absolute', top: 0, color: 'gray' }} bg=""><i className="fa-solid fa-store"></i>{product.seller.shop_name}</Badge> */}
                                                <Card.Img style={{ width: "84px", height: "80px" }} variant="top" src={product.gpro.prodect_image} alt={product.gpro.product_name} />
                                            </CardImage>
                                            <Card.Body className='text-center mt-2'>
                                                <Card.Title style={{ fontSize: '15px' }}>{product.gpro.product_name}</Card.Title>
                                                <Card.Text style={{ fontSize: '15px' }}>
                                                    {product.offer_price !== null &&
                                                        new Date(today) >= new Date(product.offer_start) &&
                                                        new Date(today) <= new Date(product.offer_end) ? (
                                                        <span>
                                                            Price: <span className="text-decoration-line-through">₹ {product.price}</span> <b> ₹ {product.offer_price}</b>
                                                        </span>
                                                    ) : (
                                                        <span>Price: ₹ {product.price}</span>
                                                    )}

                                                </Card.Text>
                                            </Card.Body>
                                        </div>
                                        <Button variant="" onClick={() => {
                                            if (userId !== null) {
                                                addToCart(product)
                                            } else {
                                                console.log("sign is required");
                                                loginRequard()
                                            }

                                        }} className='btn-outline-success' style={{ fontSize: '15px' }}><i className="fa-solid fa-plus pe-2"></i>Add to Cart</Button>
                                        <ToastContainer/>
                                    </OfCard>
                                </Col>
                            ))}
                        </Row>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            addToCart={addToCart}
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
            ) : (
                ""
                // <NotFont />
            )}
        </>
    )
}

const Page = styled.div`
  max-width: 90vw;
  padding-top: 20px;
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