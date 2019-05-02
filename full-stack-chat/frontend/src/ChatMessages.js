import React, { Component } from "react";
import { connect } from "react-redux";

export class ChatMessages extends Component {
  render() {
    return this.props.messages.map((msg, i) => <div key={i}>{msg}</div>);
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(mapStateToProps)(ChatMessages);
