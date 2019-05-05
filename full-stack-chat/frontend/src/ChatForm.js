import React, { Component } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";
import io from "socket.io-client";

class ChatForm extends Component {
  constructor(props) {
    super(props);

    this.state = { message: "" };

    this.socket = io.connect(`http://${window.location.hostname}:4000`);

    // https://developer.mozilla.org/en-US/docs/Web/API/document/cookie
    this.sid = document.cookie.replace(
      /(?:(?:^|.*;\s*)sid\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
  }

  componentDidMount = () => {
    document.getElementsByTagName("input")[0].focus();
  };

  handleSubmit = e => {
    e.preventDefault();

    // this.socket.emit("public", this.state.message, this.sid, msg => {
    //   // this.props.addMessage(msg);
    //   this.setState({ message: "" });
    // });

    let form = e.target;

    fetch(`http://${window.location.hostname}:4000/message`, {
      method: "POST",
      body: new FormData(form),
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        // this.props.setmessage(this.state.message);
        // debugger;
        form.reset();
        this.setState({ message: "" });
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDeleteAll = e => {
    e.preventDefault();

    fetch(`http://${window.location.hostname}:4000/deleteAll`, {
      method: "POST",
      credentials: "include"
    });
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
            required
          />
          <input
            type="file"
            name="images"
            multiple
            accept="image/x-png,image/gif,image/jpeg"
          />
          <input type="submit" value="Add Message" />
          <button onClick={this.handleDeleteAll}>Delete All My Messages</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ChatForm);
