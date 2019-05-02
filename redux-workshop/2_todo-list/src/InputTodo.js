import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";

class InputTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    };
  }

  componentDidMount = () => document.getElementById("txtTodo").focus();

  handleSubmit = evt => {
    evt.preventDefault();

    // You need to add code here
    // this.props.dispatch({ type: "add", todo: this.state.inputValue });
    this.props.add(this.state.inputValue);
    this.setState({ inputValue: "" });
  };
  handleChange = evt => this.setState({ inputValue: evt.target.value });

  handleReverse = () => this.props.dispatch({ type: "reverse" });

  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          id="txtTodo"
          onChange={this.handleChange}
          value={this.state.inputValue}
          required
        />
        <input type="submit" />
        {/* <input type="button" onClick={this.handleReverse} value="Reverse" /> */}
        <input type="button" onClick={this.props.reverse} value="Reverse" />
      </form>
    );
  };
}

const ConnectedInputTodo = connect(
  null,
  mapDispatchToProps
)(InputTodo);

export default ConnectedInputTodo;
