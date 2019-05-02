import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

class Preview extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    let myFontStyle = this.props.myFontStyle;
    let myStyle = {
      height: "100vh",
      width: "50vh",
      padding: "30px",
      fontStyle: myFontStyle,
      backgroundColor: this.props.myBackColor,
      fontFamily: this.props.myFontFamily
    };
    return (
      <div style={myStyle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
        sollicitudin sem et ante luctus sodales. Vivamus mi eros, fringilla et
        felis vitae, efficitur efficitur justo. Praesent dolor mauris, ultrices
        vel justo ac, sagittis
      </div>
    );
  };
}

const mapStateToProps = st => {
  return {
    myFontFamily: st.myFontFamily,
    myFontStyle: st.myFontStyle,
    myBackColor: st.myBackColor
  };
};

const ConnectedPreview = connect(mapStateToProps)(Preview);

export default ConnectedPreview;
