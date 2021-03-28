import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getItems } from "../../store/reducers/cartItems";

import "./Toolbar.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

class Toolbar extends Component {
  render() {
    let { user } = this.props;
    let { items } = this.props;
    if (user && user._id) {
    } else {
      user = undefined;
    }

    return (
      <header className="toolbar">
        <nav className="toolbar_navigation">
          <div className="toolbar_toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
          <div className="toolbar_logo">
            <a href="/">Oil</a>
          </div>
          <div className="spacer"></div>
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/visits">Visits</Link>
              </li>
              <li>
                <Link to="/channels">Channels</Link>
              </li>
              <li className="position-relative dropdown">
                <Link to="#">Admin</Link>
                <span className="dropdown-content">
                  <ul>
                    <li>
                      <Link to="/admin/channels">Channels</Link>
                    </li>
                    <li>
                      <Link to="/admin/stocks">Stock</Link>
                    </li>
                    <li>
                      <Link to="/admin/visits">Activities</Link>
                    </li>
                  </ul>
                </span>
              </li>

              <li>
                <i
                  className="fa fa-user"
                  style={{
                    fontSize: "1.5rem",
                    color: "white",
                  }}
                ></i>
                <span className="text-white">{user ? user.name : ""}</span>
              </li>
              {user ? (
                <li>
                  <Link to="/logout">Log out</Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">Sign In</Link>
                </li>
              )}

              {items && items.length >= 1 && (
                <li onClick={() => this.props.history.push("/order-details")}>
                  <i
                    className="fa fa-shopping-cart"
                    style={{
                      fontSize: "2rem",
                      color: "coral",
                      position: "relative",
                      left: "2px",
                      top: "0",
                    }}
                  />

                  <span
                    className="badge badge-warning"
                    style={{
                      fontSize: "1rem",
                      position: "relative",
                      top: "-15px",
                      left: "-8px",
                      color: "coral",
                    }}
                  >
                    {items.length}
                  </span>
                  <span style={{ display: "none" }}> TODO unread messages</span>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

// bugs:    state.entities.bugs.list
const mapStateToProps = (state) => ({
  items: getItems(state),
});

export default connect(mapStateToProps, null)(Toolbar);
