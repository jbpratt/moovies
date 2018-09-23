import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { clearCurrentProfile } from "../../../actions/profileActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    // const { isAuthenticated } = this.props.auth;
    // const authLinks = (
    //   <ul className="navbar-nav ml-auto" style={{ fontSize: "12px" }}>
    //     <li className="nav-item">
    //       <a onClick={this.onLogoutClick.bind(this)} className="nav-link">
    //         Logout
    //       </a>
    //     </li>
    //   </ul>
    // );
    // const guestLinks = (
    //   <ul className="navbar-nav ml-auto" style={{ fontSize: "12px" }}>
    //     <li className="nav-item">
    //       <Link
    //         className="nav-link"
    //         to="/register"
    //       >
    //         Sign up
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" to="/login" style={{ color: "" }}>
    //         Login
    //       </Link>
    //     </li>
    //   </ul>
    // );
    return (
      <nav className="navbar navbar-expand-sm">
        <div className="container">
          <Link className="navbar-brand" to="/" style={{ color: "" }}>
            <FontAwesomeIcon icon={faHome} transform="shrink-4" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto" style={{ fontSize: "15px" }}>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/reviews"
                >
                  {" "}
                  Reviews
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/requests"
                >
                  {" "}
                  Requests
                </Link>
              </li>
            </ul>
            {/* {isAuthenticated ? authLinks : guestLinks} */}
            <Link
              className="nav-link"
              to="/search"
            >
              {" "}
              Search
                </Link>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile
  }
)(Navbar);
