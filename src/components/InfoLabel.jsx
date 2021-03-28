import React from "react";

function InfoLabel(props) {
  return (
    <>
      <div className="col-6 col-md-3 text-capitalize fw-bold">
       
        {props.title}
      </div>
      <div className="col-6 col-md-3 ">
        {props.content ? props.content : { ...props.component }}
      </div>
    </>
  );
}

export default InfoLabel;
