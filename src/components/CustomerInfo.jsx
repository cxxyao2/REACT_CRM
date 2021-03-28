import React from "react";
import { useSelector } from "react-redux";

function CustomerInfo(props) {
  const customers = useSelector((state) => state.entities.clients);
  console.log("select custoemrs ", customers);
  if (!customers || customers.length < 1)
    return <div>Please select a client to visit.</div>;

  const customer = customers[0];
  const placeholderStr = "    ";
  return (
    <div className="row g-0 mt-2 border rounded">
      <span className="col-12 col-md-6  my-1">
        <b>Client Name:&nbsp;</b>
        {customer ? customer.name : placeholderStr}
      </span>
      <span className="col-12 col-md-6  my-1">
        <b>Mobile Phone:&nbsp;</b>
        {customer ? customer.phone : placeholderStr}
      </span>
      <span className="col-12 col-md-6  my-1">
        <b>Region:&nbsp;</b>
        {customer ? customer.region : placeholderStr}
      </span>
      <span className="col-12 col-md-6  my-1">
        <b>Level:&nbsp;</b>
        {customer ? (customer.isGold ? "Golden" : "Silver") : placeholderStr}
      </span>
      <span className="col-12 col-md-6  my-1">
        <b>latitude:&nbsp;</b>
        {customer ? customer.latitude : placeholderStr}
      </span>
      <span className="col-12 col-md-6  my-1">
        <b>longitude:&nbsp;</b>
        {customer ? customer.longitude : placeholderStr}
      </span>
    </div>
  );
}

export default CustomerInfo;
