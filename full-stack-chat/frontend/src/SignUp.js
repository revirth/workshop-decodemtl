import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "", password: "" };
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch("http://localhost:4000/signup", {
      method: "POST",
      body: new FormData(e.target)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
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
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}
