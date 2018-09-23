import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
// add actions
import {
  deleteReview,
  addUpvote,
  removeUpvote
} from "../../actions/reviewActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

class ReviewItem extends Component {
  onDeleteClick(id) {
    this.props.deleteReview(id);
  }
  onUpvoteClick(id) {
    this.props.addUpvote(id);
  }
  onDownvoteClick(id) {
    this.props.removeUpvote(id);
  }
  findUserUpvotes(upvotes) {
    const { auth } = this.props;
    if (upvotes.filter(upvote => upvote.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { review, auth } = this.props;
    if (review.name === undefined) {
      review.name = 'anonymous';
    }
    return (
      <div
        className="p-2"
        style={{
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          <img
            src={review.posterpath}
            alt={review.id}
            style={{
              width: "150px",
              height: "225px",
              display: "block",
              margin: "0 auto"
            }}
          />
          <div className="" style={{ textAlign: "center" }}>
            <h3>
              <a href={`https://www.themoviedb.org/movie/${review.externalid}`} style={{ color: "black" }}>
                {review.title}
              </a>
            </h3>
            <StarRatingComponent
              name="rating"
              value={review.rating}
              starColor="#483d8b"
              alt={review.rating}
            />
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center"
          }}
        >
          <p>{review.review}</p>
          <div>
            <small>By {review.name} </small> |{" "}
            {review.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, review._id)}
                type="button"
                className="btn btn-sm m-2"
              >
                x
              </button>
            ) : null}
            <small>Was this review helpful?</small>{" "}
            <span className="m-2"> {review.upvotes.length}</span>{" "}
            <div className="btn-group">
              <button
                onClick={this.onUpvoteClick.bind(this, review._id)}
                type="button"
                className="btn btn-sm"
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
              <button
                onClick={this.onDownvoteClick.bind(this, review._id)}
                type="button"
                className="btn btn-sm"
              >
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
              <Link to={`/reviews/${review._id}`} className="btn btn-sm">
                Comments
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReviewItem.propTypes = {
  review: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteReview: PropTypes.func.isRequired,
  addUpvote: PropTypes.func.isRequired,
  removeUpvote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    addUpvote,
    removeUpvote,
    deleteReview
  }
)(ReviewItem);
