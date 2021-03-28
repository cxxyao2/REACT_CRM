import React from "react";
import tree1 from "../../images/tree1.jpg";

const styles = {
  img: {
    width: "100%",
    height: "auto",
    maxHeight: "10rem",
    objectFit: "cover",
  },
};

function CardClose(props) {
  return (
    <div
      className="col-xs-11 col-sm-5 col-lg-3 col-md-4  rounded"
      style={{ color: "blue", textAlign: "center" }}
    >
      <div
        className="bg-info rounded-circle"
        style={{
          margin: "2px",
          position: "absolute",
          right: 0,
          top: 0,
          width: "25px",
          color: "white",
        }}
        onClick={props.onClose}
      >
        X
      </div>
      <div
        className="bg-light"
        style={{
          width: "100%",
          marginTop: "0.5rem",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "5px 5px 0 0 ",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <img src={tree1} style={styles.img} alt="item" />
      </div>

      <div
        className="bg-white text-dark"
        style={{
          width: "100%",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "0 0 5px 5px ",
        }}
      >
        <text>
          {new Date().toLocaleString()}
          {props.myIndex}
        </text>
      </div>
    </div>
  );
}

export default CardClose;
