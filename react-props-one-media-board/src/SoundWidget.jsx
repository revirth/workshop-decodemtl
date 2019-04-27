import React, { Component } from "react";

class SoundWidget extends Component {
  render() {
    return (
      <div style={{ width: "50%" }}>
        <audio controls style={{ width: "100%" }}>
          <source src={this.props.loc} />
        </audio>
      </div>
    );
  }
}

export default SoundWidget;
