import React from 'react'
import Container from 'react-bootstrap/Container';
import {Nav,DropdownButton,Navbar} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Notification Model
function NotifiactionModel(props) {
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
                    <i class="fa-solid fa-bell"></i> Notifications
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                emty !
            </Modal.Body>
        </Modal>
    );
}

// Navbar Code start
function NavBar() {
    const [showNoti, setShowNoti] = React.useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar className="bg-admin fixed-top user-select-none">
                <Container fluid className='d-flex justify-content-md-around justify-content-between '>
                    <div>
                        <Togle onClick={handleShow} ><i class="fa-solid fa-bars-staggered clr-white fs-5 "></i></Togle>
                        <span className='fw-500 fs-4 clr-white'><b>Superkart</b></span>
                    </div>
                    <div>
                        <Navbar.Collapse className="justify-content-end">
                            <IconsDiv>
                                <Nav>
                                    <Link title='Home' className='nav-link' to="/shop"> <i class="fa-solid fa-house clr-white"></i></Link>
                                    <Link title='Billing' className='nav-link' to="/shop"><i class="fa-solid fa-file-invoice clr-white"></i></Link>
                                    <Link title='Order' className='nav-link' to="/shop"><i class="fa-solid fa-cart-shopping clr-white"></i></Link>
                                    <Link title='Analize' className='nav-link' to="/shop"><i class="fa-solid fa-chart-pie clr-white"></i></Link>
                                    <Link title='AddProdect' className='nav-link' to="/shop"><i class="fa-regular fa-square-plus clr-white"></i></Link>
                                </Nav>
                            </IconsDiv>
                            <Nav onClick={() => setShowNoti(true)}><Link title='Nottification' className='nav-link' style={{ fontSize: "20px" }}><i class="fa-solid fa-bell clr-white"></i></Link></Nav>
                            <IconsDiv>
                                <Navbar.Text>
                                    <DropdownButton
                                        align="end"
                                        title="Account"
                                        id="dropdown-menu-align-end"
                                        variant="light"
                                    >
                                        <Link to={'/shop'}>
                                            <DropItem className='btn' eventKey="1"><i class="fa-solid fa-user pe-2"></i>Profile</DropItem>
                                        </Link>
                                        <Link to={''}>
                                            <DropItem className='btn' eventKey="1"><i class="fa-solid fa-gear pe-2"></i>Settings</DropItem>
                                        </Link>
                                        <Dropdown.Divider />
                                        <Link to={''}>
                                            <DropItem className='btn' eventKey="1">Logout</DropItem>
                                        </Link>
                                    </DropdownButton>
                                </Navbar.Text>
                            </IconsDiv>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar >
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <div className='bg-admin h-100'>
                    <Offcanvas.Header closeButton>
                        <span className='fs-4 clr-white'>Account</span>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <OfIcon>
                            <Link to="/shop" onClick={handleClose} className='nav-link'>
                                <OfItem title='Profile' className='clr-white'><i class="clr-white fa-solid fa-user pe-2"></i>Profile</OfItem>
                            </Link>
                            <Link to="/shop" onClick={handleClose} className='nav-link'>
                                <OfItem title='Chart' className='clr-white' href="#features"><i class="clr-white fa-solid fa-chart-pie pe-2"></i>Chart</OfItem>
                            </Link>
                            <Link to="/shop" onClick={handleClose} className='nav-link'>
                                <OfItem title='Settings' className='clr-white' href="#features"><i class="clr-white fa-solid fa-gear pe-2"></i>Settings</OfItem>
                            </Link>
                            <Link to="" onClick={handleClose} className='nav-link'>
                                <OfItem title='Logout' className='clr-white' onClick={handleShow} href="#features"><i class="clr-white fa-solid fa-right-from-bracket pe-2"></i>Logout</OfItem>
                            </Link>
                        </OfIcon>
                    </Offcanvas.Body>
                </div>
            </Offcanvas>
            <NotifiactionModel show={showNoti} onHide={() => setShowNoti(false)} />
        </>
    )
}
const Togle = styled.span`
    padding: 4px;
    @media screen and (min-width: 578px) {
        display: none;
    }
`
const IconsDiv = styled.div`
    font-size:20px;
    @media screen and (max-width: 578px) {
        display: none;
    }
`
const DropItem = styled.span`
    width: 100%;
    text-align: start;
`
const OfIcon = styled.div``
const OfItem = styled.div`
    display: block;
    font-size: 20px;
    margin-top: 10px;
`
export default NavBar