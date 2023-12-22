// Api Key AIzaSyCPvqKJigbPJWjWpPcHXQ-c5TxuHTXQaRM
// My Aoi Is : AIzaSyDNKxCWXUm1Mw-S7uhzV9RNmAJJyKzsULc

import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longval: 76.066386,
      latval: 11.043152,
      isMapLoaded: false,
      placeName: "",
      formData: {
        name: "",
        // address: "",
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
              this.updateMapMarker();
              this.map.panTo(new window.google.maps.LatLng(latitude, longitude)); 
              this.map.setZoom(this.map.getZoom() + 12);
              this.getAddressFromLatLng(latitude, longitude); 
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
      },
      isNameExists: false,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const existingData = JSON.parse(localStorage.getItem("allLocations")) || [];
    const isNameExists = existingData.some(
      (location) => location.name === this.state.formData.name
    );

    if (isNameExists) {
      this.setState({ isNameExists: true }); // Set flag to indicate existing name
      return; // Do not proceed if the name already exists
    }

    // Name is unique, proceed to add the location
    const newLocation = { ...this.state.formData };
    existingData.push(newLocation);
    localStorage.setItem("allLocations", JSON.stringify(existingData));
    // Reset isNameExists flag
    this.setState({ isNameExists: false });
    this.props.onHide()
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
            isInvalid={this.state.isNameExists} // Apply isInvalid prop based on flag
          />
          {this.state.isNameExists && ( // Display red text if name exists
            <Form.Control.Feedback type="invalid">
              Name already exists!
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            placeholder="Enter address"
            value={this.state.formData.address}
            onChange={this.handleInputChange}
          />
        </Form.Group> */}

        {/* <Form.Group controlId="formLatitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={this.state.formData.lat}
            onChange={this.handleInputChange}
            disabled
          />
        </Form.Group>

        <Form.Group controlId="formLongitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={this.state.formData.long}
            onChange={this.handleInputChange}
            disabled
          />
        </Form.Group> */}

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

export default LocationPicker;