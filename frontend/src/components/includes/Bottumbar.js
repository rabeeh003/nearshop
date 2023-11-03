import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

function Bottumbar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Account</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <OfIcon>
                        <OfItem title='catagory' href="#features"><i class="fa-solid fa-user pe-2"></i>Profile</OfItem>
                        <OfItem title='cart' href="#features"><i class="fa-solid fa-gear pe-2"></i>Settings</OfItem>
                        <OfItem title='cart' onClick={handleShow} href="#features"><i class="fa-solid fa-right-from-bracket pe-2"></i>Logout</OfItem>
                    </OfIcon>
                </Offcanvas.Body>
            </Offcanvas>
            <BtNav>
                <Link title='Home' to="/" className='nav-link'> <i class="fa-solid fa-house"></i></Link>
                <Link title='catagory' to="/category" className='nav-link'><i class="fa-solid fa-border-all"></i></Link>
                <Link title='cart' to="/cart" className='nav-link'><i class="fa-solid fa-cart-shopping"></i></Link>
                <Link title='cart' onClick={handleShow} to="" className='nav-link'><i class="fa-solid fa-user"></i></Link>
            </BtNav>
            <div style={{ height: "70px" }}></div>
        </>
    )
}

const BtNav = styled.div`
    position: fixed;
    z-index: 15;
    bottom: 0;
    width: 100%;
    color: gray;
    font-size: 25px;
    display: none;
    @media screen and (max-width: 578px) {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding-bottom: 10px;
        padding-top: 10px;
        background-color: #f2f2f0;
    }
`
const OfIcon = styled.div``
const OfItem = styled.div`
    display: block;
    color: gray;
    font-size: 20px;
    margin-top: 10px;
`
export default Bottumbar