import React, { Component } from "react";
import Review from "./Review.js";
import "./css/ReviewContainer.css";

class ReviewContainer extends Component {
  constructor() {
    super();
    this.state = {
      reviews: null
    };
  }
  componentDidMount = () => {
    fetch("/getReviews")
      .then(response => response.text())
      .then(response => {
        let parsedResponse = JSON.parse(response);
        if (parsedResponse.status) {
          this.setState({ reviews: parsedResponse.reviews });
        }
      })
      .catch(err => console.log(err));
  };
  renderReviews = (review, index) => {
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
      <div className="reviewContainer">
        {this.state.reviews
          ? this.state.reviews.map(this.renderReviews)
          : "loading reviews"}
      </div>
    );
  }
}

export default ReviewContainer;
