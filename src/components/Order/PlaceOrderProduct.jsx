import React, { useState } from "react";

function PlaceOrderProduct(props) {
  const [qty, setQty] = useState(1);
  const [showError, setShowError] = useState({ show: false, message: "" });
  const { product, index } = props;

  const getImageFile = (productOrder) => {
    let index = productOrder % 7;
    let image = require(`../../images/motor${index}.jpg`);
    return image.default;
  };

  const handleChange = (event) => {
    setShowError({ show: false, message: "" });
    let enteredQty = event.target.value;
    if (enteredQty >= 1 && enteredQty <= 9999) {
      setQty(enteredQty);
    } else if (enteredQty < 0) {
      setQty(1);
      setShowError({ show: true, message: "Quantity must be bigger than 0." });
    } else if (enteredQty > 9999) {
      let qtyInput = Math.floor(enteredQty / 10);
      setQty(qtyInput);
      setShowError({
        show: true,
        message: "Quantity must be smaller than 10000.",
      });
    }
  };

  return (
    <div className="col-md-4 col-12 mt-2 ">
      <div className="card" style={{ width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title fw-bold">{product.name.slice(-3)}</h5>
          <img
            src={getImageFile(index)}
            className="card-img-top"
            style={{ maxHeight: "150px", objectFit: "cover" }}
            alt="..."
          />
          <div className="card-text row">
            <span className="col-sm-6 text-start">{product.name}</span>
            <span className="col-sm-6 text-start text-sm-end">Price:$10</span>
          </div>
          <div className="card-footer">
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                aria-label="quantity"
                aria-describedby="quantity"
                id="itemQty"
                min={1}
                max={9999}
                value={qty}
                onChange={handleChange}
              />
              <span
                className="input-group-text"
                id="addItem"
                onClick={() => props.onClick(product, qty)}
              >
                Add
              </span>
              {showError.show && (
                <div className="alert alert-warning" role="alert">
                  {showError.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderProduct;
