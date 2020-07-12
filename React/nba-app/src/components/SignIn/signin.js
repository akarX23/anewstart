import React, { Component } from "react";
import styles from "./signin.css";

import { firebase } from "../../firebase";
import FormFields from "../widgets/FormFields/formfields";

export default class SignIn extends Component {
  state = {
    registerError: "",
    loading: false,
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
          password: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  updateForm = (element) => {
    const newFormdata = {
      ...this.state.formdata,
    };

    const newElement = { ...newFormdata[element.id] };

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newElement.value = element.event.target.value;
    newFormdata[element.id] = newElement;
    this.setState({ formdata: newFormdata });
  };

  validate = (element) => {
    let error = ["true", ""];

    if (element.validation.password) {
      const valid = element.value.length >= 6;
      const errorMessage = "Must be greater than 6";
      error = valid ? error : [valid, errorMessage];
    }

    if (element.validation.email) {
      const valid = RegExp("^[^@s]+@[^@s.]+.[^@.s]+$").test(element.value);
      const errorMessage = "Email is not valid";
      error = valid ? error : [valid, errorMessage];
    }

    if (element.validation.required) {
      const valid = element.value.trim() != "";
      const errorMessage = "This field is required";
      error = valid ? error : [valid, errorMessage];
    }
    return error;
  };

  submitButton = () =>
    this.state.loading ? (
      "loading..."
    ) : (
      <div>
        <button onClick={(event) => this.submitForm(event, false)}>
          Rgister Now
        </button>
        <button onClick={(event) => this.submitForm(event, true)}>
          Log In
        </button>
      </div>
    );

  submitForm = (event, type) => {
    event.preventDefault();
    if (type != null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formdata) {
        dataToSubmit[key] = this.state.formdata[key].value;
        formIsValid = formIsValid ? this.state.formdata[key].valid : false;
      }

      if (formIsValid) {
        this.setState({ loading: true, registerError: "" });
        if (type) {
          firebase
            .auth()
            .signInWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => {
              this.props.history.push("/");
            })
            .catch((error) => {
              console.log(error.message);
              this.setState({ loading: false, registerError: error.message });
            });
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => {
              this.props.history.push("/");
            })
            .catch((error) => {
              console.log(error.message);
              this.setState({ loading: false, registerError: error.message });
            });
        }
      }
    }
  };

  showError = () =>
    this.state.registerError !== "" ? (
      <div className={styles.error}>{this.state.registerError}</div>
    ) : (
      ""
    );

  render() {
    return (
      <div className={styles.logContainer}>
        <form onSubmit={(event) => this.submitForm(event, null)}>
          <h2>Register / Log In</h2>
          <FormFields
            id={"email"}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />
          <FormFields
            id={"password"}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />

          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}
