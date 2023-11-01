import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NavBar() {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    return (
        <>
            <Navbar className="bg-body-tertiary fixed-top user-select-none">
                <Container fluid>
                    <div>
                        <Navbar.Brand href="#home">Shoping Cart</Navbar.Brand>
                    </div>
                    <div>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link onClick={() => handleShow(true)} variant=""><i class="fa-solid fa-magnifying-glass"></i></Nav.Link>
                            </Nav>
                            <IconsDiv>
                                <Nav>
                                    <Nav.Link title='Home' href="#home"> <i class="fa-solid fa-house"></i></Nav.Link>
                                    <Nav.Link title='catagory' href="#features"><i class="fa-solid fa-border-all"></i></Nav.Link>
                                    <Nav.Link title='cart' href="#features"><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
                                </Nav>
                            </IconsDiv>
                            <Nav><Nav.Link title='bell' href="#features"><i class="fa-solid fa-bell"></i></Nav.Link></Nav>
                            <Navbar.Text>
                                <DropdownButton
                                    align="end"
                                    title="Location"
                                    id="dropdown-menu-align-end"
                                    variant=""
                                >

                                    <Dropdown.Item eventKey="1"><i class="fa-solid fa-map-location-dot pe-2"></i>Location 1</Dropdown.Item>
                                    <Dropdown.Item eventKey="2"><i class="fa-solid fa-map-location-dot pe-2"></i>Location 2</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="3"> <i className="fa-solid fa-plus pe-2"></i>Add New</Dropdown.Item>
                                </DropdownButton>
                            </Navbar.Text>
                            <IconsDiv>
                                <Navbar.Text>
                                    <DropdownButton
                                        align="end"
                                        title="Account"
                                        id="dropdown-menu-align-end"
                                        variant=""
                                    >
                                        <Dropdown.Item eventKey="1"><i class="fa-solid fa-user pe-2"></i>Profile</Dropdown.Item>
                                        <Dropdown.Item eventKey="2"><i class="fa-solid fa-gear pe-2"></i>Settings</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="3"> <i className="fa-solid fa-right-from-bracket pe-2"></i>Logout</Dropdown.Item>
                                    </DropdownButton>
                                </Navbar.Text>
                            </IconsDiv>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
            <div style={{ height: "80px" }}></div>
            {/* this Model used for search */}
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Search</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success"><i class="fa-solid fa-magnifying-glass"></i></Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

const IconsDiv = styled.div`
    @media screen and (max-width: 578px) {
        display: none;
    }
`
export default NavBar