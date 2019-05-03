import React, { Component } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";
import io from "socket.io-client";

class ChatMessages extends Component {
  constructor(props) {
    super(props);

    this.socket = io.connect("http://localhost:4000");
    this.socket.on("public", msg => {
      this.props.addMessage(msg);
    });
  }

  componentDidMount = () => {
    // let getMessages = () => {
    // if (!this.props.loggedIn) return;
    fetch("http://localhost:4000/messages", { credentials: "include" })
      .then(res => res.json())
      .then(res => this.props.setmessages(res));
    // };
    // let getLoginUsers = () => {
    //   if (!this.props.loggedIn) return;
    //   fetch("http://localhost:4000/loginUsers", { credentials: "include" })
    //     .then(res => res.json())
    //     .then(res => {
    //       console.log(res);
    //       if (this.props.loginUsers.length !== res.length) {
    //         let loginUsers = res.filter(
    //           username => this.props.loginUsers.indexOf(username) === -1
    //         );
    //         alert(`${loginUsers} has logged in!!`);
    //       }
    //       this.props.setLoginUsers(res);
    //     });
    // };
    // this.timerMessage = setInterval(getMessages, 1000);
    // this.timerLoginUsers = setInterval(getLoginUsers, 1000);
  };

  // https://reactjs.org/docs/state-and-lifecycle.html
  // componentWillUnmount = () => {
  //   clearInterval(this.timerMessage);
  //   clearInterval(this.timerLoginUsers);
  // };

  render() {
    return this.props.messages.map((msg, i) => (
      <div key={i}>
        [{msg.time}] {msg.username} : {msg.message}
      </div>
    ));
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    messages: state.messages,
    loginUsers: state.loginUsers
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMessages);
