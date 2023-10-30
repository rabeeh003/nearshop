import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

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
                <NavItem title='Home' href="#home"> <i class="fa-solid fa-house"></i></NavItem>
                <NavItem title='catagory' href="#features"><i class="fa-solid fa-border-all"></i></NavItem>
                <NavItem title='cart' href="#features"><i class="fa-solid fa-cart-shopping"></i></NavItem>
                <NavItem title='cart' onClick={handleShow} href="#features"><i class="fa-solid fa-user"></i></NavItem>
            </BtNav>
        </>
    )
}

const BtNav = styled.div`
    position: fixed;
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
const NavItem = styled.span``
const OfIcon = styled.div``
const OfItem = styled.div`
    display: block;
    color: gray;
    font-size: 20px;
    margin-top: 10px;
`
export default Bottumbar