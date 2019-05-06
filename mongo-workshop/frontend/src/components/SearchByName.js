import React, { Component } from "react";
import "./css/SearchBar.css";
import Review from "./Review.js";

class SearchByName extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      reviews: null
    };
  }
  handleChange = e => {
    let newInput = e.target.value;
    this.setState({ searchInput: newInput });
  };
  handleSubmit = e => {
    e.preventDefault();
    let search = this.state.searchInput;
    search = { $regex: search, $options: "i" };

    //write a fetch here to an endpoint that will query your database
    fetch("/getReviews", {
      method: "POST",
      body: JSON.stringify({ username: search })
    })
      .then(response => response.text())
      .then(response => {
        let parsedResponse = JSON.parse(response);
        if (parsedResponse.status) {
          this.setState({ reviews: parsedResponse.reviews });
        }
      })
      .catch(err => console.log(err));

    //fetch goes above
    this.setState({ searchInput: "" });
  };
  renderReviews = review => {
    return (
      <Review
        username={review.username}
        rating={review.rating}
        review={review.review}
      />
    );
  };
  render() {
    return (
      <div>
        <p>Search Reviews By Reviewer</p>
        <form onSubmit={this.handleSubmit}>
          <input
            className="searchBar byName"
            type="text"
            value={this.state.searchInput}
            onChange={this.handleChange}
          />
          <br />
          <input className="searchSubmit" type="submit" />
        </form>
        {this.state.reviews ? (
          this.state.reviews.map(this.renderReviews)
        ) : (
          <p>Enter a search query</p>
        )}
      </div>
    );
  }
}

export default SearchByName;
