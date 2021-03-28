import React, { Component } from "react";
import "./BackToTop.css";

const myStyle = {
  backStyle: {
    position: "fix",
    backgroundColor: "green",
    width: "100px",
    height: "100px",
    left: "85%",
    top: "80%",
  },
};
export default class BackToTop extends Component {
  constructor() {
    super();
    this.state = {
      change: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    console.log("add event");
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    console.log("remove event");
  }

  handleScroll = (e) => {
    if (window.scrollY === 0) {
      this.setState({ change: false });
    } else if (window.scrollY > 20) {
      this.setState({ change: true });
    }
  };

  render() {
    return (
      <div
        className="container bg-warning"
        id="topDiv"
        style={{
          boxShadow: this.state.change ? "0px 6px 12px blue" : "none",
        }}
      >
        <label>I am top</label>
        <div
          className="backStyle"
          style={{ display: this.state.change ? "block" : "none" }}
        >
          <a href="#topDiv">BddddackTop</a>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <div
            key={index}
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "red",
              margin: "10px 10px",
            }}
          >
            {index}
          </div>
        ))}
      </div>
    );
  }
}
