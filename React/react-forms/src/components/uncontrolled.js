import React, { Component } from "react";

class Uncontrolled extends Component {
  state = {};

  handleSubmitClick = (event) => {
    event.preventDefault();

    const values = {
      name: this.name.value,
      lastname: this.lastname.value,
    };
  };

  render() {
    return (
      <div className="container">
        <form>
          <div className="form_element">
            <label>Enter Name</label>
            <input type="text" ref={(input) => (this.name = input)} />
          </div>
          <div className="form_element">
            <label>Enter LastName</label>
            <input type="text" ref={(input) => (this.lastname = input)} />
          </div>
          <button onClick={this.handleSubmitClick}>Sign In</button>
        </form>
      </div>
    );
  }
}

export default Uncontrolled;
