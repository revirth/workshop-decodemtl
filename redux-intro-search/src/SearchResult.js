import React, { Component } from "react";
import { connect } from "react-redux";
import data from "./data.js";

class UnconnectedSearchResult extends Component {
  render() {
    console.log("TCL: UnconnectedSearchResult -> render", this.props);

    let results = data.filter(item => {
      return (
        item.name.toLowerCase().includes(this.props.query.toLowerCase()) &&
        item.price >= this.props.minPrice &&
        item.price <= this.props.maxPrice &&
        item.inStock === Boolean(this.props.inStock)
      );
    });
    return (
      <div>
        {results.map(r => (
          <div>{r.name}</div>
        ))}
      </div>
    );
  }
}

let mapStateToProp = st => {
  return {
    query: st.searchQuery,
    minPrice: st.min,
    maxPrice: st.max,
    inStock: st.inStock
  };
};

const SearchResult = connect(mapStateToProp)(UnconnectedSearchResult);
export default SearchResult;
