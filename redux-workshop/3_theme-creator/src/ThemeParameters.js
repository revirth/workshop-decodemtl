import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import mapDispatchToProps from "./actions";

class ThemeParameters extends Component {
  constructor(props) {
    super(props);
  }
  color = evt => this.props.color(evt.target.value);
  italic = evt => this.props.italic(evt.target.checked);
  render = () => {
    return (
      <div>
        <div>
          &nbsp;Pick your color
          <input onChange={this.color} type="color" />
        </div>
        <div>Pick your font</div>
        <div>
          <label>
            <input
              type="radio"
              name="fontgroup"
              value="arial"
              // onChange={this.arial}
              onChange={this.props.arial}
            />
            &nbsp; Arial
          </label>
          <label>
            <input
              type="radio"
              name="fontgroup"
              value="times new roman"
              // onChange={this.timesNewRoman}
              onChange={this.props.timesNewRoman}
            />
            &nbsp; Times new roman
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" onChange={this.italic} /> italic
          </label>
        </div>
      </div>
    );
  };
}

const ConnectedThemeParameters = connect(
  null,
  mapDispatchToProps
)(ThemeParameters);

export default ConnectedThemeParameters;
