import React from "react";
import Joi from "joi-browser";

import Form from "../Form";
import * as userService from "../../services/userService";
import auth from "../../services/authservice";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", email: "" },
    errors: {},
  };

  // \s 是匹配所有空白符，包括换行
  //  \w 匹配字母、数字、下划线。等价于 [A-Za-z0-9_]
  //  一个小写，一个大写字母，一个数字，一个特殊字符,不少于8位
  schema = {
    email: Joi.string().required().email().label("Email"),
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .label("Password"),
  };
  //todo

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("username", "Username")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
