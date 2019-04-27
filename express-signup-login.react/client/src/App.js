import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SignUp from "./SignUp";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Signup</h1>
        <SignUp />
        <h1>Login</h1>
        {/* // <Login /> */}
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
