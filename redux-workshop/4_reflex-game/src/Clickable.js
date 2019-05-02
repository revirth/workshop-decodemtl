import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";

class Clickable extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
  }
  // handleClick = () => {};
  render = () => {
    return <button onClick={this.props.youWin}>Click</button>;
  };
}

const connectedClickable = connect(
  null,
  mapDispatchToProps
)(Clickable);

export default connectedClickable;
