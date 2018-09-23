import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReviewFeed from "./ReviewFeed";
import { getReviews } from "../../actions/reviewActions";
class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.getReviews();
  }

  render() {
    const { reviews, loading } = this.props.review;
    const { isAuthenticated } = this.props.auth;

    let reviewContent;

    let userAlert;
    if (isAuthenticated === false) {
      userAlert = (
        <div style={{ textAlign: "center" }}>
          <p>Sign in to vote and contribute</p>
        </div>
      );
    }

    if (reviews === null || loading) {
      reviewContent = <p>Wowee null</p>;
    } else {
      reviewContent = <ReviewFeed reviews={reviews} />;
    }

    return (
      <div className="container">
        <h2>Reviews</h2>
        <div>{userAlert}</div>
        {reviewContent}
      </div>
    );
  }
}

Reviews.propTypes = {
  getReviews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  review: state.review,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getReviews }
)(Reviews);
