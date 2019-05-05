import React, { Component } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";
import io from "socket.io-client";

class ChatMessages extends Component {
  constructor(props) {
    super(props);

    this.socket = io.connect(`http://${window.location.hostname}:4000`);

    this.socket.on("public", param => {
      if (Array.isArray(param)) this.props.setmessages(param);
      else this.props.addMessage(param);
    });

    this.socket.on("loginUsers", param => {
      if (!Array.isArray(param)) return;

      console.log("set-loginUsers", param);

      this.props.setLoginUsers(param);
    });
  }

  componentDidMount = () => {
    // let getMessages = () => {
    // if (!this.props.loggedIn) return;
    fetch(`http://${window.location.hostname}:4000/messages`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => this.props.setmessages(res));
    // };
    // let getLoginUsers = () => {
    //   if (!this.props.loggedIn) return;
    fetch(`http://${window.location.hostname}:4000/loginUsers`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        // if (this.props.loginUsers.length !== res.length) {
        //   let loginUsers = res.filter(
        //     username => this.props.loginUsers.indexOf(username) === -1
        //   );
        //   alert(`${loginUsers} has logged in!!`);
        // }
        this.props.setLoginUsers(res);
      });
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
    return (
      <ul>
        {this.props.messages.map((msg, i) => (
          <li key={i}>
            [{msg.time}] {msg.username} : {msg.message}
            {msg.images && msg.images.length > 0
              ? msg.images.map((img, i) => (
                  <img
                    key={i}
                    width="100px"
                    src={`http://${window.location.hostname}:4000` + img}
                  />
                ))
              : undefined}
          </li>
        ))}
      </ul>
    );
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
