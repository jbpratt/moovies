import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/reviewActions";

class CommentItem extends Component {
  onDeleteClick(reviewId, commentId) {
    this.props.deleteComment(reviewId, commentId);
  }

  render() {
    const { comment, reviewId, auth } = this.props;
    return (
      <div className="mb-3">
        <div>
          <p className="pl-3">{comment.text}</p>
          <small className="pl-2">{comment.name}</small>
          {comment.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, reviewId, comment._id)}
              type="button"
              className="btn btn-sm"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  reviewId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
