import React from "react";
import avatar from "../../images/avatar.png";
import "./Avatar.css";

const Avatar = (props) => {
  return (
    <p className="d-flex flex-column  justify-content-center align-items-center">
      <span className="col-2 ">
        <img src={avatar} alt="avatar" className="rounded-circle avatar" />
      </span>
      <span className="col-2  text-nowrap">{props.name}</span>
      <span className="col-2  text-nowrap">{props.email}</span>
    </p>
  );
};

export default Avatar;
