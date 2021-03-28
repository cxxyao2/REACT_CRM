import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./SideDrawer.css";

function SideDrawer(props) {
  const { user } = props;
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }

  return (
    <nav className={drawerClasses} onClick={props.click}>
      <ul>
        <li>
          <i
            className="fa fa-user"
            style={{
              fontSize: "2rem",
              color: "coral",
            }}
          ></i>
          <span className="text-white">{user ? user.name : ""}</span>
        </li>
        {!user && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/visits">Visits</Link>
        </li>
        <li>
          <span style={{ fontSize: "1.2rem" }}>Admin</span>
          <ul className="dropdown-content">
            <li>
              <Link to="/admin/channels">Channels</Link>
            </li>
            <li>
              <Link to="/admin/visits">Activities</Link>
            </li>
            <li>
              <Link to="/admin/stocks">Stock</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <a href="mailto:web@example.com">Contact US</a>
        </li>
      </ul>
    </nav>
  );
}

export default SideDrawer;
