import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";

export class ChatForm extends Component {
  constructor(props) {
    super(props);

    this.state = { message: "" };
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:4000/message", {
      method: "POST",
      body: new FormData(e.target),
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        this.props.setmessage(this.state.message);
        this.setState({ message: "" });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <input type="submit" value="Add Message" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ChatForm);
