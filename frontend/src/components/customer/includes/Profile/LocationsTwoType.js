import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Accordion, Modal } from 'react-bootstrap'
import styled from 'styled-components'
import LocationPicker from '../../../../assets/map/LocationPicker'
import AddressLocationPicker from '../../../../assets/map/AddressAndLocation'

const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}

function LocationsTwoType(props) {
    const [searchLocation, setSearchLocation] = useState([]);
    const [addressLocation, setAddressLocation] = useState([]);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editLocationId, setEditLocationId] = useState(null);


    const handleAddNewClick = () => {
        setShowLocationModal(true);
    };

    const handleCloseModal = () => {
        setShowLocationModal(false);
    };

    const fetchData = async () => {
        const allSearchLocations = JSON.parse(localStorage.getItem("allLocations"));
        if (allSearchLocations) {
            setSearchLocation(allSearchLocations);
        }
        try {
            const allAddress = await axios.get("http://www.nearbazar.shop/api/u/location/");
            const filterAddress = allAddress.data.filter(add => add.customer_id === props.userId);
            setAddressLocation(filterAddress);
        } catch (error) {
            console.error("Error fetching address locations: ", error);
        }
    };

    useEffect((fetchData) => {
        fetchData();
    }, [props.userId]);

    const locationHandleDelete = (idx) => {
        const allSearchLocations = JSON.parse(localStorage.getItem("allLocations"));
        if (allSearchLocations) {
            const updatedLocations = allSearchLocations.filter((location, index) => index !== idx);
            localStorage.setItem("allLocations", JSON.stringify(updatedLocations));
            setSearchLocation(updatedLocations);
        }
    };

    const addressHandilDelete = async (locid) => {
        try {
            await axios.delete(`http://www.nearbazar.shop/api/u/location/${locid}/`);
            fetchData()
        } catch (error) {
            console.log("delete error", error);
        }
    };
    return (

        <Accordion >
            <Accordion.Item className='mb-4' eventKey="0" style={BoxShadow}>
                <Accordion.Header>
                    <i style={{ fontSize: '25px' }} class="fa-solid fa-location-crosshairs m-3 text-success"></i>
                    Locations
                </Accordion.Header>
                <Accordion.Body>
                    <ListDiv>
                        {searchLocation.length > 0 ? (
                            searchLocation.map((loc, idx) => (
                                <ListItem key={idx} className='d-flex justify-content-between'>
                                    <span><span className='p-2'>{idx + 1}</span> {loc.name}</span>
                                    <i className="fa-solid fa-trash text-danger" onClick={() => locationHandleDelete(idx)} ></i>
                                </ListItem>
                            ))
                        ) : (
                            <p>Not found</p>
                        )}
                        <ListItem>
                            <span className='btn btn-success' onClick={handleAddNewClick}><i className="fa-solid fa-plus me-2"></i>Add New</span>
                        </ListItem>
                    </ListDiv>
                </Accordion.Body>
                <Modal
                    className='user-select-none'
                    show={showLocationModal}
                    onHide={() => {
                        handleCloseModal()
                        fetchData();
                    }}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className='bg-success' style={{ color: 'white' }} closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <i className="fa-solid fa-map"></i> Add Location
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LocationPicker onHide={handleCloseModal} />
                    </Modal.Body>
                </Modal>
            </Accordion.Item>
            <Accordion.Item className='mb-4' eventKey="1" style={BoxShadow}>
                <Accordion.Header>
                    <i style={{ fontSize: '25px' }} class="fa-solid fa-map-location-dot m-3 text-success"></i>
                    Delivery Locations
                </Accordion.Header>
                <Accordion.Body>
                    <ListDiv>
                        {addressLocation.length > 0 ? (
                            addressLocation.map((loc, idx) => (
                                <ListItem key={idx} className='d-flex justify-content-between'>
                                    <span><span className='p-2'>{idx + 1}</span> {loc.location_name}</span>
                                    <span>
                                    <span onClick={() => {
                                        setEditLocationId(loc.id)
                                        setShowAddressModal(true)
                                    }}>
                                        <i className="fa-solid fa-edit pe-2 text-secondary"></i>
                                    </span>
                                    <i className="fa-solid fa-trash text-danger ms-3" onClick={() => addressHandilDelete(loc.id)}></i>
                                    </span>
                                </ListItem>
                            ))
                        ) : (
                            <p>Not found</p>
                        )}
                        <ListItem>
                            <span className='btn btn-success' onClick={() => setShowAddressModal(true)}><i className="fa-solid fa-plus me-2"></i>Add New</span>
                        </ListItem>
                    </ListDiv>
                </Accordion.Body>
                <Modal
                    className='user-select-none'
                    show={showAddressModal}
                    onHide={() => {
                        setShowAddressModal(false)
                        fetchData()
                    }}
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
                        {/* <AddressLocationPicker oldData={null} onHide={() => {

                        }} /> */}
                        {editLocationId !== null ? (
                            <AddressLocationPicker
                                oldData={addressLocation.find(location => location.id === editLocationId)}
                                onHide={() => {
                                    setEditLocationId(null)
                                    fetchData()
                                    setShowAddressModal(false)
                                }}
                            />
                        ) : (
                            <AddressLocationPicker
                                oldData={null}
                                onHide={() => {
                                    setShowAddressModal(false)
                                    fetchData()
                                }}
                            />
                        )}
                    </Modal.Body>
                </Modal>
            </Accordion.Item>
        </Accordion>
    )
}

const ListDiv = styled.div`
    list-style: none;
    width: 100%;
`
const ListItem = styled.li`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
export default LocationsTwoType