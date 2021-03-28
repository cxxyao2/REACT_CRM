import React, { Component } from "react";
import InfoLabel from "../InfoLabel";
import { dateYMD } from "../../utils/dateFormat";
import service from "../../services/stockService";
import "./StockRecord.css";

class StockRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: this.props.data,
      readOnlyFlag: true,
      actualQty: this.props.data.quantity,
      error: undefined,
      succeed: undefined,
    };

    this.qtyRef = React.createRef();
  }

  handleChange = (event) => {
    let newQty = event.currentTarget.value;
    this.setState({ actualQty: newQty });
  };

  handleSave = async () => {
    let stock;
    this.clearMessage();
    try {
      stock = { ...this.state.stock };
      stock.quantity = this.state.actualQty;
      let result = await service.updateStock(stock);
      if (result) {
        this.setState({ succeed: "Data saved successfully!" });
        this.setState({ readOnlyFlag: true });
        this.setState({ stock });
      }
    } catch (error) {
      this.setState({ error: error.message + " : " + error.response.data });
      console.log("error is", error.response.data);
    }
  };

  clearMessage = () => {
    this.setState({ error: undefined, succeed: undefined });
  };

  render() {
    const { stock: data, error, succeed } = this.state;
    const alertClasses = "d-flex  my-2 p-2 border rounded justify-content-between".concat(
      error ? " bg-danger" : "bg-success"
    );

    return (
      <>
        {(error || succeed) && (
          <div className={alertClasses} role="alert">
            <div>{error || succeed}</div>
            <div>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.clearMessage}
              ></button>
            </div>
          </div>
        )}
        <div className="row g-1">
          <InfoLabel title="area" content={data.area.name} />
          <InfoLabel title="item" content={data.product.name} />
          <InfoLabel title="qty" content={data.quantity} />
          <div className="row g-0">
            <label
              htmlFor="actualQty"
              className="col-6 col-md-3 col-form-label fw-bold"
            >
              Actual Qty
            </label>
            <div className="col-6 col-md-3">
              <input
                ref={this.qtyRef}
                type="number"
                min={0}
                max={9999}
                className="form-control"
                id="actualQty"
                name="actualQty"
                value={this.state.actualQty}
                onChange={this.handleChange}
                readOnly={this.state.readOnlyFlag}
              />
            </div>
          </div>

          <InfoLabel title="unit" content="barrel" />
          {this.props.showDate && (
            <InfoLabel title="expired at" content={dateYMD(data.expiredDate)} />
          )}
          <div className="row justify-content-between g-1">
            <button
              className="btn btn-primary col-5"
              onClick={(event) => {
                event.preventDefault();
                this.clearMessage();
                this.setState({ readOnlyFlag: false });
                this.qtyRef.current.focus();
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-secondary border col-5 "
              onClick={this.handleSave}
            >
              Save
            </button>
          </div>
          <hr />
        </div>
      </>
    );
  }
}

export default StockRecord;
