import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Item extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "200px" }}>
          <img width="190px" src={this.props.item.image} />
        </div>
        <div>
          <h3>{this.props.item.name}</h3>
          {this.props.item.price.toLocaleString()}$
          <br />
          <Link to={`/sellers/${this.props.item.sellerId}`}>Seller Detail</Link>
          <br />
          <Link to={`/items/${this.props.item.id}`}>Item Detail</Link>
        </div>
      </div>
    );
  }
}
