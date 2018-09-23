import React, { Component } from "react";
import { connect } from "react-redux";
import RequestFeed from "../requests/RequestFeed";
import { getRequests } from "../../actions/requestActions";
import "./Home.css";
class Home extends Component {
  componentDidMount() {
    this.props.getRequests();
  }
  render() {
    const { requests, loading } = this.props.request;
    const { isAuthenticated } = this.props.auth;
    let requestContent;
    let userAlert;
    if (isAuthenticated === false) {
      userAlert = (
        <div style={{ textAlign: "center" }}>
          <p>Sign in to vote and contribute</p>
        </div>
      );
    }
    if (requests === null || loading) {
      requestContent = <h1>Loading...</h1>;
    } else {
      requestContent = <RequestFeed requests={requests} />;
    }
    return (
      <div>
        <h2>Requests</h2>
        <div>{userAlert}</div>
        <div className="grid-container">{requestContent}</div>
      </div>
    );
  }
}

// set up proptypes
const mapStateToProps = state => ({
  request: state.request,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getRequests }
)(Home);
