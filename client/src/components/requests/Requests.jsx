import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRequests } from "../../actions/requestActions";
import Search from "../search/Search";
class Requests extends Component {
  render() {
    return (
      <div className="container">
        <Search />
      </div>
    );
  }
}

Request.propTypes = {
  request: PropTypes.object.isRequired,
  getRequests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  request: state.request
});

export default connect(
  mapStateToProps,
  { getRequests }
)(Requests);
