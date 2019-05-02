import React from "react";
import logo from "./logo.svg";
import Search from "./Search.js";
import SearchResult from "./SearchResult.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Search />
      <SearchResult />
    </div>
  );
}

export default App;
