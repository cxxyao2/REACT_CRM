import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import { connect } from "react-redux";

import { myMapKey } from "../config/config.json";
import CurrentLocation from "./CurrentLocation";
import { saveItinerary } from "../services/itineraryservice";

class LocationWrapper extends Component {
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
      locationError: undefined,
      saveOk: false,
    };
  }

  upload = async (e) => {
    const { user, customers, visitStart } = this.props;
    if (!customers || customers.length < 1) {
      alert("Please select a client  firstly.");
      return;
    }
    const customer = customers[0];
    const { currentLocation: loc } = this.state;
    this.setState({ locationError: undefined });
    this.setState({ saveOk: false });
    e.preventDefault();
    try {
      let itinerary = {
        salesmanId: user._id,
        customerId: customer._id,
        visitStart: visitStart.toUTCString(),
        latitude: loc.lat,
        longitude: loc.lng,
      };

      const result = await saveItinerary(itinerary);
      console.log("result is", result);
      if (result && result.status === 200) {
        this.setState({ saveOk: true });
      }
    } catch (err) {
      if (err && err.response) {
        console.log(err.response.data);
        this.setState({ locationError: err.response.data });
      } else {
        this.setState({
          locationError: "Exception happened.",
        });
      }
    }
  };

  getCurrentPosition = () => {
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = pos.coords;
            this.setState({
              currentLocation: {
                lat: coords.latitude,
                lng: coords.longitude,
              },
            });
          },
          (error) => {
            this.setState({ locationError: JSON.stringify(error) });
          }
        );
      }
    }
  };

  componentDidMount() {
    this.getCurrentPosition();
  }

  render() {
    return (
      <div className=" container bg-white border rounded my-2 p-2">
        <form>
          <fieldset>
            <legend>Coordinations</legend>
            <div className="row">
              <div className="col-6 col-md-2 ">
                <label className="form-label">Longitude</label>
              </div>
              <div className="col-6 col-md-4  ">
                <label className="form-label text-info">
                  {this.state.currentLocation.lng}
                </label>
              </div>

              <div className="col-6 col-md-2 ">Latitude</div>
              <div className="col-6 col-md-4 ">
                <label className="form-label text-info">
                  {this.state.currentLocation.lat}
                </label>
              </div>
            </div>
            <div className="row g-0">
              <div className="col ">
                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    this.getCurrentPosition();
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="col ">
                <button
                  className="btn btn-sm btn-warning"
                  type="button"
                  onClick={this.upload}
                >
                  Upload
                </button>
              </div>
              {this.state.locationError && (
                <div className="col-12  mt-2 alert alert-warning">
                  {this.state.locationError}
                </div>
              )}
              {this.state.saveOk && (
                <div className="col-12  mt-2 alert alert-info">
                  Coordination is uploaded successfully.
                </div>
              )}
            </div>

            <CurrentLocation initialCenter={this.state.currentLocation} />
          </fieldset>
        </form>
      </div>
    );
  }
}

LocationWrapper.defaultProps = {
  zoom: 7,
  initialCenter: {
    lat: 40.0,
    lng: -70.0,
  },
  centerAroundCurrentLocation: true,
};

// bugs:    state.entities.bugs.list
const mapStateToProps = (state) => ({
  customers: state.entities.clients,
});

export default connect(
  mapStateToProps,
  null
)(
  GoogleApiWrapper({
    apiKey: process.env.myMapKey,
  })(LocationWrapper)
);
