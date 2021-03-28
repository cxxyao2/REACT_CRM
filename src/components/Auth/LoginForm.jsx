import React from "react";
import Joi from "joi-browser";

import Form from "../Form";
import auth from "../../services/authservice";
import { Link } from "react-router-dom";
import "./LoginForm.css";
import loginImage from "../../images/gas.png";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";

      //this.props.history.push("/");
    } catch (ex) {
      console.log("error", ex);
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <>
        <div className="position-relative loginForm_container">
          <div className="row  border rounded loginForm_main px-2 pb-4 col-md-8 col-12 justify-content-center">
            <img alt="item" src={loginImage} className="loginImage" />

            <div className="loginForm_floatMenu mt-2">
              <label className="float-begin fw-bold">Sign In</label>
              <span className="float-end fw-bold text-color-coral">
                <Link to="/register"> Create Account? </Link>
              </span>
            </div>

            <div className="loginForm_floatMenu clearfix m-2">
              <form onSubmit={this.handleSubmit} className="row g-2 m-2">
                {this.renderInput("username", "Username/Email")}
                {this.renderInput("password", "Password", "password")}

                <div className="col-12  text-end">
                  <span>
                    <Link to="/send-reset-password-email">
                      Forget Password?
                    </Link>
                  </span>
                </div>
                {this.renderButton("Sign In")}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
