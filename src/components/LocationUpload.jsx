import React from "react";
import CustomerInfo from "./CustomerInfo";
import LocationWrapper from "./LocationWrapper";

function LocationUpload(props) {
  return (
    <>
      <CustomerInfo {...props} />
      <LocationWrapper {...props} />
    </>
  );
}

export default LocationUpload;
