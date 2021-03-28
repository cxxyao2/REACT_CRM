// ok
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { myMapKey } from "../../config/config.json";
import "./MultilocationForm.css";
// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };

class MultiLocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      showingInfoWindow: false, // Hides or shows the InfoWindow
      activeMarker: {}, // Shows the active marker upon click
      selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
      currentLocation: {},
    };
    this.messageStyle = {
      color: "red",
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const { lat: centerLat, lng: centerLng } = this.props.markData[0];
    return (
      <Map
        google={this.props.google}
        style={{
          top: "0",
          left: "0",
          margin: "6px",
          width: "80%",
          height: "100%",
          position: "absolute",
        }}
        initialCenter={{ lat: centerLat, lng: centerLng }}
        className={"map"}
        zoom={14}
      >
        {this.props.markData.map((marker, index) => (
          <Marker
            id={index}
            onClick={this.onMarkerClick}
            name={marker.name}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div style={this.messageStyle}>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.myMapKey,
})(MultiLocationForm);
