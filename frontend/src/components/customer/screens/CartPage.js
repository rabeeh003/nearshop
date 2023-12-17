import React, { useEffect, useRef, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Row, Modal, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function CartPage() {
    const [editShow, setEditShow] = React.useState(false);
    const [acceptShow, setAcceptShow] = React.useState(false);
    const [cancelShow, setCancelShow] = React.useState(false);
    const [loadUseEffect, fofUseEffect] = useState(0)

    const [userId, setUserId] = useState();
    const [orders, setOrders] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchUserId = () => {
            const userKeyString = localStorage.getItem('userKey');
            if (userKeyString) {
                const userKey = JSON.parse(userKeyString);
                setUserId(userKey.id);
                console.log('user id : ', userKey.id);
            } else {
                console.log('adminKey not found in localStorage');
            }
        };

        fetchUserId();
    }, []);
    useEffect(() => {

        const fetchOrder = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/s/orders/');
                console.log("responce from orders : ", response);
                const ord = response.data.filter(order => order.user === userId && order.status !== 'Billed');

                console.log("api data :", ord);
                setOrders(ord)

                try {
                    console.log("start fech order pro");
                    const res = await axios.get('http://127.0.0.1:8000/api/s/orderproduct/');
                    console.log("responce from orderproducts : ", res.data);
                    const filterd = res.data.filter(order => ord.some(orderObj => orderObj.id === order.order));
                    console.log("filtered products :", filterd);

                    setFilteredData(filterd)

                } catch (error) {
                    console.error('Error fetching data: ', error);
                }

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchOrder()
    }, [userId, loadUseEffect]);

    const allfilter = []

    const [orderToCancel, setOrderToCancel] = useState({ orderId: null, userId: null, userName: '' });
    const [orderToAccept, setOrderToAccept] = useState({ orderId: null, userId: null, userName: '' });
    const [orderToEdit, setOrderToEdit] = useState({ orderId: null, productId: null, userId: null, userName: '', currentCount: "", countType: '', listKey: null });

    const [orderMessages, setOrderMessages] = useState({});
    const handleTextChange = (e, orderId) => {
        const { value } = e.target;
        setOrderMessages({ ...orderMessages, [orderId]: { ...orderMessages[orderId], text: value } });
    };

    const sendMessage = async (orderId) => {
        const text = orderMessages[orderId];
        const messageToSend = {
            "text": text.text,
            "user": userId,
            "shop": null,
            "order": orderId
        }
        console.log("Message to send : ", messageToSend);
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/s/messages/", messageToSend);
            console.log("message sended : ", res);
            setOrderMessages({ ...orderMessages, [orderId]: { ...orderMessages[orderId], text: '' } });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const [groupedMessages, setGroupedMessages] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/s/messages/')
            .then(response => {
                const messages = response.data;
                const updatedGroupedMessages = {};

                messages.forEach(message => {
                    const orderId = message.order;
                    if (!updatedGroupedMessages[orderId]) {
                        updatedGroupedMessages[orderId] = [];
                    }
                    updatedGroupedMessages[orderId].push(message);
                });
                setGroupedMessages(updatedGroupedMessages);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [orderMessages]);

    // chat scroll
    const ChatBody = ({ children }) => {
        const chatBodyRef = useRef(null);

        const scrollToBottom = () => {
            if (chatBodyRef.current) {
                chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
            }
        };

        useEffect(() => {
            scrollToBottom();
        }, [children]);

        return (
            <div style={{ maxHeight: "300px", overflow: 'auto' }} ref={chatBodyRef}>
                {children}
            </div>
        );
    };
    // count updating
    const handleUpdateSuccess = (updatedData) => {
        const index = filteredData.findIndex(item => item.id === updatedData.id);
        if (index !== -1) {
            filteredData[index] = updatedData;
            setFilteredData([...filteredData]);
        } else {
            console.log('Element not found in filteredData');
        }
    };
    // remove product
    const [productToRemove, setProductToRemove] = useState({ productId: null });

    useEffect(() => {
        const removeProduct = async () => {
            try {
                if (productToRemove.productId !== null) {
                    const response = await axios.delete(`http://127.0.0.1:8000/api/s/orderproduct/${productToRemove.productId}`);
                    console.log('Delete response:', response);

                    const index = filteredData.findIndex(item => item.id === productToRemove.productId);
                    if (index !== -1) {
                        const updatedList = [...filteredData];
                        updatedList.splice(index, 1);
                        setFilteredData(updatedList);
                    } else {
                        console.log('Element not found in filteredData');
                    }
                }
            } catch (error) {
                console.log('Delete error:', error);
            }
        };

        removeProduct();
    }, [productToRemove, filteredData]);

    // check out navigate
    const navigate = useNavigate();
    const [passingData, setPassingData] = useState({shop:null, products:null})
    useEffect(() => {
        console.log("passed data to check out :",passingData);
        const goToCeckout = () => {
            navigate('checkout', { state: { shop: passingData.shop, products:passingData.products } });
        };
        if (passingData.shop !== null) {
            goToCeckout()
        }
    },[passingData])

    return (
        <Page className='user-select-nones'>
            {orders.length > 0 ? (
                <>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        {orders.map((shopId, idx) => {

                            const justfilter = filteredData.filter(order => order.order === shopId.id);
                            const filteredProducts = justfilter.slice().sort((a, b) => a.id - b.id);
                            allfilter.push(filteredProducts)
                            console.log("all filter :", allfilter);
                            console.log("userId: ", shopId);
                            console.log("Filtered Products: ", filteredProducts);
                            function calculateTotalPrice(price, count, type) {
                                const numericPrice = parseInt(price);
                                const numericCount = parseInt(count);

                                if (!isNaN(numericPrice) && !isNaN(numericCount)) {
                                    if (type === "g") {
                                        const prr = (numericPrice / 1000) * numericCount;
                                        return prr
                                    } else {
                                        const pr = numericPrice * numericCount;
                                        return pr
                                    }

                                } else {
                                    return 'Price or count is invalid';
                                }
                            }

                            return (
                                <Accordion.Item key={idx} eventKey={idx} style={BoxShadow} className='mb-4 rounded'>
                                    <Accordion.Header>
                                        <div className='d-flex flex-column w-100'>
                                            <Row className=''>
                                                <Col style={{ minWidth: 'fit-content' }} className="d-flex align-items-center">
                                                    <ProIcon src={shopId.seller.profile_image} />
                                                    <ShopName className='h5 m-2 m-sm-4'>{shopId.seller.shop_name}</ShopName>
                                                </Col>
                                                <Col className='d-flex justify-content-end m-3 align-items-center'>
                                                    {shopId.status === "Ordered" ? (
                                                        <>
                                                            <Link className='text-reset text-decoration-none m-2'>
                                                                <ActioinBt
                                                                    onClick={() => {
                                                                        setCancelShow(true);
                                                                        setOrderToCancel({ orderId: shopId.id, userId: shopId.shop, userName: shopId.seller.shop_name });
                                                                    }}
                                                                    className='btn btn-danger'
                                                                >
                                                                    Cancel
                                                                </ActioinBt>
                                                            </Link>
                                                        </>
                                                    ) : shopId.status === "Returned" ? (
                                                        <>
                                                            <Link className='text-reset text-decoration-none m-2'>
                                                                <ActioinBt
                                                                    onClick={() => {
                                                                        setCancelShow(true);
                                                                        setOrderToCancel({ orderId: shopId.id, userId: shopId.shop, userName: shopId.seller.shop_name });
                                                                    }}
                                                                    className='btn btn-danger'
                                                                >
                                                                    Cancel
                                                                </ActioinBt>
                                                            </Link>
                                                            <Link className='text-reset text-decoration-none m-2'
                                                                onClick={() => {
                                                                    setAcceptShow(true);
                                                                    setOrderToAccept({ orderId: shopId.id, userId: shopId.shop, userName: shopId.seller.shop_name });
                                                                }}
                                                            >
                                                                <ActioinBt className='btn btn-warning' >Re order</ActioinBt>
                                                            </Link>
                                                        </>

                                                    ) : shopId.status === "Canceled" ? (
                                                        <Link className='text-reset text-decoration-none m-2'>
                                                            <ActioinBt className='btn btn-outline-danger text-danger'>Rejected</ActioinBt>
                                                        </Link>
                                                    ) : shopId.status === "Paid" ? (
                                                        <Link className='text-reset text-decoration-none m-2'>
                                                            <ActioinBt className='btn btn-info '>#AC322</ActioinBt>
                                                        </Link>
                                                    ) : shopId.status === "Accepted" ? (
                                                        <>
                                                            <Link className='text-reset text-decoration-none m-2'>
                                                                <ActioinBt
                                                                    onClick={() => {
                                                                        setCancelShow(true);
                                                                        setOrderToCancel({ orderId: shopId.id, userId: shopId.shop, userName: shopId.seller.shop_name });
                                                                    }}
                                                                    className='btn btn-danger'
                                                                >
                                                                    Cancel
                                                                </ActioinBt>
                                                            </Link>
                                                            <Link className='text-reset text-decoration-none m-2'>
                                                                <ActioinBt onClick={() => setPassingData({shop:shopId, products:filteredProducts})} className='btn btn-info'>
                                                                    Pay
                                                                </ActioinBt>
                                                            </Link>
                                                        </>
                                                    ) : shopId.status === "Cart" ? (
                                                        <Link className='text-reset text-decoration-none m-2'>
                                                            <ActioinBt className='btn btn-success '
                                                                onClick={() => {
                                                                    setAcceptShow(true);
                                                                    setOrderToAccept({ orderId: shopId.id, userId: shopId.shop, userName: shopId.userData.full_name });
                                                                }}
                                                            >Order</ActioinBt>
                                                        </Link>

                                                    ) : ""}
                                                </Col>
                                            </Row>
                                            <Row className='w-100'>
                                                <Col className='d-flex align-items-center justify-content-around'>
                                                    <CartDet><b>Total items : </b>{filteredProducts.length}</CartDet>
                                                    <CartDet><b>Order status : </b>{shopId.status}</CartDet>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {filteredProducts?.map((order, orderIdx) => (
                                            <Items key={orderIdx} className='bg-light my-1' style={{ boxShadow: "1px 1px 53px #acaaca,1px 1px 13px #ffffff" }}>

                                                <Row className='w-100 d-flex my-1  align-items-center py-2 position-relative'>
                                                    <span className='d-flex align-items-center bg-light rounded-circle p-1 justify-content-center ' style={{
                                                        maxWidth: '35px',
                                                        borderRadius: "50px",
                                                        background: "#e0e0e0",
                                                        boxShadow: "6px 6px 12px #acacac,-6px -6px 12px #ffffff"
                                                    }}>{orderIdx + 1}</span>
                                                    <Row className='d-flex align-items-center justify-content-around'>
                                                        <Col xs={10} sm={8} md={6} className='d-flex align-items-center justify-content-around'>
                                                            <Col className='d-md-flex align-items-center'>
                                                                <ItemImage src={order.pro.gpro.prodect_image} />
                                                                <ItemText>{order.pro.gpro.product_name}</ItemText>
                                                            </Col>
                                                            <Col xs={3}>
                                                                <ItemText className='m-3'>₹ {calculateTotalPrice(order.pro.price, order.product_count, order.count_type)}</ItemText>
                                                            </Col>
                                                        </Col>
                                                        {shopId.status === "Cart" || shopId.status === "Returned" ? (
                                                            <Col xs={12} md={6} className='d-flex align-items-center justify-content-around'>
                                                                <Col xs={4} md={4} className='d-flex align-items-center justify-content-center'>
                                                                    <Form.Select aria-label="Default select example" style={{ minWidth: "70px", width: "100%", maxWidth: "90px" }}
                                                                        onClick={() => {
                                                                            setEditShow(true);
                                                                            setOrderToEdit({ orderId: shopId.id, userId: shopId.shop, productId: order.id, countType: order.count_type, currentCount: order.product_count, userName: order.pro.gpro.product_name, listKey: orderIdx });
                                                                        }}
                                                                    >
                                                                        {order.count_type === 'count' ? (
                                                                            <option hidden value="pack">Pack</option>
                                                                        ) : (
                                                                            <>
                                                                                {order.count_type === 'kg' ? (
                                                                                    <>
                                                                                        <option hidden value="kg">kg</option>
                                                                                        <option hidden value="g">gram</option>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <option hidden value="g">gram</option>
                                                                                        <option hidden value="kg">kg</option>
                                                                                    </>
                                                                                )}

                                                                            </>
                                                                        )}
                                                                    </Form.Select>
                                                                </Col>
                                                                <Col xs={4} sm={6} className='d-flex align-items-center justify-content-center'>
                                                                    <ItemBtn className='fa-solid fa-square-minus'
                                                                        onClick={() => {
                                                                            setEditShow(true);
                                                                            setOrderToEdit({ orderId: shopId.id, userId: shopId.shop, productId: order.id, countType: order.count_type, currentCount: order.product_count, userName: order.pro.gpro.product_name, listKey: orderIdx });
                                                                        }}
                                                                    ></ItemBtn>
                                                                    <InputGroup.Text
                                                                        style={{ width: "100%", maxWidth: "60px", maxHeight: "60px", textAlign: "center" }}
                                                                        className='m-2'
                                                                        type="number"
                                                                        onClick={() => {
                                                                            setEditShow(true);
                                                                            setOrderToEdit({ orderId: shopId.id, userId: shopId.shop, productId: order.id, countType: order.count_type, currentCount: order.product_count, userName: order.pro.gpro.product_name, listKey: orderIdx });
                                                                        }}
                                                                    >{order.product_count}</InputGroup.Text>
                                                                    <ItemBtn className="fa-solid fa-square-plus"
                                                                        onClick={() => {
                                                                            setEditShow(true);
                                                                            setOrderToEdit({ orderId: shopId.id, userId: shopId.shop, productId: order.id, countType: order.count_type, currentCount: order.product_count, userName: order.pro.gpro.product_name, listKey: orderIdx });
                                                                        }}
                                                                    ></ItemBtn>
                                                                </Col>
                                                                {/* <span class="position-absolute top-50 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2" style={{fontSize:"0.1rem"}}><i class="fs-6 fa-solid fa-trash text-white"></i></span> */}
                                                                <Col xs={"auto"} class="w-auto" style={{ fontSize: "0.1rem" }}><i onClick={() => { setProductToRemove({ productId: order.id }) }} class="rounded-circle bg-danger p-2 fs-6 fa-solid fa-trash text-white"></i></Col>
                                                            </Col>

                                                        ) : (
                                                            <Col xs={2} sm={2}>
                                                                <ItemText className='m-3'>{order.product_count}{order.count_type}</ItemText>
                                                            </Col>
                                                        )}
                                                    </Row>
                                                </Row>
                                            </Items>
                                        ))}
                                        {shopId.status !== "Cart" ? (
                                            <Contain>
                                                <ChatCard className='mt-5'>
                                                    <Header>
                                                        <span style={{ width: "100%", textAlign: 'center' }}>Live chat</span>
                                                    </Header>
                                                    <ChatBody>
                                                        {groupedMessages[shopId.id]?.map((message, messageIdx) => (
                                                            <ChatContent key={messageIdx}>
                                                                <Row className='row w-100' >
                                                                    {message.user === null ? (
                                                                        <Col style={{ width: "fit-content", maxWidth: "90%" }} className='d-flex'>
                                                                            <img alt='shop-profile' src={shopId.seller.profile_image} width='30' height='30' />
                                                                            <ChatBubble className='ml-2 p-3'>{message.text}</ChatBubble>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col className='d-flex justify-content-end'>
                                                                            <ChatBubbleUser className='ml-2 p-3'>{message.text}</ChatBubbleUser>
                                                                            <img alt='user-profile' src='https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png' width='30' height='30' />
                                                                        </Col>
                                                                    )}
                                                                </Row>
                                                            </ChatContent>
                                                        ))}
                                                    </ChatBody>
                                                    <div className='form-group px-3 d-flex justify-content-between align-items-center'>
                                                        <InputTextarea
                                                            rows='1'
                                                            style={{ width: "90%", fontSize: '1rem' }}
                                                            placeholder='Type your message'
                                                            value={orderMessages[shopId.id]?.text || ''}
                                                            onChange={(e) => handleTextChange(e, shopId.id)}
                                                        ></InputTextarea>
                                                        <button className='btn btn-success text-white' onClick={() => sendMessage(shopId.id)}><i class="fa-solid fa-paper-plane"></i></button>
                                                    </div>
                                                </ChatCard>
                                            </Contain>
                                        ) : ''}
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                    <EditModel
                        show={editShow}
                        onHide={() => {
                            setEditShow(false);

                            setOrderToEdit({ orderId: null, userName: '', productId: null, countType: "", currentCount: "", listKey: null });
                        }}
                        onUpdateSuccess={handleUpdateSuccess}
                        order={orderToEdit.orderId}
                        shop={orderToEdit.userId}
                        userName={orderToEdit.userName}
                        countType={orderToEdit.countType}
                        currentCount={orderToEdit.currentCount}
                        productId={orderToEdit.productId}
                        listKey={orderToEdit.listKey}
                    />
                    <AcceptModel
                        show={acceptShow}
                        onHide={() => {
                            setAcceptShow(false);
                            fofUseEffect(1)
                            setOrderToAccept({ orderId: null, userName: '' });
                        }}
                        order={orderToAccept.orderId}
                        user={orderToAccept.userId}
                        userName={orderToAccept.userName}
                    />
                    <CancelModel
                        show={cancelShow}
                        onHide={() => {
                            setCancelShow(false);
                            fofUseEffect(2)
                            setOrderToCancel({ orderId: null, userName: '' });
                        }}
                        order={orderToCancel.orderId}
                        shop={orderToCancel.userId}
                        userName={orderToCancel.userName}
                    />
                </>
            ) : (<p className='text-center'>no orders availabe</p>)}
        </Page>
    )
}

const Page = styled.div`
padding: 10px 20px;
max-width: 90vw;
margin: auto;
align-items: center;
@media screen and (max-width: 578px) {
  height: 100%;
  margin-bottom: 50px;
  max-width: 98vw;
}
`
const Contain = styled.div`
  display: flex;
  justify-content: center;
`;

const ChatCard = styled.div`
  width: 100%;
  max-width: 700px;
  border: none;
  border-radius: 15px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background: #198754;
  border-radius: 15px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 1rem;
  font-weight: 800;
  color: white;
`;

const ItemBtn = styled.span`
    font-size: 2rem;
    text-align: center;
    color: #198754;
`

const ChatContent = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const ChatBubble = styled.div`
  border: none;
  background: '#e2ffe8';
  font-size: 0.9rem;
  border-radius: 20px;
  border: 1px solid #e7e7e9;
`;

const ChatBubbleUser = styled.div`
  align-self: flex-end;
  border: none;
  background: '#e2ffe8';
  font-size: 0.9rem;
  border-radius: 20px;
  border: 1px solid #e7e7e9;
`;

const InputTextarea = styled.textarea`
  border-radius: 12px;
  padding: 10px 15px;
  border: 1px solid #f0f0f0;
  font-size: 1rem;
  &:focus {
    box-shadow: none;
  }
  &::placeholder {
    font-size: 0%.9;
    color: grey;
  }
`;

const ProIcon = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
@media screen and (max-width: 578px) {
    height: 30px;
    width: 30px;
}
`
const ShopName = styled.span`
font-weight: 600;
@media screen and (max-width: 578px) {
    font-size: 18px;
}
`
const ActioinBt = styled.span`
    color: white;
    font-size: 10px;
    font-weight: 600;
    @media screen and (max-width: 578px) {
        font-size: 9px;
    }
`
const CartDet = styled.span`
font-size: 15px;
@media screen and (max-width: 578px) {
    font-size: 12px;
}
`
const Items = styled.div`
background-color: #e6e8e7;
display: flex;
align-items: center;
border-radius: 8px;
`
const ItemImage = styled.img`
height: 60px;
width: 60px;
margin: 10px;
@media screen and (max-width: 578px) {
    height: 40px;
    width: 40px;
    margin: 5px;
}
`
const ItemText = styled.span`
font-size: 1rem;
font-weight: 600;
text-align: center;

@media screen and (max-width: 778px) {
    font-size: 15px;
    font-weight: 500;
}
`

//accept function
function AcceptModel(props) {
    console.log("propa for accept", props);
    const updatedData = {
        status: 'Ordered',
    }
    const [messageData, setMessage] = useState({
        "text": "",
        "user": props.user,
        "shop": null,
        "order": props.order
    })
    useEffect((messageData) => {
        setMessage({ ...messageData, user: props.user, order: props.order });
    }, [props])

    const handleTextChange = (e) => {
        setMessage({ ...messageData, text: e.target.value });
    };
    const AcceptOrder = () => {
        console.log("set return : ", updatedData, ", messageData :", messageData);
        axios.put(`http://127.0.0.1:8000/api/s/orders/${props.order}/`, updatedData)
            .then(async response => {
                console.log('Order updated successfully:', response.data);
                setMessage({ ...messageData, user: response.data.user, order: response.data.id });
                console.log("messageData :", messageData);
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/s/messages/', messageData);
                    console.log('Message sent:', response.data);
                    props.onHide()
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            })
            .catch(error => {
                console.error('There was an error updating the order:', error);
            });
    }
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            <Modal.Header className='bg-success' closeButton>
                <Modal.Title id="contained-modal-title-vcenter color-white">
                    <span className='text-white'><i class="fa-solid fa-check"></i> Accept {props.userName}'s order. </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <InputGroup>
                    <Form.Control required as="textarea" onChange={handleTextChange} placeholder='Enter accept message..' aria-label="With textarea" />
                    <Button className='bg-success' onClick={AcceptOrder} >Accept</Button>
                </InputGroup>
            </Modal.Footer>
        </Modal>
    );
}
// Edit Count.
function EditModel(props) {
    console.log("propa for edit count", props);
    const [count, setCount] = useState(props.currentCount);
    const [type, setType] = useState(props.countType);

    const handilChange = (e) => {
        setCount(e.target.value);
    };

    const plus = () => {
        if (count !== null) {
            const incrementedCount = parseInt(count) + 1;
            setCount(incrementedCount);
        }
    };

    const minus = () => {
        if (count > 1) {
            const decrementedCount = parseInt(count) - 1;
            setCount(decrementedCount);
        }
    };

    const updateCount = async () => {
        const data = {};

        if (count !== props.currentCount && count !== null) {
            data.product_count = count;
        }

        if (type !== props.countType && type !== '') {
            data.count_type = type;
        }

        try {
            console.log("updating ......  : ", data);
            const response = await axios.put(`http://127.0.0.1:8000/api/s/orderproduct/${props.productId}/`, data);
            console.log('Product count updated:', response.data);
            props.onUpdateSuccess(response.data, props.listKey);
            setCount(null);
            props.onHide();
        } catch (error) {
            console.error('Error updating product count:', error);
        }
    };
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            <Modal.Header className='bg-success' closeButton>
                <Modal.Title id="contained-modal-title-vcenter color-white">
                    <span className='text-white'><i class="fa-solid fa-edit"></i> Edit {props.userName}'s quantity. </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Form.Label >Priduct : {props.userName}</Form.Label>
                        <InputGroup className="mb-3 d-flex justify-content-around align-items-center">
                            <Form.Select onChange={e => setType(e.target.value)} aria-label="Default select example" style={{ minWidth: "70px", width: "100%", maxWidth: "90px" }} >
                                {props.countType === 'count' ? (
                                    <option value="pack">Pack</option>
                                ) : (
                                    <>
                                        {props.countType === 'kg' ? (
                                            <>
                                                <option value="kg">kg</option>
                                                <option value="g">gram</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="g">gram</option>
                                                <option value="kg">kg</option>
                                            </>
                                        )}

                                    </>
                                )}
                            </Form.Select>
                            <div className='d-flex justify-content-center align-items-center'>
                                <ItemBtn className='fa-solid fa-square-minus' onClick={minus} ></ItemBtn>
                                <Form.Control
                                    style={{ width: "100%", maxWidth: "70px", maxHeight: "60px", textAlign: "center" }}
                                    className='m-2'
                                    type="number"
                                    defaultValue={props.currentCount}
                                    value={count}
                                    onChange={handilChange}
                                />
                                <ItemBtn className="fa-solid fa-square-plus" onClick={plus}></ItemBtn>
                            </div>
                        </InputGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center align-items-center'>
                <Button className='bg-success' onClick={updateCount} >Update</Button>
            </Modal.Footer>
        </Modal>
    );
}
// cancel.
function CancelModel(props) {
    console.log("props  from cancel", props);
    const updatedData = {
        status: 'Cart',
    }
    const [messageData, setMessage] = useState({
        "text": "",
        "user": null,
        "shop": props.shop,
        "order": props.order
    })
    useEffect((messageData) => {
        setMessage({ ...messageData, user: props.user, order: props.order });
    }, [props])
    const handleTextChange = (e) => {
        setMessage({ ...messageData, text: e.target.value });
    };
    const cancelOrder = () => {
        console.log("set return : ", updatedData, ", messageData :", messageData);
        axios.put(`http://127.0.0.1:8000/api/s/orders/${props.order}/`, updatedData)
            .then(async response => {
                console.log('Order updated successfully:', response.data);

                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/s/messages/', messageData);
                    console.log('Message sent:', response.data);
                    props.onHide()
                } catch (error) {
                    console.error('Error sending message:', error);
                }
            })
            .catch(error => {
                console.error('There was an error updating the order:', error);
            });
    }
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            <Modal.Header className='bg-danger' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span className='text-white'><i class="fa-solid fa-warning"></i> Cancel {props.userName} order. </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <InputGroup>
                    <Form.Control required as="textarea" placeholder='Enter cancel message..' onChange={handleTextChange} aria-label="With textarea" />
                    <Button className='bg-danger' onClick={cancelOrder}>Cancel</Button>
                </InputGroup>
            </Modal.Footer>
        </Modal>
    );
}
export default CartPage