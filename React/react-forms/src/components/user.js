import React, { Component } from "react";
import FormFields from "../Widgets/Forms/formFields";

import { firebaseDb } from "../firebase";

class User extends Component {
  state = {
    formData: {
      name: {
        element: "input",
        value: "",
        label: true,
        labelText: "Name",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter your name",
        },
        validation: {
          required: true,
          minlen: 5,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      lastname: {
        element: "input",
        value: "",
        label: true,
        labelText: "Lastname",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your last name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      email: {
        element: "input",
        value: "",
        label: true,
        labelText: "Email",
        config: {
          name: "email",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        label: true,
        labelText: "Password",
        config: {
          name: "password",
          type: "password",
          placeholder: "",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      message: {
        element: "textarea",
        value: "",
        label: true,
        labelText: "Message",
        config: {
          name: "message_input",
          rows: 4,
          cols: 36,
        },
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: "",
      },
      age: {
        element: "select",
        value: "",
        label: true,
        labelText: "Age",
        config: {
          name: "age",
          options: [
            { value: "1", text: "10-20" },
            { value: "2", text: "20-30" },
            { value: "3", text: "30-40" },
          ],
        },
        validation: {
          required: true,
        },
        valid: true,
        touched: false,
        validationMessage: "",
      },
    },
  };

  submitForm = (event) => {
    event.preventDefault();
    console.log("entered");
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    for (let key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    if (formIsValid) {
      firebaseDb
        .ref("users")
        .push(dataToSubmit)
        .then(() => {
          console.log("User Added");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  updateForm = (newState) => {
    this.setState({ formData: newState });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitForm}>
          <FormFields
            onblur={(newState) => this.updateForm(newState)}
            formData={this.state.formData}
            change={(newState) => this.updateForm(newState)}
          />
          <button type="submit" onClick={this.submitForm}>
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default User;
