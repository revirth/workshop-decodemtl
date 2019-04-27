import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class ItemDetail extends Component {
  render() {
    return (
      <div>
        <img height="100px" src={this.props.item.image} />
        <div>
          <h1>{this.props.item.name}</h1>
          <div>{this.props.item.description}</div>
          <div>{this.props.item.price.toLocaleString()}$</div>
          <h2 style={{ color: "red" }}>{this.props.item.stock} left</h2>
          <Link to={`/items/${this.props.item.id}/reviews`}>Reviews</Link>
        </div>
      </div>
    );
  }
}
