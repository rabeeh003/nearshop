import React from 'react';
import "./NoUser.css";
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import gify from "../../../../assets/images/homeshop.png"
import card1 from "../../../../assets/images/usercard.gif"
import card2 from "../../../../assets/images/sl.webp"
import card3 from "../../../../assets/images/ownercard.gif"
import { Link } from 'react-router-dom';

const NoUser = () => {
    return (
        <div className='non-user-body'>
            {/* <div className="blob"></div> */}
            <Container className="container-fluid pb-4 pt-4">
                <Row>
                    <Col xs='12' sm='12' md='7' className="d-flex align-items-center py-5">
                        <div className="card-wrapper">
                            <h1 className="mb-4 display-1">
                                <strong>Let's start now</strong></h1>
                            <p className="display-7">Unlock a world of convenience by utilizing your device's location to unveil the nearest shops and exclusive offers tailored just for you. Experience the joy of discovering hidden gems in your area while enjoying the best deals. Embrace the power of technology to enhance your shopping journey and make every purchase a delightful experience.</p>
                            <div className="mt-4"><BTN className="display-4" style={{ width: "100px" }} >Join</BTN></div>
                        </div>
                    </Col>
                    <Col className="d-flex align-item-center">
                        <div className="image-wrapper m-auto">
                            <img width={"100%"} src={gify} alt="" />
                        </div>
                    </Col>
                </Row>
                <Row className='my-5'>
                    <Col xs='12' lg="4" className='my-3 d-flex align-items-center justify-content-center' >
                        <CARD  >
                            <div style={{height:'300px'}} className="d-flex text-align-center justify-content-center image-wrapper m-auto">
                                <img width={"100%"} src={card1} alt="" />
                            </div>
                            <h1 className="text-dark title">Account For customer</h1>
                            <p className="text-dark subtitle">Discover the finest local offers with our app, facilitating seamless shopping experiences. Compare prices, order effortlessly, and enjoy doorstep delivery from your favorite shops, enhancing your shopping convenience.</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link className='nav-link w-100' to={'/login'}><BTN className="btn">Login</BTN></Link>
                                <Link className='nav-link w-100' to={'/signup'}><BTN className="btn">Register</BTN></Link>
                            </div>
                        </CARD>
                    </Col>
                    <Col xs='12' lg="4" className='my-3 d-flex align-items-center justify-content-center' >
                        <CARD >
                        <div style={{height:'300px'}} className="d-flex text-align-center justify-content-center image-wrapper m-auto">
                                <img width={"100%"} src={card2} alt="" />
                            </div>
                            <h1 className="text-dark title">Account For Shop</h1>
                            <p className="text-dark subtitle">Elevate your business with our user-friendly billing software. Analyze growth, export insightful reports, manage orders efficiently, and craft enticing offers for customers. Experience streamlined operations for enhanced shop performance.</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link className='nav-link w-100' to={'/shop'}><BTN className="btn">Login</BTN></Link>
                                {/* <BTN className="btn">Register</BTN> */}
                            </div>
                        </CARD>
                    </Col>
                    <Col xs='12' lg="4" className='my-3 d-flex align-items-center justify-content-center'>
                        <CARD >
                        <div style={{height:'300px'}} className="d-flex text-align-center justify-content-center image-wrapper m-auto">
                                <img width={"100%"} src={card3} alt="" />
                            </div>
                            <h1 className="text-dark title">Account For Owner</h1>
                            <p className="text-dark subtitle">Empower shop owners with our comprehensive management dashboard. Take control, analyze shop performance, and efficiently manage multiple outlets. Elevate your business strategy with centralized management capabilities.</p>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link className='nav-link w-100' to={'/owner'}><BTN className="btn">Login</BTN></Link>
                                <Link className='nav-link w-100' to={'/owner/signup'}><BTN className="btn">Register</BTN></Link>
                            </div>
                        </CARD>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

const CARD = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 250px;
  background: rgba( 225, 255, 255, 0.20 );
  box-shadow: 0 8px 32px 0 rgba( 131, 138, 135, 0.37 );
  backdrop-filter: blur( 18px );
  -webkit-backdrop-filter: blur( 7px );
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  border-radius: 1rem;
  padding: 1.5rem;
  z-index: 10;
  color: whitesmoke;
`

const BTN = styled.div`
    /* margin: 4px; */
    width: 100%;
    background: none;
    border: none;
    text-align: center;
    font-size: 1rem;
    color: whitesmoke;
    background-color: #06964e;
    padding: 0.8rem 1.8rem;
    border-radius: 2rem;
    cursor: pointer;
`

export default NoUser;
