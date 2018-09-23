import React, { Component } from "react";
import { connect } from "react-redux";
import SearchForm from "./SearchForm";

class Search extends Component {
  render() {
    return (
      <div>
        <SearchForm />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results,
    isFetching: state.isFetching
  };
}

export default connect(mapStateToProps)(Search);
