import React, { Component } from "react";

class Video extends Component {
  render() {
    return (
      <div key={this.props.video.id}>
        <figure>
          <iframe
            src={"https://player.vimeo.com/video/" + this.props.video.id}
            width="640"
            height="360"
            frameBorder="0"
            webkitallowfullscreen={1} // https://github.com/styled-components/styled-components/issues/1198
            mozallowfullscreen={1}
            allowFullScreen={1}
          />
          <figcaption>{this.props.video.caption}</figcaption>
        </figure>
      </div>
    );
  }
}

export default Video;
