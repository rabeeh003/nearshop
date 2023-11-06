import React from 'react'
import { Accordion } from 'react-bootstrap'
import styled from 'styled-components'

const BoxShadow = {
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
}


function LocationsTwoType() {
    return (

        <Accordion >
            <Accordion.Item className='mb-4' eventKey="0" style={BoxShadow}>
                <Accordion.Header>
                    <i style={{ fontSize: '25px' }} class="fa-solid fa-location-crosshairs m-3"></i>
                    Delivery Locations
                </Accordion.Header>
                <Accordion.Body>
                    <ListDiv >
                        <ListItem>
                            <span className=''><span>1</span> Home</span>
                            <i class="fa-solid fa-trash"></i>
                        </ListItem>
                        <ListItem>
                            <span className=''><span>2</span> Flat</span>
                            <i class="fa-solid fa-trash"></i>
                        </ListItem>
                        <ListItem>
                            <span className='btn btn-success'><i class="fa-solid fa-plus"></i>Add New</span>
                        </ListItem>
                    </ListDiv>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className='mb-4' eventKey="1" style={BoxShadow}>
                <Accordion.Header>
                    <i style={{ fontSize: '25px' }} class="fa-solid fa-map-location-dot m-3"></i>
                    Locations
                </Accordion.Header>
                <Accordion.Body>
                    <ListDiv >
                        <ListItem>
                            <span className=''><span>1</span> Name of location</span>
                            <i class="fa-solid fa-trash"></i>
                        </ListItem>
                        <ListItem>
                            <span className='btn btn-success'><i class="fa-solid fa-plus"></i>Add New</span>
                        </ListItem>
                    </ListDiv>
                </Accordion.Body>
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