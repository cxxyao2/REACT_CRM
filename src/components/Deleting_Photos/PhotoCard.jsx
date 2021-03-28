import React, { PureComponent } from "react";
import tree1 from "../images/tree1.jpg";
import "./PhotoCard.css";

class PhotoCard extends PureComponent {
  render() {
    return (
      <div className="col-md-4  col-lg-4 col-xxl-3 col-sm-xs-11 my-1  rounded overflow-hidden">
        <div className="d-flex bg-info">
          <div className="p-2 w-100 ">&nbsp;</div>
          <div className="p-2 flex-shrink-1 ">
            <button
              type="button"
              className="btn-close  p-2 "
              aria-label="Close"
              onClick={this.props.onClose}
            ></button>
          </div>
        </div>
        <div className="bg-light shadow rounded-top overflow-hidden m-0">
          <img src={tree1} className="photocard_photo" alt="item" />
        </div>
      </div>
    );
  }
}

export default PhotoCard;
