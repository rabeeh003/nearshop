import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function NavBar() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Shoping Cart</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar