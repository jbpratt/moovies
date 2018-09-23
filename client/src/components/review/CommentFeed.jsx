import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, reviewId } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} reviewId={reviewId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  reviewId: PropTypes.string.isRequired
};

export default CommentFeed;
