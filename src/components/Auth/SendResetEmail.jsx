import React from "react";
import Joi from "joi-browser";

import Form from "../Form";
import auth from "../../services/authservice";
import "./SendResetEmail.css";

class SendResetEmail extends Form {
  state = {
    data: { email: "" },
    errors: {},
    sendStatus: 0, // 0 not yet ; 1 failed; 2 succeeded;3 sending...
    sendResultMessage: "",
  };

  schema = {
    email: Joi.string().email().required(),
  };

  doSubmit = async () => {
    this.setState({
      sendStatus: 3,
      sendResultMessage: "Email sending is in progress...",
    });
    try {
      const { data } = this.state;
      const { data: okMessage } = await auth.sendResetEmail(data.email);
      this.setState({ sendStatus: 2, sendResultMessage: okMessage });
    } catch (ex) {
      if (ex.response && ex.response.code === 400) {
        this.setState({ sendStatus: 1, sendResultMessage: ex.response.data });
      } else {
        let exceptionError = "Exception Error happened: ".concat(ex.message);
        this.setState({ sendStatus: 1, sendResultMessage: exceptionError });
      }
    }
  };

  validateProperty = ({ name, value }) => {
    const schema = this.schema[name];
    const { error } = schema.validate(value);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  render() {
    const { sendStatus, sendResultMessage } = this.state;
    return (
      <>
        <div className="container col-8 col-md-8 my-3 border rounded">
          <p className="fs-5 lh-1 text-warning text-center mt-3">
            Forget Your Password?
          </p>

          {sendStatus !== 2 && (
            <>
              <p className=" text-wrap">
                Please enter your email address and click the submit button. A
                reset password email will be sent.
              </p>
              <form onSubmit={this.handleSubmit} className="row g-2 my-2">
                {this.renderInput("email", "Your Email Address:", "email")}

                {this.renderButton("Submit")}
              </form>
            </>
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
          {sendStatus === 3 && (
            <div className="alert alert-info email-progress">
              {sendResultMessage}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default SendResetEmail;
