import React, { useEffect } from 'react'
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
import { Link } from 'react-router-dom';
import LocationPicker from '../../../assets/map/LocationPicker';

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

// Add Location Model
function AddLocation(props) {
    return (
        <Modal
            className='user-select-none'
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='bg-success' style={{ color: 'white' }} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i class="fa-solid fa-map"></i> Add Location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LocationPicker onHide={props.onHide} />
            </Modal.Body>
        </Modal>
    );
}

// Navbar Code start
function NavBar() {
    const [showNoti, setShowNoti] = React.useState(false);
    const [addLocation, setAddLocation] = React.useState(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [userKey] = useState(localStorage.getItem('userKey'));
    const [userId, setUserId] = useState();
    const [selectedLocation, setSelectedLocation] = useState('Choose Location');
    const [listLocation, setListLocation] = useState(null)

    const handleAddLocation = () => {
        console.log('lets start : hi');
        setAddLocation(true);
        console.log('set add locatin is true');
    };

    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
    }
    const handleLocationSelection = (locationName) => {
        setSelectedLocation(locationName);
    };

    useEffect(() => {
        const fetchShopId = () => {
            if (userId) {
                const adminKeyString = localStorage.getItem('userKey');
                if (adminKeyString) {
                    const userKey = JSON.parse(adminKeyString);
                    setUserId(userKey.id);
                    console.log('user id : ', userId);
                } else {
                    console.log('adminKey not found in localStorage');
                }
            }
        };

        fetchShopId();
    }, [userId]);

    useEffect(() => {
        const allLocations = JSON.parse(localStorage.getItem("allLocations"));
        if (allLocations) {
            setListLocation(allLocations);
        }
    }, [userId]);

    useEffect(() => {
        const handleStorageChange = () => {
            const allLocations = JSON.parse(localStorage.getItem("allLocations"));
            if (allLocations) {
                setListLocation(allLocations);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('userKey')
        window.location.reload(false)
    }
    return (
        <>
            <Navbar className="bg-green fixed-top user-select-none">
                <Container fluid className='d-flex justify-content-around'>
                    <div>
                        <Link to={"/"} className='nav-link'>
                            <span className='fw-500 fs-4 clr-white'><b>Superkart</b></span>
                        </Link>
                    </div>
                    <div>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link onClick={() => handleShow(true)} style={{ fontSize: "20px" }} variant=""><i class="clr-white fa-solid fa-magnifying-glass"></i></Nav.Link>
                            </Nav>
                            <IconsDiv>
                                <Nav>
                                    <Link title='Home' className='nav-link' to="/"> <i class="fa-solid fa-house clr-white"></i></Link>
                                    <Link title='Category' className='nav-link' to="/category/grocery"><i class="fa-solid fa-border-all clr-white"></i></Link>
                                    <Link title='Cart' className='nav-link' to="/cart"><i class="fa-solid fa-cart-shopping clr-white"></i></Link>
                                </Nav>
                            </IconsDiv>
                            <Nav onClick={() => setShowNoti(true)}><Link title='Nottification' className='nav-link' style={{ fontSize: "20px" }}><i class="fa-solid fa-bell clr-white"></i></Link></Nav>
                            <Navbar.Text className='mx-2 d-flex'>
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-location">
                                        {selectedLocation}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {listLocation ? (
                                            listLocation.map((location, index) => (
                                                <Dropdown.Item
                                                    key={index}
                                                    onClick={() => handleLocationSelection(location.name)}
                                                >
                                                    {location.name}
                                                </Dropdown.Item>
                                            ))
                                        ) : (
                                            <Dropdown.Item disabled>No locations available</Dropdown.Item>
                                        )}
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleAddLocation}>
                                            <i className="fa-solid fa-plus pe-2"></i>Add New
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Navbar.Text>
                            <IconsDiv>
                                <Navbar.Text>
                                    <DropdownButton
                                        align="end"
                                        title="Account"
                                        id="dropdown-menu-align-end"
                                        variant="light"
                                    >
                                        {userKey ? (
                                            <>
                                                <Link to={'/user'}>
                                                    <DropItem className='btn'><i class="fa-solid fa-user pe-2"></i>Profile</DropItem>
                                                </Link>
                                                <Link to={''}>
                                                    <DropItem className='btn'><i class="fa-solid fa-gear pe-2"></i>Settings</DropItem>
                                                </Link>
                                                <Dropdown.Divider />
                                                <DropItem onClick={logout} className='btn'>Logout</DropItem>
                                            </>
                                        ) : (
                                            <>
                                                <p className='p-0 m-0 ps-2' style={{ fontSize: '12px' }} >Customer</p>
                                                <Link to={'login'}>
                                                    <DropItem className='btn'>Login</DropItem>
                                                </Link>
                                                <Link to={'signup'}>
                                                    <DropItem className='btn'>Signup</DropItem>
                                                </Link>
                                                <Dropdown.Divider />
                                                <Link to={'shop'}>
                                                    <DropItem className='btn'>Shop</DropItem>
                                                </Link>
                                                <Link to={'owner'}>
                                                    <DropItem className='btn'>Owner</DropItem>
                                                </Link>
                                            </>
                                        )}
                                    </DropdownButton>
                                </Navbar.Text>
                            </IconsDiv>
                        </Navbar.Collapse>
                    </div>
                </Container >
            </Navbar >
            {/* this Model used for search */}
            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton className='bg-green' variant="light">
                    <span className='fw-500 fs-4 clr-white'>Search</span>
                    <Navbar.Text className='ms-5'>
                        <DropdownButton
                            align="end"
                            title="Location"
                            id="dropdown-menu-align-end"
                            variant="light"
                        >
                            {listLocation ? (
                                <>
                                    <Dropdown.Item><i className="fa-solid fa-map-location-dot pe-2"></i>{listLocation.location_name}</Dropdown.Item>
                                </>
                            ) : (
                                <Dropdown.Item eventKey="1">No location available</Dropdown.Item>
                            )}
                        </DropdownButton>
                    </Navbar.Text>
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
            <NotifiactionModel show={showNoti} onHide={() => setShowNoti(false)} />
            <AddLocation show={addLocation} onHide={() => setAddLocation(false)} />
        </>
    )
}

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
export default NavBar