import React, { Component } from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import UploadItem from "./UploadItem";
import RatingStar from "./RatingStar";
import { initialItems } from "./Data";

export default class Seller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: new Date(),
      id: require("uuid/v1")(),
      name: "",
      description: "",
      image:
        "http://placekitten.com/200/" + Math.floor(200 + Math.random() * 50),
      stock: "",
      price: "",
      sellerId: this.props.seller.id,
      reviews: []
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    initialItems.push(this.state);

    console.table(initialItems);

    this.setState({
      key: new Date(),
      id: require("uuid/v1")(),
      name: "",
      description: "",
      image:
        "http://placekitten.com/200/" + Math.floor(200 + Math.random() * 50),
      stock: "",
      price: "",
      sellerId: this.props.seller.id,
      reviews: []
    });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    let uploadForm = this.props.showUploadForm ? (
      <div>
        <UploadItem
          seller={this.props.seller}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          state={this.state}
        />
      </div>
    ) : (
      undefined
    );

    return (
      <div>
        <br />
        <div style={{ display: "flex" }}>
          <h1>{this.props.seller.name}</h1>
          <div
            style={{
              marginLeft: "10px",
              marginTop: "auto",
              marginBottom: "auto"
            }}
          >
            <RatingStar rating={this.props.seller.rating} />
          </div>
        </div>

        <div>
          {initialItems
            .filter(item => item.sellerId === this.props.seller.id)
            .map(item => (
              <Item item={item} />
            ))}
        </div>
        {uploadForm}
      </div>
    );
  }
}
