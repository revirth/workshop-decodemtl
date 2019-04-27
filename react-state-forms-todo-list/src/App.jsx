import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      todoLimit: "",
      allTodos: [],
      listName: undefined
    };
  }

  componentDidMount = () => {
    console.log("TCL: App -> componentDidMount");

    setTimeout(() => {
      this.setState({
        listName: "Todo List " + Math.floor(Math.random() * 100)
      });

      document.getElementById(`userInput${this.props.idx}`).focus();
    }, 2000);
  };

  onChangeHandler1 = e => {
    console.log("TCL: App -> onChangeHandler1", e);

    this.setState({ userInput: e.target.value });
  };
  onChangeHandler2 = (e, id) => {
    if (id === 2) this.setState({ todoLimit: e.target.value });
    else this.setState({ userInput: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    console.log("TCL: App -> onSubmitHandler", e);

    this.setState(
      {
        userInput: "",
        todoLimit: "",
        allTodos: this.state.allTodos.concat({
          item: this.state.userInput,
          time: this.state.todoLimit
        })
      },
      () => {
        document.getElementById(`userInput${this.props.idx}`).focus();
      }
    );
  };

  onDeleteAll = e => {
    console.log("TCL: App -> onDeleteAll", e);

    if (this.state.allTodos.length > 0) this.setState({ allTodos: [] });
    else alert("TodoList is already empty!!!");
  };

  onChangeTitle = e => {
    console.log("TCL: App -> onChangeTitle", e);

    this.setState({ listName: window.prompt("What title do you want?") });
  };

  onDeleteFirst = e => {
    if (this.state.allTodos.length < 1) return;

    this.setState({ allTodos: this.state.allTodos.slice(1) });
  };

  onReverse = e => {
    if (this.state.allTodos.length < 1) return;

    this.setState({ allTodos: this.state.allTodos.reverse() });
  };

  render() {
    if (this.state.listName === undefined) return <div>Loading....</div>;

    return (
      <div>
        <h1>{this.state.listName}</h1>
        <ul>
          {this.state.allTodos.map((todo, i) => (
            <li key={i}>
              {todo.item} - {todo.time}
            </li>
          ))}
        </ul>

        <form onSubmit={this.onSubmitHandler}>
          <input
            id={`userInput${this.props.idx}`}
            type="text"
            onChange={e => this.onChangeHandler2(e, 1)}
            value={this.state.userInput}
            required
          />
          <input
            type="time"
            onChange={e => this.onChangeHandler2(e, 2)}
            value={this.state.todoLimit}
            required
          />

          <input type="submit" value="Add" />
        </form>

        <button onClick={this.onDeleteAll}>Delete All</button>
        <button onClick={this.onChangeTitle}>Change Title</button>
        <button onClick={this.onDeleteFirst}>Delete the First Item</button>
        <button onClick={this.onReverse}>Reverse Items</button>
      </div>
    );
  }
}
