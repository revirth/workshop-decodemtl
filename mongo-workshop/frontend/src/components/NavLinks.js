import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/NavLinks.css";

class NavLinks extends Component {
  render() {
    return (
      <div className="navLinks">
        <ul className="linkList">
          <li>
            <Link to="/reviews" onClick={this.props.close}>
              Reviews
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/" onClick={this.props.close}>
              Submit Review
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/searchByName" onClick={this.props.close}>
              Search By Name
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/searchReviews" onClick={this.props.close}>
              Search By Review
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavLinks;
