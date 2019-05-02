import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedSearch extends Component {
  handleQuery = e => {
    this.props.dispatch({ type: "query", q: e.target.value });
  };

  handleMinPrice = e => {
    this.props.dispatch({
      type: "minimum-price",
      min: parseInt(e.target.value)
    });
  };

  handleMaxPrice = e => {
    this.props.dispatch({
      type: "maximum-price",
      max: parseInt(e.target.value)
    });
  };

  handleInStock = e => {
    console.log(e.target);

    this.props.dispatch({
      type: "inStock",
      inStock: e.target.checked
    });
  };

  handleClear = e => {
    this.props.dispatch({
      type: "clear"
    });
  };

  handleShowInputs = e => {
    this.props.dispatch({
      type: "toggle-showInputs",
      showInputs: !this.props.showInputs
    });
  };

  render() {
    return (
      <div>
        <div>
          SearchQuery:
          <input
            type="text"
            onChange={this.handleQuery}
            value={this.props.query}
          />
        </div>
        <div>
          <input
            type="button"
            value="          show inputs          "
            onClick={this.handleShowInputs}
          />
        </div>
        {this.props.showInputs && (
          <div>
            <div>
              MinPrice:
              <input
                type="number"
                onChange={this.handleMinPrice}
                value={this.props.minPrice}
              />
            </div>
            <div>
              MaxPrice:
              <input
                type="number"
                onChange={this.handleMaxPrice}
                value={this.props.maxPrice}
              />
            </div>
            <div>
              inStock:
              <input
                type="checkbox"
                onChange={this.handleInStock}
                checked={this.props.inStock}
              />
            </div>
            <div>
              <input type="button" onClick={this.handleClear} value="Clear" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProp = st => {
  return {
    query: st.searchQuery,
    minPrice: st.min,
    maxPrice: st.max,
    inStock: st.inStock,
    showInputs: st.showInputs
  };
};

const Search = connect(mapStateToProp)(UnconnectedSearch);
export default Search;
