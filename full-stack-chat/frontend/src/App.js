import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import SignUp from "./SignUp";
import Login from "./Login";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";
import Logout from "./Logout";
import mapsDispatchToProps from "./actions";

class App extends Component {
  component;
  componentDidMount = () => {
    fetch(`http://${window.location.hostname}:4000/rememberme`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) this.props.afterLogin();
      });
  };
  render = () => (
    <div>
      {this.props.loggedIn ? (
        <div>
          <ChatMessages />
          <ChatForm />
          <Logout />
        </div>
      ) : (
        <div>
          <h1>Sign Up</h1>
          <SignUp />
          <h1>Login</h1>
          <Login />
        </div>
      )}
    </div>
  );
}

let mapStateToProps = st => {
  return {
    loggedIn: st.loggedIn
  };
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(App);
