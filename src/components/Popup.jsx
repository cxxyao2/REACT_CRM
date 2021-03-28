import React from "react";
import tree1 from "../images/tree1.jpg";
import small1 from "../images/engineoil_1x.jpg";
import big1 from "../images/engineoil_2x.jpg";

function Popup(props) {
  return (
    <div className="position-relative  m-2 p-2 bg-primary">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-placement="top"
        data-bs-content="Top popover"
      >
        Popover on top
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-placement="right"
        data-bs-content="Right popover"
      >
        Popover on right
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-placement="bottom"
        data-bs-content="Bottom popover"
      >
        Popover on bottom
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-placement="left"
        data-bs-content="Left popover"
      >
        Popover on left
      </button>
    </div>
  );
}

export default Popup;
