import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  deleteReview,
  addUpvote,
  removeUpvote,
  getReview
} from "../../actions/reviewActions";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import StarRatingComponent from "react-star-rating-component";

class Review extends Component {
  componentWillMount() {
    this.props.getReview(this.props.match.params.id);
  }
  onDeleteClick(id) {
    this.props.deleteReview(id);
  }

  render() {
    const { review } = this.props.review;
    const { auth } = this.props;
    let reviewContent;
    if (review === null || Object.keys(review).length === 0) {
      reviewContent = <div>Loading...</div>;
    } else {
      reviewContent = (
        <div className="container">
          <Link to="/reviews" className="btn btn-sm">
            Back to Reviews
          </Link>

          {review.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, review._id)}
              type="button"
              className="btn btn-sm"
            >
              Delete this review
            </button>
          ) : null}
          <div style={{ textAlign: "center" }}>
            <h1>{review.title}</h1>
            <StarRatingComponent
              name="rating"
              value={review.rating}
              starColor="#483d8b"
            />
          </div>
          <div>
            <img
              src={review.posterpath}
              alt={review.id}
              style={{
                width: "300px",
                height: "450px",
                display: "block",
                margin: "0 auto"
              }}
            />
            <div className="m-4" style={{ textAlign: "center" }}>
              {review.review}
            </div>
          </div>
          <div>
            <small>Was this review helpful?</small>{" "}
            <CommentForm reviewId={review._id} />
            <CommentFeed reviewId={review._id} comments={review.comments} />
          </div>
        </div>
      );
    }

    return <div>{reviewContent}</div>;
  }
}

Review.propTypes = {
  getReview: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired,
  addUpvote: PropTypes.func.isRequired,
  removeUpvote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  review: state.review,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getReview,
    addUpvote,
    removeUpvote,
    deleteReview
  }
)(Review);
