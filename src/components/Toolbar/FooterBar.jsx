import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Toolbar.css";
import "./FooterBar.css";

class FooterBar extends Component {
  render() {
    return (
      <footer className="footer_bar ">
        <address>
          Written by <a href="mailto:web@example.com">Jennifer</a>
          <br />
          Canada.2021
        </address>
      </footer>
    );
  }
}

export default FooterBar;
