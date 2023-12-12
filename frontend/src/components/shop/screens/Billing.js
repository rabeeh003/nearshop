import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import SearchSuggestions from '../includes/billing page/SearchSuggestions';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Billing() {
    const [showModal, setShowModal] = useState(false)
    const handleModalOpen = () => setShowModal(true)
    const handleModalClose = () => setShowModal(false)
    let location = useLocation();
    const addpro = location.state?.product || null
    const [count, setCount] = useState(null)
    const [type, setype] = useState('')
    const [phone, setPhone] = useState('')
    const [totel, setTotel] = useState('0')
    const [disc, setDisc] = useState(0)
    const [grand, setGrand] = useState(0)
    const [shopId, setShopId] = useState()
    const [shoppro, setShoppro] = useState([])
    const [billData, setBillData] = useState({
        "name": "",
        "status": "Billed",
        "total_price": '',
        "customer_phone": "",
        "shop": null,
    })
    const [pros, setPros] = useState({
        "product_count": "",
        "count_type": "",
        "user": '',
        "shop": '',
        "order": '',
        "product": '',
        "product_price": ''
    })
    const [billpro, setBillpro] = useState([])
    const [proCount, setProCount] = useState([])
    const [proPrice, setProPrice] = useState([])
    const [cType, setCType] = useState([])

    const submitBill = async () => {
        const dataToUpdate = {};
        const propertiesToCheck = ['name', 'status', 'customer_phone', 'shop'];
        propertiesToCheck.forEach(property => {
            if (billData[property] !== null) {
                dataToUpdate[property] = billData[property];
            }
        });
        console.log("-------= start post =-------");
        console.log("--> BillData : ", billData);
        console.log("--> dataToUpdate : ", dataToUpdate);
        await axios.post('http://127.0.0.1:8000/api/s/orders/', dataToUpdate)
            .then(async (response) => {
                console.log('Response:', response.data);
                console.log("-------= product data post =-------");
                const allProduct = billpro.map((productId, index) => ({
                    product_count: proCount[index],
                    count_type: cType[index],
                    shop: shopId,
                    order: response.data.id,
                    product: productId.id,
                    product_price: proPrice[index]
                }));
                console.log("product to upload : ", allProduct);
                allProduct.forEach(productData => {
                    axios.post('http://127.0.0.1:8000/api/s/orderproduct/', productData)
                        .then(response => {
                            console.log('Product added successfully:', response.data);
                            setCType([])
                            setProPrice([])
                            setBillData({
                                "name": "",
                                "status": "Billed",
                                "total_price": '',
                                "customer_phone": "+91",
                                "shop": null,
                            })
                            setBillpro([])
                            setProCount([])
                        })
                        .catch(error => {
                            console.error('Error adding product:', error);
                            // Handle error for each product
                        });
                });
                toast("billed successfully.")
            })
            .catch(error => {
                console.error('Error:', error);
            });
        console.log("end");
    }

    const handleTypeChange = (e) => {
        setype(e.target.value);
    };

    const productToList = () => {

        if (addpro && addpro !== '' && !billpro.includes(addpro)) {
            setBillpro(prevBillpro => {
                const updatedProducts = [...prevBillpro, addpro];
                console.log("updated bill products : ", updatedProducts);
                return updatedProducts;
            });

            setProCount(prevProCount => {
                const updatedCount = [...prevProCount, count];
                console.log("updated products count : ", updatedCount);
                return updatedCount;
            });

            setCType(prevCType => {
                const updatedCType = [...prevCType, type];
                console.log("updated count type : ", updatedCType);
                return updatedCType;
            });

            setProPrice(prevProPrice => {
                if (type === "g") {
                    const priceFor1kg = addpro.price;
                    const priceForG = (priceFor1kg / 1000) * count;
                    console.log("Price is :", priceForG);
                    const parsedTotel = parseFloat(totel);
                    setTotel(parsedTotel + priceForG)
                    console.log("totel : ", totel);
                    const updatedPrice = [...prevProPrice, priceForG];
                    return updatedPrice;
                }
                else if (type === "kg") {
                    const priceFor1kg = addpro.price;
                    const priceForG = priceFor1kg * count;
                    console.log("Price is :", priceForG);
                    const parsedTotel = parseFloat(totel);
                    setTotel(parsedTotel + priceForG)
                    console.log("totel : ", totel);
                    const updatedPrice = [...prevProPrice, priceForG];
                    return updatedPrice;
                } else {
                    const priceFor1kg = addpro.price;
                    const priceForG = priceFor1kg * count;
                    console.log("Price is :", priceForG);
                    const parsedTotel = parseFloat(totel);
                    setTotel(parsedTotel + priceForG)
                    console.log("totel : ", totel);
                    const updatedPrice = [...prevProPrice, priceForG];
                    return updatedPrice;
                }
            });

            setCount('');
        }
        console.log("---------  Product to list ---------");
        console.log("addpro : ", addpro);
        console.log("proCount : ", proCount);
        console.log("proPrice : ", proPrice);
    }

    const removeItem = (index) => {
        const updatedBillpro = billpro.filter((item, i) => i !== index);
        const updatedProCount = proCount.filter((count, i) => i !== index);
        const updatedProPrice = proPrice.filter((price, i) => i !== index);
        const removedItemPrice = proPrice[index];
        const updatedTotel = totel - removedItemPrice;
        setTotel(updatedTotel);
        console.log("totel : ", totel);
        const updatedCType = cType.filter((type, i) => i !== index);

        setBillpro(updatedBillpro);
        setProCount(updatedProCount);
        setProPrice(updatedProPrice);
        setCType(updatedCType);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBillData({
            ...billData,
            [name]: value
        });
    };

    useEffect(() => {
        setGrand(totel - disc)
        const updateBilldata = {
            ...billData,
            "customer_phone": phone,
            "total_price": grand
        };
        setBillData(updateBilldata);

    }, [phone, disc])

    useEffect(() => {
        const fetchShopId = () => {
            const adminKeyString = localStorage.getItem('adminKey')
            if (adminKeyString) {
                const adminKey = JSON.parse(adminKeyString);
                setShopId(adminKey.id)
                const updateBilldata = {
                    ...billData,
                    "shop": shopId
                };
                setBillData(updateBilldata);
                console.log("shop id set in bill data : ", updateBilldata);
            } else {
                console.log('adminKey not found in localStorage');
            }
        }
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
    }, [shopId]);
    return (
        <Page>
            <Container fluid>
                <Row className='p-2 d-flex pt-4' style={{ borderRadius: "10px", backgroundColor: 'whitesmoke' }}>

                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Costumer Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" name='name' value={billData.name} onChange={handleInputChange} />
                        </FloatingLabel>
                    </Col>
                    <Col sm={5} xl={4}>
                        <PhoneInput
                            inputStyle={{ width: "100%", height: "55px", fontSize: '18px' }}
                            country={'in'}
                            value={billData.customer_phone}
                            onChange={(phone) => setPhone("+" + phone)}
                        />
                    </Col>


                </Row>
                <Row className='mt-3 p-3' style={{ borderRadius: '10px', height: '60vh', backgroundColor: 'whitesmoke' }}>
                    <ScrollableRow className='pt-0' style={{ position: 'relative', borderRadius: '10px', height: '80%' }}>
                        <Col xs={12} className='d-flex pb-2' style={{ alignItems: 'flex-start', justifyContent: 'space-between', height: "fit-content", borderBottom: '1px solid black' }}>
                            <HeadTest>No</HeadTest>
                            <HeadTest>Prodect Name</HeadTest>
                            <HeadTest>Wight</HeadTest>
                            <HeadTest>type</HeadTest>
                            <HeadTest>Price</HeadTest>
                            <HeadTest>Remove</HeadTest>
                        </Col>
                        {billpro.map((item, index) => (
                            <div key={item.id} className="d-flex pt-2" style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                <div>{index + 1}</div>
                                <div>{item.gpro.product_name}</div>
                                <div>{proCount[index]}</div>
                                <div>{cType[index]}</div>
                                <div>{proPrice[index]}</div>
                                <div><i className="fa-regular fa-circle-xmark me-3" onClick={() => removeItem(index)}></i></div>
                            </div>
                        ))}
                    </ScrollableRow>
                    <Col xs={12} className='d-flex pt-2' style={{}}>
                        <Col xs={3} sm={3} lg={3} >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Totel"
                            >
                                <label style={{ MinWidth: "100px", maxWidth: '30vw' }} className='form-control' >{totel}</label>
                            </FloatingLabel>
                        </Col>
                        <Col xs={3} sm={3} lg={4}  >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Discount"
                            >
                                <Form.Control type="number" value={disc} onChange={(e) => setDisc(e.target.value)} />
                            </FloatingLabel>
                        </Col>
                        <Col xs={3} sm={3} lg={3}  >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Grand"
                            >
                                <label style={{ MinWidth: "80px" }} className='form-control' >{grand}</label>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <Button onClick={submitBill} variant='info' style={{ height: '55px', width: '90%', marginLeft: "5px" }}>Bill</Button>
                            <ToastContainer
                                position="top-center"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </Col>
                    </Col>
                </Row>
                <Row className='mt-3 pt-3' style={{ borderRadius: '10px', backgroundColor: 'whitesmoke' }}>
                    <Col xs={12} lg={7}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Product Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" value={addpro?.gpro.product_name} onClick={handleModalOpen} />
                            <SearchSuggestions show={showModal} onHide={handleModalClose} shoppro={shoppro} />
                        </FloatingLabel>
                    </Col>
                    <Col xs={4} sm={4} lg={2} >
                        <FloatingLabel
                            controlId="floatingInput"
                            label="type"
                            className="mb-3"
                        >
                            <Form.Select aria-label="Default select example" onClick={handleTypeChange}>
                                {addpro.gpro.weight_type === 'count' ? (
                                    <option value="pack">Pack</option>
                                ) : (
                                    <>
                                        <option value="kg">kg</option>
                                        <option value="g">gram</option>
                                    </>
                                )}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col xs={4} sm={4} lg={2} >
                        <FloatingLabel
                            controlId="floatingInput"
                            label="count"
                            className="mb-3"
                        >
                            <Form.Control type="number" value={count} onChange={(e) => setCount(e.target.value)} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <Button variant='info' style={{ height: '55px', width: '100%' }} onClick={productToList}>Add</Button>
                    </Col>
                </Row>
            </Container>
        </Page>
    )
}

const Page = styled.div`
  max-width: 90vw;
  margin: auto;
  margin-bottom: 10px;
  @media screen and (max-width: 578px) {
    height: 100%;
    margin-bottom: 70px;
    max-width: 98vw;
  }
`

const HeadTest = styled.span`
    @media screen and (max-width: 578px) {
        font-size: small;
    }
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

export default Billing