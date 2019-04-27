import React, { Component } from "react";
import { videos, sounds, images, familyMembers } from "./Data.jsx";
import Video from "./Video.jsx";
import SoundWidget from "./SoundWidget.jsx";
import ImageWidget from "./ImageWidget.jsx";
import FamilyWidget from "./FamilyWidget.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <div style={{ display: "flex" }}>
          {videos.map((video, i) => (
            <Video key={i} video={video} />
          ))}
        </div>
        <div style={{ display: "flex" }}>
          {sounds.map((sound, i) => (
            <SoundWidget key={i} loc={sound.location} />
          ))}
        </div>
        <div style={{ display: "flex" }}>
          {images.map((image, i) => (
            <ImageWidget key={i} url={image.url} cap={image.caption} />
          ))}
        </div>
        <div>
          {familyMembers.map((member, i) => (
            <FamilyWidget key={i} who={member.name} quote={member.quote} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
