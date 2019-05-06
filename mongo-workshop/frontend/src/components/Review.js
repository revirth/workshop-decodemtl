import React, { Component } from "react";
import "./css/Review.css";

class Review extends Component {
  renderRating = props => {
    let stars = [];
    for (let i = 0; i < props.rating; i++) {
      stars = stars.concat("★");
    }
    return stars;
  };
  render() {
    return (
      <div className="reviewCard">
        <section className="reviewHeader">
          <span className="username">{this.props.username} </span>
          <br />
          <span className="rating">{this.renderRating(this.props)}</span>
        </section>
        <section className="reviewBody">
          <span className="review">{this.props.review}</span>
        </section>
      </div>
    );
  }
}

export default Review;
