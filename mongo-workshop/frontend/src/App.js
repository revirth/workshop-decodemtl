import React, { Component } from "react";
import { Route, BrowserRouter, Link, Redirect } from "react-router-dom";
import "./App.css";
import InputForm from "./components/InputForm.js";
import ReviewContainer from "./components/ReviewContainer.js";
import NavLinks from "./components/NavLinks.js";
import SearchByName from "./components/SearchByName.js";
import SearchDescription from "./components/SearchDescription.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      navClass: false,
      showLinks: false
    };
  }
  clickNav = e => {
    this.setState({
      navClass: !this.state.navClass,
      showLinks: !this.state.showLinks
    });
  };
  renderInputForm = () => {
    return <InputForm />;
  };
  renderReviews = () => {
    return <ReviewContainer />;
  };
  handleClick = () => {
    this.setState({ navClass: false, showLinks: false });
  };
  renderNameSearch = () => {
    return <SearchByName />;
  };
  renderRevSearch = () => {
    return <SearchDescription />;
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <div className="nav">
              <img
                className={
                  this.state.navClass ? "navBurger twist" : "navBurger twistOut"
                }
                src="nav.png"
                onClick={this.clickNav}
              />
            </div>
            <div
              className={
                this.state.showLinks ? "navContainer navSlide" : "navContainer"
              }
            >
              <NavLinks close={this.handleClick} />
            </div>
            <div className="container">
              <Route path="/" exact={true} render={this.renderInputForm} />
              <Route path="/reviews" exact={true} render={this.renderReviews} />
              <Route
                path="/searchByName"
                exact={true}
                render={this.renderNameSearch}
              />
              <Route
                path="/searchReviews"
                exact={true}
                render={this.renderRevSearch}
              />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
