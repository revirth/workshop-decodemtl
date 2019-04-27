import React, { Component } from "react";

export default class FamilyWidget extends Component {
  render() {
    return (
      <div>
        <h1 className={this.props.quote.indexOf("!") > -1 ? "red" : "green"}>
          {this.props.who}: {this.props.quote}
        </h1>
      </div>
    );
  }
}
