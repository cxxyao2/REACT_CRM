import React from "react";

function BackToTopOld(props) {
  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <div
      id="backTopDiv"
      style={{ position: "fixed", left: "85%", top: "200px", zIndex: "999999" }}
      onClick={handleClick}
    >
      <span
        className="badge border border-light rounded-circle bg-info p-3"
        title="Back"
      >
        <i
          className="fa fa-arrow-up"
          style={{ fontSize: "1.5rem" }}
          title="Back"
        ></i>
      </span>
    </div>
  );
}

export default BackToTopOld;
