import React, { Component } from "react";
export default class RatingStar extends Component {
  render() {
    let stars = [];

    for (let i = 0; i < parseInt(this.props.rating[0]); i++)
      stars.push(<span className="fa fa-star checked" />);

    for (let i = 0; i < 5 - parseInt(this.props.rating[0]); i++)
      stars.push(<span className="fa fa-star" />);

    return stars;
  }
}
