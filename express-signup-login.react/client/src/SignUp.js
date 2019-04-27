import React, { Component } from "react";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  onSubmitHandler = e => {
    e.preventDefault();
    console.log("TCL: SignUp -> onSubmitHandler", this.state);

    let formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      body: formData
    }).then(res => {
      debugger;

      if (!res.ok) {
        alert(res.statusText);
        return;
      }

      this.state.username = "";
      this.state.password = "";
      console.log(res);
    });
  };

  onChangeHandler = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            id="username"
            type="text"
            placeholder="User Id"
            value={this.state.username}
            onChange={this.onChangeHandler}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChangeHandler}
          />
          <input type="submit" value="SignUp" />
        </form>
      </div>
    );
  }
}
