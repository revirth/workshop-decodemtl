import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";

class Status extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    setTimeout(() => {
      // this.props.dispatch({ type: "comWin" });
      this.props.comWin();
    }, 4000);
  };

  render = () => {
    return this.props.isGameOver ? (
      this.props.isUserWin ? (
        <div>You Won</div>
      ) : (
        <div>You Lost</div>
      )
    ) : (
      <div> Click as fast as possible! </div>
    );
  };
}

const mapStateToProps = st => {
  return {
    isGameOver: st.isGameOver,
    isUserWin: st.isUserWin
  };
};

const connectedStatus = connect(
  mapStateToProps,
  mapDispatchToProps
)(Status);

export default connectedStatus;
