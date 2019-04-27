import React, { Component } from "react";
import { Link } from "react-router-dom";
import { initialItems, initialSellers } from "./Data";
export default class UploadItem extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.state;
  }

  render() {
    return (
      <div style={{ border: "solid 1px blue" }}>
        <h1>Upload Item for {this.props.seller.id}</h1>
        <form onSubmit={this.props.handleSubmit}>
          Name:
          <input
            size="30"
            type="text"
            id="name"
            onChange={this.props.handleChange}
            value={this.props.state.name}
          />
          <br />
          image:
          <input
            size="30"
            type="text"
            id="image"
            onChange={this.props.handleChange}
            value={this.props.state.image}
          />
          <br />
          stock:
          <input
            size="30"
            type="number"
            id="stock"
            onChange={this.props.handleChange}
            value={this.props.state.stock}
          />
          <br />
          price:
          <input
            size="30"
            type="number"
            id="price"
            onChange={this.props.handleChange}
            value={this.props.state.price}
          />
          <br />
          <input type="submit" value="Upload" />
        </form>
      </div>
    );
  }
}
