import React, { Component } from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";

class Logout extends Component {
  handleLogout = () => {
    fetch(`http://${window.location.hostname}:4000/logout`, {
      credentials: "include"
    }).then(res => {
      console.log(res);

      if (res.ok) {
        this.props.afterLogOut();
      }
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);
