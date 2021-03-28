import React, { useEffect, useState } from "react";
import tree1 from "../../images/autraliaoil@1x.jpg";
import CustomerInfo from "../CustomerInfo";
import "./OrderDetails.css";
import { useDispatch, useSelector } from "react-redux";

import { saveStarted, saveSucceed, saveFailed } from "../../config/config.json";

import { itemMoved, addItem, getItems } from "../../store/reducers/cartItems";

function OrderDetails(props) {
  const dispatch = useDispatch();
  const items = useSelector(getItems);
  const itemSaveStatus = useSelector(
    (state) => state.entities.items.saveStatus
  );

  const customer = useSelector((state) => state.entities.clients[0]);
  const [offset, setOffset] = useState(false); // show back to top button
  const [subtotalQty, setSubtotalQty] = useState(0);
  const [subtotalPrice, setSubtotalPrice] = useState(0);

  const [errMsg, setErrMsg] = useState("");
  const succeedMessage = "Data is saved successfully.";

  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const getSum = () => {
    let sumQty = items.reduce(function (total, item) {
      return total + parseInt(item.quantity);
    }, 0);
    let sumPrice = items.reduce(function (total, item) {
      return total + item.quantity * item.price;
    }, 0);
    setSubtotalQty(sumQty);
    setSubtotalPrice(sumPrice);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await items.map((item) => dispatch(addItem(item)));

      // setItems(undefined);
    } catch (err) {
      if (err && err.response.status === 400) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg(JSON.stringify(err));
      }
      console.log("err", err.response.data);
    }
  };

  const handleDelete = (deleted) => {
   dispatch(itemMoved(deleted));
  };

  useEffect(
    (_) => {
      if (items) getSum();
      const handleScroll = (_) => {
        if (window.scrollY > 20) {
          setOffset(true);
        } else {
          setOffset(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return (_) => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    [items]
  );

  return (
    <div className="container" id="detailsTop">
      <div className="row border-bottom border-2 ">
        <h5 className="bg-light p-2">Order details</h5>
        <CustomerInfo customer={customer} />
      </div>
      {itemSaveStatus === saveFailed && (
        <div className="alert alert-danger">{errMsg}</div>
      )}
      {itemSaveStatus === saveSucceed && (
        <div className="alert alert-info">{succeedMessage}</div>
      )}
      {itemSaveStatus === saveStarted && (
        <div className="alert alert-info">Data saving start on progress. </div>
      )}
      <form onSubmit={onSubmit}>
        {(!items || items.length <= 0) && (
          <div className="alert alert-info">Cart is empty.</div>
        )}
        {items &&
          items.map((record, index) => (
            <div className="row g-1 my-1" key={index}>
              <div className="col-sm-3 col-3">
                <img
                  src={tree1}
                  className="card-img-top"
                  style={{ maxHeight: "100px", objectFit: "cover" }}
                  alt="..."
                />
              </div>
              <div className="col-4">
                <span className="text-wrap text-break ">
                  {record.product.name}
                </span>
              </div>
              <div className="col-auto">
                <label>Price:&nbsp;{record.price}</label>

                <div className="col-auto">Qty:&nbsp;{record.quantity}</div>

                <div className="col-auto">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(record);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        <div className="d-flex justify-content-between">
          <p>
            Subtotal: &nbsp;<b>{subtotalQty}</b>
            &nbsp;items&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              Amount:&nbsp; <b>${subtotalPrice}</b>{" "}
            </label>
          </p>
          <p>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </p>
        </div>
      </form>
      {offset && (
        <div className="backToTop" onClick={handleClick}>
          <span className="badge  border-light bg-info rounded-circle p-3">
            <i className="fa fa-arrow-up" style={{ fontSize: "1.5rem" }}></i>
          </span>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
