import React from "react";
import Joi from "joi-browser";
import queryString from "query-string";

import Form from "../Form";
import auth from "../../services/authservice";

class ResetPassword extends Form {
  resetToken = "";
  constructor(props) {
    super(props);
    this.state = {
      data: { password: "", repeat_password: "" },
      errors: {},
      sendStatus: 0, //0 not submit; 1 failed; 2 succeeded
      sendResultMessage: "",
      showPasswordNoMatch: false,
    };
    const query = queryString.parse(this.props?.location?.search); 

    if (query && query.token) {
      this.resetToken = query.token;
    }

    this.schema = {
      password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
      repeat_password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    };
    this.noMatchErrorMessage = "password and 'repeat password' don't match";
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ sendStatus: 0, sendResultMessage: "" });
    this.setState({ errors: errors || {} });
    if (errors) {
      console.log(errors);
      return;
    }

    const { password, repeat_password } = this.state.data;
    this.setState({ showPasswordNoMatch: false });
    if (password && repeat_password && password === repeat_password) {
    } else {
      this.setState({ showPasswordNoMatch: true });
      return;
    }

    this.doSubmit();
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: okMessage } = await auth.resetPassword(
        this.resetToken,
        data.password
      );
      this.setState({ sendStatus: 2, sendResultMessage: okMessage });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({
          sendStatus: 1,
          sendResultMessage: ex.response.data + "  token  " + this.resetToken,
        });
      } else {
        let exceptionError = "Exception Error happened: ".concat(ex.message);
        this.setState({ sendStatus: 1, sendResultMessage: exceptionError });
      }
    }
  };

  validate = () => {
    const options = { abortEarly: false };

    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const errors = {};
    if (result.error) {
      result.error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
    }

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    this.setState({ showPasswordNoMatch: false });
    this.setState({ sendStatus: 0, sendResultMessage: "" });
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  render() {
    const { sendStatus, sendResultMessage, showPasswordNoMatch } = this.state;
    return (
      <>
        <div className="container col-8 col-md-8 my-3 border rounded">
          <p className="fs-5 lh-1 text-warning text-center mt-3">
            Reset Your Password
          </p>
          {sendStatus !== 2 && (
            <form onSubmit={this.handleSubmit} className="row g-2 my-2">
              {this.renderInput("password", "New password:", "password")}
              {this.renderInput(
                "repeat_password",
                "New password once more:",
                "password"
              )}

              {this.renderButton("Submit")}
            </form>
          )}
          {showPasswordNoMatch && (
            <div className="alert alert-warning" role="alert">
              {this.noMatchErrorMessage}
            </div>
          )}
          {sendStatus === 1 && (
            <div className="alert alert-warning" role="alert">
              {sendResultMessage}
            </div>
          )}
          {sendStatus === 2 && (
            <div className="alert alert-info" role="alert">
              {sendResultMessage}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default ResetPassword;
