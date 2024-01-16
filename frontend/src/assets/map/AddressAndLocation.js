// Api Key AIzaSyCPvqKJigbPJWjWpPcHXQ-c5TxuHTXQaRM
// My Aoi Is : AIzaSyDNKxCWXUm1Mw-S7uhzV9RNmAJJyKzsULc

import axios from "axios";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddressLocationPicker extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      longval: 76.066386,
      latval: 11.043152,
      isMapLoaded: false,
      placeName: "",
      formData: {
        name: "",
        address: "",
        phone_number: '',
        pin_code: '',
        lat: 11.043152,
        longitude: 76.066386,
        isNameExists: false,
      },
    };

    this.mapRef = React.createRef();
    this.marker = null;
    this.infoWindow = null;
  }

  componentDidMount() {
    this.loadGoogleMapsScript();
    this.fetchUserId();

    if (this.props.oldData !== null) {
      this.setState((prevState) => ({
        longval: this.props.oldData.lng,
        latval: this.props.oldData.lat,
        formData: {
          ...prevState.formData,
          phone_number:this.props.oldData.phone_number,
          address:this.props.oldData.address,
          pin_code:this.props.oldData.pin_code,
          name:this.props.oldData.location_name,
          lat: this.props.oldData.lat,
          long: this.props.oldData.lng,
        },
      }));
    }
  }

  fetchUserId() {
    const userKeyString = localStorage.getItem('userKey');
    if (userKeyString) {
      const userKey = JSON.parse(userKeyString);
      this.setState(prevState => ({
        formData: {
          ...prevState.formData,
          userId: userKey.id
        }
      }));
      console.log('user id : ', userKey.id);
    } else {
      console.log('adminKey not found in localStorage');
    }
  }

  loadGoogleMapsScript = () => {
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCPvqKJigbPJWjWpPcHXQ-c5TxuHTXQaRM&libraries=places`;
      script.onload = () => {
        this.setState({ isMapLoaded: true }, () => {
          this.initializeMap();
        });
      };
      document.body.appendChild(script);
    } else {
      this.setState({ isMapLoaded: true }, () => {
        this.initializeMap();
      });
    }
  };

  initializeMap = () => {
    const { longval, latval } = this.state;
    const curpoint = new window.google.maps.LatLng(latval, longval);

    const mapOptions = {
      center: curpoint,
      zoom: 6,
      mapTypeId: 'hybrid',
    };

    this.map = new window.google.maps.Map(this.mapRef.current, mapOptions);

    this.marker = new window.google.maps.Marker({
      map: this.map,
      position: curpoint
    });

    this.infoWindow = new window.google.maps.InfoWindow();

    this.map.addListener('click', this.handleMapClick);
    this.marker.addListener('click', this.handleMarkerClick);

    this.updateInfoWindow();
    this.getAddressFromLatLng(latval, longval);
  };

  handleMapClick = (event) => {
    const longval = event.latLng.lng().toFixed(6);
    const latval = event.latLng.lat().toFixed(6);

    this.setState((prevState) => ({
      longval,
      latval,
      formData: {
        ...prevState.formData,
        lat: latval,
        long: longval,
      },
    }), () => {
      this.updateMapMarker();
      this.getAddressFromLatLng(latval, longval);
    });
  };

  handleMarkerClick = () => {
    this.updateInfoWindow();
    this.infoWindow.open(this.map, this.marker);
  };

  updateMapMarker = () => {
    const { longval, latval } = this.state;
    const curpoint = new window.google.maps.LatLng(latval, longval);

    this.marker.setPosition(curpoint);
    this.map.setCenter(curpoint);

    this.updateInfoWindow();
  };

  updateInfoWindow = () => {
    const { longval, latval } = this.state;
    const content = `Longitude: ${longval}<br>Latitude: ${latval}`;
    this.infoWindow.setContent(content);
  };

  getAddressFromLatLng = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const formattedAddress = results[0].formatted_address;
          this.setState((prevState) => ({
            placeName: formattedAddress
          }));
        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: ", status);
      }
    });
  };

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.setState(
            (prevState) => ({
              latval: latitude,
              longval: longitude,
              formData: {
                ...prevState.formData,
                lat: latitude,
                long: longitude,
              },
            }),
            () => {
              this.updateMapMarker(); // Update the marker position
              this.map.panTo(new window.google.maps.LatLng(latitude, longitude)); // Pan the map to the new coordinates
              this.map.setZoom(this.map.getZoom() + 12);
              this.getAddressFromLatLng(latitude, longitude); // Get address from new coordinates
            }
          );
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };


  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = {
      "location_name": this.state.formData.name,
      "address": this.state.formData.address,
      "lat": this.state.formData.lat,
      "lng": this.state.formData.long,
      "customer_id": this.state.formData.userId,
      "phone_number": this.state.formData.phone_number,
      "pin_code": this.state.formData.pin_code,
    };
    try {
      console.log("location for submit", newLocation);
      if (this.props.oldData === null) {
        axios.post("https://www.nearbazar.shop/api/u/location/", newLocation)
        this.props.onHide();
      } else {
        axios.put(`https://www.nearbazar.shop/api/u/location/${this.props.oldData.id}/`, newLocation)
        this.props.onHide();
      }
    } catch (error) {
      console.log("error ", error);
    }


  };

  render() {
    if (!this.state.isMapLoaded) {
      return <div>Loading map...</div>;
    }

    return (
      <Form onSubmit={(e) => this.handleSubmit(e, this.props.onSuccess)}>
        <Form.Group controlId="formName">
          <Form.Label>Place Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter place name"
            value={this.state.formData.name}
            onChange={this.handleInputChange}
            isInvalid={this.state.isNameExists}
          />
          {this.state.isNameExists && (
            <Form.Control.Feedback type="invalid">
              Name already exists!
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            placeholder="Enter address"
            value={this.state.formData.address}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPin_code">
          <Form.Label>Pin code</Form.Label>
          <Form.Control
            type="number" // Use "number" instead of "as" prop
            name="pin_code"
            placeholder="Enter pin code"
            value={this.state.formData.pin_code}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formPhone_number">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="number" // Use "number" instead of "as" prop
            name="phone_number"
            placeholder="Enter phone number"
            value={this.state.formData.phone_number}
            onChange={this.handleInputChange}
          />
        </Form.Group>

        <div className="d-flex justify-content-between w-100 p-2">
          <Button variant="success" onClick={this.getCurrentLocation}>Current Location</Button>
          <Button variant="success" type="submit">Submit</Button>
        </div>

        <div
          style={{
            backgroundColor: "#E0E0E0",
            width: "100%",
            paddingTop: "56.25%",
            position: "relative",
          }}
          ref={this.mapRef}
        ></div>

        {this.state.placeName && (
          <div>
            <p>Place Name: {this.state.placeName}</p>
          </div>
        )}
      </Form>
    );
  }
}

export default AddressLocationPicker;