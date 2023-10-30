import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styled from 'styled-components'

function NavBar() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Shoping Cart</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
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
            </Container>
        </Navbar>
    )
}

const IconsDiv = styled.div`
    @media screen and (max-width: 578px) {
        display: none;
    }
`
export default NavBar