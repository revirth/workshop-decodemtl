import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

class DisplayTodos extends Component {
  constructor(props) {
    super(props);
  }
  render = () => this.props.todolist.map((t, i) => <div key={i}>{t}</div>);
}

const mapStateToProps = st => {
  return {
    todolist: st.todolist
  };
};

const ConnectedDisplayTodos = connect(mapStateToProps)(DisplayTodos);

export default ConnectedDisplayTodos;
