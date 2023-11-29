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
                <div className='bg-green h-100'>
                    <Offcanvas.Header closeButton>
                        <span className='fs-4 clr-white'>Account</span>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <OfIcon>
                            <Link to="user" onClick={handleClose} className='nav-link'>
                                <OfItem title='Profile' className='clr-white'><i class="clr-white fa-solid fa-user pe-2"></i>Profile</OfItem>
                            </Link>
                            <Link to="/settings" onClick={handleClose} className='nav-link'>
                                <OfItem title='cart' className='clr-white' href="#features"><i class="clr-white fa-solid fa-gear pe-2"></i>Settings</OfItem>
                            </Link>
                            <Link to="" onClick={handleClose} className='nav-link'>
                                <OfItem title='cart' className='clr-white' onClick={handleShow} href="#features"><i class="clr-white fa-solid fa-right-from-bracket pe-2"></i>Logout</OfItem>
                            </Link>
                        </OfIcon>
                    </Offcanvas.Body>
                </div>
            </Offcanvas>
            <BtNav className='bg-green'>
                <Link title='Home' to="/" className='nav-link'> <i class="fa-solid fa-house clr-white"></i></Link>
                <Link title='catagory' to="/category/grocery" className='nav-link'><i class="fa-solid fa-border-all clr-white"></i></Link>
                <Link title='cart' to="/cart" className='nav-link'><i class="fa-solid fa-cart-shopping clr-white"></i></Link>
                <Link title='cart' onClick={handleShow} to="" className='nav-link'><i class="fa-solid fa-user clr-white"></i></Link>
            </BtNav>
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
    }
`
const OfIcon = styled.div``
const OfItem = styled.div`
    display: block;
    font-size: 20px;
    margin-top: 10px;
`
export default Bottumbar