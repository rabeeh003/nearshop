import React from 'react'
import Container from 'react-bootstrap/Container';
import { DropdownButton, Navbar } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components'
// import { useState } from 'react';

// Navbar Code start
function NavBar() {
    // const [show, setShow] = useState(false);

    const logout = () => {
        localStorage.removeItem('ownerKey')
        window.location.reload(false)
    }

    return (
        <>
            <Navbar className="bg-primary fixed-top user-select-none">
                <Container fluid className='d-flex justify-content-md-around justify-content-between '>
                    <div>
                        <span className='fw-500 fs-4 clr-white'><b>Superkart</b></span>
                    </div>
                    <div>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <DropdownButton
                                    align="end"
                                    title="Account"
                                    id="dropdown-menu-align-end"
                                    variant="light"
                                >
                                    <DropItem className='btn'>Login</DropItem>
                                    <DropItem className='btn'>Register</DropItem>
                                    <Dropdown.Divider />
                                    <DropItem onClick={logout} className='btn'>Logout</DropItem>
                                </DropdownButton>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar >
        </>
    )
}

const DropItem = styled.span`
    width: 100%;
    text-align: start;
`
export default NavBar