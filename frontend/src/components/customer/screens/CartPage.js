import React, { useEffect, useRef, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Row, Modal, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import userlogo from "../../../assets/images/userlogo.png"
import axios from 'axios';

const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function CartPage() {
    // const [returnShow, setReturnShow] = React.useState(false);
    const [acceptShow, setAcceptShow] = React.useState(false);
    const [cancelShow, setCancelShow] = React.useState(false);

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
    }, [userId]);

    const allfilter = []
    const [returnShowArray, setReturnShowArray] = useState(Array(orders.length).fill(false));
    useEffect(() => {
        if (orders.length > 0) {
            setReturnShowArray(Array(orders.length).fill(false));
        }
    }, [orders, acceptShow, cancelShow]);
    const [orderToCancel, setOrderToCancel] = useState({ orderId: null, userId: null, userName: '' });
    const [orderToAccept, setOrderToAccept] = useState({ orderId: null, userId: null, userName: '' });

    const [orderMessages, setOrderMessages] = useState({});
    // Function to handle changes in the message input field
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

    // Inside your component...
    useEffect(() => {
        // Axios call to fetch messages
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

                // Set the grouped messages in state
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
    return (
        <Page className='user-select-nones'>
            {orders.length > 0 ? (
                <>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        {orders.map((shopId, idx) => {

                            const filteredProducts = filteredData.filter(order => order.order === shopId.id);
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
                                                <Col className='d-flex  justify-content-end m-3 align-items-center'>
                                                    {shopId.status === "Ordered" ? (
                                                        <>
                                                            {/* <Link className='text-reset text-decoration-none'>
                                                                <ActioinBt
                                                                    onClick={() => {
                                                                        const updatedArray = [...returnShowArray];
                                                                        updatedArray[idx] = true;
                                                                        setReturnShowArray(updatedArray);
                                                                    }}
                                                                    className='btn btn-warning'>Return</ActioinBt>
                                                            </Link> */}
                                                            <Link className='text-reset text-decoration-none m-2'>
                                                                <ActioinBt
                                                                    onClick={() => {
                                                                        setCancelShow(true);
                                                                        setOrderToCancel({ orderId: shopId.id, userId: shopId.shop, userName: shopId.userData.full_name });
                                                                    }}
                                                                    className='btn btn-danger'
                                                                >
                                                                    Cancel
                                                                </ActioinBt>
                                                            </Link>
                                                            {/* <Link
                                                                onClick={() => {
                                                                    setAcceptShow(true);
                                                                    setOrderToAccept({ orderId: shopId.id, userId: shopId.shop, userName: shopId.userData.full_name });
                                                                }}
                                                                className='text-reset text-decoration-none m-2'
                                                            >
                                                                <ActioinBt className='btn btn-success'>
                                                                    Accept
                                                                </ActioinBt>
                                                            </Link> */}
                                                        </>
                                                    ) : shopId.status === "Returned" ? (
                                                        <>
                                                            <Link className='text-reset text-decoration-none m-2'>
                                                                <ActioinBt
                                                                    onClick={() => {
                                                                        setCancelShow(true);
                                                                        setOrderToCancel({ orderId: shopId.id, userId: shopId.shop, userName: shopId.userData.full_name });
                                                                    }}
                                                                    className='btn btn-danger'
                                                                >
                                                                    Cancel
                                                                </ActioinBt>
                                                            </Link>
                                                            <Link className='text-reset text-decoration-none m-2'>
                                                                <ActioinBt className='btn btn-warning' >Re order</ActioinBt>
                                                            </Link>
                                                        </>

                                                    ) : shopId.status === "Canceled" ? (
                                                        <Link className='text-reset text-decoration-none m-2'>
                                                            <ActioinBt className='btn btn-outline-danger text-danger'>Canceled</ActioinBt>
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
                                                                        setOrderToCancel({ orderId: shopId.id, userId: shopId.shop, userName: shopId.userData.full_name });
                                                                    }}
                                                                    className='btn btn-danger'
                                                                >
                                                                    Cancel
                                                                </ActioinBt>
                                                            </Link>
                                                            <Link className='text-reset text-decoration-none m-2'>
                                                                <ActioinBt className='btn btn-success'>
                                                                    Pay
                                                                </ActioinBt>
                                                            </Link>
                                                        </>
                                                    ) : shopId.status === "Cart" ? (
                                                        <Link className='text-reset text-decoration-none m-2'>
                                                            <ActioinBt className='btn btn-success '>Order</ActioinBt>
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

                                                <Row className='w-100 d-flex my-1  align-items-center py-2'>
                                                    <Col className='d-flex align-items-center bg-light rounded-circle p-1 justify-content-center' style={{
                                                        maxWidth: '35px',
                                                        borderRadius: "50px",
                                                        background: "#e0e0e0",
                                                        boxShadow: "6px 6px 12px #acacac,-6px -6px 12px #ffffff"
                                                    }}>{orderIdx + 1}</Col>
                                                    <Col className='d-md-flex align-items-center'>
                                                        <ItemImage src={order.pro.gpro.prodect_image} />
                                                        <ItemText>{order.pro.gpro.product_name}</ItemText>
                                                    </Col>
                                                    <Col xs={3}>
                                                        <ItemText className='m-3'>{order.product_count}{order.count_type}</ItemText>
                                                    </Col>
                                                    <Col xs={3}>
                                                        <ItemText className='m-3'>₹ {calculateTotalPrice(order.pro.price, order.product_count, order.count_type)}</ItemText>
                                                    </Col>
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
                                                                            <img src={shopId.seller.profile_image} width='30' height='30' />
                                                                            <ChatBubble className='ml-2 p-3'>{message.text}</ChatBubble>
                                                                        </Col>
                                                                    ) : (
                                                                        <Col className='d-flex justify-content-end'>
                                                                            <ChatBubbleUser className='ml-2 p-3'>{message.text}</ChatBubbleUser>
                                                                            <img src='https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png' width='30' height='30' />
                                                                        </Col>
                                                                    )}
                                                                </Row>
                                                            </ChatContent>
                                                        ))}
                                                    </ChatBody>
                                                    {/* Rest of the content styled similarly */}
                                                    {/* ... */}
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
                    {returnShowArray.map((show, idx) => (
                        show && (
                            <ReturnModel
                                key={idx}
                                show={returnShowArray[idx]}
                                onHide={() => {
                                    const updatedArray = [...returnShowArray];
                                    updatedArray[idx] = false;
                                    setReturnShowArray(updatedArray);
                                }}
                                product={allfilter[idx]}
                                user={orders[idx]?.userData?.full_name}
                            />
                        )
                    ))}
                    <AcceptModel
                        show={acceptShow}
                        onHide={() => {
                            setAcceptShow(false);
                            setOrderToAccept({ orderId: null, userName: '' });
                        }}
                        order={orderToAccept.orderId}
                        shop={orderToAccept.userId}
                        userName={orderToAccept.userName}
                    />

                    <CancelModel
                        show={cancelShow}
                        onHide={() => {
                            setCancelShow(false);
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
const ChatBody = styled.div`
  min-height: 50px;
  max-height: 40vh;
  overflow-y: auto;
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
// return.
function ReturnModel({ show, onHide, product, user }) {
    console.log("pro :", product, ", user:", user);
    const updatedData = {
        status: 'Returned',
    }
    const [messageData, setMessage] = useState({
        "text": "",
        "user": null,
        "shop": product[0]?.shop,
        "order": product[0]?.order
    })
    const handleTextChange = (e) => {
        setMessage({ ...messageData, text: e.target.value });
    };
    const returnOrder = () => {
        console.log("set return : ", updatedData, ", messageData :", messageData);
        axios.put(`http://127.0.0.1:8000/api/s/orders/${product[0].order}/`, updatedData)
            .then(async response => {
                console.log('Order updated successfully:', response.data);
                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/s/messages/', messageData);
                    console.log('Message sent:', response.data);
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
            show={show} onHide={onHide}
            className='user-select-none'
            // {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            centered
        >
            <Modal.Header className='bg-warning' closeButton>
                <Modal.Title id="contained-modal-title-vcenter ">
                    <span className='text-white'>
                        <i class="fa-solid fa-rotate-left"></i> Return {user}'s order.
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                {product?.map((order, orderIdx) => (
                    <Items key={orderIdx} className='bg-light my-1' style={{ boxShadow: "1px 1px 53px #acaaca,1px 1px 13px #ffffff" }}>

                        <Row className='w-100 d-flex my-1  align-items-center py-2'>
                            <Col className='d-flex align-items-center bg-light rounded-circle p-1 justify-content-center' style={{
                                maxWidth: '35px',
                                borderRadius: "50px",
                                background: "#e0e0e0",
                                boxShadow: "6px 6px 12px #acacac,-6px -6px 12px #ffffff"
                            }}>{orderIdx + 1}</Col>
                            <Col className='d-md-flex align-items-center'>
                                <ItemImage src={order.pro.gpro.prodect_image} />
                                <ItemText>{order.pro.gpro.product_name}</ItemText>
                            </Col>
                            <Col xs={3}>
                                <ItemText className='m-3'>{order.product_count}{order.count_type}</ItemText>
                            </Col>
                            {/* <Col> */}
                            {/* <ItemText className='m-3'>₹ {calculateTotalPrice(order.pro.price, order.product_count, order.count_type)}</ItemText> */}
                            {/* </Col> */}
                        </Row>
                    </Items>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <InputGroup>
                    <Form.Control as="textarea" placeholder='Enter return message..' value={messageData.text} onChange={handleTextChange} aria-label="With textarea" />
                    <Button className='bg-warning' onClick={returnOrder}>Return</Button>
                </InputGroup>
            </Modal.Footer>
        </Modal>
    );
}

// accept.
function AcceptModel(props) {
    console.log("propa for accept", props);
    const updatedData = {
        status: 'Accepted',
    }
    const [messageData, setMessage] = useState({
        "text": "",
        "user": null,
        "shop": props.shop,
        "order": props.order
    })
    const handleTextChange = (e) => {
        setMessage({ ...messageData, text: e.target.value });
    };
    const AcceptOrder = () => {
        console.log("set return : ", updatedData, ", messageData :", messageData);
        axios.put(`http://127.0.0.1:8000/api/s/orders/${props.order}/`, updatedData)
            .then(async response => {
                console.log('Order updated successfully:', response.data);

                try {
                    const response = await axios.post('http://127.0.0.1:8000/api/s/messages/', messageData);
                    console.log('Message sent:', response.data);
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
            {/* <Modal.Body>
        <Row>
          <Col>
            <Form.Label >Total</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control disabled aria-label="Amount (to the nearest dollar)" />
            </InputGroup>
          </Col>
          <Col>
            <Form.Label >Discount</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control aria-label="Amount (to the nearest dollar)" />
            </InputGroup>
          </Col>
          <Col>
            <Form.Label >Grand</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control disabled aria-label="Amount (to the nearest dollar)" />
            </InputGroup>
          </Col>
        </Row>
      </Modal.Body> */}
            <Modal.Footer>
                <InputGroup>
                    <Form.Control as="textarea" onChange={handleTextChange} placeholder='Enter accept message..' aria-label="With textarea" />
                    <Button className='bg-success' onClick={AcceptOrder} >Accept</Button>
                </InputGroup>
            </Modal.Footer>
        </Modal>
    );
}
// cancel.
function CancelModel(props) {
    console.log("props  from cancel", props);
    const updatedData = {
        status: 'Canceled',
    }
    const [messageData, setMessage] = useState({
        "text": "",
        "user": null,
        "shop": props.shop,
        "order": props.order
    })
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
                    <span className='text-white'><i class="fa-solid fa-warning"></i> Cancel {props.userName}'s order. </span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <InputGroup>
                    <Form.Control as="textarea" placeholder='Enter cancel message..' onChange={handleTextChange} aria-label="With textarea" />
                    <Button className='bg-danger' onClick={cancelOrder}>Cancel</Button>
                </InputGroup>
            </Modal.Footer>
        </Modal>
    );
}
export default CartPage