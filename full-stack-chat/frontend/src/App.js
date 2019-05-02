import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import SignUp from "./SignUp";
import Login from "./Login";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";
import Logout from "./Logout";

class App extends Component {
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

export default connect(mapStateToProps)(App);
