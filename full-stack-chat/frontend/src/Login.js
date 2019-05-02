import React, { Component } from "react";
import mapDispatchToProps from "./actions";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "" };
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:4000/login", {
      method: "POST",
      body: new FormData(e.target),
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          console.log(res);
          this.props.afterLogin();
        } else alert("Retry!!!");
      });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
