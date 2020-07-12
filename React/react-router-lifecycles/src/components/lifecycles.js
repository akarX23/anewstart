import React, { Component } from "react";

class LifeCycles extends Component {
  state = {
    title: "SOmething",
  };

  componentWillMount() {
    console.log("Before render");
  }

  componentWillUpdate() {
    console.log("Before Update");
  }

  componentDidUpdate() {
    console.log("After Update");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillReceiveProps() {
    console.log("Before receive props");
  }

  render() {
    console.log("Render");
    return (
      <div>
        <h3>Life Cycle</h3>
        <div
          onClick={() => {
            this.setState({ title: "Somehitng else" });
          }}
        >
          Click To change
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log("After Rendere");
  }
}

export default LifeCycles;
