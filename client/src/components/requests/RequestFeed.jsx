import React, { Component } from "react";
import PropTypes from "prop-types";
import RequestItem from "./RequestItem";

class RequestFeed extends Component {
  render() {
    const { requests } = this.props;
    return requests.map(request => (
      <RequestItem key={request._id} request={request} />
    ));
  }
}

RequestFeed.propTypes = {
  requests: PropTypes.array.isRequired
};

export default RequestFeed;
