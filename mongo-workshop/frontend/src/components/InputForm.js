import React, { Component } from "react";
import "./css/InputForm.css";

class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      reviewInput: "",
      ratingInput: "5"
    };
  }
  handleUsernameChange = e => {
    let usernameInput = e.target.value;
    this.setState({ usernameInput });
  };
  handleRadioChange = e => {
    let ratingInput = e.target.value;
    this.setState({ ratingInput });
  };
  handleTextAreaChange = e => {
    let reviewInput = e.target.value;
    this.setState({ reviewInput });
  };
  handleSubmit = e => {
    e.preventDefault();
    let [username, review, rating] = [
      this.state.usernameInput,
      this.state.reviewInput,
      this.state.ratingInput
    ];
    let body = { username, review, rating };
    fetch("/postReview", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(response => response.text())
      .then(response => {
        let parsedResponse = JSON.parse(response);
        if (parsedResponse.status) {
          console.log(parsedResponse.message);
        }
      })
      .catch(err => console.log(err));
    this.setState({ usernameInput: "", reviewInput: "", ratingInput: "5" });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="reviewForm">
          User:{" "}
          <input
            type="text"
            onChange={this.handleUsernameChange}
            value={this.state.usernameInput}
            className="usernameInput"
          />
          <br />
          Rating:
          <section className="radioRow">
            <label>
              <input
                type="radio"
                name="review"
                value="1"
                checked={this.state.ratingInput === "1"}
                onChange={this.handleRadioChange}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                name="review"
                value="2"
                checked={this.state.ratingInput === "2"}
                onChange={this.handleRadioChange}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                name="review"
                value="3"
                checked={this.state.ratingInput === "3"}
                onChange={this.handleRadioChange}
              />
              3
            </label>
            <label>
              <input
                type="radio"
                name="review"
                value="4"
                checked={this.state.ratingInput === "4"}
                onChange={this.handleRadioChange}
              />
              4
            </label>
            <label>
              <input
                type="radio"
                name="review"
                value="5"
                checked={this.state.ratingInput === "5"}
                onChange={this.handleRadioChange}
              />
              5
            </label>
          </section>
          <br />
          Review:
          <textarea
            onChange={this.handleTextAreaChange}
            className="reviewTextArea"
            value={this.state.reviewInput}
          />
          <input type="submit" className="submitButton" />
        </form>
      </div>
    );
  }
}

export default InputForm;
