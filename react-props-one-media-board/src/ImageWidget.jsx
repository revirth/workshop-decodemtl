import React, { Component } from "react";

class ImageWidget extends Component {
  render() {
    return (
      <figure>
        <img src={this.props.url} />
        <figcaption>{this.props.cap}</figcaption>
      </figure>
    );
  }
}

export default ImageWidget;
